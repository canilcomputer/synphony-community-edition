/**
 * synphony_lib.js
 *
 * Functions
 *
 * Created Apr 8, 2014 by Hopper
 *
 */

var lang_data;
var LangDict;
var alwaysMatch = [];

/**
 *
 * @param {string} id
 * @returns {Element}
 */
function $(id) {
	return document.getElementById(id);
}

/**
 * Returns a list of words that meet the requested criteria.
 * @param {Array} aDesiredGPCs The list of graphemes targeted by this search
 * @param {Array} aKnownGPCs The list of graphemes known by the reader
 * @param {Boolean} restrictToKnownGPCs If <code>TRUE</code> then words will only contain graphemes in the <code>aKnownGPCs</code> list. If <code>FALSE</code> then words will contain at least one grapheme from the <code>aDesiredGPCs</code> list.
 * @param {Boolean} allowUpperCase
 * @param {int} syllableLength
 * @param {Array} aSelectedGroups
 * @param {Array} aPartsOfSpeech
 * @returns {Array} An array of WordObjects
 */
function selectWordsByGPC(aDesiredGPCs, aKnownGPCs, restrictToKnownGPCs, allowUpperCase, syllableLength, aSelectedGroups, aPartsOfSpeech) {

	var word_already_exists, aSelectedWordObjects, aWordObjects, aVocabKey, aCriteria;
	var groups = chooseVocabGroups(aSelectedGroups);

	aWordObjects = [];
	aSelectedWordObjects = [];
	aVocabKey = constructSourceArrayNames(aDesiredGPCs, syllableLength); //result: "a__1" or "a_a__1" or "wicc_a_a__1"
	aCriteria = aKnownGPCs;

	//let's concatenate all vocabulary into 1 array
	for(var g = 0, len = groups.length; g < len; g++) { //eg: group1, group2...
		for(var i = 0, ilen = aVocabKey.length; i < ilen; i++) { //eg: ["a_a__1"]
			if(groups[g][aVocabKey[i]]) {//make sure it exists
				aWordObjects = aWordObjects.concat(groups[g][aVocabKey[i]]);
			}
		}
	}

	//this is the place to branch into checking for taught graphemes vs
	//selecting all words that have the current grapheme.
	if(!restrictToKnownGPCs) {
		//select all words that have the current_gpc
		aSelectedWordObjects = _.uniq(aWordObjects);
	} else {//we start restricting the word list using criteria that include
		//known graphemes, part of speech, etc.

		//add uppercase gpcs to aCriteria***
		if(allowUpperCase) {//if true then we add uppercase
			for(var k = 0, klen = aKnownGPCs.length; k < klen; k++) {
				var temp = [];
				for(var j = 0, jlen = lang_data.GPCS.length; j < jlen; j++) {
					if(lang_data.GPCS[j]["GPC"] === aKnownGPCs[k]) {
						if(lang_data.GPCS[j]["GPCuc"] !== "") {
							temp.push(lang_data.GPCS[j]["GPCuc"]);
						}
					}
				}
				aCriteria = aCriteria.concat(temp);
			}
		}

		//lets add symbols that can be matched at any time
		//these can come from the AlwaysMatch, SyllableBreak, StressSymbol, or MorphemeBreak fields
		//anything else must exist in the aKnownGPCs in order to be accepted
		if(alwaysMatch.length > 0) {
			aCriteria = aCriteria.concat(alwaysMatch);
		} else {
			if(lang_data["AlwaysMatch"] && lang_data["AlwaysMatch"].length > 0) {
				alwaysMatch = alwaysMatch.concat(lang_data["AlwaysMatch"]);
			}
			if(lang_data["SyllableBreak"] !== "") {
				alwaysMatch.push(lang_data["SyllableBreak"]);
			}
			if(lang_data["StressSymbol"] !== "") {
				alwaysMatch.push(lang_data["StressSymbol"]);
			}
			if(lang_data["MorphemeBreak"] !== "") {
				alwaysMatch.push(lang_data["MorphemeBreak"]);
			}
			aCriteria = aCriteria.concat(alwaysMatch);
		}

		//start checking words
		for(var w = 0, wlen = aWordObjects.length; w < wlen; w++) {
			var keep = true;
			//first we check for allowable gpcs
			var gpcform = aWordObjects[w]["GPCForm"];
			var test_word = _.difference(gpcform, aCriteria);
			if(test_word.length > 0) {
				keep = false;
			}

			//then we check for part of speech constraint
			var ps_check = false;
			if(aPartsOfSpeech.length > 0) {
				if(aWordObjects[w]["PartOfSpeech"]) {
					for(var p = 0, plen = aPartsOfSpeech.length; p < plen; p++) {
						if(aWordObjects[w]["PartOfSpeech"] === aPartsOfSpeech[p]) {
							ps_check = true;
						}
					}
				}
				if(ps_check === false)
					keep = false;
			}

			//if keep is still true, then this word object
			//has passed all checks and is suitable for use
			if(keep === true) {
				word_already_exists = false;
				for(var m = 0, mlen = aSelectedWordObjects.length; m < mlen; m++) {
					//check to see that we don't add more than one instance of the word to our list
					if(aSelectedWordObjects[m] === aWordObjects[w]) {
						word_already_exists = true;
					}
				}
				if(word_already_exists === false) {
					aSelectedWordObjects.push(aWordObjects[w]);
				}
			}
		}//end of wordObject loop
	}

	return aSelectedWordObjects;
}

