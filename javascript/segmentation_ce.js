/* Soli Deo Gloria */

/*
 * LICENSE: Public Domain 0
 * http://creativecommons.org/publicdomain/zero/1.0/
 * To the extent possible under law, Canada Institute of Linguistics has waived all
 * copyright and related or neighboring rights to this software and code.
 * This work is published from: Canada.
 *
 * DISCLAIMER: The Canada Institute of Linguistics has and does permanently relinquish
 * and waive all of its rights in this software and code ("the Code") for the purpose
 * of contributing to the public domain, and for the benefit of the public, such that
 * the public can build upon, modify, incorporate in other works, reuse and redistribute
 * the Code as freely as possible in any form whatsoever and for any purposes, including
 * without limitation commercial purposes.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL
 * THE CANADA INSTITUTE OF LINGUISTICS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
 * FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Developer: Norbert Rennert
 * email: norbert.rennert@sil.org
 *
 * Some code portions have been developed by others
 * and are indicated at the appropriate place.
 */


//var _  = require("underscore");

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
//_.str = require("underscore.string");

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include("Underscore.string", "string"); // => true

function $(id){return document.getElementById(id);}
function $N(n){return document.getElementsByName(n);}
function $C(c){return document.getElementsByClassName(c);}

function onload() {
	if(!supportsHTML5Storage()){
		$("html5Check").classList.remove("is-none");
	}
	showMainContentDiv("intro");
	window.scrollTo(0, 0);
	checkcss();
	$("version").innerHTML = "Version Public Domain";
	var lastModified = document.lastModified.split(" ");
	$("lastModified").innerHTML = " Last updated on " + lastModified[0];
	show_subTabs("textsGroup");
	KZfviWtrRYVGIae("mail1");
	KZfviWtrRYVGIae("mail2");
	KZfviWtrRYVGIae("mail3");
	checkLocalStorageSpaceRemaining();
}

// GLOBAL VARIABLES
var LangDict = {};
var LangMetaData = {};
    LangMetaData["LangName"] = "";
    LangMetaData["LangID"] = "";
    LangMetaData["LocalName"] = "";
var MasterWordList = [];
var UpperCaseWordList = [];
var MasterPhonotacticsList  = {};
    MasterPhonotacticsList["wic"]  = [];
    MasterPhonotacticsList["wicc"] = [];
    MasterPhonotacticsList["wmc"]  = [];
    MasterPhonotacticsList["wmcc"] = [];
    MasterPhonotacticsList["wfc"]  = [];
    MasterPhonotacticsList["wfcc"] = [];
    MasterPhonotacticsList["wiv"]  = [];
    MasterPhonotacticsList["wivc"] = [];
    MasterPhonotacticsList["wmv"]  = [];
    MasterPhonotacticsList["wmvc"] = [];
    MasterPhonotacticsList["wfv"]  = [];
    MasterPhonotacticsList["wfvc"] = [];
var MasterIPAList = [];
var MasterGPCList = [];
var MasterCharacterInventory = [];
var MasterLibraryCatalogue = [];
var MasterSequenceList = [];
var ProductivityGPCList = [];
var aGPC = [];//array of all graphemes
var aWords = [];
var blobWords = "";//all words of all lists
var blobWords_lc = [];//all words of all lists in lowercase
var blobChars = [];//all characters from all texts
var blobChars_lc = [];//all characters in lowercase
var blobUniqueChars = [];//a list of unique characters in supplied texts
var vowels = [];
var cons = [];
var other = [];
var syll_graphemes = [];
var all_punct = [];
var si_punct = [];
var sm_punct = [];
var sf_punct = [];
var scriptchars_num = [];
var separators = [];
var symbols = [];
var marks = [];
var potentially_ambiguous = [];
var control_codes = [];
var aSyll = [];//array of all syllabary characters
var aWordLists = [];//array of all word lists by group (plain format)
var segmentedWords = [];//array of groups of words: [plain_words,csv_words]
var consolidatedWords = [];//all groups in one array: [plain_words,csv_words]
var aResidueWords = [];
var gpcs = [];
var corpus_gpcs = [];
var corpus_gpcs_lc = [];
var sub_corpus_gpcs_lc = [];//this is used for counting gpcs in a syllable group of words
var current_gpcs_sorted_by_freq = [];
var aWordListsBySyllLength = []; //words group vocab groups only
var aPlainWordsBySyll = [];//plain words grouped by syllable length
var aPhonotactics = [];
var wordlist = "";
var phonotactics = [];
var langname = "";//language name proper case with potential spaces
var lang_name = "";//language name with spaces converted to underscores
var lang_name_lc = "";//language name lower case with underscores
var ethno_code = "";
var js_arraynames = "";
var cvwordlist = [];
var sWS = "alpha";//writing system. options: alpha, syllabary. default: alpha.
var sDIR = "ltr";//direction of writing. options: ltr, rtl. default: ltr.
var sWM = "lr-tb";//writing mode (left_to_right - top_to_bottom, etc.)
var largest_count = 0;//number of words matched by most productive gpc
var most_productive_gpc = "";//current most productive gpc
var productivity_array = [];//array used to produce productivity chart:[percent,absolute,cumulative,item]
var cumulative_count = 0;//cumulative count used in producing productivity array.
var matched_words = [];//words which are completely composed of a particular set of gpcs
var current_wordlist = [];//subgroup of words from entire wordlist. eg. 1 syllable words only
var word_gpcs = [];//array of gpcs in an individual word
var sequencedGPCs = [];//gpcs that have been sorted by productivity
var detailed_report = "";
var report_header = "";
var report_letter_freq = "";
var report_syll_length = "";
var unsequenced_gpcs = [];
var ScriptName = "";
var fonts = [];
var flagProductivityCalculated = 0;
var productivitySequenceWithStats = [];
var lettersGroupedByFeatures = [];//stops, fricatives, nasals, laterals, etc.
var hasCase = false;
var processed_dict_file = [];
var tokenFreqISUpToDate = 0;
var texts = [];
var InputDataFileNames = [];
var totalUniqueWordCount = 0;
var allTextGroupsWordCount = 0;
var textGroups_WordCount = 0;
var charactersHaveBeenUpdated = 0;
var tempWordList = [];
var tempWordList2 = [];
var user_message = "";
var languages_list = [];
var lastReviewCommand = [];

//the supportedScripts array depends on the file unicode_cv_categories.js
var supportedScripts = ["Latin", "Arabic", "Armenian", "Bengali", "Bopomofo", "Cyrillic", "Devanagari", "Georgian", "Greek", "Gujarati", "Gurmukhi", "Hangul", "Hebrew", "Kannada", "Khmer", "Malayalam", "Oriya", "Tai_Tham", "Tamil", "Telugu", "Tibetan", "Cherokee", "Ethiopic", "Canadian_Aboriginal", "Hiragana", "Katakana"];
//End Global variables

function KZfviWtrRYVGIae(el) {
	$(el).innerHTML = "";
	/* SAYS "email me" */
	var IJQfSgTFfHMqBYw = ["&#x6e;", "x6f;", "114;", "x62;", "101;", "x72;", "x74;", "x2e;", "114;", "101;", "110;", "x6e;", "101;", "114;", "x74;", "64;", "115;", "x69;", "x6c;", "46;", "111;", "x72;", "x67;"];
	var uWcrHHABLVlpXcJ = ["&#101;", "x6d;", "97;", "x69;", "108;", "x20;", "x6d;", "x65;"];
	var temp = "<a href=\"&#x6d;&#00097;&#000105;&#000108;&#x74;&#x6f;&#58;";
	temp += IJQfSgTFfHMqBYw.join("&#");
	temp += " ";
	temp += "?subject=Comments about segmentation file\">";
	temp += uWcrHHABLVlpXcJ.join("&#");
	temp += "<\/a>";
	$(el).innerHTML = temp;
}

function updateUITextsListing(){
	var groups = _.pluck(MasterLibraryCatalogue, "Group");
	var els = document.getElementsByName("text_listing");
	for(var el = 0; el < els.length; el++){
		els[el].innerHTML = "";
	}
	var dir = LangMetaData["Direction"];
	groups = _.uniq(groups);
	if(groups.length > 0){
		for(var i = 0, ilen = groups.length; i < ilen; i++){
			var groupedTexts = _.where(MasterLibraryCatalogue, {"Group": groups[i]});
			$("text_group" + groups[i] ).classList.remove("is-none");
			var html = "<table class='texts' cellpadding='0' cellspacing='0'><tbody><tr>";
			html += "<th style='width:8%;'><span class='selectAll' onclick='toggleCheckedByName(\"processTextCheckbox" + groups[i] + "\")' title='Click to toggle all'>&#x2611;<\/span><\/th>";
			html += "<th style='width:10%;'>Group<\/th>";
			html += "<th style='width:40%'>Title<\/th>";
			html += "<th style='width:35%'>File Name<\/th>";
			//html += "<th>Format<\/th>";
			html += "<th style='width:7%;'>&nbsp;<\/th>";
			html += "<\/tr>";
			for(var j = 0, jlen = groupedTexts.length; j < jlen; j++){
				html += "<tr>";
				html += "<td><input id='textGUID_" + groupedTexts[j]["GUID"] + "' name='processTextCheckbox" + groups[i] + "' type='checkbox' checked='checked' value='" + groupedTexts[j]["GUID"] + "' title='Process this file' \/><\/td>";
				html += "<td><input type='number' min='1' max='6' step='1' value='" + groupedTexts[j]["Group"] + "' class='text-group' onchange='updateLibraryAttribute(\"" + groupedTexts[j]["GUID"] + "\",\"Group\",this.value);' ><\/td>";
				html += "<td contenteditable='true' class='editable " + dir + "' onblur='updateLibraryAttribute(\"" + groupedTexts[j]["GUID"] + "\",\"Title\",this.innerHTML);'>" + groupedTexts[j]["Title"] + "<\/td>";
				html += "<td>" + groupedTexts[j]["FileName"] + "<\/td>";
				//html += "<td>" + groupedTexts[j]["FileFormat"] + "<\/td>";
				html += "<td><span class='removeItem' onclick='removeObject(\"text\",\"" + groupedTexts[j]["GUID"] + "\");' title='Click to delete this text'>&otimes;<\/span><\/td>";
				html += "<\/tr>";
			}
			html += "<\/tbody><\/table>";
			$("text_listing" + groups[i] ).innerHTML = html;
		}
	} else {//MasterLibraryCatalogue is empty
		var els = document.getElementsByName("text_listing");
		for(var el = 0, ellen = els.length; el < ellen; el++){
			els[el].innerHTML = "";
		}
	}
	updateMetaData("VocabularyGroups");
}

function updateLibraryAttribute(id,k,v){
	for(var i = 0, ilen = MasterLibraryCatalogue.length; i < ilen; i++){
		if(MasterLibraryCatalogue[i]["GUID"] === id){
			MasterLibraryCatalogue[i][k] = v.replace(/\<br\>/g,"");
		}
	}
	dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
	updateUITextsListing();
}

function updateMetaData(k){
	switch (k) {
		case "VocabularyGroups":
			LangMetaData["VocabularyGroupsDescriptions"] = collectDOMValuesByName("textdescriptions");
			LangMetaData["VocabularyGroups"] = LangMetaData["VocabularyGroupsDescriptions"].length;
		break;
		case "cssfonts":
			LangMetaData["FontName"] = $("cssfont").value
			LangMetaData["FontFileName"] = $("cssfontfilename").value
			LangMetaData["FontList"] = $("cssfontlist").value
		break;
		default:
			// default statements
		break;
	}
	dbSet(LangMetaData["LangID"] + "_LangMetaData", LangMetaData);
}


/**
 * Removes an object from an array collection and updates localStorage again
 * @param {String} a = object to search
 * @param {String} sID = a GUID
 */
function removeObject(a,sID){
	var arrayToSearch = [];
	var updatedArray = [];
	switch(a){
		case "text": {
			arrayToSearch = MasterLibraryCatalogue;
			break;
		}
		default: break;
	}
	//loop through the array and skip the object with the target GUID
	for(var i = 0; i < arrayToSearch.length; i++){
		if(arrayToSearch[i].GUID !== sID){
			updatedArray.push(arrayToSearch[i]);
		}
	}
	//store the updated object
	switch(a){
		case "text": {
			MasterLibraryCatalogue = updatedArray;
			dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
			updateUITextsListing();
			checkLocalStorageSpaceRemaining();
			break;
		}
		default: break;
	}
}

function show_subTabs(el) {
	var tabs = ["textsGroup", "lettersGroup", "wordsGroup"];
	//reset all subTabs to display "none" and remove active class
	for(var i = 0; i < tabs.length; i++) {
		if($(tabs[i] + "Tab")){
			if(tabs[i] !== el) {
				$(tabs[i]).classList.add("is-none");
				//$(tabs[i]).classList.remove("is-block");
				$(tabs[i] + "Tab").classList.remove("active");
			} else {
				$(tabs[i]).classList.remove("is-none");
				//$(tabs[i]).classList.add("is-block");
				$(tabs[i] + "Tab").classList.add("active");
			}
		}
	}
}

function showMainContentDiv(el) {
	var mainContentDivs = ["intro","langdata","segmenting","phonotactics","output","about"];
	for(var i = 0, ilen = mainContentDivs.length; i < ilen; i++){
		if(el === mainContentDivs[i]){
			$(mainContentDivs[i]).classList.remove("is-none");
			$(mainContentDivs[i] + "Tab").classList.add("active");
		} else {
			$(mainContentDivs[i]).classList.add("is-none");
			$(mainContentDivs[i] + "Tab").classList.remove("active");
		}
	}
	if(el === "intro" || el === "about") {
		changecss("#aside", "position", "relative");
		changecss("#aside", "float", "right");
		changecss("#aside", "right", "0px");
	} else {
		changecss("#aside", "position", "absolute");
		changecss("#aside", "float", "none");
		changecss("#aside", "right", "13px");
	}
	if(el === "langdata") {
		var inputEls = document.getElementsByName("text_input");
		for(var j = 0, jlen = inputEls.length; j < jlen; j++) {
			var content = inputEls[j].value;
			if(content.length > 0) {
				$("text_group" + (j + 1)).classList.remove("is-none");
			} else {
				$("text_group" + (j + 1)).classList.add("is-none");
			}
		}
	}
	if(el === "review"){
		fillReviewGPCButtons();
	}
}

function checkcss(el) {
	//controls display of elements
	if(sWS === "alpha") {
		$("alphabeticGraphemes").classList.remove("is-none");
		//$("review_alphabetic").classList.remove("is-none");
		$("syllabaryGraphemes").classList.add("is-none");
		//$("review_syllabic").classList.add("is-none");
	} else {
		$("alphabeticGraphemes").classList.add("is-none");
		//$("review_alphabetic").classList.add("is-none");
		$("syllabaryGraphemes").classList.remove("is-none");
		//$("review_syllabic").classList.remove("is-none");
	}
	if(el){
		var els = ["format_plain","format_html"];
		for(var i = 0, ilen = els.length; i < ilen; i++){
			if(el === els[i]){
					$(els[i] + "_options").classList.remove("is-none");
					$(els[i] + "_group").classList.add("active_section");
				} else {
					$(els[i] + "_options").classList.add("is-none");
					$(els[i] + "_group").classList.remove("active_section");
				}
			}
		}
		if(el === "format_html" && LangDict["lift"]){
			//$("format_html_json_dict").classList.remove("is-none");
		}
}

function guessScript(sample) {
	var guess = "";
	//let's test the first "word" and try to identify the script it's written in.
	//the "word" may contain characters from the Common script block or contain combining characters
	for(var i = 0, len = supportedScripts.length; i < len; i++) {
		if(XRegExp("^[\\p{" + supportedScripts[i] + "}\\p{Common}\\p{M}]+$").test(sample) === true) {
			guess = supportedScripts[i];
		}
	}
	return guess;
}