/**
 *
 * @param {Array} aDesiredGPCs An array of strings
 * @param {Array} syllableLength An array of numbers for selected syllable lengths
 * @returns {Boolean|Array} An array of names (string)
 */
function constructSourceArrayNames(aDesiredGPCs, syllableLength) {

	var aArrayNames, aName;
	aName = aDesiredGPCs;
	aArrayNames = [];

	if(syllableLength.length === 0) {
		throw new Error("Please select a Syllables checkbox.");
	}

	for(var i = 0, len = aName.length; i < len; i++) {
		for(var s = 0; s < syllableLength.length; s++) {
			aArrayNames.push(aName[i] + '__' + (syllableLength[s]));
		}
	}

	if(aArrayNames.length > 0) {
		return aArrayNames;
	} else {
		console.log('Error: function constructSourceArrayNames returned 0');
	}
}

/**
 * Gets a list of the checked values from a group of checkboxes.
 * @param {Array} elements An array of checkbox elements
 * @returns {Array} An array of the values of the checkboxes that are checked
 */
function collectCheckedValues(elements) {

	var aValues = [];

	for(var i = 0; i < elements.length; i++) {
		if(elements[i].checked === true) {
			aValues.push(elements[i].value);
		}
	}

	return aValues;
}


function chooseVocabGroups(aSelectedGroups) {

	var groups = [];

	for(var i = 0; i < aSelectedGroups.length; i++) {
		switch(aSelectedGroups[i]) {
			case 'group1':
				groups.push(lang_data.group1);
				break;
			case 'group2':
				groups.push(lang_data.group2);
				break;
			case 'group3':
				groups.push(lang_data.group3);
				break;
			case 'group4':
				groups.push(lang_data.group4);
				break;
			case 'group5':
				groups.push(lang_data.group5);
				break;
			case 'group6':
				groups.push(lang_data.group6);
				break;
			default:
				break;
		}
	}

	return groups;
}

/**
 * Called by langname_lang_data.js
 * @param {String} data
 */
function setLangData(data) {
	try {
		lang_data = data;
		processVocabularyGroups();
	}
	catch(e) {

		var div = $("loading_data");
		if(div) {
			// this is running in the SynPhony UI, so show the error message
			div.innerHTML = "Error loading language data: " + e.message;
			return false;
		} else {
			// this is not running in the SynPhony UI, throw the exception
			throw e;
		}
	}
}

function processVocabularyGroups() {
	//processes vocabulary and creates indexes to speed lookups.
	var n = lang_data["VocabularyGroups"];
	var u, gpc, syll, temp;
	for(var a = 1; a < (n + 1); a++) {
		var group = "group" + a;
		for(var i = 0, len = lang_data[group].length; i < len; i++) {
			//creates a unique array of all gpcs in a word
			temp = lang_data[group][i]["GPCForm"];
			u = _.uniq(temp);
			lang_data[group][i]["GPCS"] = u;
			lang_data[group][i]["GPCcount"] = u.length;

			//creates a reverse form of the word's gpcs
			//lang_data[group][i]["Reverse"] = temp.reverse().join('');

			if(lang_data[group][i]["GPCS"] !== undefined) {
				//creates arrays grouped by gpc and syllable length
				for(var j = 0, jlen = u.length; j < jlen; j++) {
					gpc = u[j].toLowerCase();
					syll = lang_data[group][i]["Syllables"];
					if(!lang_data[group][gpc + '__' + syll]) {
						lang_data[group][gpc + '__' + syll] = [];
					}
					lang_data[group][gpc + '__' + syll].push(lang_data[group][i]);
				}
			}
		}
	}
}