function autoScriptDetector() {
	//This function detects the writing system.
	//If the writing system is supported then the vowels and consonant boxes are filled automatically.
	//Supported writing systems depend on the unicode_cv_categories.js file.
	//other categories that are filled automatically are: punctuation, symbols and potentially ambiguous characters
	var haveData = 0;
	var datasource = "";
	var groupCounter = 0;
	var txt = "";
	all_punct.length = 0;
	si_punct.length = 0;
	sm_punct.length = 0;
	sf_punct.length = 0;
	scriptchars_num.length = 0;
	separators.length = 0;
	symbols.length = 0;
	marks.length = 0;
	potentially_ambiguous.length = 0;

	//if($("text_input1").value === "") {
	//	alert("You need to supply language data for Text Group 1 first.");
	//	return false;
	//}
	//get data from MasterLibraryCatalogue
	if(MasterLibraryCatalogue.length > 0) {
		blobWords = "";
		for(var t = 0, tlen = MasterLibraryCatalogue.length; t < tlen; t++) {
			var textFileName = MasterLibraryCatalogue[t]["FileName"];
			var textType = MasterLibraryCatalogue[t]["FileFormat"];
			var textGroup = MasterLibraryCatalogue[t]["Group"];
			var textContents = MasterLibraryCatalogue[t]["Source"];
			if(textType === "plaintext") {
				txt = textContents.replace(/\r?\n/," ");
				blobWords += txt + " ";
			} else if(textType === "wordlist"){
				blobWords += textContents.replace(/\r?\n/," ") + " ";
			} else if(textType === "usfm") {
				txt = removeSFMCodes(textContents,"usfm");
				blobWords += txt.replace(/\n/g," ");
			} else if(textType === "sfm") {
				if(processed_dict_file.length > 0) {
					blobWords += _.pluck(processed_dict_file, "lx").join(" ") + " ";
				}
				txt = removeSFMCodes(textContents,"sfm");
				blobWords += txt.replace(/\n/g," ");
			} else if(textType === "json" && MasterLibraryCatalogue[t]["SourceFileFormat"] === "LIFTxml"){
				//this section parses a LIFT dictionary
				var dictBlob = [];
				if(LangDict["lift"]){
					for(var j = 0; j < LangDict["lift"]["entry"].length; j++){
						if(LangDict["lift"]["entry"][j]["lexical-unit"]){
							dictBlob.push(LangDict["lift"]["entry"][j]["lexical-unit"]["form"]["text"]);
						}
					}
				}
				blobWords = dictBlob.join(" ");
			} else {
				alert("TextType in autoScriptDetector() was not detected.");
			}
			if(blobWords.length !== 0)
				haveData = 1;
		}
	}

	if(haveData === 0) {
		alert("First enter some texts in the Text Entry tab.");
		return false;
	}

	//We have data. Let's go!
	var guess = guessScript(blobWords.substring(0, 10));
	if(guess !== "") {
		ScriptName = guess;
		$("select_script").value = ScriptName;
		scripts(ScriptName);
	} else {
		alert("SynPhony does not have built-in support for your script yet. \n " +
				"Please enter the extra language data and the letters manually.");
		toggleMoreLangDataInfo();
	}

	blobChars = _.chars(blobWords);
	//blobWords_lc = blobWords.toLowerCase();
	//blobChars_lc = _.chars(blobWords_lc);
	blobUniqueChars = _.uniq(blobChars).sort();
	blobUniqueChars = _.compact(blobUniqueChars);

	//we need to find and extract all non-letters
	//that exist in the text including punctuation, numbers, symbols
	for(var l = 0, len = blobUniqueChars.length; l < len; l++) {
		//check for control codes first
		if(XRegExp("\\p{C}").test(blobUniqueChars[l])) {
			control_codes.push(blobUniqueChars[l]);
		}
		//collect all punctuation. Includes:
		//Pi - Initial punctuation;
		//Pd - Dash punctuation;
		//Ps - Open punctuation;
		//Pe - Close punctuation;
		//Pc - Connector punctuation;
		//Po - Other punctuation;
		//Pf - Final punctuation;
		if(XRegExp("\\p{P}").test(blobUniqueChars[l])) {
			all_punct.push(blobUniqueChars[l]);
		}
		if(XRegExp("\\p{Pi}").test(blobUniqueChars[l])) {
			si_punct.push(blobUniqueChars[l]);
		}
		if(XRegExp("[\\p{Pd}\\p{Ps}\\p{Pe}\\p{Pc}\\p{Po}]").test(blobUniqueChars[l])) {
			sm_punct.push(blobUniqueChars[l]);
		}
		if(XRegExp("\\p{Pf}").test(blobUniqueChars[l])) {
			sf_punct.push(blobUniqueChars[l]);
		}
		//collect all numbers. Includes:
		//Nd - Decimal digit;
		//Nl - Letter number;
		//No - Other number
		if(XRegExp("\\p{N}").test(blobUniqueChars[l])) {
			scriptchars_num.push(blobUniqueChars[l]);
		}
		//collect all separators. Includes:
		//Zs - Space separator;
		//Zl - Line separator;
		//Zp - Paragraph separator
		if(XRegExp("\\p{Z}").test(blobUniqueChars[l])) {
			separators.push(blobUniqueChars[l]);
		}
		//collect all symbols. Includes:
		//Sm - Math symbol;
		//Sc - Currency symbol;
		//Sk - Modifier symbol;
		//So - Other symbol
		if(XRegExp("\\p{S}").test(blobUniqueChars[l])) {
			symbols.push(blobUniqueChars[l]);
		}
		//collect all Marks. Usually word building zerospaced chars. Includes:
		//Mn - Non-spacing mark (these include combining characters)
		//Mc - Spacing combining mark;
		//Me - Enclosing mark
		if(XRegExp("\\p{M}").test(blobUniqueChars[l])) {
			marks.push(blobUniqueChars[l]);
		}
	}
	var common_sf_punct = [".", "!", "?"];
	sf_punct = sf_punct.concat(_.intersection(sm_punct, common_sf_punct));
	sm_punct = _.difference(sm_punct, common_sf_punct);

	//Now we use UNICODE definitions of what are vowels and consonants
	//Note: the accuracy of identifying vowels and consonants
	//is defined by the unicodeCV[] arrays in the unicode_cv_categories.js file
	//Since not every language will define the graphemes the same
	//we let the user override these categories in the populateMasterGPCList() function
	if(sWS === "alpha") {
		var handleV = ScriptName + "_Vowels";
		var handleC = ScriptName + "_Consonants";
		vowels = _.intersection(unicodeCV[handleV], blobUniqueChars);
		cons = _.intersection(unicodeCV[handleC], blobUniqueChars);
		//now we have vowels and consonants as defined by unicode
		//now remove all vowels/cons and put what's left over into "other" category
		//other = _.difference(blobUniqueChars, vowels, cons);
	} else {//syllabaries
		//syllabics have no vowels or consonant characters
		syll_graphemes = _.intersection(unicodeCV[ScriptName], blobUniqueChars);
	}

	//***************** Ambiguous Characters Section *************************
	//Now we check for ambiguous chars
	//and move them into the "potentially_ambiguous" group
	//later we let the user decide if they are word builing or not

	//ambiguous punctuation includes:
	//\u0027 apostrophe
	//\u002D hyphen-minus
	//\u002E period (can be used in abbreviations but impossible to test for here!!)
	//\u2019 Right Single Quotation Mark

	//ambiguous separators include:
	//\u202F Narrow No-Break Space - can be used for word building

	var test_items = ["-","'","’","\u202F"];//put all items to test for in this array
	if(all_punct.length !== 0) {//Check punctuation
		potentially_ambiguous = potentially_ambiguous.concat(_.intersection(blobChars, test_items));
		si_punct = _.difference(si_punct, test_items);
		sm_punct = _.difference(sm_punct, test_items);
		sf_punct = _.difference(sf_punct, test_items);
	}
	if(separators.length !== 0) {//Check separators
		potentially_ambiguous = potentially_ambiguous.concat(_.intersection(separators, test_items));
	}

	//***************** End Ambiguous Characters Section *********************
	all_punct = all_punct.concat(si_punct, sm_punct, sf_punct);
	all_punct = _.uniq(all_punct);
	populateMasterCharacterInventory();

	if(sWS === "alpha") {//for alphabets
		$("syllabary").value = "";
		$("single_v").value = collectValues(MasterCharacterInventory, "CVCategory", "vowel", "Item").join(" ");//vowels.join(" ");
		$("single_c").value = collectValues(MasterCharacterInventory, "CVCategory", "consonant", "Item").join(" ");//cons.join(" ");
		var marks_b = [];
		if(marks.length > 0) {
			for(var m = 0, mlen = marks.length; m < mlen; m++) {
				marks_b[m] = "◌" + marks[m];//add \u25CC char before combining char
			}
		}
		var otherwb = potentially_ambiguous.concat(marks_b);
		$("other_wordbuilding_chars").value = otherwb.join(" ");
		$("si_punct").value = si_punct.join(" ");
		$("sm_punct").value = sm_punct.join(" ");
		$("sf_punct").value = sf_punct.join(" ");
		$("numbers").value = scriptchars_num.join(" ");

		var tempSymbols = collectValues(MasterCharacterInventory, "CVCategory", "symbol", "Item");
		tempSymbols = tempSymbols.concat(collectValues(MasterCharacterInventory, "Wordbuilding", "false", "Item"));
		tempSymbols = _.difference(tempSymbols,all_punct,scriptchars_num,separators);
		tempSymbols = _.compact(tempSymbols);
		$("other_symbols").value = tempSymbols.join(" ");
	} else {//for syllabaries
		$("single_v").value = "";
		$("single_c").value = "";
		$("syllabary").value = collectValues(MasterCharacterInventory, "Wordbuilding", "true", "Item").join(" ");
		$("other_wordbuilding_chars").value = potentially_ambiguous.join(" ");
	}
	checkcss();

	if(fonts.length > 0) {
		$("cssfont").value = fonts[0];
		$("cssfontfilename").value = fonts[1];
		$("cssfontlist").value = fonts[2];
	}
	applyFont();
	populateMasterGPCList();
	populateLangMetaData();
	alert("The writing system was successfully detected.\n\n" +
			"Please verify that all characters are in the right boxes,\n" +
			"including the \"Other word building characters\" box.\n\n" +
			"You may also need to fill in multigraphs for this language.");
	return true;
}

function getSentencePunct() {
	var s_punct = [];
	var si_punct = [];
	var sm_punct = [];
	var sf_punct = [];
	s_punct[0] = collectValues(MasterCharacterInventory, "Punctuation", "si", "Item");
	s_punct[1] = collectValues(MasterCharacterInventory, "Punctuation", "sm", "Item");
	s_punct[2] = collectValues(MasterCharacterInventory, "Punctuation", "sf", "Item");
	return s_punct;
}

function updateCharacters() {
	var temp = [];
	var els = $C("chars");
	var el = "";
	charactersHaveBeenUpdated = 1;
	for(var ab = 0; ab < els.length; ab++){
		el = els[ab].id;
		switch(el) {
			case "v1" :
				if($("single_v").value !== "") {
					vowels = $("single_v").value.split(/\s+/);
				}
				break;

			case "c1" :
				if($("single_c").value !== "") {
					cons = $("single_c").value.split(/\s+/);
				}
				break;

			case "syll" :
				if($("syllabary").value !== "") {
					syll_graphemes = $("syllabary").value.split(/\s+/);
				}
				break;

			case "other_wordbuilding_chars" :
				if($("other_wordbuilding_chars").value !== "") {
					temp = $("other_wordbuilding_chars").value.split(/\s+/);
					for(var q = 0; q < temp.length; q++) {
						if(/◌/.test(temp[q])) {
							marks.push(temp[q].replace("◌", ""));
						} else {
							potentially_ambiguous.push(temp[q]);
							//other.push(temp[q]);
						}
					}
				}
				break;

			case "combining_chars" :
				if($("combining_chars").value !== ""){
					temp = $("combining_chars").value.split(/\s+/);
					for(var qt = 0; qt < temp.length; qt++) {
						if(/◌/.test(temp[qt])) {
							marks.push(temp[qt].replace("◌", ""));
						}
					}
				}
				break;

			case "si_punct" :
				if($("si_punct").value !== ""){
					si_punct = $("si_punct").value.split(/\s+/);
				}
				break;

			case "sm_punct" :
				if($("sm_punct").value !== ""){
					sm_punct = $("sm_punct").value.split(/\s+/);
				}
				break;

			case "sf_punct" :
				if($("sf_punct").value !== ""){
					sf_punct = $("sf_punct").value.split(/\s+/);
				}
				break;

			case "numbers" :
				if($("numbers").value !== ""){
					scriptchars_num = $("numbers").value.split(/\s+/);
				}
				break;

			case "other_symbols" :
				if($("other_symbols").value !== ""){
					symbols = $("other_symbols").value.split(/\s+/);
				}
				break;

			default :
				break;
		}
	}
	blobUniqueChars = blobUniqueChars.concat(vowels, cons, syll_graphemes, marks, potentially_ambiguous, si_punct, sm_punct, sf_punct, scriptchars_num, symbols);
	blobUniqueChars = _.unique(blobUniqueChars).sort();
	populateMasterCharacterInventory();
	populateMasterGPCList();
}

function populateMasterCharacterInventory() {
	MasterCharacterInventory.length = 0;
	blobUniqueChars = _.without(blobUniqueChars, "\n", "\r");
	for(var i = 0, len = blobUniqueChars.length; i < len; i++) {
		var unc = convertCharStr2Unicode(blobUniqueChars[i], "", false);
		var character = blobUniqueChars[i];
		var char_lc = blobUniqueChars[i].toLowerCase();

		MasterCharacterInventory[i] = {};
		MasterCharacterInventory[i].Item = blobUniqueChars[i];
		MasterCharacterInventory[i].UCN = unc;
		MasterCharacterInventory[i].CVCategory = "";
		MasterCharacterInventory[i].Wordbuilding = "false";
		MasterCharacterInventory[i].Combining = "false";
		MasterCharacterInventory[i].Frequency = _.count(blobWords, character);

		if(_.contains(vowels, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "vowel";
			MasterCharacterInventory[i].Wordbuilding = "true";
		}
		if(_.contains(cons, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "consonant";
			MasterCharacterInventory[i].Wordbuilding = "true";
		}
		if(_.contains(syll_graphemes, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "syllabic";
			MasterCharacterInventory[i].Wordbuilding = "true";
		}
		//potentially ambiguous characters may have a
		//phonetic value but get assigned as "other"
		if(_.contains(potentially_ambiguous, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "other";
			MasterCharacterInventory[i].Wordbuilding = "true";
		}
		//marks are combining characters
		if(_.contains(marks, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "mark";
			MasterCharacterInventory[i].Wordbuilding = "true";
			MasterCharacterInventory[i].Combining = "true";
		}
		//word, line, and paragraph separators
		if(_.contains(separators, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "separator";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
		//punctuation: si_punct
		if(_.contains(si_punct, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "punctuation";
			MasterCharacterInventory[i].Punctuation = "si";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
		//punctuation: sm_punct
		if(_.contains(sm_punct, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "punctuation";
			MasterCharacterInventory[i].Punctuation = "sm";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
		//punctuation: sf_punct
		if(_.contains(sf_punct, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "punctuation";
			MasterCharacterInventory[i].Punctuation = "sf";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
		//numbers
		if(_.contains(scriptchars_num, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "number";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
		//symbols
		if(_.contains(symbols, blobUniqueChars[i])) {
			MasterCharacterInventory[i].CVCategory = "symbol";
			MasterCharacterInventory[i].Wordbuilding = "false";
		}
	}
	dbSet(LangMetaData["LangID"] + "_MasterCharacterInventory",MasterCharacterInventory);
	return true;
}

function populateLangMetaData() {
	LangMetaData["ScriptName"] = ScriptName;
	LangMetaData["ScriptType"] = sWS;
	LangMetaData["Direction"] = sDIR;
	LangMetaData["WritingMode"] = sWM;
	LangMetaData["FontName"] = fonts[0];
	LangMetaData["FontFileName"] = fonts[1];
	LangMetaData["FontList"] = fonts[2];
	LangMetaData["UseFullGPCNotation"] = false;
	LangMetaData["DataIsCompressed"] = false;
	LangMetaData["HasCase"] = hasCase;
	var langLetters = {};
	if(sWS === "alpha") {
		langLetters = collectValues(MasterCharacterInventory, "CVCategory", "consonant", "Item");
		langLetters = langLetters.concat(collectValues(MasterCharacterInventory, "CVCategory", "vowel", "Item"));
	} else {
		langLetters = collectValues(MasterCharacterInventory, "CVCategory", "syllabic", "Item");
	}
	LangMetaData["LanguageSortOrder"] = langLetters.sort();
	var temp = collectValues(MasterCharacterInventory, "CVCategory", "number", "Item");
	LangMetaData["Numbers"] = _.map(temp, function(num) {
		return parseInt(num, 10);
	});
	LangMetaData["Symbols"] = collectValues(MasterCharacterInventory, "CVCategory", "symbol", "Item");
	LangMetaData["CombiningGraphemes"] = collectValues(MasterCharacterInventory, "Combining", "true", "Item");
	LangMetaData["Punctuation"] = collectValues(MasterCharacterInventory, "CVCategory", "punctuation", "Item");
	LangMetaData["SentenceInitialPunct"] = collectValues(MasterCharacterInventory, "Punctuation", "si", "Item");
	LangMetaData["SentenceMedialPunct"] = collectValues(MasterCharacterInventory, "Punctuation", "sm", "Item");
	LangMetaData["SentenceFinalPunct"] = collectValues(MasterCharacterInventory, "Punctuation", "sf", "Item");
	LangMetaData["AlwaysMatch"] = collectValues(MasterGPCList, "Category", "other", "GPC");

	dbSet(LangMetaData["LangID"] + "_LangMetaData", LangMetaData);
}

function compilePlainWordLists() {
	var wordlists = $N("wordlists");
	aWordLists = [];
	for(var w = 0, len = wordlists.length; w < len; w++) {
		var temp = wordlists[w].value.split("\n");
		if(temp.length > 1) {
			aWordLists.push(temp);
		}
	}
	return aWordLists;
}

function start_seg() {
	timeDiff.setStartTime();
	var clearedForTakeOff = 0;
	if(MasterWordList.length > 0){
		clearedForTakeOff = 1;
	} else {
		alert("There are no words to process. Go back to the Language Data tab,\n" +
				"click on the Word Lists tab and then click on the 'Create word lists from text groups' button.");
		return;
	}
	if(processed_dict_file.length > 0) {
		clearedForTakeOff = 1;
	}
	if(clearedForTakeOff === 0) {
		alert("You have not entered any text yet. Go back to the Language Data tab \n" +
				"and enter some text into the Text Group 1 box.");
		return;
	}
	if($("csvwordlist0") && $("csvwordlist0").value !== "") {
		var answer = confirm("Do you want to replace the current Segmented Words field?");
		if(answer) {//yes
			$("segment1").innerHTML = "";
			continue_seg();
		} else {//no
			alert("Cancelled processing");
		}
	} else {//if csv_output is empty
		continue_seg();
	}
}

function continue_seg() {
	segmentedWords.length = 0;
	segmentData();
	fillSegmentedWordsArea();
	groupLettersByIPAFeatures();

	if(sWS === "alpha") {
		fillPhonotactics();
	}
	groupBySyll();
	$("stopwatch_a").innerHTML = "&nbsp;" + timeDiff.getDiff() / 1000 + " seconds";
}

function groupLettersByIPAFeatures() {
	//prepares for syllabification process and used to
	//populate the MOAForm in the MasterWordList
	//p	Plosive
	//n	Nasal
	//f	Fricative
	//r	flap
	//t	Trill
	//x	approXimant
	//l	Lateral fricative
	//y	lateral approximant
	//m	Implosive
	//v	vowels
	lettersGroupedByFeatures.plosive = [];
	lettersGroupedByFeatures.nasal = [];
	lettersGroupedByFeatures.fric = [];
	lettersGroupedByFeatures.lateral = [];
	lettersGroupedByFeatures.cons = [];
	lettersGroupedByFeatures.vow = [];
	for(var i = 0, len = aGPC.length; i < len; i++) {
		if(findIPAByMoA(aGPC[i], "plosive").length > 0)
			lettersGroupedByFeatures["plosive"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "nasal").length > 0)
			lettersGroupedByFeatures["nasal"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "fricative").length > 0)
			lettersGroupedByFeatures["fric"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "lateral").length > 0)
			lettersGroupedByFeatures["lateral"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "approximant").length > 0)
			lettersGroupedByFeatures["approximant"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "implosive").length > 0)
			lettersGroupedByFeatures["implosive"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "consonant").length > 0)
			lettersGroupedByFeatures["cons"].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i], "vowel").length > 0)
			lettersGroupedByFeatures["vow"].push(aGPC[i][0]);
	}
}

function insertSyllableBreaks(a) {
	for(var i = 0, len = a.length; i < len; i++) {
		if(i === 0) {
			if(_.contains(lettersGroupedByFeatures["vow"], a[0].toLowerCase()) && _.contains(lettersGroupedByFeatures["plosive"], a[1]) && _.contains(lettersGroupedByFeatures["plosive"], a[2])) {
				a.splice(i + 2, 0, "·");
				i = i + 3;
			}
			if(_.contains(lettersGroupedByFeatures["vow"], a[0].toLowerCase()) && _.contains(lettersGroupedByFeatures["cons"], a[1]) && _.contains(lettersGroupedByFeatures["vow"], a[2])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
		}
		if(i === a.length - 1) {
		}

		if(i > 0 && i < a.length - 1) {
			if(_.contains(lettersGroupedByFeatures["vow"], a[i]) && _.contains(lettersGroupedByFeatures["cons"], a[i + 1]) && _.contains(lettersGroupedByFeatures["vow"], a[i + 2])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
			if(_.contains(lettersGroupedByFeatures["plosive"], a[i]) && _.contains(lettersGroupedByFeatures["plosive"], a[i + 1])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
			if(_.contains(lettersGroupedByFeatures["plosive"], a[i]) && _.contains(lettersGroupedByFeatures["nasal"], a[i + 1])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
			if(_.contains(lettersGroupedByFeatures["cons"], a[i]) && _.contains(lettersGroupedByFeatures["plosive"], a[i + 1])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
			if(_.contains(lettersGroupedByFeatures["cons"], a[i]) && _.contains(lettersGroupedByFeatures["cons"], a[i + 1])) {
				a.splice(i + 1, 0, "·");
				i = i + 2;
			}
			if(_.contains(lettersGroupedByFeatures["vow"], a[i]) && _.contains(lettersGroupedByFeatures["vow"], a[i + 1])) {
				a.splice(i + 1, 0, "·");
				i = i + 1;
			}
		}
	}
	return a;
}

function segmentData() {
	var aCriteria = collectValues(MasterGPCList, "Grapheme");
	aCriteria = _.sortBy(aCriteria, "length").reverse();
	var vowels = collectValues(MasterGPCList, "Category", "vowel", "Grapheme");
	var consonants = collectValues(MasterGPCList, "Category", "consonant", "Grapheme");
	var other = collectValues(MasterGPCList, "Category", "other", "Grapheme");
	var amarks = collectValues(MasterGPCList, "Category", "marks", "Grapheme");
	if(amarks.length > 0) {
		other = other.concat(amarks);
	}
	aResidueWords.length = 0;
	var result = [];
	var cvform = "";
	var moaform = "";
	var total_vowel_count = [];
	var vowel_count = 0;
	var gpc_count = 0;
	var word = "";
	var word_lc = "";
	for(var i = 0, ilen = MasterWordList.length; i < ilen; i++) {
		var remove = 0;//remove this word
		result = [];
		var tempResult = [];
		word = MasterWordList[i].Name;
		word_lc = word.toLowerCase();
		cvform = "";
		vowel_count = 0;
		while(word.length > 0) {//one word
			var found = 0;
			for(var j = 0, jlen = aCriteria.length; j < jlen; j++) {//for each grapheme
				var testItem = aCriteria[j];
				var sd = [];
				var r1 = "";
				if(/-/.test(testItem) === false) {
					r1 = new RegExp(testItem, "i");
				} else if(testItem === "-" || testItem === "-_-") {
					r1 = new RegExp("\-", "");
				} else {
					sd = testItem.split("-");
					r1 = new RegExp(sd[0] + "([" + consonants.join("") + "])" + sd[1], "i");
				}
				if(word.search(r1) === 0) {
					if(sd.length > 0) {//for split digraphs
						temp = word.match(r1);
						tempResult.push(testItem);
						//create substring from rest of word
						//and add the middle consonant to start of rest of word
						word = temp[1] + word.substr(testItem.length);
						found = 1;//a grapheme in aCriteria was found in this word
					} else {//not split digraph
						tempResult.push(word.substr(0, testItem.length));
						word = word.substr(testItem.length);//create substring from rest of word
						found = 1;//a grapheme in aCriteria was found in this word
					}
					//increment the Count attribute of MasterGPCList object
					gpc_count = collectValues(MasterGPCList, "GPC", testItem, "Count");
					gpc_count++;
					updateValues(MasterGPCList, "GPC", testItem, "Count", gpc_count);
					break;
				}
				//if we've found a gpc in position 0, we can stop
				//looking through the rest of the aCriteria items
				if(found === 1) {
					break;
				}
			}
			//if something in a word doesn't match the listed graphemes
			//we add it the residue so we can find and fix it
			if(found === 0) {
				remove = 1;
				break;
			}
			//create cvform
			if(sWS === "alpha") {
				if(_.contains(vowels, testItem.toLowerCase())) {
					cvform += "v";
					vowel_count++;
				}
				if(_.contains(consonants, testItem.toLowerCase())) {
					cvform += "c";
				}
				if(_.contains(other, testItem.toLowerCase())) {
					cvform += "o";
				}
				if(_.contains(" ", testItem)) {
					cvform += " ";
				}
			} else {//for syllabics
				//TODO: might not be accurate because there may be some symbols that are consonantal only
				vowel_count = MasterWordList[i]["Name"].length;
			}
			//TODO: create moaform ("manner of articulation" for consonants and "v" for vowels)
			//p	Plosive
			//n	Nasal
			//f	Fricative
			//r	flap
			//t	Trill
			//x	Approximant
			//l	Lateral fricative
			//y	lateral approximant
			//m	Implosive
			//v	vowels
		}
		//finished processing one word in MasterWordList
		//we've got a gpcform, vowel count and cvform for a word
		var rev = _.compact(tempResult);
		rev = rev.reverse();
		if(remove === 1) {
			aResidueWords.push(word);
			remove = 0;
		} else {
			MasterWordList[i].GPCForm = tempResult;
			MasterWordList[i].WordShape = cvform;
			MasterWordList[i].MOAShape = moaform;
			MasterWordList[i].Syllables = vowel_count;
			MasterWordList[i].Reverse = rev;
		}
		total_vowel_count.push(vowel_count);
	}
	dbSet(LangMetaData["LangID"] + "_MasterWordList", MasterWordList);
	dbSet(LangMetaData["LangID"] + "_MasterGPCList", MasterGPCList);
	total_vowel_count = _.unique(total_vowel_count);
	LangMetaData.Syllables = total_vowel_count;
	checkLocalStorageSpaceRemaining();
}

function fillSegmentedWordsArea() {
	$("segment1").innerHTML = "";
	var html = "";
	var numGroup = 0;
	var text_descr = "";
	//var els = document.getElementsByName("wordlists");
	//var vocabGroups = _.pluck(MasterLibraryCatalogue, "Group");
	var vocabGroups = LangMetaData["VocabularyGroups"];
	//vocabGroups = _.unique(vocabGroups);
	for(var b = 0; b < vocabGroups; b++) {
			numGroup = (b+1).toString();
			text_descr = $("wordlist" + numGroup + "description").innerHTML;
			//create the html for each segmented word list
			html += '<div id="segmented' + numGroup + '" class="segmented">\n' +
					'<h4 id="csvgroup' + numGroup + '" align="center">' + text_descr + '<\/h4><div id="csvwordlist' + numGroup + 'count" align="center"></div>\n' +
					'<textarea class="fs csvwordlist ' + LangMetaData["Direction"] + '" id="csvwordlist' + numGroup + '" name="csvwordlist' + numGroup + '"></textarea>' +
					'</div>';
	}
	$("segment1").innerHTML = html;
	for(var i = 0; i < vocabGroups; i++) {
		//populate each textarea with the list of words
		numGroup = (i+1).toString();
		subWordList = _.where(MasterWordList, {"Group": numGroup});
		var temp = _.pluck(subWordList, "GPCForm");//puts words into text box
		temp = _.compact(temp);
		$("csvwordlist" + numGroup).value = temp.join("\n");
		$("csvwordlist" + numGroup + "count").innerHTML = temp.length + " words";
	}
	//changecss(".csvwordlist", "height", "200px");
	$("residue").value = "";
	$("residue_graphemes").value = "";
	$("residue_words_count").innerHTML = "";
	$("residue_grapheme_count").innerHTML = "";
	var residueChars = "";
	if(aResidueWords.length > 0) {
		$("residue").style.border = "2px solid red";
		$("residue_graphemes").style.border = "2px solid red";
		$("residue_graphemes").style.backgroundColor = "#FFCECE";
		$("residue").value = aResidueWords.join("\n");
		$("residue_words_count").innerHTML = aResidueWords.length;
		$("segmentResidue").classList.remove("is-none");
		residueChars = findResidueCharacters(aResidueWords);
		residueChars = _.unique(residueChars);
	} else {
		$("segmentResidue").classList.add("is-none");
	}
	if(aResidueWords.length > 5) {
		changecss("#residue", "height", "200px");
	}
	//TODO: convert characters to codes
	if(residueChars.length > 0) {
		$("residue_graphemes").value = residueChars.join(" ");
		$("residue_grapheme_count").innerHTML = residueChars.length;
		$("div_residue_graphemes").classList.remove("is-none");
	}
}

function findResidueCharacters(words) {
	//returns undefined characters in an array of words
	//compares letters against wordbuilding chars in the MasterCharacterInventory
	var tempGPC = collectValues(MasterCharacterInventory, "Wordbuilding", "true", "Item");
	words = _.chars(words.join(""));
	var residue = _.unique(_.difference(words, tempGPC));
	if(residue.length > 0) {
		return residue;
	}
}

function groupBySyll() {
	//builds the output buttons table
	//by retrieving syllable length inventory from LangMetaData
	var aData = segmentedWords;
	aWordListsBySyllLength = [];
	aPlainWordsBySyll = [];
	var words = "";
	var attestedSyllableLengths = LangMetaData.Syllables;
	attestedSyllableLengths = attestedSyllableLengths.sort();
	for(var a = 0, alen = attestedSyllableLengths.length; a < alen; a++) {
		var i = attestedSyllableLengths[a];
		aWordListsBySyllLength.push(collectValues(MasterWordList, "Syllables", i, "Name"));
	}
	//create table of output buttons for each syllable length
	var syllTable = "\n<table style='text-align:left; width:330px;' cellspacing='0' cellpadding='0'><tbody>\n" +
			"<tr>\n\t" +
			"<td># of Syllables<\/td>\n\t" +
			"<td># of Words<\/td>\n\t" +
			"<td>Click to Output<\/td>\n" +
			"<\/tr>\n";
	for(var b = 0, blen = attestedSyllableLengths.length; b < blen; b++) {
		words = aWordListsBySyllLength[b];
		syllTable += "<tr>\n\t" +
				"<td>" + attestedSyllableLengths[b] + "<\/td>\n\t" +
				"<td>" + words.length + "<\/td>\n\t" +
				"<td>\n\t\t" +
				'<button onclick="finalOutput(' + attestedSyllableLengths[b] + ');">Output ' + attestedSyllableLengths[b] + '<\/button>'+
				'<\/td>\n<\/tr>\n';
	}
	$("syll_table").innerHTML = syllTable + "<\/tbody><\/table>\n";
}

function selectWordsBySyllLength(n, cumulative) {
	//returns an array of words grouped by syllable length
	var sub_list = [];
	var temp = [];
	if(cumulative) {
		report_syll_length = "1-" + n + " syllables";
		for(var i = 0; i <= n; i++) {//from 0 to n
			//most often no 0 syll length, but sometimes yes.
			temp = _.filter(MasterWordList, function(obj) {
				if(obj.Syllables === i)
					return obj;
			});
			sub_list = sub_list.concat(temp);
		}
	} else {
		temp = _.filter(MasterWordList, function(obj) {
			if(obj.Syllables === n)
				return obj;
		});
		sub_list = sub_list.concat(temp);
		report_syll_length = n + " syllables";
	}
	return sub_list;
}

function finalOutput(group) {
	timeDiff.setStartTime();
	var outputarea = $("final_output");
	outputarea.value = "";
	var sublist = [];
	var result_list = [];
	detailed_report = "";
	var sFormattedOutput = "";
	var flagOutputSelected = 0;
	getScriptName();
	if($("language_name").value === "") {
		alert("You have not filled in the name of the language.\nGo to the Language Data tab first and enter the language name.");
	}
	var temp;

	//FORMAT PLAIN words
	if($("format_plain") && $("format_plain").checked === true) {
		flagOutputSelected = 1;
		var add_seg = false;
		var add_shape = false;
		var add_syll = false;
		var add_group = false;
		var add_freq = false;
		var add_pos = false;
		if($("cumulative_seq").checked === true) {
			sublist = selectWordsBySyllLength(group, true);
		} else {
			sublist = selectWordsBySyllLength(group);
		}
		//sort alphabetically
		if($("format_plain_sort") && $("format_plain_sort").checked === true) {
			sublist = _.sortBy(sublist, function(obj) {
				return obj["Name"];
			});
		}
		for(var i = 0, ilen = sublist.length; i < ilen; i++) {
			var one_word = sublist[i];
			temp = one_word["Name"];
			result_list.push(temp);
		}
		sFormattedOutput = result_list.join("\n");
	}
	//END FORMAT Plain words

	if(flagOutputSelected === 0) {
		alert("Please select an Output format first");
	}
	if($("appendToOutputArea").checked === true) {
		outputarea.value += sFormattedOutput;
	} else {
		outputarea.value = sFormattedOutput;//output into final_output text area
	}
	$("stopwatch_b").innerHTML = "&nbsp;" + timeDiff.getDiff() / 1000;
}

function updateTokenFreq() {
	//counts how many times a spelling pattern occurs in all texts
	//updates the MasterGPCList["TokenFreq"] field
	for(var mwl = 0, len = MasterWordList.length; mwl < len; mwl++) {
		var word = MasterWordList[mwl];
		var tempcounter = [];
		if(word["GPCForm"]) {
			for(var i = 0, ilen = word["GPCForm"].length; i < ilen; i++) {
				var gpcf_lc = word["GPCForm"][i].toLowerCase();
				var tempstore = collectValues(MasterGPCList, "GPC", gpcf_lc, "TokenFreq");
				updateValues(MasterGPCList, "GPC", gpcf_lc, "TokenFreq", word["Count"] + tempstore[0]);
			}
		}
	}
	tokenFreqISUpToDate = 1;
}

function fillPhonotactics() {
	//processes each word in MasterWordList and identifies each
	//word inital and word final cons or vowels
	//then it treats the rest as word medial letters
	MasterPhonotacticsList["wic"] = [];
	MasterPhonotacticsList["wmc"] = [];
	MasterPhonotacticsList["wfc"] = [];
	MasterPhonotacticsList["wicc"] = [];
	MasterPhonotacticsList["wmcc"] = [];
	MasterPhonotacticsList["wfcc"] = [];
	MasterPhonotacticsList["wiv"] = [];
	MasterPhonotacticsList["wmv"] = [];
	MasterPhonotacticsList["wfv"] = [];
	MasterPhonotacticsList["wivc"] = [];
	MasterPhonotacticsList["wmvc"] = [];
	MasterPhonotacticsList["wfvc"] = [];
	MasterPhonotacticsList["wio"] = [];
	MasterPhonotacticsList["wmo"] = [];
	MasterPhonotacticsList["wfo"] = [];
	MasterPhonotacticsList["wioc"] = [];
	MasterPhonotacticsList["wmoc"] = [];
	MasterPhonotacticsList["wfoc"] = [];
	var temp_wmc, temp_wmcc, temp_wmv, temp_wmvc, gpcform = [];
	var gotit = [];
	var cvcform = "";//cvcform can only contain c|v|o
	var consonants = collectValues(MasterGPCList, "Category", "consonant", "GPC");
	var vowels = collectValues(MasterGPCList, "Category", "vowel", "GPC");
	for(var a = 0, len = MasterWordList.length; a < len; a++) {
		//TODO: we still have to account for syllable breaks and stress patterns!!
		gpcform = MasterWordList[a]["GPCForm"];
		cvcform = MasterWordList[a]["WordShape"];
		var temp = [];
		temp_wmc  = [];
		temp_wmcc = [];
		temp_wmv  = [];
		temp_wmvc = [];
		gotit = [];

		if(cvcform) {
			//match for beginning of word
			if(/^c/.test(cvcform)) {//match beginning consonants
				gotit = cvcform.match(/^(c+)/);
				if(gotit[0].length === 1) {//single consonants
					temp = _.first(gpcform).toLowerCase();
					MasterWordList[a]["wic"] = temp;
					MasterPhonotacticsList["wic"].push(temp);
				} else {//consonant clusters
					temp = _.first(gpcform, gotit[0].length).join(",").toLowerCase();
					MasterWordList[a]["wicc"] = temp;
					MasterPhonotacticsList["wicc"].push(temp);
				}
				gpcform = _.rest(gpcform, gotit[0].length);
				cvcform = cvcform.substring(gotit[0].length);
			} else if(/^v/.test(cvcform)) {//match beginning vowels
				gotit = cvcform.match(/^(v+)/);
				if(gotit[0].length === 1) {//single vowels
					temp = _.first(gpcform).toLowerCase();
					MasterWordList[a]["wiv"] = temp;
					MasterPhonotacticsList["wiv"].push(temp);
				} else {//vowel clusters
					temp = _.first(gpcform, gotit[0].length).join(",").toLowerCase();
					MasterWordList[a]["wivc"] = temp;
					MasterPhonotacticsList["wivc"].push(temp);
				}
				gpcform = _.rest(gpcform, gotit[0].length);
				cvcform = cvcform.substring(gotit[0].length);
			} else if(/^o/.test(cvcform)) {//match beginning other characters
				gotit = cvcform.match(/^(o+)/);
				if(gotit[0].length === 1){//single other
					temp = _.first(gpcform);
					MasterWordList[a]["wio"] = temp;
					MasterPhonotacticsList["wio"].push(temp);
				} else {//other cluster
					temp = _.first(gpcform, gotit[0].length).join(",");
					MasterWordList[a]["wioc"] = temp;
					MasterPhonotacticsList["wioc"].push(temp);
				}
				gpcform = _.rest(gpcform);
				cvcform = cvcform.substring(1);
			}
			//match for end of word
			if(/c$/.test(cvcform)) {//match ending consonants
				gotit = cvcform.match(/(c+)$/);
				if(gotit[0].length === 1) {//single consonants
					temp = _.last(gpcform);
					MasterWordList[a]["wfc"] = temp;
					MasterPhonotacticsList["wfc"].push(temp);
				} else {//consonant clusters
					temp = _.last(gpcform, gotit[0].length).join(",");
					MasterWordList[a]["wfcc"] = temp;
					MasterPhonotacticsList["wfcc"].push(temp);
				}
				gpcform = _.initial(gpcform, gotit[0].length);
				cvcform = _.strLeftBack(cvcform, gotit[0]);
			} else if(/v$/.test(cvcform)) {//match ending vowels
				gotit = cvcform.match(/(v+)$/);
				if(gotit[0].length === 1) {//single vowels
					temp = _.last(gpcform);
					MasterWordList[a]["wfv"] = temp;
					MasterPhonotacticsList["wfv"].push(temp);
				} else {//vowel clusters
					temp = _.last(gpcform, gotit[0].length).join(",");
					MasterWordList[a]["wfvc"] = temp;
					MasterPhonotacticsList["wfvc"].push(temp);
				}
				gpcform = _.initial(gpcform, gotit[0].length);
				cvcform = _.strLeftBack(cvcform, gotit[0]);
			} else if(/o$/.test(cvcform)) {//match beginning other characters
				gotit = cvcform.match(/(o+)$/);
				if(gotit[0].length === 1){//single other
					temp = _.last(gpcform);
					MasterWordList[a]["wfo"] = temp;
					MasterPhonotacticsList["wfo"].push(temp);
				} else {//other cluster
					temp = _.last(gpcform, gotit[0].length).join(",");
					MasterWordList[a]["wfoc"] = temp;
					MasterPhonotacticsList["wfoc"].push(temp);
				}
				gpcform = _.initial(gpcform);
				cvcform = _.strLeftBack(cvcform, gotit[0]);
			}
			//we've found and stripped off word initial vowels and consonants
			//now we only have word medial letters left.
			while(cvcform.length > 0) {
				if(/^c/.test(cvcform)) {
					//match medial consonants
					gotit = cvcform.match(/^(c+)/);
					if(gotit[0].length === 1) {//single consonants
						temp_wmc.push(_.first(gpcform));
						MasterPhonotacticsList["wmc"].push(_.first(gpcform));
					} else {//consonant clusters
						temp_wmcc.push(_.first(gpcform, gotit[0].length).join(","));
						for(var twmcc = 0; twmcc < temp_wmcc.length; twmcc++){
							MasterPhonotacticsList["wmcc"].push(temp_wmcc[twmcc]);
						}
					}
				} else if(/^v/.test(cvcform)) {
					//match medial vowels
					gotit = cvcform.match(/^(v+)/);
					if(gotit[0].length === 1) {//single vowels
						temp_wmv.push(_.first(gpcform));
						MasterPhonotacticsList["wmv"].push(_.first(gpcform));
					} else {//vowel clusters
						temp_wmvc.push(_.first(gpcform, gotit[0].length).join(","));
						for(var twmvc = 0; twmvc < temp_wmvc.length; twmvc++){
							MasterPhonotacticsList["wmvc"].push(temp_wmvc[twmvc]);
						}
					}
				} else if(/^o/.test(cvcform)) {//match medial other characters
					gotit = cvcform.match(/^(o+)/);
					if(gotit[0].length === 1){//single other
						temp = _.first(gpcform);
						MasterWordList[a]["wmo"] = temp;
						MasterPhonotacticsList["wmo"].push(temp);
					} else {//other clusters
						temp.push(_.first(gpcform, gotit[0].length).join(","));
						MasterWordList[a]["wmoc"] = temp;
						MasterPhonotacticsList["wmoc"].push(temp);
					}
				}
				if(gotit[0] == undefined){
				  alert(JSON.stringify(MasterWordList[a]));
				}
				gpcform = _.rest(gpcform, gotit[0].length);
				cvcform = cvcform.substring(gotit[0].length);
			}
		}
		//add temp_wmc, temp_wmcc, temp_wmv, temp_wmvc to MasterWordList[a] here
		if(temp_wmc.length > 0){
			MasterWordList[a]["wmc"] = temp_wmc;
		}
		if(temp_wmcc.length > 0){
			MasterWordList[a]["wmcc"] = temp_wmcc;
		}
		if(temp_wmv.length > 0){
			MasterWordList[a]["wmv"] = temp_wmv;
		}
		if(temp_wmvc.length > 0){
			MasterWordList[a]["wmvc"] = temp_wmvc;
		}
	}
	for(var jk in MasterPhonotacticsList) {
		//MasterPhonotacticsList[jk] = _.unique(MasterPhonotacticsList[jk]);
		//count how often each item occurs
		//"b" > [{"Item": "b", "Count": 25},{...}]
		var tempA = [];
		var temp = _.countBy(MasterPhonotacticsList[jk], function(item){return item;});
		//alert(JSON.stringify(temp));
		for(var tm in temp){
			tempA.push({"GPC": tm, "Count": temp[tm]});
		}
		tempA = _.sortBy(tempA, "Count").reverse();
		MasterPhonotacticsList[jk] = tempA;
	}
	fillPhonotacticsBoxes();
	dbSet(LangMetaData["LangID"] + "_MasterPhonotacticsList", MasterPhonotacticsList);
}

function fillPhonotacticsBoxes(){
	//fill each box in the Phonotactics tab with data
	var phonoList = ["wic", "wicc", "wmc", "wmcc", "wfc", "wfcc", "wiv", "wivc", "wmv", "wmvc", "wfv", "wfvc"];
	for(var p = 0, plen = phonoList.length; p < plen; p++) {
		var temp = _.pluck(MasterPhonotacticsList[phonoList[p]],"GPC");
		$(phonoList[p]).value = temp.join("\n");
	}
}

function sortByLength(a, b) {
	return(a.length - b.length);
}

function populateMasterGPCList() {
	//this function is used to correct the content of the MasterGPCList
	//called by the "Confirm Graphemes" button
	//user needs to have pressed Auto Detect button once already
	//and then made changes to the contents of the text boxes.
	//input is all the characters from the Letter text boxes

	//create and populate properties of MasterGPCList object
	//MasterGPCList properties can include:
	//GPC: "",                //spelling pattern
	//GPCuc: "",              //uppercase form
	//Grapheme: "",           //grapheme only
	//Phoneme: "",            //phoneme only
	//Category: "",           //consonant,vowel,other
	//Combining: false,      //true or false
	//AudioName: "",          //name of audio file of pronunciation of phoneme in isolation. eg: a.mp3
	//Count: 0,              //count of the spelling pattern in a unique word list
	//TokenFreq: 0,           //frequency of occurence in a all texts
	//GroupCount: [],         //frequency count in each group of texts. eg: [{1:10},{...}]
	//IPA: "",                //ipa symbol
	//BinaryFeatures: [],     //binary features of phoneme. [] because of affricates??
	//IPADescrip: [],         //description of binary features
	//Keyword: "",            //keyword that contains instance of the GPC
	//KeywordAudioFileName: "",//audio file name of keyword. eg: word.mp3
	//Position: [],           //position in word. eg: ["wic","wmc","wfc"]
	//LetterName: "",         //name of the letter. eg: m="em", z="zed", q="kyoo", ...
	//LetterNameRomanized: "" //if the script is non-Latin then this would use latin letters to represent the LetterName
	var temp = [];
	var tempGPC = {};
	MasterGPCList = [];//start with an empty list
	var els = $N("graphemes");
	var jlc_uc = "";
	for(var i = 0, ilen = els.length; i < ilen; i++) {
		if(els[i].value !== "") {
			var el_id = els[i].id;
			temp = $(el_id).value.toLowerCase().split(" ");
			temp = _.unique(temp);
			for(var j = 0, jlen = temp.length; j < jlen; j++) {
				var jlc = temp[j];
				var g_lc = "";//grapheme lowercase
				var g_uc = "";//grapheme uppercase
				var p_lc = "";//phoneme
				if(/◌/.test(jlc)) {//get rid of \u25CC
					jlc = jlc.replace("◌", "");
				}
				if(/_/.test(jlc)) {//is full gpc
					LangMetaData["UseFullGPCNotation"] = true;
					var t1 = jlc.split("_");
					p_lc = t1[0];//phoneme
					g_lc = t1[1];//grapheme
					//alert("P: " + p_lc + '\nG: ' + g_lc);
				} else {
					p_lc = jlc;//phoneme
					g_lc = jlc;//grapheme
				}

				//create uppercase. handles graphemes and multigraphs
				//with diacritics or "other" characters before or after base character
				var uppercased = false;
				for(var lc = 0, lclen = g_lc.length; lc < lclen; lc++) {
					if(XRegExp('\\p{L}').test(g_lc[lc])) {
						if(!uppercased) {
							g_uc += g_lc[lc].toUpperCase();
							uppercased = true;
						} else {
							g_uc += g_lc[lc];
						}
					} else {//for anything that is not a letter. eg. a diacritic
						g_uc += g_lc[lc];
					}
				}
				if(/_/.test(jlc)) {//is full gpc
					juc = p_lc + "_" + g_uc;
				} else {
					juc = g_uc;
				}

				if(!tempGPC[temp[j]]) {
					tempGPC[jlc] = {};
					tempGPC[jlc]["GPC"] = jlc;
					//temp[j].charAt(0).toUpperCase() + temp[j].substring(1);
					tempGPC[jlc]["GPCuc"] = juc;//temp[j].charAt(0).toUpperCase() + temp[j].substring(1);//this only works for transparent orthographies
					tempGPC[jlc]["Grapheme"] = g_lc;
					tempGPC[jlc]["Phoneme"] = p_lc;
					tempGPC[jlc]["Category"] = "";
					if(XRegExp("\\p{M}").test(g_lc)) {
						tempGPC[jlc]["Combining"] = "true";
					} else {
						tempGPC[jlc]["Combining"] = "false";
					}
					tempGPC[jlc]["Count"] = 0;
					tempGPC[jlc]["TokenFreq"] = 0;
					tempGPC[jlc]["IPA"] = "";
					tempGPC[jlc]["Alt"] = [];

					switch(el_id) {
						case "single_v":
							tempGPC[jlc]["Category"] = "vowel";
							break;
						case "single_c":
							tempGPC[jlc]["Category"] = "consonant";
							break;
						case "double_v":
							tempGPC[jlc]["Category"] = "vowel";
							tempGPC[jlc]["Combining"] = "false";//even if base char has a diacritic its not Combining
							break;
						case "double_c":
							tempGPC[jlc]["Category"] = "consonant";
							tempGPC[jlc]["Combining"] = "false";
							break;
						case "syllabary":
							tempGPC[jlc]["Category"] = "syllabic";
							break;
						case "other_wordbuilding_chars":
							tempGPC[jlc]["Category"] = "other";
							break;
						case "punctuation":
							//punctuation doesn't get added to the MasterGPCList
							break;
						default:
							break;
					}
					MasterGPCList.push(tempGPC[jlc]);
				}
			}
		}
	}
	dbSet(LangMetaData["LangID"] + "_MasterGPCList",MasterGPCList);
	populateLangMetaData();
}

function getScriptName() {
	//ScriptName is a global var
	if($("select_script")) {
		ScriptName = $("select_script").value;
	}
}

function scripts(ScriptName) {
	//The font list covers mainly Windows fonts so far! May need to specify additional fonts for other platforms.
	//sWS, sDIR, sWM are globals with defaults. Only change exceptions.
	//sWS = {String} Writing System: default = "alpha"
	//sDIR = {String} Direction: default = "ltr"
	//sWM = {String} Writing Mode: default = "lr-tb"
	//hasCase default is false
	//setWS() is called after switch ends
	switch(ScriptName) {
		case "Armenian" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, DejaVu Sans, Quivira, Sylfaen, sans-serif"];
			hasCase = true;
			break;
		case "Bengali" :
			fonts = ["Bangla", "Bangla_0.ttf", "Bangla, Shonar Bangla, Vrinda, MS Arial, sans-serif"];
			break;
		case "Bopomofo" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, DFKai-SB, FangSong, KaiTi, Microsoft JhengHei, Microsoft YaHei, MingLiU, NSimSun, PMingLiU, SimHei, SimSun, sans-serif"];
			break;
		case "Coptic" :
			fonts = ["Sophia Nubian", "SNR.ttf", "Sophia Nubian, Quivira, New Athena Unicode, Code2000, sans-serif"];
			break;
		case "Cyrillic" :
			fonts = ["Andika", "Andika-R.ttf", "Andika, Code2000, DejaVu Sans, Microsoft Sans Serif, Quivira, Segoe UI, Arial, sans-serif"];
			hasCase = true;
			break;
		case "Devanagari":
			fonts = ["Annapurna SIL", "AnnapurnaSIL-R_0.ttf", "Annapurna SIL, Aparajita, Code2000, Kokila, Mangal, Utsaah, sans-serif"];
			break;
		case "Georgian" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, DejaVu Sans, DejaVu Serif, Quivira, Sylfaen, sans-serif"];
			hasCase = true;
			break;
		case "Greek" :
			fonts = ["Gentium Plus", "GentiumPlus-R.ttf", "Gentium Plus, Gentium, Galatia SIL, Antinoou, New Athena Unicode, Analecta, Cambria, Quivira, DejaVu Serif, Code2000, Times New Roman, serif"];
			hasCase = true;
			break;
		case "Gujarati" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Shruti, sans-serif"];
			break;
		case "Gurmukhi" :
			fonts = ["Raavi", "raavi.ttf", "Raavi, Code2000, sans-serif"];
			break;
		case "Hangul" :
			fonts = ["Batang Regular", "batang.ttc", "UnBatang, Batang, Dotum, Code2000, Arial Unicode MS"];
			break;
		case "Kannada" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Tunga, sans-serif"];
			break;
		case "Khmer" :
			fonts = ["Khmer Mondulkiri", "Mondulkiri-R.ttf", "Khmer Mondulkiri, Khmer OS, Khmer UI, DaunPenh, MoolBoran, Code2000, sans-serif"];
			break;
		case "Lao" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, DejaVu Sans, DokChampa, Lao UI, sans-serif"];
			break;
		case "Latin" :
			fonts = ["Andika", "Andika-R.ttf", "Andika, DejaVu Sans, Arial Unicode MS, Code2000, sans-serif"];
			hasCase = true;
			break;
		case "Limbu" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, sans-serif"];
			break;
		case "Malayalam" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Kartika, sans-serif"];
			break;
		case "Myanmar" :
			fonts = ["Padauk", "Padauk.ttf", "Padauk, Code2000, sans-serif"];
			break;
		case "New_Tai_Lue":
			fonts = ["Dai Banna SIL", "DBSILLR.ttf", "Dai Banna SIL, serif"];
			break;
		case "Oriya" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Kalinga, sans-serif"];
			break;
		case "Sinhala" :
			fonts = ["Iskoola Pota", "iskpota.ttf", "Iskoola Pota, sans-serif"];
			break;
		case "Syriac" :
			fonts = ["Code2000", "CODE2000.TTF", "Estrangelo Antioch, Estrangelo Edessa, Estrangelo Midyat, Estrangelo Nisibin, Estrangelo Quenneshrin, Estrangelo Talada, Estrangelo TurAbdin, Code2000, Free Sans, Serto Batnan, Serto Jerusalem, Serto Kharput, Serto Malankara, Serto Mardin, Serto Urhoy, Sun-ExtA, TITUS Cyberbit Basic, sans-serif"];
			break;
		case "Tai_Tham" :
			fonts = ["Boonkit", "boonkitU.ttf", "Boonkit, Lanna Unicode, Lanna, sans-serif"];
			break;
		case "Tai_Le" :
			fonts = ["Microsoft Tai Le", "taile.ttf", "Microsoft Tai Le, sans-serif"];
			break;
		case "Tai_Viet" :
			fonts = ["Tai Heritage Pro", "TaiHeritagePro.ttf", "Tai Heritage Pro, sans-serif"];
			break;
		case "Tamil" :
			fonts = ["Krishna Tamil", "Krishna Tamil 2.5.1 GrEnabled.ttf", "Krishna Tamil, sans-serif"];
			break;
		case "Telugu" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000", "Gautami, Vani, sans-serif"];
			break;
		case "Thai" :
			fonts = ["Angsana New", "angsa.ttf", "Angsana New, AngsanaUPC, Browallia New, BrowalliaUPC, Code2000, Cordia New, CordiaUPC, DilleniaUPC, DokChampa, EucrosiaUPC, FreesiaUPC, IrisUPC, JasmineUPC, KodchiangUPC, Leelawadee, LilyUPC, Microsoft Sans Serif, Quivira, sans-serif"];
			break;
		case "Thanna" :
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, MV Boli, sans-serif"];
			break;
		case "Tibetan" :
			fonts = ["Microsoft Himalaya", "himalaya.ttf", "Microsoft Himalaya, sans-serif"];
			break;
		case "Arabic" :
			sDIR = "rtl";
			sWM = "rl-tb";
			fonts = ["Scheherazade", "Scheherazade-R.ttf", "Scheherazade, Jameel Noori Nastaleeq, Arabic Typesetting, Sakkal Majalla, Microsoft Uighur, Segoe UI, Times New Roman, Arial, sans-serif"];
			//fonts = ["Jameel Noori Nastaleeq", "Jameel Noori Nastaleeq.ttf", "Jameel Noori Nastaleeq, Scheherazade, Arabic Typesetting, Sakkal Majalla, Microsoft Uighur, Segoe UI, Times New Roman, Arial, sans-serif"];
			break;
		case "Hebrew" :
			sDIR = "rtl";
			sWM = "rl-tb";
			fonts = ["Ezra SIL", "SILEOT.ttf", "Ezra SIL", "BibliaLS, Code2000, Quivira, SBL Hebrew, Gisha, Microsoft Sans Serif, Times New Roman, Arial, sans-serif"];
			break;
		case "Mongolian" :
			sWM = "tb-lr";
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Mongolian Baiti, sans-serif"];
			break;

			//syllabaries
		case "Canadian_Aboriginal" :
			sWS = "syll";
			fonts = ["BJCree UNI", "bjcrus.ttf", "BJCree UNI, Euphemia, Code2000, sans-serif"];
			break;
		case "Cherokee" :
			sWS = "syll";
			fonts = ["Plantagenet Cherokee", "plantc.ttf", "Plantagenet Cherokee, Aboriginal Serif, Quivira, Euphemia, Code2000, sans-serif"];
			break;
		case "Ethiopic" :
			sWS = "syll";
			fonts = ["Abyssinica SIL", "Abyssinica_SIL.ttf", "Abyssinica SIL, Nyala, Times New Roman, sans-serif"];
			break;
		case "Hiragana" :
			sWS = "syll";
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Meiryo, Meiryo UI, Microsoft JhengHei, Microsoft YaHei, MS Gothic, MS Mincho, MS PGothic, MS PMincho, MS UI Gothic, sans-serif"];
			break;
		case "Katakana" :
			sWS = "syll";
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Meiryo, Meiryo UI, Microsoft JhengHei, Microsoft YaHei, MS Gothic, MS Mincho, MS PGothic, MS PMincho, MS UI Gothic, sans-serif"];
			break;
		case "Yi" :
			sWS = "syll";
			fonts = ["Code2000", "CODE2000.TTF", "Code2000, Microsoft Yi Baiti, sans-serif"];
			break;

			//default values
		default:
			sWS = "alpha";
			sDIR = "ltr";
			sWM = "lr-tb";
			break;
	}
	if(ScriptName !== "Latin"){
		$("localizedLangNameDiv").classList.remove("is-none");
		$("localizedLangName").classList.add(sDIR);
		$("localizedLangName").classList.add("fs");
	}
	setWS();
}

function setWS() {
	//by default the alphabetic divs don't have a is-none class
	if(sWS === "syll") {
		$("alphabeticGraphemes").classList.add("is-none");
		$("syllabaryGraphemes").classList.remove("is-none");
	}
	setWD();
}

function setWD() {
	var els = document.getElementsByTagName("textarea");
	if(LangMetaData["Direction"] === "rtl") {
		for(var i = 0, ilen = els.length; i < ilen; i++) {
			els[i].classList.add(LangMetaData["Direction"]);
		}
	}
}

function check_matches(list, known_gpcs, test_gpc) {
	//list, known_gpcs, test_gpcs
	var match_count = 0;
	var mwords = [];
	var test_gpcs = known_gpcs.concat(test_gpc);
	for(var w = 0, wlen = list.length; w < wlen; w++) {
		var keep = true;
		var current_word = _.clone(list[w]);
		for(var y = 0, ylen = current_word.length; y < ylen; y++) {
			current_word[y] = current_word[y].toLowerCase();//first letter only??
		}
		var test_word = _.difference(current_word, test_gpcs);
		if(test_word.length > 0) {
			keep = false;
		}
		if(keep === true) {
			match_count++;
			//this won't work for full gpc format; only for simple gpc format!!
			mwords.push(list[w].join(""));
		}
	}
	//we've now checked through all the words
	if(match_count > largest_count) {
		largest_count = match_count;
		most_productive_gpc = test_gpc;
		matched_words = mwords;
	}
	return most_productive_gpc;
}

function calculateProductivity(n, condensed) {
	//calculates productivity on a subset of words
	sequencedGPCs.length = 0;//reset array
	unsequenced_gpcs.length = 0;
	current_gpcs_sorted_by_freq = [];
	var report_letter_freq = "";
	current_wordlist = [];//subset of MasterWordList with same properties
	var total_words_count = 0;
	var outputarea = $("final_output");
	var total_gpc_count = 0;//counts all spelling patterns in all words
	var not_found = [];
	var temp = [];
	cumulative_count = 0;
	productivity_array.length = 0;
	ProductivityGPCList.length = 0;
	if($("cumulative_seq") && $("cumulative_seq").checked === true) {
		current_wordlist = selectWordsBySyllLength(n, true);
	} else {
		current_wordlist = selectWordsBySyllLength(n);
	}
	var ProductivityGPCObj = {};
	for(var w = 0, wlen = current_wordlist.length; w < wlen; w++) {
		//populate an object with the gpcs of a subset of words
		//and create wordlists that all contain a specific gpc
		total_words_count++;
		var a = current_wordlist[w].GPCForm;//a is one word in gpc format
		var inserted_word_already = false;
		for(var j = 0, jlen = a.length; j < jlen; j++) {//every gpc in word
			total_gpc_count++;
			var gpc = a[j].toLowerCase();
			if(!ProductivityGPCObj[gpc]) { //if never seen GPC before
				var obj = {}; //Only creating a single object
				//add reference into assoc. array
				ProductivityGPCObj[gpc] = obj;
				obj.GPC = gpc;
				obj.TokenCount = parseInt(collectValues(MasterGPCList, "GPC", gpc, "Count"), 10); //counts occurence in all texts
				obj.TypeCount = 1; //start count at one so we count the first occurrence
				obj.Category = collectValues(MasterGPCList, "GPC", gpc, "Category");
				obj.WordsToCheck = [];
				obj["WordsToCheck"].push(current_wordlist[w]["GPCForm"]);
				obj.MatchedWords = [];
				//also add a reference into list but only once
				ProductivityGPCList.push(obj);
			} else {
				//Use the associative array to get a reference to the object and  increment the TypeCount field.
				//counts occurrence in unique word list
				ProductivityGPCObj[gpc].TypeCount += 1;
				//collect words to check. these words all contain an instance of the same gpc
				ProductivityGPCObj[gpc]["WordsToCheck"].push(current_wordlist[w]["GPCForm"]);
			}
		}
	}
	for(var pgl = 0, pglen = ProductivityGPCList.length; pgl < pglen; pgl++) {
		//make sure that WordsToCheck are unique word lists
		temp = ProductivityGPCList[pgl]["WordsToCheck"];
		temp = _.unique(temp);
		ProductivityGPCList[pgl]["WordsToCheck"] = temp;
	}

	//sort by TypeCount in descending order
	ProductivityGPCList = _.sortBy(ProductivityGPCList, "TypeCount").reverse();
	//ProductivityGPCList is now sorted from most frequent to least frequently occurring GPC in a subset of words

	report_header = "This report processed words of " + report_syll_length + " in length.";
	detailed_report += "\nOutput format is (letter(s) [tab] number_of_words [tab] word1 [tab] word2 [tab] … )\nProductivity Sequence";
	//get starting sequence from user if supplied
	var test_gpcs = [];
	var known_gpcs = [];
	var startseq = [];
	var seq_counter = 0;
	if($("start_sequence") && $("start_sequence").value !== "") {
		//user HAS specified a starting sequence
		startseq = getStartingSequence();
		verifyStartingSequence(startseq);//check user input for valid sequence
		//known_gpcs.push(startseq[0]);
		updateValues(ProductivityGPCList, "GPC", startseq[0], "SequencePos", seq_counter);
	} else {
		ProductivityGPCList[0]["SequencePos"] = seq_counter;//most frequently occurring
	}

	//sort by SequencePos in ascending order
	ProductivityGPCList = _.sortBy(ProductivityGPCList, "SequencePos");
	if(startseq.length > 0) {
		detailed_report += "\n" + startseq + "\tThis is the starting sequence.\n*************************";
	} else {
		//detailed_report += "\n" + ProductivityGPCList[0]["GPC"] + "\tThis is the starting letter.\n*************************";
		detailed_report += "\n*************************";
		//startseq = ProductivityGPCList[0]["GPC"];
	}

	var loop_counter = 0;
	var current_gpcs_counter = ProductivityGPCList.length;

	unsequenced_gpcs = _.pluck(ProductivityGPCList, "GPC");

	// ++++++++ START CHECKING FOR PRODUCTIVITY SEQUENCE HERE ++++++++++++
	while(unsequenced_gpcs.length > 0) {
		most_productive_gpc = "";
		largest_count = 0;
		matched_words = [];
		var words_to_check = [];
		var test_gpc = "";
		test_gpcs = [];
		if(startseq.length > 0) {
			//if the user has entered a sequence then we process those first
			test_gpcs = [];
			for(var ss = 0, sslen = startseq.length; ss < sslen; ss++) {
				test_gpc = startseq[ss];
				test_gpcs.push(startseq[ss]);
				matched_words.length = 0;
				words_to_check = collectValues(ProductivityGPCList, "GPC", test_gpc, "WordsToCheck");
				words_to_check = _.flatten(words_to_check, true);
				most_productive_gpc = check_matches(words_to_check, test_gpcs, test_gpc);
				seq_counter++;
				detailed_report += "\n" + test_gpc + "\t" + matched_words.length + "\t" + matched_words.join("\t");
				updateValues(ProductivityGPCList, "GPC", test_gpc, "MatchedWords", matched_words);
				updateValues(ProductivityGPCList, "GPC", test_gpc, "SequencePos", seq_counter);
				known_gpcs.push(test_gpc);
				cumulative_count += largest_count;
			}
			unsequenced_gpcs = _.difference(unsequenced_gpcs, startseq);
			startseq.length = 0;
			known_gpcs = _.unique(known_gpcs);
			most_productive_gpc = "";
		} else {//no user sequence supplied
			for(var c = 0, clen = unsequenced_gpcs.length; c < clen; c++) {
				//finds most productive gpc using: list, known_gpcs, test_gpcs
				test_gpc = unsequenced_gpcs[c];
				words_to_check = collectValues(ProductivityGPCList, "GPC", test_gpc, "WordsToCheck");
				words_to_check = _.flatten(words_to_check, true);
				most_productive_gpc = check_matches(words_to_check, known_gpcs, test_gpc);
			}
		}
		if(most_productive_gpc !== "") {
			//we found the most productive gpc
			//update sequence position of most productive gpc
			//collect report data
			detailed_report += "\n" + most_productive_gpc + "\t" + matched_words.length + "\t" + matched_words.join("\t");
			seq_counter++;
			updateValues(ProductivityGPCList, "GPC", most_productive_gpc, "MatchedWords", matched_words);
			updateValues(ProductivityGPCList, "GPC", most_productive_gpc, "SequencePos", seq_counter);
			known_gpcs.push(most_productive_gpc);
			cumulative_count += largest_count;
			outputarea.value = "Processing … " + known_gpcs.length + " spelling units sequenced.";
		}
		known_gpcs = _.unique(known_gpcs);
		//remove known_gpcs from unsequenced_gpcs
		unsequenced_gpcs = _.difference(unsequenced_gpcs, most_productive_gpc);
		if(loop_counter > current_gpcs_counter + 5)
			break; //prevent infinite loops in some circumstances (digraphs exist but not defined)
		loop_counter++;
	}

	//sort by SequencePos in ascending order
	ProductivityGPCList = _.sortBy(ProductivityGPCList, "SequencePos");
	var prodGPCSeq = [];

	//calculate percent value
	var total_matched_words_count = 0;
	for(var y = 0, ylen = ProductivityGPCList.length; y < ylen; y++) {
		temp = [];
		var percent = (100 * (ProductivityGPCList[y].TypeCount / total_gpc_count)).toFixed(2);
		ProductivityGPCList[y].TypePercent = percent;
		var matched_words_count = ProductivityGPCList[y]["MatchedWords"].length;
		total_matched_words_count += matched_words_count;
		var matched_words_percent = (100 * (total_matched_words_count / cumulative_count)).toFixed(2);
		//ProductivityGPCList[n].TokenPercent = (100 * (ProductivityGPCList[n].TokenCount / token_gpc_count)).toFixed(2);
		temp.push(ProductivityGPCList[y]["GPC"]);
		temp.push(matched_words_count);
		temp.push(total_matched_words_count);
		temp.push(matched_words_percent);
		productivity_array.push(temp);
		prodGPCSeq.push(ProductivityGPCList[y]["GPC"]);
	}
	LangMetaData["ProductivityStats"] = productivity_array;
	LangMetaData["ProductivityGPCSequence"] = prodGPCSeq;

	//sort by TypeCount in descending order
	ProductivityGPCList = _.sortBy(ProductivityGPCList, "TypeCount").reverse();

	var found_gpcs = _.pluck(ProductivityGPCList, "GPC");
	var all_gpcs = collectValues(MasterGPCList, "GPC");
	var not_found_gpcs = _.difference(all_gpcs, found_gpcs);
	if(cumulative_count > 0) {
		detailed_report += "\n\nTotal words processed: " + cumulative_count;
		if(not_found_gpcs.length > 0) {
			detailed_report += "\n" + not_found_gpcs.length + " Spelling Units were not found in this group of words: " + not_found_gpcs.join(",");
		} else {
			detailed_report += "\nThis word list contains all the spelling units which have been defined for this language.";
		}
	} else {
		detailed_report = '\nNo words were processed.\nYou can try supplying a "Starting Sequence" that will match at least ' +
				'one short word of the syllable length you clicked. See the help link beside the "Starting Sequence" box for more information.' +
				'\nOr you can select the "Cumulative from 1 syll" checkbox to include shorter words.';
	}
	dbSet(LangMetaData["LangID"] + "_LangMetaData", LangMetaData);
	//dbSet(LangMetaData["LangID"] + "_ProductivityGPCList",ProductivityGPCList);
	if(condensed) {
		return productivity_array;
	}
	if($("format_html") && $("format_html").checked === true) {
		if(not_found.length > 0) {//if there are any gpcs left over
			sequencedGPCs = sequencedGPCs.concat(not_found);
		}
		return sequencedGPCs;
	} else {
		return report_header + report_letter_freq + detailed_report;
	}
}

function storeLanguageName() {
	if($("language_name") && $("language_name").value !== "") {
		$("titleBarLangName").innerHTML = $("language_name").value;
		langname = $("language_name").value;//Proper case version
		lang_name = $("language_name").value.split(" ").join("_");//Proper case joined version
		lang_name_lc = lang_name.toLowerCase();//lowercase joined version
		LangMetaData.LangName = langname;
		$("synphony_filename").innerHTML = "SynPhony_" + lang_name + ".html";
		$("langdata_filename").innerHTML = lang_name_lc + "_langdata.js";
		$("language_name").classList.add("filled-in");
	} else {
		$("language_name").classList.remove("filled-in");
	}
	if($("ethnocode") && $("ethnocode").value !== "") {
		ethno_code = $("ethnocode").value;
		$("ethnocode").classList.add("filled-in");
		LangMetaData["LangID"] = ethno_code;
	} else {
		$("ethnocode").classList.remove("filled-in");
	}
	if($("localizedLangName") && $("localizedLangName").value !== ""){
		LangMetaData.LocalName = $("localizedLangName").value;
	}
	if(langname.length > 0 && ethno_code.length > 0 ){
		//current_language = ethno_code;
		languages_list = dbGet("languages_list");
		if(_.findWhere(languages_list, {"LangName": langname, "LangID": ethno_code}) === undefined){
			languages_list.push({"LangName": langname,"LangID": ethno_code, "LocalName": LangMetaData.LocalName});
			dbSet("languages_list",languages_list);
		}
		//local storage can store multiple language data sets
		//the "languages_list" array stores their names so
		//we can create the keys to access them.
		//first we check to see if this language has been processed before
		if(dbGet(ethno_code + "_LangMetaData")){
			LangMetaData = dbGet(ethno_code + "_LangMetaData");
		} else {//doesn't exist yet: its a new language data set
			dbSet(ethno_code + "_LangMetaData", LangMetaData);
		}
	} else {
		alert("You need to fill in both the language name and the ISO-639 code!");
	}
}

function populateMasterWordList(arr, group) {
	//variables:
	//  arr = array of words
	//  group = number
	var word = "";
	var word_lc = "";
	var word_uc = "";
	var lowerCaseAllWords = false;
	lowerCaseAllWords = $("lowerCaseAllWords").checked;
	for(var k = 0, klen = arr.length; k < klen; k++) {
		//for each word in the array
		//purpose: to create a unique word list, count frequency and add group #
		word = arr[k];
		word_lc = arr[k].toLowerCase();
		word_uc = arr[k].charAt(0).toUpperCase() + arr[k].substring(1);
		if(lowerCaseAllWords === false) {//retain case for words that are always uppercase
			//alert(arr[k] + "\n" + word_lc + "\n" + word_uc);
			//we want to retain case for words that *only* appear in uppercase
			//i.e. we don't want all words to be lowercased
			if(word !== word_lc) {//the current word contains uppercase
				if(MasterWordList[word_lc]) {//if lowercase form already exists
					//accept lowercase form and just increment count
					//alert("lowercase form already exists:\n" + word + " " + JSON.stringify(MasterWordList[word_lc]));
					MasterWordList[word_lc]["Count"]++;
					textGroups_WordCount++;
				} else if(UpperCaseWordList[word]) { //if uppercase form already exists
					//accept the word as it was encountered and just increment count
					UpperCaseWordList[word]["Count"]++;
					textGroups_WordCount++;
					//alert("uppercase exists, increment:\n" + word + " " + JSON.stringify(MasterWordList[word]));
				} else {//if neither lowercase nor uppercase forms exist yet
					//create new entry as uppercase and create object properties
					UpperCaseWordList[word] = {};
					UpperCaseWordList[word]["Name"] = word;
					UpperCaseWordList[word]["Count"] = 1;
					UpperCaseWordList[word]["Group"] = group;
					textGroups_WordCount++;
					totalUniqueWordCount++;
					//alert("created entry as uppercase:\n" + word + " " + JSON.stringify(MasterWordList[word]));
				}
			} else {//the current word is all in lowercase.
				if(!MasterWordList[word_lc]) { //lowercase form doesn't exist yet
					//create new entry with word as lowercase and create properties
					//if(!MasterWordList[word_lc].hasOwnProperty(word_lc)){
					MasterWordList[word_lc] = {};
					MasterWordList[word_lc]["Name"] = word;
					MasterWordList[word_lc]["Count"] = 1;//initialize word and count
					MasterWordList[word_lc]["Group"] = group;
					textGroups_WordCount++;
					totalUniqueWordCount++;
					//alert("new lowercase form:\n" + word + " " + JSON.stringify(MasterWordList[word_lc]));
				} else { //lowercase form already exists; just increment count
					//if(!MasterWordList[word_lc].hasOwnProperty("some"))
					//if(word === "some"){
					//	//alert(word + "\n" + MasterWordList[word_lc])
					//}
					//results in:
					//some
					//function some() {
					//    [native code]
					//}
					MasterWordList[word_lc]["Count"] += 1;
					textGroups_WordCount++;
					//alert("lowercase form exists, increment count:\n" + word + " " + JSON.stringify(MasterWordList[word_lc]));
				}
			}
			//alert(MasterWordList[word].Name + "\n" + MasterWordList[word]["Count"]);
		} else {//lowerCaseAllWords === true
			//treat all words as lowercase
			//alert("lowerCaseAllWords");
			if(MasterWordList[word_lc]) {//if lowercase form already exists
				//accept lowercase form and just increment count
				MasterWordList[word_lc]["Count"] += 1;
				textGroups_WordCount++;
			} else {
				//store as lowercase and create object properties
				MasterWordList[word_lc] = {};
				MasterWordList[word_lc]["Name"] = word_lc;
				MasterWordList[word_lc]["Count"] = 1;//initialize word and count
				MasterWordList[word_lc]["Group"] = group;
				textGroups_WordCount++;
				totalUniqueWordCount++;
			}
		}
	}
}

/**
 * This function updates the MasterWordList (a global variable).
 * Is called by the "Create word lists from text groups" button on the Word Lists tab
 * It counts all the words in each text group,
 * creates a unique word list for each text group,
 * counts each unique word list,
 * and reports a total unique word count
 */
function processTextGroups() {
	MasterWordList.length = 0;
	var tempPS = [];
	var punctChars = "";
	var split_chars = "";
	var wehaveaMasterGPCList = false;
	var groupCount = 0;
	//we will split text using XRegExp library with any unicode
	//{N}numbers, or
	//{Z}separators (space, line, or paragraph), or
	//{S}symbols
	//{P}punctuation is trickier as some languages use hyphen and apostrophe
	//as word building characters but these are defined as punctuation.
	//Solution: query the MasterGPCList for
	//punctuation AND the other characters FIRST, and then
	//add the punctuation characters to the regexp for splitting the text.
	if(_.pluck(MasterGPCList, "GPC").length > 0){
		wehaveaMasterGPCList = true;
	} else {
		alert("We first need to know which letters the language uses.\n\n" +
			"Go to the Letters tab and press the \"Auto detect\" button. " +
			"Also, make sure that the \"Other word building characters\" box " +
			"contains only the characters (such as hyphen and/or apostrophe) " +
			"that are used in your language as word building characters.\n\n" +
			"If you don't do this you will not get accurate results!");
		return;
	}

	if(wehaveaMasterGPCList) {
		//collect all non-wordbuilding characters; including space or other separators
		split_chars = collectValues(MasterCharacterInventory, "Wordbuilding", "false", "Item");
		//collect all "other" graphemes = wordbuilding but not phonemic
		//var temp = collectValues(MasterGPCList, "Category", "other", "Grapheme");
		//remove wordbuilding chars from chars to split text on
		//split_chars = _.difference(split_chars, temp);
		//add new line and tab codes. space should be in there already
		split_chars = "\\s+" + split_chars.join("\\");
	} else {
		//for first time text splitting. before the user has had the chance to override
		//any characters that are wordbuilding.
		//adds unicode separators and punctuation
		split_chars = "\\n\\t\\p{Z}\\p{P}";
	}

	//sort MasterLibraryCatalogue by Group number
	MasterLibraryCatalogue = _.sortBy(MasterLibraryCatalogue, "Group");

	//get data from MasterLibraryCatalogue
	for(var t = 0, tlen = MasterLibraryCatalogue.length; t < tlen; t++) {
		var textTitle = MasterLibraryCatalogue[t]["Title"];
		var textFormat = MasterLibraryCatalogue[t]["FileFormat"];
		var textGroup = MasterLibraryCatalogue[t]["Group"];
		var textContents = MasterLibraryCatalogue[t]["Source"];
		var tempWords = [];
		if(textFormat === "plaintext") {
			MasterLibraryCatalogue[t]["Parsed"] = [];
			MasterLibraryCatalogue[t]["Parsed"] = parse_PlainText_File(textContents);
			tempWords = _.pluck(MasterLibraryCatalogue[t]["Parsed"], "Words");
			tempWords = _.flatten(tempWords);
			populateMasterWordList(tempWords, textGroup);
			groupCount = textGroup;
		} else if(textFormat === "wordlist"){
			MasterLibraryCatalogue[t]["Parsed"] = [];
			tempWords = textContents.split(/[\r?\n\s*]/);
			MasterLibraryCatalogue[t]["Parsed"] = tempWords;
			populateMasterWordList(tempWords, textGroup);
			groupCount = textGroup;
		} else if(textFormat === "usfm") {
			//usfm is Paratext file
			MasterLibraryCatalogue[t]["Parsed"] = [];
			MasterLibraryCatalogue[t]["Parsed"] = parse_USFM_File(textContents);
			tempWords = _.pluck(MasterLibraryCatalogue[t]["Parsed"], "Words");
			tempWords = _.flatten(tempWords);
			populateMasterWordList(tempWords, textGroup);
			groupCount = textGroup;
		} else if(textFormat === "sfm") {
			//if the user has imported an external dictionary file via the <input type="file"> button
			//for dictionaries we will only store example sentences in the MasterTextsCollection
			MasterLibraryCatalogue[t]["Parsed"] = [];
			MasterLibraryCatalogue[t]["Parsed"] = parse_MDF_File(textContents);
		} else {
			alert("The function processTextGroups() was not able to detect TextType accurately");
		}
	}

	//we have processed all texts in the MasterTextCollection
	//time to merge the UpperCase wordlist to the MasterWordList
	var lc = "";
	for(var uc in UpperCaseWordList) {
		lc = uc.toLowerCase();
		if(MasterWordList[lc]) {
			MasterWordList[lc]["Count"] += UpperCaseWordList[uc]["Count"];
			//alert("lowercase exists: " + lc + " " + JSON.stringify(MasterWordList[lc]) + "\nUpper: " + JSON.stringify(UpperCaseWordList[uc]));
		} else {
			MasterWordList[uc] = {};
			MasterWordList[uc] = UpperCaseWordList[uc];
		}
	}
	//transform MasterWordList into a real array, not an associative array
	var tempList = [];
	for(var i in MasterWordList) {
		tempList.push(MasterWordList[i]);
	}
	MasterWordList = tempList;
	MasterWordList = _.sortBy(MasterWordList, "Count").reverse();
	fillWordListsBoxes();
	$("totalVocabCount").innerHTML = "All texts combined contain a total of " + MasterWordList.length + " words";
	dbSet(LangMetaData["LangID"] + "_MasterWordList", MasterWordList);
	dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
	checkLocalStorageSpaceRemaining();
	//dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
}

function fillWordListsBoxes(){
	//copy the text group descriptions to the word list descriptions
	//and fill wordlist boxes
	var groupLabels = LangMetaData["VocabularyGroupsDescriptions"];
	for(var td = 0; td < 6; td++){
		if(groupLabels[td]){
			var n = (td+1).toString();
			$("wordlist" + n + "description").innerHTML = groupLabels[td];
			var subWordList = _.where(MasterWordList, {"Group": n});
			var tempWords2 = _.pluck(subWordList, "Name");
			$("wordlist" + n).value = tempWords2.join("\n");
			$("wordlist" + n + "count").innerHTML = tempWords2.length;
		} else {
			$("wordlist" + (td+1) + "description").innerHTML = "Group " + (td+1);
			$("wordlist" + (td+1) + "count").innerHTML = "";
		}
	}
}

/**
 * This function stores words into the LangMetaData["StopWords"] field
 * Stop words are offensive words that SynPhony will remove if they
 * get generated by the Nonsense word generator.
 */
function storeStopWords(){
	var aStopWords = $("stopwordlist").value.split(/[\s+\n]/);
	aStopWords = _.compact(aStopWords);
	LangMetaData["StopWords"] = aStopWords;
	$("stopwordlist").value = aStopWords.join(" ");
	dbSet(LangMetaData["LangID"] + "_LangMetaData", LangMetaData);
}

function loadStopWords(){
	if(LangMetaData["StopWords"] && LangMetaData["StopWords"].length > 0){
		$("stopwordlist").value = LangMetaData["StopWords"].join(" ");
	}
}

function hideStopWords(){
	$("stopwordlist").value = "";
}
function sortWordLists(sortType) {
	//sorts the MasterWordList in a variety of ways
	var sortedArr = [];
	var tempArr = {};
	var tempRev = [];
	switch(sortType) {
		case "alphAsc" :
			sortedArr = _.sortBy(MasterWordList, "Name");
			break;
		case "alphDesc" :
			sortedArr = _.sortBy(MasterWordList, "Name").reverse();
			break;
		case "numAsc" :
			sortedArr = _.sortBy(MasterWordList, "Count");
			break;
		case "numDesc" :
			sortedArr = _.sortBy(MasterWordList, "Count").reverse();
			break;
		default :
			sortedArr = _.sortBy(MasterWordList, "Count").reverse();
			break;
	}
	MasterWordList = sortedArr;
	fillWordListsBoxes();
	dbSet(LangMetaData["LangID"] + "_MasterWordList", MasterWordList);
	//dbSet(LangMetaData["LangID"] + "_MasterWordList", MasterWordList);
}

function convertCharStr2Unicode(textString, preserve, pad) {
	// source: http://rishida.net/tools/conversion/
	// converts a string of characters to U+... notation, separated by space
	// textString: string, the string to convert
	// preserve: string enum [ascii, latin1], a set of characters to not convert
	// pad: boolean, if true, hex numbers lower than 1000 are padded with zeros
	var haut = 0;
	var n = 0;
	var CPstring = "";
	pad = false;
	for(var i = 0; i < textString.length; i++) {
		var b = textString.charCodeAt(i);
		if(b < 0 || b > 0xFFFF) {
			CPstring += "Error in convertChar2CP: byte out of range " + dec2hex(b) + "!";
		}
		if(haut !== 0) {
			if(0xDC00 <= b && b <= 0xDFFF) {
				CPstring += dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00)) + " ";
				haut = 0;
				continue;
			}
			else {
				CPstring += "Error in convertChar2CP: surrogate out of range " + dec2hex(haut) + "!";
				haut = 0;
			}
		}
		if(0xD800 <= b && b <= 0xDBFF) {
			haut = b;
		}
		else {
			if(b <= 127 && preserve === "ascii") {
				CPstring += textString.charAt(i) + " ";
			}
			else if(b <= 255 && preserve === "latin1") {
				CPstring += textString.charAt(i) + " ";
			}
			else {
				cp = dec2hex(b);
				if(pad) {
					while(cp.length < 4) {
						cp = "0" + cp;
					}
				}
				CPstring += "U+" + cp + " ";
			}
		}
	}
	return CPstring.substring(0, CPstring.length - 1);
}

function createSynPhonyHTMLFile() {
	//this function produces the html code for the SynPhony HTML page
	//two things are changed through variables in the code below
	//  1) in the <title> tag: " + langname + "
	//  2) the lang_data.js file name in a script tag: " + lang_name_lc + "
	//getLanguageName();
	var html_page =
		"<!DOCTYPE html>\n"+
		"<html lang=\"en\">\n"+
		"<head>\n"+
		"	<title>SynPhony in " + langname + "<\/title>\n"+
		"	<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" \/>\n"+
		"	<meta http-equiv=\"content-type\" content=\"text\/html; charset=utf-8\" \/>\n"+
		"	<link href=\"css\/synphony4.css\" type=\"text\/css\" media=\"all\" rel=\"stylesheet\" \/>\n"+
		"	<link href=\"css\/desktop.css\"  type=\"text\/css\" media=\"screen and (min-width: 600px)\" rel=\"stylesheet\" \/>\n"+
		"<\/head>\n"+
		"<body>\n"+
		"	<div id=\"top_bar\"><\/div>\n"+
		"	<ul id=\"main_content\">\n"+
		"		<li id=\"panel_1\" class=\"\" style=\"\"><\/li>\n"+
		"		<li id=\"panel_2\" class=\"\" style=\"\"><\/li>\n"+
		"		<li id=\"panel_3\" class=\"\" style=\"\">\n"+
		"			<div id=\"loading_data\" style=\"margin-top: 3em; font-size: 1.2em; text-align: center;\">Loading&hellip;<\/div>\n"+
		"		<\/li>\n"+
		"	<\/ul>\n"+
		"	<div id=\"footer\">\n"+
		"		<div id=\"footer_content\">\n"+
		"			SynPhony Community Edition\n"+
		"			<p style=\"width: 600px; margin: auto;\"><a href=\"http://creativecommons.org/publicdomain/zero/1.0/\" rel=\"license\"><img style=\"border-style: none;\" src=\"http://i.creativecommons.org/p/zero/1.0/88x31.png\" alt=\"CC0\" /></a><br />To the extent possible under law, <a href=\"http://www.canil.ca\" rel=\"dct:publisher\">Canada Institute of Linguistics</a> has waived all copyright and related or neighbouring rights to SynPhony Community Edition software and code. This work is published from: Canada.<\/p>" +
		"			Feedback welcome: <span id=\"mail\"><\/span>\n"+
		"		<\/div>\n"+
		"	<\/div>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/underscore-min.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/underscore.string.min.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/helpers.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/synphony_lib_ce.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/synphony_ce.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"data\/" + lang_name_lc + "_lang_data.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/xregexp.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/xregexp-unicode-base.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/xregexp-unicode-categories.js\"><\/script>\n"+
		"	<script type=\"text\/javascript\" src=\"javascript\/gridstyles.js\"><\/script>\n"+
		"<\/body>\n"+
		"<\/html>";

	return html_page;
}

function createJSONLangDataExport() {
	//formats the langdata in JSON format
	//output language info object and vocabulary
	var sFormattedOutput = "";
	//var residueVocab = "";
	//var residueGraphemes = "";
	var punctuationValues = "";
	sFormattedOutput = "";
	if(productivity_array.length === 0) {
		calculateProductivity(2);
	}

	var comma = false;
	sFormattedOutput = "setLangData({";
	for(var abc in LangMetaData) {
		if(comma) {
			sFormattedOutput += ",";
		}
		sFormattedOutput += '\n\t"' + abc + '": ' + JSON.stringify(LangMetaData[abc]);
		comma = true;
	}
	sFormattedOutput += ",";

	//now we inventorize the CV patterns
	for(var s = 0; s < LangMetaData["Syllables"].length; s++){
		var tempA = [];
		var syllColl = collectValues(MasterWordList,"Syllables", LangMetaData["Syllables"][s], "WordShape");
		var temp = _.countBy(syllColl, function(item){return item;});
		for(var tm in temp){
			tempA.push({"Name": tm, "Count": temp[tm]});
		}
		tempA = _.sortBy(tempA, "Count").reverse();
		sFormattedOutput += '\n\t"WordShapes' + LangMetaData["Syllables"][s] + '":' + JSON.stringify(tempA) + ",";
	}

	//now we output the GPC collection
	sFormattedOutput += '\n\t"GPCS": [';
	if(tokenFreqISUpToDate === 0) {
		updateTokenFreq();
	}
	comma = false;
	for(var de = 0, lende = MasterGPCList.length; de < lende; de++) {
		if(comma) {
			sFormattedOutput += ",";
		}
		sFormattedOutput += "\n\t\t" + JSON.stringify(MasterGPCList[de]);
		comma = true;
	}
	sFormattedOutput += "\n\t],";

	//now we output the Phonotactics collection
	if(sWS !== "syll") {
		for(var gh in MasterPhonotacticsList) {
			sFormattedOutput += '\n\t"' + gh + '":' + JSON.stringify(MasterPhonotacticsList[gh]) + ",";
		}
	}

	//now we output the MasterWordList
	var wl_counter = LangMetaData["VocabularyGroups"];
	for(var s = 1; s <= wl_counter; s++) {
		s = s.toString();
		var subWordList = _.where(MasterWordList, {Group: s});
		comma = false;
		sFormattedOutput += '\n\t"group' + (s) + '": [';
		for(var wo = 0, wolen = subWordList.length; wo < wolen; wo++) {
			if(comma) {
				sFormattedOutput += ",";
			}
			sFormattedOutput += "\n\t" + JSON.stringify(subWordList[wo]);
			comma = true;
		}
		sFormattedOutput += "\n\t]";
		if(s < wl_counter) {
			sFormattedOutput += ",";
		}
	}

	sFormattedOutput += ',\n\t"Texts": [';
	sFormattedOutput += "]\n});\n";
	return sFormattedOutput;
}

//a way to time scripts. from http://jdev.blogsome.com/2006/08/18/compact-script-to-calculate-script-execution-time/
//Use it as follows: call timeDiff.setStartTime() at the start of your script and call timeDiff.getDiff() at the end.
//The timeDiff.getDiff() function will return the script execution time.
var timeDiff = {
	setStartTime: function() {
		d = new Date();
		time = d.getTime();
	},
	getDiff: function() {
		d = new Date();
		return (d.getTime() - time);
	}
};

function applyFont() {
	if($("cssfontlist").value !== "") {
		changecss("textarea", "font-family", $("cssfontlist").value);
		changecss("input", "font-family", $("cssfontlist").value);
	}
	var els = $C("vernacular");
	if(LangMetaData["Direction"] === "rtl"){
		for(var i = 0, ilen = els.length; i < ilen; i++){
			$(els[i].id).classList.remove("ltr");
			$(els[i].id).classList.add("rtl");
		}
	} else {
		for(var i = 0, ilen = els.length; i < ilen; i++){
			$(els[i].id).classList.remove("rtl");
			$(els[i].id).classList.add("ltr");
		}
	}
	setWS();
}

function setFontSize(klass, v) {
	var n;//new value
	var c;
	var maxFS = 20;//max fontSize
	var minFS = 10;//min fontSize
	//var els = document.getElementsByClassName("fs", "textarea");
	switch(klass){
		case "review":
			c = parseInt($("review_inputs").value, 10);
		break;
		default:
			c = parseInt($("langdata_inputs").value, 10);
		break;
	}
	switch(v) {
		case "increase":
			if(c >= maxFS){
				c = maxFS;
			}
			n = c + 1;
			changecss(klass, "font-size", n + "pt");
		break;
		case "decrease":
			if(c <= minFS){
				c = minFS;
			}
			n = c - 1;
			changecss(klass, "font-size", n + "pt");
		break;
		default:
		return;
	}
	switch(klass){
		case "review":
			$("review_inputs").value = n;
		break;
		default:
			$("langdata_inputs").value = n;
		break;
	}
}

// get the best ActiveX object that can read XML
function getXMLObject() {
	// create an array with the XML ActiveX versions
	var aVersions = new Array("Msxml2.XMLHTTP.6.0","Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.3.0");

	//loop through the array until we can create an activeX control
	for(var i = 0; i < aVersions.length; i++) {
		// return when we can create the activeX control
		try {
			var oXML = new ActiveXObject(aVersions[i]);
			return oXML;
		}
		catch(e) {
		}
	}
	// could not create an activeX, return a null
	return null;
}

function loadFiles(files, group) {
	//this function is called from input elements of type="file" to load user selected files
	//the documents should be placed into the data folder before selecting them
	//all files should contain data encoded in UTF-8
	//import formats: plain text files, LIFT XML or SFM (MDF) files, Paratext USFM
	//XML files get converted to SFM files using XSLT transformations
	if(LangMetaData["LangName"] === "" || LangMetaData["LangID"] === ""){
		alert("You need to fill in the Language name and Language code first.");
		return false;
	}
	var tested_doc = "";
	var test_doc = "";
	var doc_format = "";
	var doc_source_format = "";
	InputDataFileNames.length = 0;
	user_message = "";
	for(var i = 0, flen = files.length; i < flen; i++) {
		var thisDoc = {};
		tested_doc, doc_format, doc_source_format = "";
		if(/.doc$|.docx$|.odt$|.rtf$/.test(files[i].name)){
			alert("This file format is not supported.\nPlease export the file to a text format and try again.");
			return;
		}
		//this works for Firefox, Safari and Chrome
		try {
			 // code to try
			xmlHttp = new XMLHttpRequest();
			xmlHttp.open("GET", "data/" + files[i].name, false); // Use syncronous communication
			xmlHttp.send(null);
			test_doc = xmlHttp.responseText;
		} catch (e) {
			// handle errors here
			alert("Error in loading file.\n" + e);
		}

		if(/^\\_sh/.test(test_doc) || (/MDF/.test(test_doc)) || (/\\lx/.test(test_doc)) ){
			//let's assume it's a Toolbox file
			tested_doc = test_doc;
			doc_format = "sfm";
			doc_source_format = "Toolbox";
			thisDoc["Title"] = "Dictionary";
			thisDoc["ShortTitle"] = "Dict";
			//end of Toolbox file test

		} else if(/^\\id/.test(test_doc)) {
			//let's assume it's a usfm document
			tested_doc = test_doc;
			doc_format = "usfm";
			doc_source_format = "Paratext";
			//end of usfm test

		} else if(/^\<\?xml/.test(test_doc)) {
			//let's assume its an xml file!
			if(/\<lift/.test(test_doc)){//Only LIFT xml supported so far.
				//we'll convert it into an json object
				var xml_doc = xmlHttp.responseXML;
				LangDict = xml2Obj(xml_doc);//conversion happens here
				LangMetaData["DictLIFTurl"] = "data/" + files[i].name;
				LangMetaData["DictJSONurl"] = "data/" + lang_name_lc + "_jsondict.js";
				doc_source_format = "LIFTxml";
				thisDoc["Title"] = "Dictionary";
				doc_format = "json";
			}//end of LIFT test

		} else {
			//let's assume its a plaintext file
			//now we have to test if its a word list or a text
			//Method: divide the number of lines by the number of separators
			//If the ratio is less than 1 then its probably a word list
			var reg5 = new XRegExp("\\p{Z}");
			var numTestDocSeparators = test_doc.split(reg5).length;
			var numTestDocLines = test_doc.split(/\r?\n/).length;
			//alert(numTestDocSeparators/numTestDocLines);
			//the ratio of lines to separators might have to be adjusted
			if(numTestDocSeparators/numTestDocLines < 1){
				//this file is probably a word list
				doc_format = "wordlist";
				doc_source_format = "text";
				thisDoc["Title"] = "Wordlist";
			} else {
				//this file is probably a text
				doc_format = "plaintext";
				doc_source_format = "text";
			}
			tested_doc = test_doc;
		}

		thisDoc["FileName"] = files[i].name;
		thisDoc["FileFormat"] = doc_format;//sfm,usfm,plaintext,wordlist
		thisDoc["Group"] = group;
		thisDoc["Source"] = tested_doc.replace(/\r?\n/g,"\n");
		thisDoc["LangID"] = LangMetaData["LangID"];
		thisDoc["SourceFileFormat"] = doc_source_format;//Toolbox,Paratext,LIFT,text
		thisDoc["GUID"] = Math.uuid(10);

		//check first to see if the text has been stored already
		var doc_exists_in_library = false;
		for(var entry = 0, elen = MasterLibraryCatalogue.length; entry < elen; entry++){
			if(MasterLibraryCatalogue[entry]["FileName"] === files[i].name){
				doc_exists_in_library = true;
			}
		}
		//if it doesn't exist yet
		if(doc_exists_in_library === false){
			if(thisDoc["SourceFileFormat"] !== "LIFTxml"){
				cleanText(thisDoc);
			}
			MasterLibraryCatalogue.push(thisDoc);
			//dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
			updateUITextsListing();
		}
	}
	dbSet(LangMetaData["LangID"] + "_MasterLibraryCatalogue", MasterLibraryCatalogue);
	checkLocalStorageSpaceRemaining();
}

/**
 * Removes unwanted formatting codes from structured texts
 * such as SFM and USFM inline codes
 * remove control codes, unwrap fields, etc.
 * @param {Object} thisDoc = an object that contains one text
 * WARNING: this function deletes content from source texts.
 */
function cleanText(thisDoc){
	var doc_array = [];
	var no_sfm_text = [];
	var cleaned_doc = [];
	var regex_control_codes = new XRegExp("[\\p{C}]", "g");
	doc_array = thisDoc["Source"].split(/[\r\n]/);
	doc_array = _.compact(doc_array);
	$("user_message" + thisDoc["Group"]).classList.add("is-none");
	$("user_message" + thisDoc["Group"]).innerHTML = "";

	if(thisDoc["FileFormat"] === "sfm"){
		//can come from either an MDF Toolbox or LIFT dictionary file
		cleaned_doc = [];
		for(var da = 0, dalen = doc_array.length; da < dalen; da++) {
			//check for control codes and remove them
			if(XRegExp("\\p{C}").test(doc_array[da])) {
				doc_array[da] = doc_array[da].replace(regex_control_codes, "");
			}
			//if the next array item does not start with a backslash
			//we add the contents to the current array element and delete the next one
			if(doc_array[da + 1] && /^\\/.test(doc_array[da + 1]) === false){
				doc_array[da] = " " + doc_array[da + 1];
				doc_array.splice(da+1,1);//delete next array element
				da--;
			}
			//to reduce storage size we're only going to keep:
			//lx, ps, pn, hm, sn, de, re, ge, dn, rn, gn, xv, xe, xn, is, sd
			if(    (/^\\lx\s+/.test(doc_array[da])) //lexeme
					|| (/^\\ps\s+/.test(doc_array[da])) //part of speech english
					|| (/^\\pn\s+/.test(doc_array[da])) //part of speech national
					|| (/^\\hm\s+/.test(doc_array[da])) //homonym
					|| (/^\\se\s+/.test(doc_array[da])) //sub-entry
					|| (/^\\de\s+/.test(doc_array[da])) //definition english
					|| (/^\\re\s+/.test(doc_array[da])) //reverse index english
					|| (/^\\ge\s+/.test(doc_array[da])) //gloss english
					|| (/^\\dn\s+/.test(doc_array[da])) //definition national
					|| (/^\\rn\s+/.test(doc_array[da])) //reverse national
					|| (/^\\gn\s+/.test(doc_array[da])) //gloss national
					|| (/^\\xv\s+/.test(doc_array[da])) //example vernacular
					|| (/^\\xe\s+/.test(doc_array[da])) //example english
					|| (/^\\xn\s+/.test(doc_array[da])) //example national
					|| (/^\\va\s+/.test(doc_array[da])) //variant
					|| (/^\\is\s+/.test(doc_array[da])) //index of semantics
					|| (/^\\sd\s+/.test(doc_array[da])) //semantic domain
				) {
				cleaned_doc.push(doc_array[da]);
			}
		}
		//overwrite the contents with the cleaned version
		thisDoc["Source"] = cleaned_doc.join("\n");

	} else if(thisDoc["FileFormat"] === "usfm"){ ///^\\id/.test(doc)) {
		//let's assume it's a Paratext USFM file
		//handles version 2.4; not sure about other standards
		cleaned_doc = [];
		var usfm_id = doc_array[0].split(" ");
		thisDoc["usfm_id"] = usfm_id[1];
		thisDoc["ShortTitle"] = usfm_id[1];
		for(var db = 0, dblen = doc_array.length; db < dblen; db++) {
			//get Main Title
			if(/^\\mt/.test(doc_array[db])){
				var temp = doc_array[db].split(" ");
				temp = _.rest(temp);
				thisDoc["Title"] = temp.join(" ");
			}
			//get chapter number
			if(/^\\c/.test(doc_array[db])) {
				temp = doc_array[db].split(" ");
				var s_chpt = temp[1];
			}
			//get verse number
			if(/^\\v/.test(doc_array[db])) {
				temp = doc_array[db].split(" ");
				var s_verse = temp[1];
			}
			var ref = thisDoc["usfm_id"]  + "_" + s_chpt + ":" + s_verse;
			//check for control codes and remove them
			//the next lines remove or replace characters in the text
			//TODO: should we ask the user to specify these??
			if(XRegExp("\\p{C}").test(doc_array[db])) {
				doc_array[db] = doc_array[db].replace(regex_control_codes, "");
			}

			//process the following fields:
			// \id = id line
			// \mt = main title
			// \st = short title
			// \s = section header
			// \c = chapter
			// \v = verses
			// \q* = poetry markers
			// \m = back to margin marker [only if it contains text]
			// \p = new paragraph marker [only if it contains text]
			if(    (/^\\v\s+/.test(doc_array[db]))   //verse
					|| (/^\\id\s+/.test(doc_array[db]))  //id
					|| (/^\\st\s+/.test(doc_array[db]))  //short title
					|| (/^\\mt\s+/.test(doc_array[db]))  //main title
					|| (/^\\c\s+/.test(doc_array[db]))   //chapter
					|| (/^\\s\s+/.test(doc_array[db]))   //section heading
					|| (/^\\q\d?\s+/.test(doc_array[db]))//poetry
					|| (/^\\m\s+/.test(doc_array[db]))   //main margin
					|| (/^\\p\s+.+/.test(doc_array[db])) //paragraph
					)
			{

				//Remove all inline markers. (They include closing markers)
				//From USFM Reference 2.4 Chapter 11
				//  Markers in this section:
				//  Special Text: \add...\add*, \bk...\bk*, \dc...\dc*, \k...\k*, \lit, \nd...\nd*, \ord...\ord*,
				//  \pn...\pn*, \qt..., \qt*, \sig...\sig*, \sls...\sls*, \tl...\tl*, \wj...\wj*
				//  Character Styling: \em...\em*, \bd...\bd*, \it...\it*, \bdit...\bdit*, \no...\no*, \sc...\sc*
				//  Spacing and Breaks: ~, //, \pb (not handled here yet)
				//  Special Features: \fig...\fig*, \ndx...\ndx*, \pro...\pro*, \w...\w*, \wg...\wg*, \wh...\wh*

				//SOLUTION: \\[a-uw-z]+\s+.*?\\[a-uw-z]+\*
				//  \\ = literal backslash
				//  [a-uw-z]+ = 1 or more alphabetic characters from a-z (omits v)
				//  \s+ = 1 or more spaces
				//  .*? = 1 or more characters of any kind (except new line)(? is the non-greedy version)
				//  (should we include an optional new line here?)
				//  \\ = a literal backslash
				//  [a-uw-z]+ = 1 or more alphabetic characters from a-z (omits v)
				//  \* = 1 asterisk
				//  \s* = any number of spaces

				//inline markers get removed here.
				//should handle all kinds of USFM version 2.4 inline markers as documented above.
				doc_array[db] = doc_array[db].replace(/\\[a-uw-z]+\s.*?\\[a-uw-z]+\*/g, "");
				//are these older inline standards and not USFM 2.4??
				//TODO: should these remove text up to the closing markers as well?
				doc_array[db] = doc_array[db].replace(/|f[a-z]?/, "");//handles: |f, |fa, |fb ...
				doc_array[db] = doc_array[db].replace(/\*f[a-z]?\*/, "");//handles: *f*, *fa*, *fb* ...

				//remove trailing spaces
				doc_array[db] = doc_array[db].replace(/\s+$/,"");
				//remove 2 or more spaces, replace with 1 space
				doc_array[db] = doc_array[db].replace(/\s{2,}/," ");

				doc_array[db] = doc_array[db].replace(/\|f/g, "");
				doc_array[db] = doc_array[db].replace(/\<\</g, "“");//“«
				doc_array[db] = doc_array[db].replace(/\>\>/g, "”");//”»
				doc_array[db] = doc_array[db].replace(/\</g, "‹");//‹ this is important because of html
				doc_array[db] = doc_array[db].replace(/\>/g, "›");//› this is important because of html

				//Now we do some checking for malformed data
				//2 single apostrophes is a no-no
				if(/\'\'/.test(doc_array[db])) {
					user_message += "<p>Error. Ref: " + ref + " contains double apostrophes. Replace them with double quotes in the source files and then import again. Source data: " + doc_array[da] + "<\/p>";
				}
				//check for orphaned inline marker elements that didn't get removed
				if(/.[\\\<\>\|\/\*]/.test(doc_array[db])) {
					user_message += "<p>Error. Ref: " + ref + " contains inline markers that are not formatted correctly. Fix the source data! Text: " + doc_array[db] + "<\/p>";
				}
				//store the results
				cleaned_doc.push(doc_array[db]);
			}
		}
		//overwrite the contents with the cleaned version
		thisDoc["Source"] = cleaned_doc.join("\n");

	} else if(thisDoc["FileFormat"] === "wordlist"){
		//let's assume its a plain text wordlist

	} else {//let's assume its a plain text file
		//find the title of the text
		if(/\\t\s+/.test(thisDoc["Source"])){
			//if the text file has a \t (for title of the text) then we use that
			//assumption is that the title is the first line of the file
			var ftitle = doc_array[0].split(" ");
			thisDoc["ShortTitle"] = ftitle[1];
			thisDoc["Title"] = _.rest(ftitle).join(" ");
		} else {
			var ftitle = doc_array[0].split(" ");
			thisDoc["ShortTitle"] = ftitle[0];//use the first word of the file as the short title
			thisDoc["Title"] = ftitle.join(" ");
		}
		//check for illegal or problematic characters
		for(var dc = 0, dclen = doc_array.length; dc < dclen; dc++) {
			doc_array[dc] = doc_array[dc].replace(/\<\</g, "«");//“«
			doc_array[dc] = doc_array[dc].replace(/\>\>/g, "»");//”»
			doc_array[dc] = doc_array[dc].replace(/\</g, "“");//“‹ this is important because of html
			doc_array[dc] = doc_array[dc].replace(/\>/g, "”");//”› this is important because of html
			if(XRegExp("\\p{C}").test(doc_array[dc])) {
				//check for control codes and remove them
				doc_array[dc] = doc_array[dc].replace(regex_control_codes, "");
			}

			//let's check for problematic characters
			//2 single apostrophes is a no-no
			if(/\'\'/.test(doc_array[dc])) {
				user_message += "<p>Error. Line: " + (dc + 1) + " contains double apostrophes. Replace them with double quotes in the source files and then import again. Source data: " + doc_array[dc] + "<\/p>";
			}
			//orphaned inline marker elements that didn't get removed
			if(/.[\\\<\>\|\/\*]/.test(doc_array[dc])) {
				user_message += "<p>Error. Line: " + (dc + 1) + " contains inline markers that are not formatted correctly. Fix the source data! Text: " + doc_array[dc] + "<\/p>";
			}
		}
		thisDoc["Source"] = doc_array.join("\n");
		//$("text" + thisDoc["Group"] + "success").innerHTML = "&#x2713; imported";
		//$("text_input" + thisDoc["Group"]).value += doc_array.join("\n") + "\n";
	}
	if(user_message.length > 0) {
		$("user_message" + thisDoc["Group"]).innerHTML = user_message;
		cssjs("remove", $("user_message" + thisDoc["Group"]), "is-none");
	}
	//MasterTextsCollection.push(tempText);
	//return thisDoc;
}

function removeSFMCodes(t){
	//assumption: at this point sfm codes only exist at the beginning of lines
	var changedText = t.replace(/\\id\s+.*\n/,"");//remove \id line
	changedText = changedText.replace(/\\[a-z0-9]+\s+/g, "");
	return changedText;
}

function parse_PlainText_File(doc) {
	//parses plain texts with no markup
	//assumes it is a story; splits on sentence final punctuation
	//create text object and add attributes to each element
	//creates a JSON object from a plain text file
	var text_array = [];
	var s_punct = getSentencePunct();
	var sf_punct = s_punct[2];
	if(sf_punct.length === 0) {
		//if the source data is a plain word list then there
		//may be no punctuation in the data
		//then we populate this var with at least one item, a period
		sf_punct.push(".");
	}
	var sm_punct = collectValues(MasterCharacterInventory, "CVCategory", "punctuation", "Item");
	var nums = collectValues(MasterCharacterInventory, "CVCategory", "number", "Item");
	var separator = collectValues(MasterCharacterInventory, "CVCategory", "separator", "Item");
	//sm_punct = _.difference(sm_punct, nums);
	var splitStuff = "";
	if(separator.length > 0){
		splitStuff = separator.join("");
	}
	if(sm_punct.length > 0) {
		splitStuff += "\\" + sm_punct.join("\\");
	}
	if(nums.length > 0) {
		splitStuff += nums.join("");
	}
	var splitRegEx = new RegExp("([\\s" + splitStuff + "]+)");
	var book = [];
	var temp = {};//temp stores each sentence with ref, text, word array
	var regex_sf = new RegExp("([\\" + sf_punct.join("\\") + "]+)");
	var doc_array = doc.split("\n");
	for(var k = 0, klen = doc_array.length; k < klen; k++) {
		//split on sentence punctuation
		var tempa = doc_array[k].split(regex_sf);
		tempa = _.compact(tempa);//remove empty elements
		text_array = text_array.concat(tempa);
	}
	//alert(text_array.join("\n"));

	//var re2 = new RegExp("[\\" + sm_punct.join("\\") + "]+");
	//alert("re1: " + re1 + "\nsplitRegEx: " + splitRegEx + "\ns_punct: " + s_punct);
	for(var j = 0, jlen = text_array.length; j < jlen; j++) {
		//general housecleaning
		if(regex_sf.test(text_array[j + 1])) {
			//remove sentence initial space and control codes
			text_array[j] = text_array[j].replace(/[\u0000-\u001F\u007F-\u009F\n]+/g, "").replace(/^\s*/, "");
			//put sentence final punctuation together with sentence
			text_array[j] = text_array[j] + text_array[j + 1];
			text_array.splice(j + 1, 1);
		}
	}
	var n_ref = 0;
	for(var i = 0, ilen = text_array.length - 1; i < ilen; i++) {
		n_ref++;
		temp = {};
		//temp.Ref = fname + ":" + n_ref;//with file name
		temp.Ref = n_ref;//sentence number only
		temp = populateTextContentObject(temp, text_array[i], splitRegEx);
		book.push(temp);
	}
	//alert(JSON.stringify(book));
	return book;
}

function parse_MDF_File(sfm_doc, fname) {
	//creates a JSON object from a MDF Toolbox dictionary file
	//extracts lx and ps fields to augment the MasterWordList
	//extracts xv field to store in MasterTextsCollection

	//housecleaning first: make all data in each field be on one line
	//removes line breaks in same field: puts multi-line field data into one line
	//results in each array element containing complete data from one field

	var xv_sentences = [];
	var xv_collection = [];
	var sm_punct = collectValues(MasterCharacterInventory, "CVCategory", "punctuation", "Item");
	if(sm_punct.length === 0) {
		sm_punct = [";"];
	}
	var nums = collectValues(MasterCharacterInventory, "CVCategory", "number", "Item");
	sm_punct = _.difference(sm_punct, nums);
	var splitRegEx = new RegExp("([\\s\\" + sm_punct.join("\\") + nums.join("") + "]+)");
	var sfm_array = sfm_doc.split("\n");
	var line = 0, lines = sfm_array.length;
	while(/^\\/.test(sfm_array[line + 1]) === false && line < lines - 1) {
		//next line does NOT begin with an sfm marker
		sfm_array[line] += " " + sfm_array[line + 1];
		sfm_array.splice(line + 1, 1);
		line++;
	}
	//add other sfm fields to end of next line
	sfm_filtered_array = _.filter(sfm_array, function(line) {
		return (/^\\lx/.test(line)) || (/^\\ps/.test(line)) || (/^\\xv/.test(line));
	});
	var temp = {};
	var s_punct = getSentencePunct();
	for(var i = 0; i < sfm_filtered_array.length; i++) {
		//extract the \lx and \ps fields
		//create JSON object from sfm fields
		if(/^\\lx/.test(sfm_filtered_array[i])) {
			//store data in processed_dict_file. conditions:
			//skips the first one
			//if not empty
			//no spaces in lexeme form = multi-word lexeme
			//or if its the end of the file
			if((i > 0 && temp.lx !== "" && (/\s/.test(temp.lx)) === false) || (i === (sfm_filtered_array.length - 1))) {
				processed_dict_file.push(temp);
				temp = {};
			}
			//TODO: how do we handle lexical phrases (more than 1 word)??
			var lx = sfm_filtered_array[i].substring(4);
			temp.lx = lx;
		}
		if(/^\\ps/.test(sfm_filtered_array[i])) {
			var ps = sfm_filtered_array[i].substring(4);
			temp.ps = [];
			if(ps !== "") {
				temp.ps[0] = ps;
			}
		}
		//store data when we come to the end of the array
		if(i === sfm_filtered_array.length - 1) {
			if(temp !== "") {
				processed_dict_file.push(temp);
			}
		}
		//handle other textual fields here
		if(/^\\xv/.test(sfm_filtered_array[i])) {//vernacular example sentence
			var xv_sentence = sfm_filtered_array[i].substring(4);
			//remove inline formatting codes (are there standards for these?)
			//inline formatting codes start. Matches: |[a-z]{, |b, |i, |r
			xv_sentence = xv_sentence.replace(/\|[a-z]+\{?/g, "");
			//Matches fv: (font vernacular)
			xv_sentence = xv_sentence.replace(/\fv:/g, "");
			//formatting code finish
			xv_sentence = xv_sentence.replace(/\}/g, "");
			xv_sentences.push(xv_sentence);//store xv sentence
		}
	}

	//collect ps fields into an array
	for(var j = 0; j < processed_dict_file.length - 1; j++) {
		while(processed_dict_file[j].lx === processed_dict_file[j + 1].lx) {
			var temp = processed_dict_file[j + 1]["ps"];
			temp = _.flatten(temp);
			temp = _.unique(temp);
			processed_dict_file[j]["ps"].push(temp);
			//processed_dict_file[j]["ps"] = _.flatten(processed_dict_file[j]["ps"]);
			//processed_dict_file[j]["ps"] = _.unique(processed_dict_file[j]["ps"]);
			processed_dict_file.splice(j + 1, 1);
		}
	}
	//alert(JSON.stringify(processed_dict_file));
	var n_ref = 0;
	for(var k = 0, klen = xv_sentences.length - 1; k < klen; k++) {
		temp = {};
		n_ref++;
		temp.Ref = "Dict:" + n_ref;
		//temp.Ref = "Dict:" + //with dict + lexeme
		temp = populateTextContentObject(temp, xv_sentences[k], splitRegEx);
		xv_collection.push(temp);
	}
	//alert("processed_dict_file: " + JSON.stringify(processed_dict_file));
	//$("dict").value = sfm_filtered_array.join("\n");
	return xv_collection;
}

function parse_USFM_File(doc) {
	//creates a JSON object from a usfm document
	var book = [];
	var temp = {};
	var s_id, s_c, s_verse, s_verseText = "";

	var sm_punct = collectValues(MasterCharacterInventory, "Punctuation", "sm", "Item");
	var sf_punct = collectValues(MasterCharacterInventory, "Punctuation", "sf", "Item");
	var all_punct = collectValues(MasterCharacterInventory, "CVCategory", "punctuation", "Item");
	var nums = collectValues(MasterCharacterInventory, "CVCategory", "number", "Item");
	var separator = collectValues(MasterCharacterInventory, "CVCategory", "separator", "Item");
	var splitStuff = "";
	if(separator.length > 0){
		splitStuff = separator.join("");
	}
	if(sm_punct.length > 0) {
		splitStuff += "\\" + all_punct.join("\\");
	}
	if(nums.length > 0) {
		splitStuff += nums.join("");
	}

	var splitRegEx = new RegExp("([\\" + splitStuff + "]+)");
	var regex_sf = new RegExp("([\\" + sf_punct.join("\\") + "]+)");
	var sfm_array = doc.split("\n");
	var temp_v = [];
	for(var line = 0, len = sfm_array.length; line < len; line++) {
		if(/^\\.\r\n/.test(sfm_array[line]) === false) {
			////now we remove any inline markers!!!
			////should handle all kinds of USFM version 2.4 inline markers.
			//sfm_array[line] = sfm_array[line].replace(/\\[a-uw-z]+\s.*?\\[a-uw-z]+\*/g, " ");
			////handles: |f, |fa, |fb ...
			//sfm_array[line] = sfm_array[line].replace(/|f[a-z]?/, "");
			////handles: *f*, *fa*, *fb* ...
			//sfm_array[line] = sfm_array[line].replace(/\*f[a-z]?\*/, "");
			if(/^\\id /.test(sfm_array[line])) {//book abbreviations
				var temp_id = sfm_array[line].split(" ");
				s_id = temp_id[1];
			}
			if(/^\\c/.test(sfm_array[line])) {//chapter numbers
				var temp_c = sfm_array[line].split(" ");
				s_c = temp_c[1];
				s_verse = "";
			}

			//now we look for sfm markers that contain text we want to keep

			//verse numbers can have variable length: \v 1, \v 10, \v 10,11, \v 110-112
			//so we split on spaces
			if(/^\\v [0-9\,\-]+/.test(sfm_array[line])) {
				temp_v = sfm_array[line].split(" ");
				s_verse = temp_v[1];
				s_verseText = _.rest(temp_v,2).join(" ");//.splice(2).join(" ");
			}
			//for markers: \q, \q2, \q3, \q4, \m, etc.
			//must be followed by a space and anything after that except nl
			if(/^\\[qm][1-4]? ./.test(sfm_array[line])) {
				temp_v = sfm_array[line].split(" ");
				s_verseText += " " + _.rest(temp_v,1).join(" ");
			}
			if(s_verse !== "" && s_c !== undefined) {
				//s_verseText = s_verseText.replace(/\s{2,}/, " ");
				//let's break the verse into sentence-sized chunks
				var aVerseText = s_verseText.split(regex_sf);
				aVerseText = _.compact(aVerseText);
				for(var ab = 0, ablen = aVerseText.length; ab < ablen; ab++){
					if(_.contains(sf_punct,aVerseText[ab])){
						aVerseText[ab-1] += aVerseText[ab];
						aVerseText.splice(ab,1);
						ab--;
					}
				}
				//if((/^\\v [0-9\,\-]+/.test(sfm_array[line + 1])) || (/^\\c/.test(sfm_array[line + 1]))) {
				for(var av = 0, avlen = aVerseText.length; av < avlen; av++){
					temp = {};
					temp.Ref = s_id + "_" + s_c + ":" + s_verse;
					temp = populateTextContentObject(temp, aVerseText[av], splitRegEx);
					book.push(temp);
				}
			}
		}
	}
	return book;
}

function populateTextContentObject(obj, content, splitRegEx) {
	//this function processes 1 text unit at a time
	var content_array = content.split(splitRegEx);
	obj.Text = _.compact(content_array);
	//obj.Text = content_array;
	var content_words = _.filter(content_array, function(item) {
		if(splitRegEx.test(item) === false)
			return item;
	});
	obj.Words = content_words;
	//var content_uwords = _.unique(content_words);
	//obj.UniqueWords = content_uwords;
	return obj;
}


// Case 	XML 	JSON 	Javascript access
// 1 	<animal /> 	"animal": true 	myObject.animal
// 2 	<animal>Deka</animal> 	"animal": "Deka" 	myObject.animal
// 3 	<animal name="Deka" /> 	"animal": {"@name": "Deka"} 	myObject.animal["@name"]
// 4 	<animal name="Deka">is my cat</animal> 	"animal": { "@name": "Deka", "keyValue": "is my cat" } 	myObject.animal["@name"], myObject.animal.keyValue
// 5 	<animal> <dog>Charlie</dog> <cat>Deka</cat> </animal> 	"animal": { "dog": "Charlie", "cat": "Deka" } 	myObject.animal.dog, myObject.animal.cat
// 6 	<animal> <dog>Charlie</dog> <dog>Mad Max</dog> </animal> 	"animal": { "dog": ["Charlie", "Mad Max"] } 	myObject.animal.dog[0], myObject.animal.dog[1]
// 7 	<animal> in my house <dog>Charlie</dog> </animal> 	"animal": { "keyValue": "in my house", "dog": "Charlie" } 	myObject.animal.keyValue, myObject.animal.dog
// 8 	<animal> in my ho <dog>Charlie</dog> use </animal> 	"animal": { "keyValue": "in my house", "dog": "Charlie" } 	myObject.animal.keyValue, myObject.animal.dog

function dbStoreInputDataFiles(group, fnames) {
	var keyName = "PLDS";//PreparingLanguageDataForSynPhony
	var keyLangName = "_";
	var keyTextGroup = "_TextGroup" + group;
	if(langname !== "") {
		keyLangName += langname;
	} else {
		keyLangName += "default";
	}
	var key = keyName + keyLangName + keyTextGroup;
	//var fnames = fname.name
	alert(fnames);
	dbSet(key, fnames.join(","));
}

function dbGetInputDataFiles() {
	var keyLangName = "_";
	if(langname !== "") {
		keyLangName += langname;
	} else {
		keyLangName += "default";
	}
	for(var i = 1; i < 7; i++) {
		return dbGet("PLDS" + keyLangName + "_TextGroup" + i);
	}
}

function selectFinalOutput() {
	$("final_output").focus();
	$("final_output").select();
}

/**
 * Creates a file object and opens the save As feature of the browser
 * to give the user the opportunity to save the data as a file
 * main drawback is that the user must understand the file system
 * and know where the file will be saved and then find it
 * TODO: figure out how to specify a path to use when saving the file
 * @param {String} file_format options: js,html
 */
function saveAsFile(file_format) {
	var content = "";//document.getElementById("final_output").value;
	var fName = "";
	switch(file_format) {
		case "synphony":
			fName = "SynPhony_" + lang_name + ".html";
			content = createSynPhonyHTMLFile();
		break;
		case "langdata":
			fName = lang_name_lc + "_lang_data.js";
			content = createJSONLangDataExport();
		break;
		default:
		break;
	}
	var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
	var obj_url = window.URL.createObjectURL(blob);
	saveAs(blob, fName);
}

function toggleMoreLangDataInfo() {
	if($("langmetadata-more").classList.contains("is-none")) {
		$("langmetadata-more").classList.remove("is-none");
		$("add_info").innerHTML = "&nbsp;-&nbsp;";
	} else {
		$("langmetadata-more").classList.add("is-none");
		$("add_info").innerHTML = "&nbsp;+&nbsp;";
	}
}

function setLangDict(data) {
	try {
		LangDict = data;
	}
	catch(e) {
	}
}

/**
 * url: http://davidwalsh.name/convert-xml-json
 * the recursive function which converts an XML Document to a JavaScript Object;
 * it will consider only the following node types and their attributes:
 * - Document,
 * - Element,
 * - Text,
 * - CDATASection;
 * all other informations will be lost!
 * it is a conscious choice.
 * please, see http://www.w3schools.com/dom/dom_nodetype.asp
 *
 * Modified by Norbert Rennert to eliminate the @attributes and @content fields
**/
function xml2Obj(oXMLNode) {
    // default value for empty elements;
    // it could be replaced with "null" instead of "true"... but i prefer so, because the truth is what appears :-)
    var vResult = true;
    // node attributes
    if (oXMLNode.attributes && oXMLNode.attributes.length > 0) {
        var iAttrib;
        vResult = {};
        //vResult["@attributes"] = {};//nr original
        for (var iAttrId = 0; iAttrId < oXMLNode.attributes.length; iAttrId++) {
            iAttrib = oXMLNode.attributes.item(iAttrId);
            //vResult["@attributes"][iAttrib.nodeName] = iAttrib.nodeValue;//nr original
            vResult[iAttrib.nodeName] = iAttrib.nodeValue;//nr
        }
    }
    // children
    if (oXMLNode.hasChildNodes()) {
        var iKey, iValue, iXMLChild;
        if (vResult === true) { vResult = {}; } // if above you have changed the default value, then it must be also replaced within this "if statement" in the same way...
        for (var iChild = 0; iChild < oXMLNode.childNodes.length; iChild++) {
            iXMLChild = oXMLNode.childNodes.item(iChild);
            if ((iXMLChild.nodeType & 7) === 1) { // nodeType is "Document" (9) or "Element" (1)
                iKey = iXMLChild.nodeName;
                iValue = xml2Obj(iXMLChild);
                if (vResult.hasOwnProperty(iKey)) {
                    if (vResult[iKey].constructor !== Array) { vResult[iKey] = [vResult[iKey]]; }
                    vResult[iKey].push(iValue);
                } else { vResult[iKey] = iValue; }
            } else if ((iXMLChild.nodeType - 1 | 1) === 3) { // nodeType is "Text" (3) or "CDATASection" (4)
                //iKey = "@content";//nr original
                iValue = iXMLChild.nodeType === 3 ? iXMLChild.nodeValue.replace(/^\s+|\s+$/g, "") : iXMLChild.nodeValue;
                //if (vResult.hasOwnProperty(iKey)) { vResult[iKey] += iValue; }//nr original
                //else if (iXMLChild.nodeType === 4 || iValue !== "") { vResult[iKey] = iValue; }//nr original
                if (iXMLChild.nodeType === 4 || iValue !== "") { vResult = iValue; }//nr
            }
        }
    }
    return(vResult);
}

function checkLocalStorageSpaceRemaining(){
	//check localStorage space
	//var usedStorage = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
	var usedStorageSpace = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
	localStorage.setItem("totalStorage", usedStorageSpace);
	//var storageSpace = localStorage.getItem("totalStorage");
	var percentageLeft = Math.round((usedStorageSpace / 5200000) * 100);
	$("localStorageSpaceBar").value = percentageLeft;
	$("storageLeft").innerHTML = percentageLeft + "% full";
	if(percentageLeft > 70){
		changecss("progress::-moz-progress-bar", "background-color", "red");
		changecss("progress::-webkit-progress-value", "background-color", "red");
	}
}