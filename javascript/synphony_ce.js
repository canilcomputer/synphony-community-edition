/* ============
 * SynPhony Community Edition 2016
 * http://creativecommons.org/publicdomain/zero/1.0/
 * To the extent possible under law, Canada Institute of Linguistics has waived all
 * copyright and related or neighboring rights to SynPhony Community Edition software and code.
 * This work is published from: Canada.
 *
 * DISCLAIMER: The Canada Institute of Linguistics has and does permanently relinquish
 * and waive all of its rights in the SynPhony Community Edition software and code
 * (the "SynPhony Community Edition Code") for the purpose of contributing to the
 * public domain, and for the benefit of the public, such that the public can build
 * upon, modify, incorporate in other works, reuse and redistribute the
 * SynPhony Community Edition Code as freely as possible in any form whatsoever
 * and for any purposes, including without limitation commercial purposes.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL
 * THE CANADA INSTITUTE OF LINGUISTICS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
 * FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Developed by: Norbert Rennert
 * email: nrennert@gmail.com
 *
 * ============
 */

(function() {
	'use strict';

	var aCase,
			activityType,
			allSynPhonyOptions,
			aPhonemeGroups,
			c_gpcs,
			cumulativeWordList,
			cur,
			currentGPC,
			default_user,
			scriptDir,
			finalNonWordArray,
			gpcs,
			gpcType,
			gpcsPageCounter,
			vowelsPageCounter,
			consonantsPageCounter,
			wiccPageCounter,
			wfccPageCounter,
			grapheme_in_focus,
			knownGPCs,
			known_graphemes,
			langName,
			letter_sounds,
			letterCheckBoxes,
			lexiconE,
			log_in_name,
			matched_gpc_words,
			puzzleType,
			pageTitle,
			plainFocusWordList,
			plainWordList,
			processedWords,
			processedWords_with_Defs,
			replaceGPCWithIPA,
			gpc2ipa,
			rankedText,
			readRight,
			readWrong,
			regGPCwords,
			scriptName,
			selectedVocabGroup,
			stopWords,
			runtimeSettings,
			textFiles,
			textsAreRanked,
			titleTag,
			time,
			user_name,
			v_gpcs,
			vocab_exposed_to,
			wordsInTable;

	aCase = [];
	activityType = "";
	aPhonemeGroups = [];
	c_gpcs = [];
	cumulativeWordList = [];
	cur = [];
	currentGPC = [];
	default_user = "";
	finalNonWordArray = [];
	gpcs = [];
	gpcType = "";
	grapheme_in_focus = "";
	knownGPCs = [];
	known_graphemes = [];
	letter_sounds = [];
	lexiconE = [];
	log_in_name = "";
	matched_gpc_words = [];
	puzzleType = "";
	plainFocusWordList = [];
	plainWordList = [];
	processedWords = [];
	processedWords_with_Defs = [];
	rankedText = [];
	readRight = [];
	readWrong = [];
	regGPCwords = [];
	selectedVocabGroup = [];
	stopWords = [];
	runtimeSettings = {};
	titleTag = "";
	textFiles = [];
	textsAreRanked = false;
	user_name = "";
	v_gpcs = [];
	vocab_exposed_to = [];
	wordsInTable = "";

	function addGPC(sName, item) {
		var aItem = [];
		if(item.indexOf(',') > 0) {
			aItem = item.split(',');
		} else {
			aItem.push(item);
		}
		if($(sName + "_" + item).checked === true) {
			if(aItem.length > 1) {
				knownGPCs = knownGPCs.concat(aItem);
			} else {
				knownGPCs.push(item);
			}
			currentGPC = aItem;
		}
		if($(sName + "_" + item).checked === false) {
			currentGPC.length = 0;
			knownGPCs = _.difference(knownGPCs, aItem);
			currentGPC[0] = knownGPCs[knownGPCs.length - 1];
		}
		dbSetUserData("knownGPCs", knownGPCs);
		dbSetUserData("currentGPC", currentGPC);
		run();
	}

	function focusOnPhonotactics(sKey, val) {
		currentGPC = val.split(",");
		var phonotacticWordList = [];
		var re = "";
		var groupVocab = lang_data["VocabularyGroups"];
		for(var i = 1; i <= groupVocab; i++){
			if(lang_data["group" + i] && $("group" + i).checked === true){
				switch(sKey) {
					case "wiv":
						phonotacticWordList = _.where(lang_data["group" + i], {"wiv": val});
					break;
					case "wmv":
						for(var j = 0, jlen = lang_data["group" + i].length; j < jlen; j++){
							if(_.contains(lang_data["group" + i][j]["wmv"], val )){
								phonotacticWordList.push(lang_data["group" + i][j]);
							}
						}
					break;
					case "wfv":
						phonotacticWordList = _.where(lang_data["group" + i], {"wfv": val});
					break;
					case "wic":
						phonotacticWordList = _.where(lang_data["group" + i], {"wic": val});
					break;
					case "wmc":
						for(var j = 0, jlen = lang_data["group" + i].length; j < jlen; j++){
							if(_.contains(lang_data["group" + i][j]["wmc"], val )){
								phonotacticWordList.push(lang_data["group" + i][j]);
							}
						}
					break;
					case "wfc":
						phonotacticWordList = _.where(lang_data["group" + i], {"wfc": val});
					break;
					case "wicc":
						phonotacticWordList = _.where(lang_data["group" + i], {"wicc": val});
					break;
					case "wfcc":
						phonotacticWordList = _.where(lang_data["group" + i], {"wfcc": val});
					break;
					case "wmcc":
						for(var j = 0, jlen = lang_data["group" + i].length; j < jlen; j++){
							if(_.contains(lang_data["group" + i][j]["wmcc"], val )){
								phonotacticWordList.push(lang_data["group" + i][j]);
							}
						}
					break;
					case "wivc":
						phonotacticWordList = _.where(lang_data["group" + i], {"wivc": val});
					break;
					case "wfvc":
						phonotacticWordList = _.where(lang_data["group" + i], {"wfvc": val});
					break;
					case "wmvc":
						for(var j = 0, jlen = lang_data["group" + i].length; j < jlen; j++){
							if(_.contains(lang_data["group" + i][j]["wmvc"], val )){
								phonotacticWordList.push(lang_data["group" + i][j]);
							}
						}
					break;
					default:
				}
			}
		}
		if( $("writingExerciseWords") && $("writingExerciseWords").checked === true){
			writingLayout("words", _.pluck(phonotacticWordList, "Name"));
			$("activity_title").innerHTML = "<span id='span_writing_practise'>Writing Practise <\/span>"+
				'<span class="" id="lesson">Lesson</span>';
		} else {
			displayList(phonotacticWordList);
		}
	}

	function getRestrictToTaughtGraphemes() {
		return ($("restrictToTaughtGraphemes") && $("restrictToTaughtGraphemes").checked === false) ? false : true;
	}

	function getAllowUpperCase() {
		return (dbGetUserData("allow_select_uppercase") === true);
	}

	function getSyllableLength() {
		return collectCheckedValues(document.getElementsByName("syllable_length"));
	}

	function getSelectedGroups() {
		return collectCheckedValues(document.getElementsByName("vocabGroupSelector"));
	}

	function getSelectedPartsOfSpeech() {
		if(document.getElementsByName("partofspeech")) {
			return collectCheckedValues(document.getElementsByName("partofspeech"));
		}
		return [];
	}

	function run(act) {
		try {
			dbStoreOptions();
			textsAreRanked = false;
			knownGPCs = dbGetUserData("knownGPCs");
			currentGPC = dbGetUserData("currentGPC");

			updateGPCCheckboxes(letterCheckBoxes);
			checkCheckboxesAreSelected();
			if(activityType !== "home" && activityType !== "settings" && activityType !== "reports") {
				if(knownGPCs.length > 0) {
					if($("showOnlyWithFocusLetter") && $("showOnlyWithFocusLetter").checked === true) {
						matched_gpc_words = selectWordsByGPC(currentGPC, knownGPCs, getRestrictToTaughtGraphemes(),
								getAllowUpperCase(), getSyllableLength(), getSelectedGroups(), getSelectedPartsOfSpeech());
						if(activityType === "storytool") {
							cumulativeWordList = selectWordsByGPC(knownGPCs, knownGPCs, getRestrictToTaughtGraphemes(),
									getAllowUpperCase(), getSyllableLength(), getSelectedGroups(), getSelectedPartsOfSpeech());
						}
					} else {
						if($("restrictToTaughtGraphemes") && $("restrictToTaughtGraphemes").checked === false) {
							matched_gpc_words = selectWordsByGPC(currentGPC, knownGPCs, getRestrictToTaughtGraphemes(),
									getAllowUpperCase(), getSyllableLength(), getSelectedGroups(), getSelectedPartsOfSpeech());
						} else {
							matched_gpc_words = selectWordsByGPC(knownGPCs, knownGPCs, getRestrictToTaughtGraphemes(),
									getAllowUpperCase(), getSyllableLength(), getSelectedGroups(), getSelectedPartsOfSpeech());
							cumulativeWordList = matched_gpc_words;
						}
					}
					$("activity_title").innerHTML = "";
					checkcss();
					switch(act){
						case "wordsearch":
							var tab = "\t\t\t";
							$("activity_controls").classList.remove("is-none");
							createPuzzle(plainWordList);
						break;
						case "lettergrid":
							$("activity_controls").classList.add("is-none");
							createLetterGrid(plainWordList);
						break;
						default:
							displayList(matched_gpc_words);
						break;
					}
				} else {
					$("activity_title").innerHTML = '<span id="no_words_processed" class="">No words processed.<\/span>';
					if($("lesson_area")) {
						$("lesson_area").innerHTML = "";
					}
				}
			}
		}
		catch(err) {
			$("lesson_area").innerHTML = err.message;
		}
	}

	function createRegExpFromKnownGPCS(aItems) {
		var temp = [];
		var temp2 = [];
		if(aCase) {
			for(var a = 0, len = aItems.length; a < len; a++) {
				if(aCase[aItems[a]]) {
					temp.push(aCase[aItems[a]]);
				}
			}
		}
		temp2 = aItems.concat(temp);
		var regString = "\\b(" + temp2.join("|") + ")\\b";
		var regString2 = regString.replace(/-/g, "\\-");
		regGPCwords = new RegExp(regString2, "g");
	}

	function updateGPCCheckboxes() {
		var temp = "";
		var label = "";
		var gpc_set = getElementsByClassName("gpc_checkbox", "input");
		var cluster_set = getElementsByClassName("cluster_checkbox", "input");
		var all_buttons_set = gpc_set.concat(cluster_set);
		var clusterBoxes = "";
		for(var i = 0, ilen = all_buttons_set.length; i < ilen; i++) {
			$("l_" + all_buttons_set[i].value).classList.remove("focus");
			if(_.contains(knownGPCs, all_buttons_set[i].value)) {
				all_buttons_set[i].checked = true;
				$("l_" + all_buttons_set[i].value).classList.add("active");
			} else {
				all_buttons_set[i].checked = false;
				$("l_" + all_buttons_set[i].value).classList.remove("active");
			}
		}
		for(var j = 0, jlen = gpc_set.length; j < jlen; j++) {
			if(gpc_set[j].value === currentGPC[0]) {
				$("l_" + gpc_set[j].value).classList.add("focus");
			}
		}
	}

	function checkcss() {
		if($("syllableBreak")){
			if($("syllableBreak").checked === true) {
				changecss(".sb", "display", "inline");
			} else {
				changecss(".sb", "display", "none");
			}
		}
		if($("stressPattern")){
			if($("stressPattern").checked === true) {
				changecss(".stress", "text-decoration", "underline");
				changecss(".stress", "font-weight", "bold");
			} else {
				changecss(".stress", "text-decoration", "none");
				changecss(".stress", "font-weight", "normal");
			}
		}
		if($("highlightGPC")) {
			if($("highlightGPC").checked === true) {
				changecss(".focus", "color", "red");
			} else {
				changecss(".focus", "color", "inherit");
			}
		}
		if($("assess")) {
			if($("assess").checked === true) {
				changecss("#assessment", "display", "block");
			} else {
				changecss("#assessment", "display", "none");
			}
		}
		if($("hide_c")) {
			if($("hide_c").checked === true) {
				changecss(".c", "display", "table-row");
			} else {
				changecss(".c", "display", "none");
			}
		}
		if($("hide_v")) {
			if($("hide_v").checked === true) {
				changecss(".v", "display", "table-row");
			} else {
				changecss(".v", "display", "none");
			}
		}
	}

	function hiliteClass(c) {
		var cl = getElementsByClassName(c);
		for(var i = 0, len = cl.length; i < len; i++) {
			cssjs("add", cl[i], "hl1");
		}
	}

	function normalClass(c) {
		var cl = getElementsByClassName(c);
		for(var i = 0, len = cl.length; i < len; i++) {
			cssjs("remove", cl[i], "hl1");
		}
	}

	function toggleHidden(c, el) {
		if($(el).checked === true) {
			switch(c) {
				case "tr.consonant" :
					changecss(c, "display", "table-row");
					break;
				case "tr.vowel" :
					changecss(c, "display", "table-row");
					break;
				case "tr.other" :
					changecss(c, "display", "table-row");
					break;
				case ".stats" :
					changecss(c, "display", "table-cell");
					break;
				case ".key" :
					changecss(c, "display", "inline");
					break;
				case ".gpcCellTotal" :
					changecss(c, "display", "inline");
					break;
				default:
					break;
			}
		} else {
			changecss(c, "display", "none");
		}
	}

	function addUniqueItemsToArray(Recipient, Donation) {
		var found = 0;
		for(var d = 0, dlen = Donation.length; d < dlen; d++) {
			for(var r = 0, rlen = Recipient.length; r < rlen; r++) {
				if(Donation[d].toString() === Recipient[r].toString()) {
					found = 1;
					break;
				}
			}
			if(found === 0) {
				Recipient.push(Donation[d]);
			}
		}
	}

	function addStringItemsToArray(ArrayName, Items) {
		var aItem = [];
		var found = 0;
		if(/\,/.test(Items) === true) {
			aItem = Items.split(',');
		} else {
			aItem.push(Items);
		}
		for(var a = 0; a < aItem.length; a++) {
			for(var i = 0; i < ArrayName.length; i++) {
				if(aItem[a] === ArrayName[i]) {
					found = 1;
					break;
				}
			}
			if(found === 0) {
				ArrayName.push(aItem[a]);
			}
		}
	}

	function displayList(focussedWordList) {
		var wordList = [];
		var gpcWord = [];
		var html_word = "";
		var recombined_wordlist = [];
		var stress = 0;
		plainWordList.length = 0;
		processedWords.length = 0;
		processedWords_with_Defs.length = 0;
		grapheme_in_focus = "";
		//replaceGPCWithIPA = dbGetUserData("replaceGPCWithIPA");
		for(var a = 0; a < currentGPC.length; a++) {
			if(/_/.test(currentGPC[a]) === true) {
				var temp = currentGPC[a].split('_');
				grapheme_in_focus += temp[1];
			} else {
				grapheme_in_focus += currentGPC[a];
			}
		}
		if(lang_data["HasCase"] === true){
			for(var i = 0; i < currentGPC.length; i++){
				for(var j = 0; j < lang_data["GPCS"].length; j++){
					if(lang_data["GPCS"][j]["GPC"] === currentGPC[i] && lang_data["GPCS"][j]["Category"] !== "other"){
						currentGPC.push(lang_data["GPCS"][j]["GPCuc"]);
					}
				}
			}
		}
		currentGPC = _.unique(currentGPC);
		if($("sortWordListOptions")) {
			var sortType = $("sortWordListOptions").value;
			switch(sortType) {
				case "alpha":
					focussedWordList = _.sortBy(focussedWordList, "Name");
					break;
				case "random":
					focussedWordList = _.shuffle(focussedWordList);
					break;
				case "from_end":
					focussedWordList = _.sortBy(focussedWordList, "Reverse");
					break;
				case "cvtype":
					focussedWordList = _.sortBy(focussedWordList, "WordShape");
					break;
				case "gpc_length":
					focussedWordList = _.sortBy(focussedWordList, function(w) {
						return w["Name"].length;
					});
					break;
				default:
			}
		}
		if(focussedWordList.length > 0) {
			var focus_GPC = [];
			var g = [];
			var sd = [];
			var splitD = "";
			for(var w = 0, wlen = focussedWordList.length; w < wlen; w++) {
				focussedWordList[w]["HTML"] = "";
				plainWordList.push(focussedWordList[w]["Name"]);
				gpcWord = focussedWordList[w]["GPCForm"];
				for(var l = 0, llen = gpcWord.length; l < llen; l++) {
					for(var c = 0, clen = currentGPC.length; c < clen; c++) {
						if(gpcWord[l] === currentGPC[c]) {
							focus_GPC[0] = currentGPC[c];
						}
					}
					if(gpcWord[l] === focus_GPC[0]) {
						html_word += '<span class="focus">' + gpcWord[l] + '<\/span>';
					} else {
						html_word += gpcWord[l];
					}
				}
				focussedWordList[w]["HTML"] = html_word;
				processedWords.push(html_word);
				html_word = "";
			}
		} else {
			if($("lesson_area")) {
				$("lesson_area").innerHTML =
					'<div style="font-size: 20px; margin-top: 2em;" class="userMessage">There are no words for the selection you just made. You can try several things.' +
					'<ol><li>Click on another letter<\/li>' +
					'<li>Make sure at least one syllable length checkbox is selected<\/li>' +
					'<li>Add another syllable length<\/li>' +
					'<li>Make sure at least one vocabulary group checkbox is selected<\/li>' +
					'<li>Select another vocabulary group checkbox.<\/li><\/ol><\/div>';
			}
		}

		switch(activityType) {
			case "wordlist":
				if( $("writingExerciseWords") && $("writingExerciseWords").checked === true){
						writingLayout("words");
						$("activity_title").innerHTML = '<span id="span_writing_practise">Word Writing Practise <\/span>'+
							'<span class="" id="lesson">Lesson</span>';
				} else if( $("writingExerciseLetters") && $("writingExerciseLetters").checked === true){
						writingLayout("letters");
						$("activity_title").innerHTML = "<span id='span_writing_practise'>Letter Writing Practise <\/span>"+
							'<span class="" id="lesson">Lesson</span>';
				} else {
					putVocabIntoTable(focussedWordList);
				}
				break;
			case "storytool":
				$("plain_words_list").innerHTML = plainWordList.join("<br \/>");
				$("activity_title").innerHTML = '<span id="lesson" class="">Lesson: <\/span>' + knownGPCs.length + '. <span id="the_focus_letter_is" class="">The focus letter is:<\/span> <strong>' +
						'<span id="focus_grapheme" class="focus">' + grapheme_in_focus + '<\/span><\/strong>';
				$("current_vocab").innerHTML = plainWordList.length;
				if($("story_input").value !== "") {
					checkStory(plainWordList);
				} else {
					$("story_output").innerHTML = "";
				}
				break;
			case "nonsense":
				if($("show_nonsense_words") && $("show_nonsense_words").checked === true) {
					runN();
				} else {
					if( $("writingExerciseWords") && $("writingExerciseWords").checked === true){
							writingLayout("words");
							$("activity_title").innerHTML = '<span id="span_writing_practise">Word Writing Practise <\/span>'+
								'<span class="" id="lesson">Lesson</span>';
					} else if( $("writingExerciseLetters") && $("writingExerciseLetters").checked === true){
							writingLayout("letters");
							$("activity_title").innerHTML = "<span id='span_writing_practise'>Letter Writing Practise <\/span>"+
								'<span class="" id="lesson">Lesson</span>';
					} else {
						putVocabIntoTable(focussedWordList);
					}
				}
				break;
			case "activities":
				$("activity_controls").classList.add("is-none");
				$("lesson_area").innerHTML = "Select an activity from the control panel";
			break;
			default:
				break;
		}
	}

	function randOrd(a, b) {
		return (Math.round(Math.random()) - 0.7);
	}

	function putVocabIntoTable(aItems, nonsense) {
		var col = 4;
		var cols = document.getElementsByName("col");
		col = collectCheckedValues(document.getElementsByName("col"));
		if(col[0] === "undefined") {
			cols[3].checked = true;
			col = 4;
		}
		var rows = Math.ceil(aItems.length / col);
		var i = 0;
		var html = '\n<table id="wordlist" class="' + scriptDir + ' col' + col + '" border="0" cellspacing="0" cellpadding="0">\n\t<tbody>';
		while(i < aItems.length) {
			for(var r = 0; r < rows; r++) {
				html += "\n\t<tr>";
				for(var td = 0; td < col; td++) {
					if(aItems[i]) {
						html += "\n\t\t<td>";
						if(!nonsense) {
								html += '<span class="word">' + aItems[i]["HTML"] + '<\/span><\/td>';
						} else {
							html += '<span class="nonsense">' + aItems[i] + '<\/span><\/td>';
						}
						i++;
					} else {
						html += "\n\t\t<td>&nbsp;<\/td>";
					}
				}
			}
			html += "<\/tr>";
		}
		wordsInTable = html + "\n\t<\/tbody>\n<\/table>\n";
		$("lesson_area").innerHTML = wordsInTable;

		var audio_path = "";
		if(letter_sounds[grapheme_in_focus]) {
			audio_path = letter_sounds[grapheme_in_focus];
		}
		var letter_name = "";
		if($(grapheme_in_focus)) {
			letter_name = $(grapheme_in_focus).title;
		}

		if($("restrictToTaughtGraphemes") && $("restrictToTaughtGraphemes").checked === true) {
			if($("showOnlyWithFocusLetter").checked == true) {
				if(audio_path === "") {
					$("activity_title").innerHTML = '<span id="lesson" class="">Lesson<\/span> ' + knownGPCs.length + ' &mdash; ' + matched_gpc_words.length + ' words. <span id="the_focus_letter_is" class="">The focus letter is:<\/span> ' + letter_name + '&nbsp;<strong><span id="focus_grapheme" class="focus">' + grapheme_in_focus + '<\/span><\/strong>';
				} else {
					$("activity_title").innerHTML = '<span id="lesson" class="">Lesson:<\/span> ' + knownGPCs.length + ' <span id="the_focus_letter_is" class="">The focus letter is: ' + letter_name + '&nbsp;<strong><span id="focus_grapheme" class="focus">' + grapheme_in_focus + '<\/span><\/strong>&nbsp;&nbsp;&nbsp;' + '<img src="graphics\/sound.png" onclick="playAudio(\'' + audio_path + '\');" \/>';
				}
			} else {
				if($("restrictToTaughtGraphemes") && $("restrictToTaughtGraphemes").checked === true) {
					$("activity_title").innerHTML = '<span id="cumulative_word_list_for" class="">Cumulative word list for ' + knownGPCs.length + ' <span id="lessons" class="">lessons<\/span> &mdash; ' + matched_gpc_words.length + ' words';
				}
			}
		} else {
			$("activity_title").innerHTML = aItems.length + '<span id="words_that_contain_a" class=""> words that contain a <\/span><strong><span id="focus_grapheme" class="focus">' + grapheme_in_focus + '<\/span><\/strong>';
		}
	}

	function playAudio(item) {
		var text = '<audio id="audiotag1" autoplay>' +
				'<source src="' + item + '.ogg" \/>' +
				'<\/audio>';
		var d = $("audiodiv");
		var newdiv = document.createElement("div");
		newdiv.setAttribute("id", "audio");
		newdiv.innerHTML = text;
	}

	function fullGPC2Regular(a) {
		var result = [];
		for(var i = 0; i < a.length; i++) {
			var temp = "";
			if(/_/.test(a[i]) === true) {
				var c = a[i].split("_");
				if(/-/.test(c[1]) === true) {
					var d = c[1].split("-");
					temp += d[0];
					a[i + 1] += d[1];
				} else {
					temp += c[1];
				}
			} else {
				temp += a[i];
			}
			result.push(temp);
		}
		return result;
	}

	function writingLayout(t,l){
		var list = [];
		var content = "";
		var fontName = " " + lang_data["FontName"];
		var dir = " " + lang_data["Direction"];
		if( $("writingExerciseLetters") && $("writingExerciseLetters").checked === false &&
				$("writingExerciseWords").checked === false){
					run();
					return;
		}
		switch(t){
			case "words":
				if($("writingExerciseLetters")){
					$("writingExerciseLetters").checked = false;
				}
				if(l){
					list = l;
				} else {
					list = plainWordList;
				}
			break;
			case "nonwords":
				if($("writingExerciseLetters")){
					$("writingExerciseLetters").checked = false;
				}
				list = finalNonWordArray;
			break;
			case "letters":
				if($("writingExerciseWords")){
					$("writingExerciseWords").checked = false;
				}
				if(lang_data["UseFullGPCNotation"] == true){
					list = fullGPC2Regular(knownGPCs);
				} else {
					list = knownGPCs;
				}
			break;
		}
		if(list.length > 0){
			for(var w = 0, wlen = list.length; w < wlen; w++) {
				content += "\n<div id='row_" + list[w] + "' class='writingExerciseLine" + fontName + "' title='Click to remove this line.' "+
					"onclick=\"hide(this.id);\">\n\t"+
					"<div class='asc" + fontName + "'>&nbsp;<\/div>\n\t"+
					"<div class='x" + fontName + "'>\n\t\t"+
					"<div class='text" + fontName + dir +"'>" + list[w] + "<\/div>\n\t"+
					"<\/div>\n\t"+
					"<div class='desc " + fontName + "'>&nbsp;<\/div>\n<\/div>";
			}
		}
		$("lesson_area").innerHTML = content;
	}

	function checkStory(plainwords) {
		timeDiff.setStartTime();
		var story = $("story_input").value;
		var story_vocab = [];
		var sight_words = [];
		var total_focusWords = 0;
		var total_decodableWords = 0;
		var total_possibleWords = 0;
		var total_sightWords = 0;
		var total_words = 0;
		if($("sight_words").value.length > 0) {
			sight_words = $("sight_words").value.split(' ');
			dbSetUserData("sightWordsForStoryTool", sight_words);
		}
		var re1 = new XRegExp("([\n\f\r\\p{Z}\\p{P}])");
		story_vocab = story.split(re1);
		var story_vocab_compacted = _.uniq(story_vocab);
		for(var s = 0; s < story_vocab.length; s++) {
			if(/\n/.test(story_vocab[s]) === true) {
				story_vocab[s] = story_vocab[s].replace(/\n/, "<br \/>\n");
			}
			if(XRegExp(re1).test(story_vocab[s]) === false && isNaN(story_vocab[s]) === true) {
				total_words++;
			}
		}

		var story_focus_words = [];
		var story_cumulative_words = [];
		var temp = [];
		for(var p = 0; p < plainWordList.length; p++) {
			for(var t = 0; t < story_vocab_compacted.length; t++) {
				if(plainWordList[p].toLowerCase() === story_vocab_compacted[t].toLowerCase()) {
					story_focus_words.push(plainWordList[p]);
					break;
				}
			}
		}
		temp = [];
		for(var c = 0; c < cumulativeWordList.length; c++) {
			temp.push(cumulativeWordList[c]["Name"]);
		}
		story_cumulative_words = _.intersection(temp, story_vocab);
		var re = new XRegExp("^(" + fullGPC2Regular(knownGPCs).join('|') + ")+$", "gi");
		if(knownGPCs.length !== 0) {
			for(var g = 0; g < story_vocab.length; g++) {
				if(story_vocab[g] === ' ')
					continue;
				if(story_vocab[g] === ',')
					continue;
				if(story_vocab[g] === ', ')
					continue;
				for(var f = 0; f < story_focus_words.length; f++) {
					if(story_vocab[g].toLowerCase() === story_focus_words[f].toLowerCase()) {
						story_vocab[g] = '<span class="fo">' + story_vocab[g] + ' <\/span>';
						total_focusWords++;
						break;
					}
				}
				for(var d = 0; d < story_cumulative_words.length; d++) {
					if(story_vocab[g].toLowerCase() === story_cumulative_words[d].toLowerCase()) {
						story_vocab[g] = '<span class="cu">' + story_vocab[g] + ' <\/span>';
						total_decodableWords++;
						break;
					}
				}
				if(lang_data["UseFullGPCNotation"] === false) {
					if(story_vocab[g] !== "<br \/>") {
						if(story_vocab[g].match(re)) {
							story_vocab[g] = '<span class="po">' + story_vocab[g] + ' <\/span>';
							total_possibleWords++;
						}
					}
				}
				if(sight_words.length > 0) {
					for(var h = 0; h < sight_words.length; h++) {
						if(story_vocab[g].toLowerCase() === sight_words[h].toLowerCase()) {
							story_vocab[g] = '<span class="sight">' + story_vocab[g] + ' <\/span>';
							total_sightWords++;
							break;
						}
					}
				}
			}
		}
		$("story_output").innerHTML = story_vocab.join("");
		$("story_check_time").innerHTML = timeDiff.getDiff() / 1000 + " seconds";
		dbSetUserData("lastCheckedStory", story);
	}

	function createPageLayout() {
		var login = '\n' + tab2 + '<span id="login_area">\n' + tab3 + '<span id="login_label" class="login" onclick="displayLogin();">[ Login ]<\/span>\n' + tab2 + '<\/span><!--end of login_area span-->\n\t';
		var menu_Bar = '\n\t<div id="menu_bar" class="menu">' + login + '\n\t<\/div><!--end of menu_bar div-->\n';
		var menu = '<ul>' +
				'\t<li class="circ" title="Home page" onclick="setActivityPage(\'home\');"><img class="menu home" src="graphics\/home.png" \/><\/li>\n' + tab2 +
				'<li class="circ" title="Word List page" onclick="setActivityPage(\'wordlist\');"><img class="menu words" src="graphics\/words.png" \/><\/li>\n' + tab2 +
				'<li class="circ" title="Nonsense Words Generator page" onclick="setActivityPage(\'nonsense\');"><img class="menu nonsense" src="graphics\/nonsense.png" \/><\/li>\n' + tab2;
		menu += '<li class="circ" title="Story Authoring Tool page" onclick="setActivityPage(\'storytool\');"><img class="menu story" src="graphics\/story.png" \/><\/li>\n' + tab2 +
				'<li class="circ" title="Activities page" onclick="setActivityPage(\'activities\');"><img class="menu games" src="graphics\/games.png" \/><\/li>\n' + tab2 +
				'<li class="circ" title="Reports page" onclick="setActivityPage(\'reports\');"><img class="menu reports" src="graphics\/reports.png" \/><\/li>\n' + tab2 +
				'<li class="circ" title="More Information" onclick="showHelp(\'help\/en_help_for_page_layout.html\');"><img src="graphics/help.png" \/><\/li>\n' +
				'<\/ul>' +
				'\t';
		$("top_bar").innerHTML = titleTag + menu_Bar;
		$("menu_bar").innerHTML = login + '\n\t' + menu;
		var control_panel = '\n' + tab4 + '<div id="control_panel" class="' + scriptDir + '"><\/div><!--end of control_panel div-->\n';
		var activity_area = '\n' + tab4 + '<div id="activity_area" class="' + scriptDir + ' ' + scriptName + '"><\/div><!--end of activity_area div-->\n' + tab3;
		var activity_controls = '\n' + tab4 + '<div id="activity_controls" class="ltr ' + activityType + '"><\/div><!--end of activity_controls div-->\n';
		if(scriptDir === "ltr") {
			$("panel_1").innerHTML = control_panel + tab3;
			$("panel_3").innerHTML = activity_controls + activity_area;
		} else {
			$("panel_3").innerHTML = control_panel + tab3;
			$("panel_1").innerHTML = activity_controls + activity_area;
		}
	}

	function onload() {
		scriptDir = lang_data["Direction"];
		scriptName = lang_data["ScriptName"];
		langName = lang_data["LangName"];

		document.title = "SynPhony CE for " + langName;
		titleTag = '<h3 id="title" class="title"><\/h1>';
		//$("ver").innerHTML = version;
		createPageLayout();
		//KZfviWtrRYVGIae("feedback on SynPhony");
		bXCJgCEflDtArWM();
		logMeIn();
		initializeSettings();
	}

	function initializeSettings() {
		if(dbGetUserData("settings") == null){
			runtimeSettings["knownGPCs"] = [];
			runtimeSettings["currentGPC"] = "";
			runtimeSettings["user"] = "default";
			runtimeSettings["uiLanguage"] = "en";
			runtimeSettings["setControlPanelWidth"] = 215;
			runtimeSettings["gpcsPageCounter"] = 0;
			runtimeSettings["vowelsPageCounter"] = 0;
			runtimeSettings["consonantsPageCounter"] = 0;
			runtimeSettings["wiccPageCounter"] = 0;
			runtimeSettings["wmccPageCounter"] = 0;
			runtimeSettings["wfccPageCounter"] = 0;
			runtimeSettings["wivcPageCounter"] = 0;
			runtimeSettings["wmvcPageCounter"] = 0;
			runtimeSettings["wfvcPageCounter"] = 0;
			runtimeSettings["setGPCFontSize"] = 16;
			runtimeSettings["displayOnePageOfGPCS"] = 50;
			runtimeSettings["preferredSequence"] = "ProductivityGPCSequence";
			runtimeSettings["customSequence"] = "";
			runtimeSettings["displayMaxSyllables"] = 4;
			runtimeSettings["displayMaxColumns"] = 4;
			runtimeSettings["orthographytesting"] = false;
			runtimeSettings["allowSelectUppercase"] = true;
			runtimeSettings["allowPhonotacticsButton"] = false;
			runtimeSettings["lastCheckedStory"] = "";
			runtimeSettings["sightWords"] = [];
			runtimeSettings["lastActivity"] = "home";
			runtimeSettings["setLessonFontSize"] = 24;

		}
		if(dbGetUserData("knownGPCs") == null) {
			knownGPCs = [];
			dbSetUserData("knownGPCs", knownGPCs);
		}
		if(dbGetUserData("currentGPC") == null) {
			currentGPC = "";
			dbSetUserData("currentGPC", currentGPC);
		}
		var user = "";
		if(user == null || user === "undefined")
			user = "default";

		if(dbGetUserData("uiLanguage") == null) {
			dbSetUserData("uiLanguage", "en");
		}
		if(dbGetUserData("setControlPanelWidth") == null) {
			dbSetUserData("setControlPanelWidth", 215);
		}
		if(dbGetUserData("gpcsPageCounter") == null) {
			dbSetUserData("gpcsPageCounter", 0);
			dbSetUserData("vowelsPageCounter", 0);
			dbSetUserData("consonantsPageCounter", 0);
			dbSetUserData("wiccPageCounter", 0);
			dbSetUserData("wfccPageCounter", 0);
			dbSetUserData("wmccPageCounter", 0);
			dbSetUserData("wivcPageCounter", 0);
			dbSetUserData("wfvcPageCounter", 0);
			dbSetUserData("wmvcPageCounter", 0);
		}
		if(dbGetUserData("setGPCFontSize") == null) {
			dbSetUserData("setGPCFontSize", 16);
		}
		if(dbGetUserData("displayOnePageOfGPCS") == null) {
			dbSetUserData("displayOnePageOfGPCS", 50);
		}
		if(dbGetUserData("preferredSequence") == null) {
			dbSetUserData("preferredSequence", "ProductivityGPCSequence");
		}
		if(dbGetUserData("customSequence") == null) {
			dbSetUserData("customSequence", "");
		}
		if(dbGetUserData("displayMaxSyllables") == null) {
			dbSetUserData("displayMaxSyllables", 4);
		}
		if(dbGetUserData("displayMaxColumns") == null) {
			dbSetUserData("displayMaxColumns", 4);
		}
		if(dbGetUserData("timedReadingLength") == null) {
			dbSetUserData("timedReadingLength", 0);
		}
		if(dbGetUserData("orthographytesting") == null) {
			dbSetUserData("orthographytesting", false);
		}
		if(dbGetUserData("allowSelectUppercase") == null) {
			dbSetUserData("allowSelectUppercase", true);
		}
		if(dbGetUserData("allowPhonotacticsButton") == null){
			dbSetUserData("allowPhonotacticsButton", false);
		}
		for(var i = 0; i < lang_data["GPCS"].length; i++) {
			if(lang_data["UseFullGPCNotation"] === false) {
				gpcs.push(lang_data["GPCS"][i]["GPC"]);
				if(lang_data["GPCS"][i]["Category"] === "vowel") {
					v_gpcs.push(lang_data["GPCS"][i]["GPC"]);
				}
				if(lang_data["GPCS"][i]["Category"] === "consonant") {
					c_gpcs.push(lang_data["GPCS"][i]["GPC"]);
				}
			} else {
				gpcs.push(lang_data["GPCS"][i]["GPC"]);
				if(lang_data["GPCS"][i]["Category"] === "vowel") {
					v_gpcs.push(lang_data["GPCS"][i]["GPC"]);
				}
				if(lang_data["GPCS"][i]["Category"] === "consonant") {
					c_gpcs.push(lang_data["GPCS"][i]["GPC"]);
				}
			}
		}
		knownGPCs = dbGetUserData("knownGPCs");
		if(knownGPCs === "" || knownGPCs == null) {
			knownGPCs = [];
		}
		activityType = dbGetUserData("lastActivity");
		if(activityType === "" || activityType == null) {
			activityType = "home";
		}
		setActivityPage(activityType);
	}

	function setActivityPage(a) {
		activityType = a;
		dbSetUserData("lastActivity", activityType);
		fillPageLayout(activityType);
		dbApplyOptions();

		if(activityType !== "reports" || activityType !== "settings") {
			run();
		}

		if(lang_data["FontList"] && lang_data["FontList"] !== "") {
			changecss("#activity_title #focus_grapheme", "font-family", lang_data["FontList"]);
			changecss(".gpc", "font-family", lang_data["FontList"]);
			changecss("#lesson_area", "font-family", lang_data["FontList"]);
			changecss("#GPCtable .g", "font-family", lang_data["FontList"]);
		} else {
			changecss("#activity_title #focus_grapheme", "font-family", lang_data["FontName"]);
			changecss(".gpc", "font-family", lang_data["FontName"]);
			changecss("#lesson_area", "font-family", lang_data["FontName"]);
			changecss("#GPCtable .g", "font-family", lang_data["FontName"]);
		}
	}

	//a way to time scripts.
	//from http://jdev.blogsome.com/2006/08/18/compact-script-to-calculate-script-execution-time/
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

	function fillPageLayout(activityType) {
		var tab = tab6;
		var tab1 = tab7;
		var tab2 = tab8;
		var spinners = "";
		var clearHistory = '\n' + tab6 + '<button id="clearHistory" class="" type="button" value="" onclick="eraseHistory();">Clear selected letters<\/button>\n';
		$("activity_area").innerHTML = "";
		$("activity_controls").innerHTML = "";
		$("panel_1").classList.remove("is-none");
		$("panel_2").classList.remove("is-none");
		$("panel_3").classList.remove("is-none");
		$("activity_controls").classList.add("is-none");

		if(scriptDir === "ltr") {
			$("panel_1").className = 'control_panel ltr';
			$("panel_2").className = 'toggle_panel ltr';
			$("panel_3").className = 'activity_panel ltr ' + activityType;
			$("panel_2").innerHTML = '<div id="panelToggle" class="vis ltr" onclick="hideControlPanel();">&nbsp;<\/div>';
		} else {
			$("panel_1").className = 'activity_panel rtl ' + activityType;
			$("panel_2").className = 'toggle_panel rtl';
			$("panel_3").className = 'control_panel rtl';
			$("panel_2").innerHTML = '<div id="panelToggle" class="vis rtl" onclick="hideControlPanel();">&nbsp;<\/div>';
		}
		if(dbGetUserData("setControlPanelWidth")) {
			changecss("#control_panel", "width", dbGetUserData("setControlPanelWidth") + "px");
		} else {
			changecss("#control_panel", "width", "215px");
			dbSetUserData("setControlPanelWidth", 215);
		}

		switch(activityType) {
			case "home" :
				$("title").innerHTML = "SynPhony Community Edition";
				$("panel_2").classList.add("is-none");
				if(scriptDir === "ltr") {
					$("panel_1").classList.add("is-none");
					$("panel_3").classList.remove("is-none");
					changecss("#panel_3", "padding", "20px");
				} else {
					$("panel_3").classList.add("is-none");
					$("panel_1").classList.remove("is-none");
					changecss("#panel_1", "padding", "20px");
				}
				$("activity_area").innerHTML += createActivityDivs(activityType, scriptDir);
				$("activity_title").innerHTML =
						'<h1><span id="homepage_welcome" class="">Welcome to<\/span>' +
						'<img src="graphics/synphony_ce.png" style="position: relative; top: 12px; margin: 0 5px; width: 200px;" \/>' +
						'<span id="homepage_langname" class="">for ' + langName + '<\/span></h1>' +
						'<h3 id="searchengine" class="">The search engine for literacy<\/h3>';
				$("lesson_area").innerHTML = '<div id="home_page_menu" class="home_page_menu"><\/div><!--end of div home_page_menu-->';
				$("home_page_menu").innerHTML = '<span class="splash_menu" title="Create Word Lists"><img src="graphics\/wordlists_big.png" onclick="setActivityPage(\'wordlist\');" \/><\/span>' +
						'<span class="splash_menu" title="Create Word Lists and Nonsense Words"><img src="graphics\/nonsensewords_big.png" onclick="setActivityPage(\'nonsense\');" \/><\/span>';

				$("home_page_menu").innerHTML += '<span class="splash_menu" title="Check a story for readability"><img src="graphics\/storytool_big.png" onclick="setActivityPage(\'storytool\');" \/><\/span>' +
						'<span class="splash_menu" title="Create Wordsearch puzzles and letter grids"><img src="graphics\/wordsearch_big.png" onclick="setActivityPage(\'activities\');" \/><\/span>' +
						'<span class="splash_menu" title="View some language facts in graphical form"><img src="graphics\/reports_big.png" onclick="setActivityPage(\'reports\');" \/><\/span>' +
						'<span class="splash_menu" title="Change settings for SynPhony CE"><img src="graphics\/settings_big.png" onclick="setActivityPage(\'settings\');" \/><\/span>' +
						"";
				break;

			case "settings":
				$("title").innerHTML = "SynPhony CE Settings";
				$("panel_2").classList.add("is-none");
				if(scriptDir === "ltr") {
					$("panel_1").classList.add("is-none");
					$("panel_3").classList.remove("is-none");
					changecss("#panel_3", "padding", "20px");
				} else {
					$("panel_3").classList.add("is-none");
					$("panel_1").classList.remove("is-none");
					changecss("#panel_1", "padding", "20px");
				}
				$("activity_area").innerHTML += createActivityDivs(activityType, "ltr");
				$("activity_title").innerHTML = '<h1>SynPhony CE Settings <span onclick="showHelp(\'help/en_help_for_synphony_settings.html\')" class="helpButton" title="Click to display help" style="float:none;display:inline-block;font-size:inherit;left: 10px;">?</span><\/h1><br \/>' +
						'<button type="button" onclick="storeUserSettings();" >Store Settings<\/button>&nbsp;&nbsp;' +
						'<button type="button" onclick="restoreDefaultSettings();" >Restore Default Settings<\/button>\n';

				var html = '<div id="settingsArea" class="ltr">';
				html += '<h3>Control Panel Settings<\/h3>' +
						'<div id="" class="settingsGroup">' +
						'<label for="setControlPanelWidth">Width of control panel:&nbsp;<input id="setControlPanelWidth" name="userSettings" class="userSettings" type="text" size="1" default="215" value="' + dbGetUserData('setControlPanelWidth') + '" \/>&nbsp;px<\/label>\n<br \/>' +
						'<label for="setGPCFontSize">Size of letter buttons font:&nbsp;<input id="setGPCFontSize" name="userSettings" class="userSettings" type="text" size="1" default="16" value="' + dbGetUserData('setGPCFontSize') + '" \/>&nbsp;px<\/label>\n<br \/>' +
						'<label for="displayOnePageOfGPCS">Number of letter buttons to display:&nbsp;<input id="displayOnePageOfGPCS" name="userSettings" class="userSettings" type="text" size="1" default="50" value="' + dbGetUserData('displayOnePageOfGPCS') + '" \/><\/label>\n<br \/>' +
						'<label for="displayMaxSyllables">Number of syllable checkboxes to display:&nbsp;<input id="displayMaxSyllables" name="userSettings" class="" type="text" size="1" default="4" value="' + dbGetUserData('displayMaxSyllables') + '" /><\/label>\n<br \/>' +
						'<label for="displayMaxColumns">Number of column checkboxes to display:&nbsp;<input id="displayMaxColumns" name="userSettings" class="" type="text" size="1" default="4" value="' + dbGetUserData('displayMaxColumns') + '" /><\/label>\n<br \/>';

				html += 'Preferred Button Sequence:<input id="preferredSequence" name="userSettings" class="userSettings" type="hidden" size="20" default="ProductivityGPCSequence" value="' + dbGetUserData('preferredSequence') + '" \/>\n<br \/>' +
						'<blockquote style="margin:0 0 10px 30px">' +
						'<label for="ProductivityGPCSequence">Productivity Sequence&nbsp;' +
						'<input id="ProductivityGPCSequence" name="chooseSeq" type="radio" value="" onclick="document.getElementById(\'preferredSequence\').value=\'ProductivityGPCSequence\';storeUserSettings();" \/><\/label>\n<br \/>' +
						'<label for="CustomSequence">Custom Sequence:&nbsp;' +
						'<input id="CustomSequence" name="chooseSeq" type="radio" value="" onclick="document.getElementById(\'preferredSequence\').value=\'CustomSequence\';storeUserSettings();" \/><\/label> ' +
						'<input id="customSequence" name="userSettings" type="text" onclick="document.getElementById(\'CustomSequence\").checked=true;" value="" \/>\n<br \/>';
				if(lang_data["RegularSpellings"] && lang_data["RegularSpellings"].length > 0) {
					html += '<label for="RegularGPCSOnly">&ldquo;Regular&rdquo; spellings only&nbsp;' +
							'<input id="RegularGPCSOnly" name="chooseSeq" type="radio" value="" onclick="document.getElementById(\'preferredSequence\').value=\'RegularGPCSOnly\';storeUserSettings();" \/><\/label>\n<br \/>' +
							'<label for="RegularGPCSFirst">&ldquo;Regular&rdquo; spellings first&nbsp;' +
							'<input id="RegularGPCSFirst" name="chooseSeq" type="radio" value="" onclick="document.getElementById(\'preferredSequence\').value=\'RegularGPCSFirst\';storeUserSettings();" \/><\/label>\n<br \/>';
				}
				html += '<\/blockquote>\n' +
						'<\/div><!--end of settingsGroup div-->';
				html += '<h3>Word Lists<\/h3>' +
						'<div id="" class="settingsGroup">' +
						'<label for="allowSelectUppercase">Allow displaying words with uppercase letters&nbsp;<input id="allowSelectUppercase" name="userSettings" class="userSettings" type="checkbox" onclick="storeUserSettings();" \/><\/label>' +
						'<\/div><!--end of settingsGroup div-->\n' + tab;
				html += '<h3>Phonotactic Control<\/h3>' +
						'<p>Phonotactic buttons let you select letters in specific positions; either word initial, ' +
						'word medial, or word final positions.<\/p>' +
						'<div id="" class="settingsGroup">' +
						'<label for="allowPhonotacticsButtons">Display Phonotactic Buttons (Nonsense Word Generator page only) <input id="allowPhonotacticsButtons" type="checkbox" name="userSettings" class="userSettings" onclick="storeUserSettings();" \/><\/label><br \/>' +
						'<\/div><!--end of settingsGroup div-->';
				$("lesson_area").innerHTML = html;
				if(dbGetUserData("orthographytesting")) {
					$("orthographytesting").checked = true;
				} else {
					$("orthographytesting").checked = false;
				}
				if(dbGetUserData("allowSelectUppercase")) {
					$("allowSelectUppercase").checked = true;
				} else {
					$("allowSelectUppercase").checked = false;
				}
				if($(dbGetUserData("preferredSequence"))) {
					$(dbGetUserData("preferredSequence")).checked = true;
				}
				if(dbGetUserData("customSequence") && dbGetUserData("customSequence") !== "") {
					$("customSequence").value = dbGetUserData("customSequence");
					$("customSequence").checked = true;
				} else {
					if(lang_data["CustomSequence"] && lang_data["CustomSequence"].length > 0) {
						$("customSequence").value = lang_data["CustomSequence"].join(" ");
						$("customSequence").checked = true;
					} else {
						$("customSequence").value = "";
						$("ProductivityGPCSequence").checked = true;
					}
				}
				if(dbGetUserData("allowPhonotacticsButtons") === true){
					$("allowPhonotacticsButtons").checked = true;
				}
				break;

			case "wordlist":
				if(scriptDir === "ltr") {
					changecss("#panel_3", "padding", "10px");
				} else {
					changecss("#panel_1", "padding", "10px");
				}
				$("activity_controls").classList.remove("is-none");
				$("title").innerHTML = "SynPhony CE Word Lists for " + lang_data["LangName"];
				$("control_panel").innerHTML = createHeaderDiv("options");
				$("options").innerHTML += createVocabGroupSelectors();
				$("options").innerHTML += createSyllableLengthCheckboxes();
				$("options").innerHTML += createRestrictWordsToTaughtGraphemes();
				$("options").innerHTML += createRestrictWordsToFocusLetter();
				$("options").innerHTML += createPartsOfSpeechCheckboxes();
				$("options").innerHTML += clearHistory;
				$("activity_controls").innerHTML = createColumnCheckboxes();
				$("activity_controls").innerHTML += createTextResizeButtons("lesson_area");
				$("activity_controls").innerHTML += createWordListSortSelect();
				$("activity_controls").innerHTML += createOtherOptions();
				$("activity_controls").innerHTML += '<button id="elementSelector" onclick="selectElementContents(\'lesson_area\');"> &#x2714; Select Words <\/button>\n';
				$("activity_controls").innerHTML += tab5 + '<span><label id="label_writingExerciseWords" for="writingExerciseWords" class="">Word writing practise: <input id="writingExerciseWords" type="checkbox" onclick="writingLayout(\'words\');" /></label><label id="label_writingExerciseLetters" for="writingExerciseLetters" class="">Letter writing practise: <input id="writingExerciseLetters" type="checkbox" onclick="writingLayout(\'letters\');" /><\/label><\/span>\n';
				$("activity_controls").innerHTML += createHelpButton("activity_controls");
				$("control_panel").innerHTML += createHeaderDiv("gpcs");
				$("gpcs_header").innerHTML += createGPCPagingController("gpcs");
				$("gpcs_gpc").innerHTML = createLetterButtons("gpcs") + tab5;
				$("activity_area").innerHTML += createActivityDivs(activityType, scriptDir);
				checkCheckboxesAreSelected();
				break;

			case "storytool":
				if(scriptDir === "ltr") {
					changecss("#panel_3", "padding", "10px");
				} else {
					changecss("#panel_1", "padding", "10px");
				}
				$("activity_controls").classList.remove("is-none");
				tab = tab5;
				$("title").innerHTML = "SynPhony Story Checking Tool for " + lang_data["LangName"];
				$("control_panel").innerHTML = createHeaderDiv("options");
				$("control_panel").innerHTML += createHeaderDiv("gpcs");
				$("gpcs_header").innerHTML += createGPCPagingController("gpcs");
				$("activity_controls").innerHTML = 'Legend: <span class="fo ">Focus<\/span>&nbsp;<span class="cu">Good<\/span>&nbsp;<span class="po">Possible<\/span>&nbsp;<span class="sight">Sight Word<\/span>';
				$("activity_controls").innerHTML += createHelpButton('activity_controls');
				$("gpcs_gpc").innerHTML = createLetterButtons("gpcs");
				$("options").innerHTML += createVocabGroupSelectors();
				$("options").innerHTML += createSyllableLengthCheckboxes();
				$("options").innerHTML += createPartsOfSpeechCheckboxes();
				$("options").innerHTML += createRestrictWordsToFocusLetter();
				$("options").innerHTML += clearHistory;
				$("activity_area").innerHTML += createActivityDivs(activityType, scriptDir);
				$("activity").innerHTML += tab + '<table id="story_area" border="0" cellpadding="0" cellspacing="5">\n<tbody>\n<tr>\n<td id="left_story_area"><\/td>\n<td id="right_story_area">\n<\/td>\n<\/tr>\n<\/tbody>\n<\/table><!--end of story_area table-->\n' + tab4;
				$("left_story_area").innerHTML = tab + '<div id="vocab">\n' + tab + createHeaderDiv('sight_words') + tab + '\t<textarea id="sight_words" name="sight_words" class="sight_words ' + scriptDir + ' is-none" lang="' + lang_data["LangID"] + '"><\/textarea>\n';
				$("left_story_area").innerHTML += tab + '\t<h1><span id="current_vocab" class="current_vocab">0<\/span> Target Words<\/h1>\n';
				$("left_story_area").innerHTML += tab + '\t<div id="plain_words_list" class="' + scriptDir + ' gpc" lang="' + lang_data["LangID"] + '"><\/div>\n' + tab + '<\/div><!--end of vocab div-->\n';
				$("right_story_area").innerHTML = tab + '<div id="story_io">\n' + tab + '	<h1>Story</h1>\n' + tab + '	<textarea id="story_input" name="story_input" class="' + scriptDir + '" lang="' + lang_data["LangID"] + '"></textarea><br \/>\n';
				$("right_story_area").innerHTML += tab + '<div>\n\t<input value="Check Story" onclick="run();" type="button" \/>\n<span id="story_check_time" class=""><\/span><\/div>\n';
				$("right_story_area").innerHTML += tab + '<div id="story_output" name="story_output" class="' + scriptDir + ' gpc" lang="' + lang_data["LangID"] + '"><\/div>\n' + tab + '<\/div><!--end of story_io div-->\n' + tab;
				$("story_input").value = dbGetUserData("lastCheckedStory");
				$("sight_words").value = dbGetUserData("sightWordsForStoryTool");
				break;

			case "nonsense":
				if(scriptDir === "ltr") {
					changecss("#panel_3", "padding", "10px");
				} else {
					changecss("#panel_1", "padding", "10px");
				}
				$("activity_controls").classList.remove("is-none");
				$("control_panel").innerHTML = createHeaderDiv("options");
				$("options").innerHTML = "\n" + tab;
				$("options").innerHTML += createVocabGroupSelectors();
				$("options").innerHTML += createSyllableLengthCheckboxes();
				$("options").innerHTML += createRestrictWordsToFocusLetter();
				$("options").innerHTML += createShowRealWordsCheckbox();
				$("options").innerHTML += createShowNonsenseWordsCheckbox();
				$("options").innerHTML += clearHistory;
				$("control_panel").innerHTML += createHeaderDiv("syllableshapes");
				if(lang_data["ScriptType"] === "alpha") {
					$("control_panel").innerHTML += createHeaderDiv("vowels");
					$("vowels_header").innerHTML += createGPCPagingController("vowels");
					$("vowels_gpc").innerHTML += createLetterButtons("vowels");
					$("control_panel").innerHTML += createHeaderDiv("consonants");
					$("consonants_header").innerHTML += createGPCPagingController("consonants");
					$("consonants_gpc").innerHTML += createLetterButtons("consonants");
					if(dbGetUserData("allowPhonotacticsButtons") === true){
						if(lang_data["wiv"].length > 0 || lang_data["wmv"].length > 0 || lang_data["wfv"].length > 0){
							$("control_panel").innerHTML += createHeaderDiv("separator_vowels");
						}
						if(lang_data["wiv"] && lang_data["wiv"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wiv");
							$("wiv_header").innerHTML += createGPCPagingController("wiv");
							$("wiv_gpc").innerHTML += createLetterButtons("wiv");
						}
						if(lang_data["wmv"] && lang_data["wmv"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wmv");
							$("wmv_header").innerHTML += createGPCPagingController("wmv");
							$("wmv_gpc").innerHTML += createLetterButtons("wmv");
						}
						if(lang_data["wfv"] && lang_data["wfv"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wfv");
							$("wfv_header").innerHTML += createGPCPagingController("wfv");
							$("wfv_gpc").innerHTML += createLetterButtons("wfv");
						}
						if(lang_data["wic"].length > 0 || lang_data["wmc"].length > 0 || lang_data["wfc"].length > 0){
							$("control_panel").innerHTML += createHeaderDiv("separator_consonants");
						}
						if(lang_data["wic"] && lang_data["wic"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wic");
							$("wic_header").innerHTML += createGPCPagingController("wic");
							$("wic_gpc").innerHTML += createLetterButtons("wic");
						}
						if(lang_data["wmc"] && lang_data["wmc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wmc");
							$("wmc_header").innerHTML += createGPCPagingController("wmc");
							$("wmc_gpc").innerHTML += createLetterButtons("wmc");
						}
						if(lang_data["wfc"] && lang_data["wfc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wfc");
							$("wfc_header").innerHTML += createGPCPagingController("wfc");
							$("wfc_gpc").innerHTML += createLetterButtons("wfc");
						}

						if(lang_data["wivc"].length > 0 || lang_data["wmvc"].length > 0 || lang_data["wfvc"].length > 0){
							$("control_panel").innerHTML += createHeaderDiv("separator_vowel_cluster");
						}
						if(lang_data["wivc"] && lang_data["wivc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wivc");
							$("wivc_header").innerHTML += createGPCPagingController("wivc");
							$("wivc_gpc").innerHTML += createLetterButtons("wivc");
						}
						if(lang_data["wmvc"] && lang_data["wmvc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wmvc");
							$("wmvc_header").innerHTML += createGPCPagingController("wmvc");
							$("wmvc_gpc").innerHTML += createLetterButtons("wmvc");
						}
						if(lang_data["wfvc"] && lang_data["wfvc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wfvc");
							$("wfvc_header").innerHTML += createGPCPagingController("wfvc");
							$("wfvc_gpc").innerHTML += createLetterButtons("wfvc");
						}
						if(lang_data["wicc"].length > 0 || lang_data["wmcc"].length > 0 || lang_data["wfcc"].length > 0){
							$("control_panel").innerHTML += createHeaderDiv("separator_cons_cluster");
						}
						if(lang_data["wicc"] && lang_data["wicc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wicc");
							$("wicc_header").innerHTML += createGPCPagingController("wicc");
							$("wicc_gpc").innerHTML += createLetterButtons("wicc");
						}
						if(lang_data["wmcc"] && lang_data["wmcc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wmcc");
							$("wmcc_header").innerHTML += createGPCPagingController("wmcc");
							$("wmcc_gpc").innerHTML += createLetterButtons("wmcc");
						}
						if(lang_data["wfcc"] && lang_data["wfcc"].length > 0) {
							$("control_panel").innerHTML += createHeaderDiv("wfcc");
							$("wfcc_header").innerHTML += createGPCPagingController("wfcc");
							$("wfcc_gpc").innerHTML += createLetterButtons("wfcc");
						}
					}
				}
				if(lang_data["ScriptType"] === "syll") {
					$("control_panel").innerHTML += createHeaderDiv("gpcs");
					$("gpcs_header").innerHTML += createGPCPagingController("gpcs");
					$("gpcs_gpc").innerHTML = createLetterButtons("gpcs") + tab5;
				}
				$("title").innerHTML = "SynPhony Nonsense Word Generator for " + lang_data["LangName"];
				$("activity_controls").innerHTML = createColumnCheckboxes();
				$("activity_controls").innerHTML += createTextResizeButtons("lesson_area");
				$("activity_controls").innerHTML += createWordListSortSelect();
				$("activity_controls").innerHTML += createOtherOptions();
				$("activity_controls").innerHTML += '<button id="elementSelector" onclick="selectElementContents(\'lesson_area\');"> &#x2714; Select Words <\/button>';
				$("activity_controls").innerHTML += tab5 + '<label for="writingExerciseWords">Writing practise: <input type="checkbox" class="" onclick="run();" id="writingExerciseWords" /></label>';
				$("activity_controls").innerHTML += createHelpButton("activity_controls");
				$("activity_area").innerHTML += createActivityDivs(activityType, scriptDir);
				break;

			case "activities":
				tab = tab6;
				if(scriptDir === "ltr") {
					changecss("#panel_3", "padding", "10px");
				} else {
					changecss("#panel_1", "padding", "10px");
				}
				$("activity_controls").classList.remove("is-none");
				$("title").innerHTML = "Activities for " + lang_data["LangName"];
				$("control_panel").innerHTML = createHeaderDiv("options");
				$("options").innerHTML = "\n" + tab;
				$("options").innerHTML += createVocabGroupSelectors();
				$("options").innerHTML += createSyllableLengthCheckboxes();

				$("control_panel").innerHTML += createHeaderDiv("lettergrid");
				$("lettergrid").innerHTML += '\n' + tab + '<div id="changeChartSize">Chart Size:\n' + tab + '	<select id="chartsize" class="option" name="chart_size" size="" type="select-one" onchange="run(\'lettergrid\');">\n' + tab + '		<option value="25">5 x 5<\/option>\n' + tab + '		<option value="36">6 x 6<\/option>\n' + tab + '		<option value="49" selected="selected">7 x 7<\/option>\n' + tab + '		<option value="64">8 x 8<\/option>\n' + tab + '		<option value="81">9 x 9<\/option>\n' + tab + '		<option value="100">10 x 10<\/option>\n' + tab + '		<option value="121">11 x 11<\/option>\n' + tab + '		<option value="144">12 x 12<\/option>\n' + tab + '	<\/select>\n' + tab + '<\/div><!--end of changeChartSize div-->\n' + tab;
				$("lettergrid").innerHTML += '\n' + tab + '<div id="changeGridTextSize">Font Size:&nbsp;&nbsp;\n' + tab + '	<select id="letterGridFontSize" class="option" name="letterGridFontSize" type="select-one" onchange="run(\'lettergrid\');">\n' + tab + '		<option value="2">2</option>\n' + tab + '		<option value="3">3</option>\n' + tab + '		<option value="4">4</option>\n' + tab + '		<option value="5" selected="selected">5</option>\n' + tab + '		<option value="6">6</option>\n' + tab + '		<option value="7">7</option>\n' + tab + '		<option value="8">8</option>\n' + tab + '		<option value="9">9</option>\n' + tab + '	</select>\n' + tab + '<\/div><!--end of changeTextSize div-->\n' + tab5;
				$("lettergrid").innerHTML += tab + '<label for="lc"><input id="lc" class="option" value="lc" type="checkbox" onclick="run(\'lettergrid\');" checked="checked" \/>lower case<\/label>&nbsp;&nbsp;&nbsp;&nbsp;\n' + tab + '<label for="uc"><input id="uc" class="option" value="uc" type="checkbox" onclick="run(\'lettergrid\');" \/>UPPER CASE<\/label><br \/>\n' + tab + '<label for="use_all"><input id="use_all" class="option" type="checkbox" onclick="run(\'lettergrid\');" \/>Use all letters<\/label><br \/>\n' + tab + '<input id="custom1_checkbox" class="option" type="checkbox" onclick="run(\'lettergrid\');" \/><input id="custom1" name="custom" type="text" value="1 2 3 4 5 6 7 8 9 0" size="7" \/>&nbsp;&nbsp;\n' + tab + '<input id="custom2_checkbox" class="option" type="checkbox" onclick="run(\'lettergrid\');" \/><input id="custom2" name="custom" type="text" value=". , ! ? \'" size="6" \/>\n' + tab + '<button id="createLetterGrid" type="button" value="" onclick="run(\'lettergrid\');">Create a Letter Grid<\/button><br \/>\n' + tab5;

				$("control_panel").innerHTML += createHeaderDiv("wordsearch");
				$("activity_controls").innerHTML = tab + '<label for="numRows">Rows: <input id="numRows" class="option" value="10" size="1" maxlength="3" type="text" \/> <\/label>\n' + tab +
						'<label for="numCols">Cols: <input id="numCols" class="option" value="10" size="1" maxlength="3" type="text" \/> <\/label>&nbsp;&nbsp;&nbsp;\n' + tab +
						'<label for="wordGridFontSize">Font Size: \n' + tab +
						'	<select id="wordGridFontSize" class="option" name="wordGridFontSize" type="select-one" onchange="run(\'wordsearch\');">\n' + tab + '		<option value="2">2<\/option>\n' + tab + '		<option value="3">3<\/option>\n' + tab + '		<option value="4" selected="selected">4<\/option>\n' + tab + '		<option value="5">5<\/option>\n' + tab + '		<option value="6">6<\/option>\n' + tab + '		<option value="7">7<\/option>\n' + tab + '		<option value="8">8<\/option>\n' + tab + '		<option value="9">9<\/option>\n' + tab +
						'	<\/select>\n' + tab +
						'<\/label>&nbsp;&nbsp;&nbsp;<!--end of wordGridFontSize-->\n';
				$("activity_controls").innerHTML += tab + '<label for="showOnlyWithFocusLetter"><input id="showOnlyWithFocusLetter" class="option" name="showOnlyWithFocusLetter" value="" onclick="run(\'wordsearch\');" type="checkbox" \/>Use all words to<\/label>\n' + tab +
						'<label for="maxWords">max <input id="maxWords" class="option" name="maxWords" type="text" value="40" size="1" maxlength="2" \/><\/label>&nbsp;&nbsp;&nbsp;\n' + tab +
						'<label for="sortAlpha">Sort A-Z:<input id="sortAlpha" class="option" name="sortAlpha" value="true" type="checkbox" onclick="run(\'wordsearch\');" \/><\/label>&nbsp;&nbsp;&nbsp;\n' + tab +
						'<label for="lowerCase">lower case:<input id="lowerCase" class="option" name="lowerCase" value="true" type="checkbox" onclick="run(\'wordsearch\');" checked="checked" \/><\/label>&nbsp;&nbsp;&nbsp;\n' + tab +
						'<label for="useLetters">Use wordlist letters only:<input id="useLetters" class="option" name="useLetters" value="true" type="checkbox" onclick="run(\'wordsearch\');" \/><\/label>\n' + tab +
						'<select id="BorF" class="option" name="BorF" onchange="run(\'wordsearch\');">\n' + tab +
						'	<option value="fonly" selected="selected">&rarr; Forwards only<\/option>\n' + tab +
						'	<option value="regular">&harr; Forwards and Backwards<\/option>\n' + tab +
						'	<option value="bonly">&larr; Backwards only<\/option>\n' + tab +
						'<\/select>\n' + tab +
						'<select id="diag" class="option" name="diag" onchange="run(\'wordsearch\');">\n' + tab +
						'	<option value="nodiag" selected="selected">&times; No diagonal words<\/option>\n' + tab +
						'	<option value="diagonly">Diagonal words only<\/option>\n' + tab +
						'	<option value="diag">Mixed directions<\/option>\n' + tab +
						'<\/select>\n' + tab +
						'<select id="uand" class="option" name="upanddown" onchange="run(\'wordsearch\');">\n' + tab +
						'	<option value="nouand" selected="selected">&harr; Horizontal words only<\/option>\n' + tab +
						'	<option value="uandonly">&#x2195; Vertical words only<\/option>\n' + tab +
						'	<option value="uand">&harr;&#x2195; Mixed directions<\/option>\n' + tab +
						'<\/select>\n' + tab +
						'<label id="gridStyleArrayDiv">Grid shape:\n' + tab + '<\/label><!--end of gridStyleArrayDiv div-->\n' + tab;
				$("gridStyleArrayDiv").innerHTML = createPuzzleGridStyle();
				$("wordsearch").innerHTML += '<div id="puzzleOptionsButtons"><\/div>';
				$("puzzleOptionsButtons").innerHTML += '<button id="createWordSearch" type="button" value="" onclick="run(\'wordsearch\');">Create a new puzzle<\/button>\n' + tab5;
				$("puzzleOptionsButtons").innerHTML += '<button id="elementSelector" onclick="selectElementContents(\'lesson_area\');"> &#x2714; Select Puzzle <\/button>';
				if(lang_data["ScriptType"] === "alpha") {
					$("control_panel").innerHTML += createHeaderDiv("vowels");
					$("vowels_header").innerHTML += createGPCPagingController("vowels");
					$("vowels_gpc").innerHTML += createLetterButtons("vowels") + tab5;
					$("control_panel").innerHTML += createHeaderDiv("consonants");
					$("consonants_header").innerHTML += createGPCPagingController("consonants");
					$("consonants_gpc").innerHTML += createLetterButtons("consonants") + tab4;
				}
				if(lang_data["ScriptType"] === "syll") {
					$("control_panel").innerHTML += createHeaderDiv("gpcs");
					$("gpcs_header").innerHTML += createGPCPagingController("gpcs");
					$("gpcs_gpc").innerHTML = createLetterButtons("gpcs") + tab5;
				}
				$("activity_area").innerHTML += createActivityDivs(activityType, scriptDir);
				break;

			case "reports":
				tab = tab5;
				if(scriptDir === "ltr") {
					changecss("#panel_3", "padding", "10px");
				} else {
					changecss("#panel_1", "padding", "10px");
				}
				$("activity_controls").classList.add("is-none");
				$("control_panel").innerHTML = createHeaderDiv("options");
				$("options").innerHTML += '\n' + tab + '<div id="reports" name="reports" action="">\n' + tab + '<button id="graph_freq1" name="graph_freq1" value="" onclick="' +
						'buildGraphemeFrequencyTable();">Create Frequency Chart</button>\n' +
						tab + '<button id="gpc_chart1" name="gpc_chart1" value="" onclick="' +
						'buildGPCTable();" >Create Spelling Patterns Chart</button>\n' +
						tab + '<button id="prod_chart1" name="prod_chart1" value="" onclick="' +
						'buildProductivityChart();" >Create Productivity Chart</button><br>\n' +
						tab + '<button id="prod_chart1" name="prod_chart1" value="" onclick="' +
						'buildProductivityChart(\'cumulative\');" >Create Cumulative Chart</button><br>\n' +
						tab + '<\/div>\n';
				$("title").innerHTML = "Language Reports for " + lang_data["LangName"];
				$("activity_area").innerHTML = createHelpArea();
				$("activity_area").innerHTML += '\n' + tab + '<div id="activity" class="' +
						activityType + '">\n' + tab + '<div id="activity_title" class="ltr"><\/div>\n' +
						tab + '<div id="lesson_area" class="' + scriptDir + '" lang="' + lang_data["LangID"] + '"><\/div>\n' + tab +
						'<\/div>\n' + tab4;
				$("activity_title").innerHTML = '<h1 id="h1_reports" class="">Reports<\/h1>';
				$("lesson_area").innerHTML = '<span id="click_button_to_create_report" class="">Click on a button to create a report.<\/span>';
				break;
			default:
				break;
		}
	}

	function createPuzzleGridStyle() {
		var html = "\n";
		html += tab7 + 'Grid shape:\n' + tab7 + '<select id="gridStyle" class="option" onchange="run();">\n' + tab7 + '<option value="square">Square<\/option>\n';
		for(var i = 0; i < gridStyleArray.length; i++) {
			html += tab7 + '	<option value="' + gridStyleArray[i] + '">' + gridStyleArray[i] + '<\/option>\n';
		}
		html += tab7 + "<\/select>\n" + tab6;
		return html;
	}

	function vocabGroupsExist() {
		var hasVocabGroups = [];
		var el = 10;
		for(var i = 1; i < el; i++) {
			if(typeof (lang_data["group" + i]) === "object") {
				for(var j in lang_data["group" + i]) {
					if(lang_data["group" + i][j].length >= 1) {
						hasVocabGroups.push(i);
						break;
					}
				}
			}
		}
		return hasVocabGroups;
	}

	function createVocabGroupSelectors() {
		var aGroups = vocabGroupsExist();
		var isChecked = "checked";
		var display = "removeFromScreen";
		var titleAttrib;
		if(aGroups.length > 1) {
			display = "";
		}
		if(lang_data["VocabularyGroupsDescriptions"]) {
			titleAttrib = lang_data["VocabularyGroupsDescriptions"];
		} else {
			titleAttrib = new Array(aGroups.length);
		}
		var html = '\n' + tab6 + '<div id="vocab_list" class="' + display + ' options_div">Vocabulary group: ';
		for(var i = 0; i < aGroups.length; i++) {
			html += '<label for="group' + aGroups[i] + '" class="" title="' + titleAttrib[i] + '">' + aGroups[i] + '<input id="group' + aGroups[i] + '" class="option" name="vocabGroupSelector" title="' + titleAttrib[i] + '" value="group' + aGroups[i] + '" type="checkbox" onclick="run();" checked="' + isChecked + '" \/><\/label>';
			isChecked = "";
		}
		html += "<\/div><!--end of vocab_list div-->\n";
		return html;
	}

	function createSyllableLengthCheckboxes() {
		var nMax = parseInt(dbGetUserData("displayMaxSyllables"), 10);
		var nMin = lang_data["Syllables"][0];
		var html = tab6 + '<div id="syll_length" class="options_div ">Syllables:\n' + tab6 +
				'<span>\n' + tab6;
		for(var i = nMin; i <= nMax; i++) {
			html += '		<label for="syll' + i + '" class="">' + i + '<input id="syll' + i + '" class="option" name="syllable_length" value="' + i + '" onclick="run();" type="checkbox" /><\/label>\n' + tab6;
		}
		html += '	<\/span>\n' + tab6 + '<\/div><!--end of syll_length div-->\n';
		return html
	}

	function createPartsOfSpeechCheckboxes() {
		var tab = tab6;
		var html = "";
		var a_ps = ["v", "n", "adj", "adv", "ad", "prep", "art", "conj"];
		var ok_ps = [];
		if(lang_data["HasPartsOfSpeech"] && lang_data["HasPartsOfSpeech"].length > 0) {
			ok_ps = _.intersection(a_ps, lang_data["HasPartsOfSpeech"]);
			html = '<div id="partsofspeech" class=" options_div">Parts of Speech:\n' + tab;
			var psTitle = "";
			for(var i in ok_ps) {
				var ps = ok_ps[i];
				html += '<label for="ps_' + ps + '" class="" title="' + ps + '">' + ps + '<input id="ps_' + ps + '" class="option" name="partofspeech" value="' + ps + '" onclick="run();" type="checkbox" \/><\/label> \n';
			}
			html += '<\/span><!--end of partsofspeech div--><br \/>\n';
		}
		return html;
	}

	function createRestrictWordsToFocusLetter() {
		var html = tab6 + '<div class="options_div"><label id="label_showOnlyWithFocusLetter" for="showOnlyWithFocusLetter" class="">Show only words that contain the focus letter: <input id="showOnlyWithFocusLetter" class="option" name="showOnlyWithFocusLetter" value="" onclick="run();" type="checkbox" \/><\/label><\/div>\n' + tab5;
		return html;
	}

	function createRestrictWordsToTaughtGraphemes() {
		var html = tab6 + '<div class="options_div"><label id="label_restrictToTaughtGraphemes" for="restrictToTaughtGraphemes" class="">Show only words with letters that have been selected: <input id="restrictToTaughtGraphemes" class="option" name="restrictToTaughtGraphemes" value="" onclick="run();" type="checkbox" checked="checked" \/><\/label><\/div>\n';
		return html;
	}

	function createShowNonsenseWordsCheckbox() {
		var html = tab6 + '<div class="options_div"><label id="label_show_nonsense_words" for="show_nonsense_words" class="">Show nonsense words: <input id="show_nonsense_words" class="option" name="show_nonsense_words" value="" onclick="run();" type="checkbox" \/><\/label><\/div>\n';
		return html;
	}

	function createShowRealWordsCheckbox() {
		var html = tab6 + '<div class="options_div"><label id="label_show_real_words" for="show_real_words" class="">Show real words: <input id="show_real_words" class="option" name="show_real_words" value="" onclick="run();" type="checkbox" \/><\/label><\/div>\n';
		return html;
	}

	function createWordListSortSelect() {
		var html = '<span><select id="sortWordListOptions" class="option" name="sortWordListOptions" onchange="run();" type="select-one" style="height: 20px; font-size: 10pt;" \/>' +
				'<option value="default" selected="selected">Default sort<\/option>' +
				'<option value="alpha">Sort A-Z<\/option>' +
				'<option value="random">Sort randomly<\/option>' +
				'<option value="from_end">Sort from end<\/option>' +
				'<option value="cvtype">Sort by CV form<\/option>' +
				'<option value="gpc_length">Sort by length<\/option>' +
				'<\/select><\/span>\n' + tab5;
		return html;
	}

	function createOtherOptions() {
		var html = '<span><label for="highlightGPC">Highlight: <input id="highlightGPC" class="option" name="highlightGPC" value="" onclick="run();" type="checkbox" checked="checked" \/><\/label><\/span>\n' + tab5;
		if(lang_data["StressSymbol"] && lang_data["StressSymbol"] !== "") {
			html += '<span><label for="stressPattern">Show stress: <input id="stressPattern" class="option" name="stressPattern" value="" onclick="run();" type="checkbox" \/><\/label><\/span>\n' + tab5;
		}
		if(lang_data["SyllableBreak"] && lang_data["SyllableBreak"] !== "") {
			html += '<span><label for="syllableBreak">Show syllable break: <input id="syllableBreak" class="option" name="syllableBreak" value="" onclick="run();" type="checkbox" \/><\/label><\/span>\n' + tab5;
		}
		return html;
	}

	function createColumnCheckboxes() {
		var display = parseInt(dbGetUserData('displayMaxColumns'), 10);
		var html = '\n' + tab5 + '<span id="columns" class="">Columns:\n' + tab5;
		for(var i = 1; i <= display; i++) {
			html += '	<label for="col' + i + '">' + i + '<input id="col' + i + '" class="option" name="col" value="' + i + '" onclick="run();" type="radio" \/><\/label>\n' + tab5;
		}
		html += '<\/span><!--end of columns span-->\n';
		return html;
	}

	function createConnectedTextButton() {
		var html = tab5 + '<button id="showReadableTextButton" class="" onclick="showReadableText(0);">Find Readable Text<\/button>\n';
		return html;
	}

	function createTextResizeButtons(el) {
		var html = tab5 + '<span id="changeTextSize" class="">Text size:\n' + tab5 +
				'\t<button class="changeFSize" onclick="setFontSize(\'' + el + '\',\'decrease\')" title="Click to make the text smaller"><img src="graphics/minus.png" \/><\/button>' +
				'<button class="changeFSize" onclick="setFontSize(\'' + el + '\',\'increase\')" title="Click to make the text larger"><img src="graphics/plus.png" \/><\/button>\n' + tab5 +
				'<\/span><!--end of changeTextSize span-->\n' + tab5;
		return html;
	}

	function createLetterButtons(group) {
		var html = "\n";
		var letters = [];
		var func = "";
		var class_name = "";
		var iStart = 0;
		var iEnd = 0;
		var keyword = "";
		var g = "";
		var p = "";
		var gpcseq = [];
		var ccc = [];
		var temp;
		if(lang_data["CombiningGraphemes"] && lang_data["CombiningGraphemes"].length > 0) {
			ccc = lang_data["CombiningGraphemes"];
		}

		var preferredSequence = dbGetUserData("preferredSequence");
		switch(preferredSequence) {
			case "RegularGPCSOnly" : {
				gpcseq = lang_data["RegularSpellings"];
				break;
			}
			case "RegularGPCSFirst" : {
				var reg = lang_data["RegularSpellings"];
				temp = _.difference(lang_data["ProductivityGPCSequence"], reg);
				gpcseq = reg.concat(temp);
				break;
			}
			case "CustomSequence" : {
				var custom = [];
				if(dbGetUserData("customSequence") !== "") {
					custom = dbGetUserData("customSequence").split(" ");
				}
				temp = _.difference(lang_data["ProductivityGPCSequence"], custom);
				gpcseq = custom.concat(temp);
				break;
			}
			case "ProductivityGPCSequence" : {
				gpcseq = lang_data["ProductivityGPCSequence"];
				break;
			}
			default : {
				gpcseq = lang_data["ProductivityGPCSequence"];
				break;
			}
		}

		var displayOnePageOfGPCS = parseInt(dbGetUserData("displayOnePageOfGPCS"), 10);
		var temp_vowels = _.where(lang_data["GPCS"], {"Category": "vowel"});
		temp_vowels = _.pluck(temp_vowels, "GPC");
		var temp_cons = _.where(lang_data["GPCS"], {"Category": "consonant"});
		temp_cons = _.pluck(temp_cons, "GPC");
		var temp_other = _.where(lang_data["GPCS"], {"Category": "other"});
		temp_other = _.pluck(temp_other, "GPC");
		switch(group) {
			case "gpcs":
				letters = gpcseq;
				func = "addGPC";
				class_name = "gpc_checkbox";
			break;
			case "vowels":
				letters = _.difference(gpcseq, temp_cons);
				func = "addGPC";
				class_name = "gpc_checkbox";
			break;
			case "consonants":
				letters = _.difference(gpcseq, temp_vowels, temp_other);
				func = "addGPC";
				class_name = "gpc_checkbox";
			break;

			default:
			break;
		}

		var pageCounter = dbGetUserData(group + "PageCounter") ? parseInt(dbGetUserData(group + "PageCounter"), 10) : 0;
		iStart = pageCounter * displayOnePageOfGPCS;
		iEnd = iStart + displayOnePageOfGPCS;
		$(group + "PageNumber").innerHTML = pageCounter + 1;
		if(displayOnePageOfGPCS < letters.length) {
			$(group + "pagecontrol").classList.remove("is-none");
		} else {
			$(group + "pagecontrol").classList.add("is-none");
		}
		if(pageCounter <= 0) {
			pageCounter = 0;
		}
		if(pageCounter > 0) {
			$(group + "_spinner_l").classList.remove("is-none");
		} else {
			$(group + "_spinner_l").classList.add("is-none");
		}
		if(iEnd < letters.length) {
			$(group + "_spinner_r").classList.remove("is-none");
		} else {
			$(group + "_spinner_r").classList.add("is-none");
		}
		for(var i = iStart, ilen = (iStart + displayOnePageOfGPCS); i < ilen; i++) {
			if(i < letters.length){
				var letter = letters[i];
				g = "";
				if(/\,/.test(letter) === true) {
					var aItem = letter.split(",");
					for(var j = 0; j < aItem.length; j++) {
						if(/\_/.test(aItem[j]) === true) {
							temp = aItem[j].split("_");
							p += temp[0];
							g += temp[1];
						} else {
							g = aItem.join("");
						}
					}
				} else {
					if(/\_/.test(letter) === true) {
						temp = letter.split("_");
						p = temp[0];
						g = temp[1];
					} else {
						if(_.contains(ccc, letter)) {
							g = "\u25CC" + letter;
						} else {
							g = letter;
						}
					}
				}

				keyword = "";
				if(group !== "wicc" && group !== "wfcc") {
					if(keyword === "") {
						keyword = getKeyWord(letter);
					}
				}
				if(keyword === "") {
					keyword = "-";
				}
			html += tab6 +
					'<input type="checkbox" id="' + group + "_" + letter + '" name="' + group + '" class="' + class_name + '" value="' + letter + '" onclick="' + func + '(this.name,this.value);" \/>' +
					'<label for="' + group + "_" + letter + '" id="l_' + letter + '" class="gpc ' + scriptDir + ' ' + group + ' " lang="' + lang_data["LangID"] + '" title="As in: ' + keyword + '"><span>' + g + '<\/span><\/label>\n';
			}
		}
		return html + tab5;
	}

	function getKeyWord(gpc) {
		var group = 4;
		var syll = 10;
		var item = [];
		for(var i = 1; i < group; i++) {
			for(var j = 1; j < syll; j++) {
				if(/\,/.test(gpc) === false) {
					try {
						if(lang_data["group" + i][gpc + "__" + j]) {
							item.push(lang_data["group" + i][gpc + "__" + j][0]["Name"]);
						}
					}
					catch(e) {
					}
				}
				if(item.length > 0) {
					return item;
				}
			}
		}
	}

	function paginationController(dir, sGroup) {
		var html = "";
		var cur, onePage;
		cur = parseInt(dbGetUserData(sGroup + "PageCounter"), 10);
		onePage = parseInt(dbGetUserData("displayOnePageOfGPCS"), 10);
		var gpcGroup = sGroup;
		switch(sGroup){
			case "gpcs" : gpcGroup = "GPCS"; break;
		}
		switch(dir) {
			case "decrement" :
				cur = cur - 1;
				if(cur < 0) {
					dbSetUserData(sGroup + "PageCounter", 0);
					cur = 0;
				} else {
					dbSetUserData(sGroup + "PageCounter", cur);
				}
			break;
			case "increment" :
				if((cur * onePage) < lang_data[gpcGroup].length) {
					dbSetUserData(sGroup + "PageCounter", cur + 1);
				} else {
					dbSetUserData(sGroup + "PageCounter", cur);
				}
			break;
			default:
			break;
		}
		html = createLetterButtons(sGroup);
		$(sGroup + "_gpc").innerHTML = html;
		updateGPCCheckboxes(letterCheckBoxes);
	}

	function createHelpButton(content) {
		var sFile = "";
		var uiLang = dbGetUserData("uiLanguage");
		var localizedFile = "help/" + uiLang + "_help_for_" + activityType + "_" + content + ".html";
		var html = tab5 + '<span class="helpButton" onclick="showHelp(\'' + localizedFile + '\'); if(event.stopPropagation){event.stopPropagation();}event.cancelBubble=true;">?<\/span>\n' + tab5;//&#x2370;
		return html;
	}

	function createGPCPagingController(el) {
		var html = '<span id="' + el + 'pagecontrol" class=""><span id="' + el + '_spinner_l" class="spinners less is-none" data-index="" title="Previous set of letters" onclick="paginationController(\'decrement\',\'' + el + '\'); if(event.stopPropagation){event.stopPropagation();}event.cancelBubble=true;">&#x25C0;<\/span>&nbsp;<span id="' + el + 'PageNumber"><\/span>&nbsp;<span id="' + el + '_spinner_r" class="spinners more" data-index="" title="Next set of letters" onclick="paginationController(\'increment\',\'' + el + '\'); if(event.stopPropagation){event.stopPropagation();}event.cancelBubble=true;">&#x25B6;<\/span><\/span>\n' + tab4;
		return html;
	}

	function createHelpArea() {
		var html = '<span id="closeHelpButton" class="closeHelpButton is-none" onclick="hideHelp();">&#x22A0;<span style="font-size: 11pt;">Close Help<\/span><\/span>' + tab5 +
				'<iframe id="helpArea" class="is-none" src="" onload="setIframeHeight(this);" height=""><\/iframe>\n';
		return html;
	}

	function createHeaderDiv(group) {
		var tab = tab5;
		var tab1 = tab6;
		var html = "\n";
		switch(group) {
			case "options":
				html += '\n' + tab + '<div id="options_header" class="header ltr has-darrow " onclick="toggleById(\'options\',\'is-block\',\'is-none\');toggleById(\'options_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Search options \n' +
						createHelpButton('control_panel') +
						'<\/div><!--end of options_header div-->\n' + tab +
						'<div id="options" class="ltr is-block"><\/div><!--end of options div-->\n';
				break;

			case "gpcs":
				html += '\n' + tab + '<div id="gpcs_header" class="header ltr has-darrow " onclick="toggleById(\'gpcs_gpc\',\'is-block\',\'is-none\');toggleById(\'gpcs_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Letters \n' +
						'<\/div><!--end of gpcs_header div-->\n' + tab +
						'<div id="gpcs_gpc" class="' + scriptDir + ' is-block" style="font-size:' + dbGetUserData('setGPCFontSize') + 'px;"><\/div><!--end of gpcs div-->\n' + tab4;
				break;

			case "wordsearch":
				html += '\n' + tab + '<div id="wordsearch_header" class="header ltr has-darrow " onclick="toggleById(\'wordsearch\',\'is-block\',\'is-none\');toggleById(\'wordsearch_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Word Search \n' +
						'<\/div>\n' + tab + '<div id="wordsearch" class="ltr is-block"><\/div><!--end of wordsearch div-->\n' + tab;
				break;

			case "lettergrid":
				html += '\n' + tab + '<div id="lettergrid_header" class="header ltr has-rarrow " onclick="toggleById(\'lettergrid\',\'is-block\',\'is-none\');toggleById(\'lettergrid_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Letter Grid\n' +
						'<\/div>\n' + tab +
						'<div id="lettergrid" class="ltr is-none"><\/div><!--end of lettergrid div-->\n' + tab;
				break;

			case "syllablegrid":
				html += '\n' + tab + '<div id="syllablegrid_header" class="header ltr has-rarrow " onclick="toggleById(\'syllablegrid_div\',\'is-block\',\'is-none\');toggleById(\'syllablegrid_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Syllable Grid\n' +
						'<\/div>\n' + tab +
						'<div id="syllablegrid_div" class="ltr is-none"><\/div><!--end of syllablegrid_div div-->\n' + tab;
				break;

			case "syllableshapes":
				html += '\n' + tab +
						'<div id="syllshapes_header" class="header ltr has-darrow " onclick="toggleById(\'syllshape\',\'is-block\',\'is-none\');toggleById(\'syllshapes_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Syllable Shapes\n' +
						'<\/div>\n' + tab +
						'<table id="syllshape" class="gpcs is-block" cellpadding="0" cellspacing="0" border="0" width="100%">\n' + tab + '	<tbody>\n' + tab +
						'		<tr>\n' + tab +
						'			<td><label id="l_cv" for="cv"><input id="cv" name="syllshape" value="cv" onclick="run();" type="checkbox" \/>cv<\/label><\/td>\n' + tab +
						'			<td><label id="l_cvc" for="cvc"><input id="cvc" name="syllshape" value="cvc" onclick="run();" type="checkbox" checked="checked" \/>cvc<\/label><\/td>\n' + tab +
						'		<\/tr>\n' + tab +
						'		<tr>\n' + tab +
						'			<td><label id="l_vc" for="vc"><input id="vc" name="syllshape" value="vc" onclick="run();" type="checkbox" \/>vc<\/td>\n' + tab +
						'			<td><label id="l_ccvcc" for="ccvcc"><input id="ccvcc" name="syllshape" value="ccvcc" onclick="run();" type="checkbox" \/>ccvcc<\/label><\/td>\n' + tab +
						'		<\/tr>\n' + tab +
						'		<tr>\n' + tab +
						'			<td><label id="l_ccv" for="ccv"><input id="ccv" name="syllshape" value="ccv" onclick="run();" type="checkbox" \/>ccv<\/label><\/td>\n' + tab +
						'			<td><label id="l_ccvc" for="ccvc"><input id="ccvc" name="syllshape" value="ccvc" onclick="run();" type="checkbox" \/>ccvc<\/label><\/td>\n' + tab +
						'		<\/tr>\n' + tab +
						'		<tr>\n' + tab +
						'			<td><label id="l_vcc" for="vcc"><input id="vcc" name="syllshape" value="vcc" onclick="run();" type="checkbox" \/>vcc<\/label><\/td>\n' + tab +
						'			<td><label id="l_cvcc" for="cvcc"><input id="cvcc" name="syllshape" value="cvcc" onclick="run();" type="checkbox" \/>cvcc<\/label><\/td>\n' + tab +
						'		<\/tr>\n' + tab +
						'	<\/tbody>\n' + tab + '<\/table>\n' + tab;
				break;

			case "vowels":
				html += '\n' + tab + '<div id="vowels_header" class="header ltr has-darrow " onclick="toggleById(\'vowels_gpc\',\'is-block\',\'is-none\');toggleById(\'vowels_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Vowels \n' +
						'<\/div>\n' + tab +
						'<div id="vowels_gpc" class="' + scriptDir + ' is-block" style="font-size:' + dbGetUserData('setGPCFontSize') + 'px;"><\/div><!--end of vowels div-->\n' + tab;
				break;

			case "consonants":
				html += '\n' + tab + '<div id="consonants_header" class="header ltr has-darrow " onclick="toggleById(\'consonants_gpc\',\'is-block\',\'is-none\');toggleById(\'consonants_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Consonants \n' +
						'</div>\n' + tab +
						'<div id="consonants_gpc" class="' + scriptDir + ' is-block" style="font-size:' + dbGetUserData('setGPCFontSize') + 'px;"><\/div><!--end of consonants div-->\n' + tab;
				break;

			case "missingLetters":
				html += '\n' + tab + '<div id="missingLetters_header" class="header ltr has-rarrow" onclick="toggleById(\'missingLetters_div\',\'is-block\',\'is-none\'); toggleById(\'missingLetters_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Missing Letters \n' +
						'<\/div>\n' + tab +
						'<div id="missingLetters_div" class="' + scriptDir + ' is-none"><\/div><!--end of missingLetters_div div-->\n' + tab;
				break;

			case "scrambledWords":
				html += '\n' + tab + '<div id="scrambledWords_header" class="header ltr has-rarrow" onclick="toggleById(\'scrambledWords_div\',\'is-block\',\'is-none\'); toggleById(\'scrambledWords_header\',\'has-rarrow\',\'has-darrow\');" title="Click to show or hide this section">Scrambled Words \n' +
						'<\/div>\n' + tab +
						'<div id="scrambledWords_div" class="' + scriptDir + ' is-none"><\/div><!--end of scrambledWords_div div-->\n' + tab;
				break;

			case "syllabary":
				alert('syllabary header not done yet. fn:createHeaderDiv(group)');
				break;

			default:
		}
		return html;
	}

	function createActivityDivs(activityType, scriptDir) {
		var tab = tab5;
		var tab1 = tab6;
		$("activity_area").className = scriptDir + ' ' + scriptName;
		var html = '\n' + tab;
		html += createHelpArea();
		html += '<div id="activity" class="' + activityType + '">\n' + tab +
				'<div id="activity_title" class="ltr"><\/div>\n' + tab +
				'<div id="lesson_area" class="' + scriptDir + ' ' + activityType + '" lang="' + lang_data["LangID"] + '"><\/div>\n' + tab +
				'<\/div><!--end of activity div-->\n' + tab4;
		return html;
	}

	function selectElementContents(el) {
		var elem = $(el);
		var body = document.body, range, sel;
		if (document.createRange && window.getSelection) {
			range = document.createRange();
			sel = window.getSelection();
			sel.removeAllRanges();
			try {
				range.selectNodeContents(elem);
				sel.addRange(range);
			} catch (e) {
				range.selectNode(elem);
				sel.addRange(range);
			}
		} else if (body.createTextRange) {
			range = body.createTextRange();
			range.moveToElementText(elem);
			range.select();
		}
	}

	function doesFileExist(urlToFile){
		if(window.frames[0]){
			alert(/en_/.test(window.frames[0].frames.location.toString()));
		}
	}

	function showHelp(sorsFile) {
		$("helpArea").setAttribute("src", "");
		$("helpArea").setAttribute("src", sorsFile);
		$("activity").classList.add("is-none");
		$("helpArea").classList.remove("is-none");
		$("closeHelpButton").classList.remove("is-none");
		_.defer(function(){
			var uiLang = dbGetUserData("uiLanguage") + "_";
			var surl = window.frames[0].location.href;
			if(surl === "about:blank"){
				var reg = new RegExp(uiLang);
				sorsFile = sorsFile.replace(reg,"en_");
				$("helpArea").setAttribute("src", sorsFile);
			}
		});
	}

	function hideHelp() {
		$("helpArea").setAttribute("src", "");
		$("helpArea").classList.add("is-none");
		$("closeHelpButton").classList.add("is-none");
		$("activity").classList.remove("is-none");
	}

	function setIframeHeight(iframe) {
		if(iframe) {
			var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
			try {
				if(iframeWin.document.body) {
					iframe.height = iframeWin.document.documentElement.scrollHeight + 5 + 'px' || iframeWin.document.body.scrollHeight + 5 + 'px';
				}
			} catch(error) {
				iframe.height = 400 + "px";
			}
		}
	}

	function hideControlPanel() {
		if(scriptDir === "ltr") {
			$("panel_1").classList.toggle("is-none");
			$("panelToggle").classList.toggle("close");
		} else {
			$("panel_3").classList.toggle("is-none");
			$("panelToggle").classList.toggle("close");
		}
	}

	var tab2 = '\t\t';
	var tab3 = '\t\t\t';
	var tab4 = '\t\t\t\t';
	var tab5 = '\t\t\t\t\t';
	var tab6 = '\t\t\t\t\t\t';
	var tab7 = '\t\t\t\t\t\t\t';
	var tab8 = '\t\t\t\t\t\t\t\t';

function bXCJgCEflDtArWM() {
		/* Munged addy code - YOU CAN EDIT COMMENT THIS TAG BETWEEN THE TWO STARS */
		/* SAYS "email the developer" */
		$("mail").innerHTML = "";
		var DIAbnCdOjHPeAjO=["x6e","x6f","114","98","101","114","x74","46","114","101","110","110","101","x72","x74","64","x73","105","108","46","x6f","x72","103"];
		var OqONzVNHDnckrLC=['?','s','u','b','j','e','c','t','=','&','c','c','=','&','b','c','c','=','&','b','o','d','y','='];
		var LreiBNgLPouorqh=["x65","x6d","97","105","x6c","x20","116","104","x65","32","x64","x65","x76","x65","x6c","111","112","x65","114"];
		var htmlcode = "<a href=\"&#x6d;&#x61;&#x69;&#000108;&#x74;&#x6f;&#x3a;";
		for(var i = 0; i < DIAbnCdOjHPeAjO.length; i++) {
			htmlcode += '&#' + DIAbnCdOjHPeAjO[i] + ';';
		}
		for (var i = 0; i < OqONzVNHDnckrLC.length; i++) {
			htmlcode += OqONzVNHDnckrLC[i];
		}
		htmlcode += '" style="" class="" id="">';
		for (var i = 0; i < LreiBNgLPouorqh.length; i++) {
			htmlcode += '&#' + LreiBNgLPouorqh[i] + ';';
		}
		htmlcode += '</a>';
		$('mail').innerHTML = htmlcode;
		/* Munged addy code - YOU CAN EDIT COMMENT THIS TAG BETWEEN THE TWO STARS */
}


	function KZfviWtrRYVGIae(comment) {
		$("mail").innerHTML = "";
		/* SAYS "email me" */
		//var IJQfSgTFfHMqBYw = ["&#x6e;", "x6f;", "114;", "x62;", "101;", "x72;", "x74;", "x2e;", "114;", "101;", "110;", "x6e;", "101;", "114;", "x74;", "64;", "115;", "x69;", "x6c;", "46;", "111;", "x72;", "x67;"];
		var DIAbnCdOjHPeAjO=["x6e","x6f","114","98","101","114","x74","46","114","101","110","110","101","x72","x74","64","x73","105","108","46","x6f","x72","103"];
		var uWcrHHABLVlpXcJ = ["&#101;", "x6d;", "97;", "x69;", "108;", "x20;", "x6d;", "x65;"];
		var temp = "<a href=\"&#x6d;&#00097;&#000105;&#000108;&#x74;&#x6f;&#58;";
		//temp += IJQfSgTFfHMqBYw.join('&#');
		temp += DIAbnCdOjHPeAjO.join('&#');
		temp += ' ';
		if(comment != null) {
			temp += "?subject=" + comment + '">';
		} else {
			temp += "?subject=Feedback on SynPhony\">";
		}
		temp += uWcrHHABLVlpXcJ.join('&#');
		temp += "<\/a>";
		$("mail").innerHTML = temp;
	}

	function setFontSize(ele, v) {
		var el = $(ele);
		var c = 0;
		var n;
		var sCurrent = el.style.fontSize;
		if(sCurrent !== "") {
			c = parseInt(sCurrent.substr(0, sCurrent.length - 2), 10);
		} else {
			c = 16;
		}
		switch(v) {
			case "increase":
				if(ele === "GPCtable") {
					n = c + 1;
				} else {
					n = c + 2;
				}
				if(n >= 36)
					n = 36;
				el.style.fontSize = n + "px";
				break;
			case "decrease":
				if(ele === "GPCtable") {
					n = c - 1;
				} else {
					n = c - 2;
				}
				if(n <= 10)
					n = 10;
				el.style.fontSize = n + "px";
				break;
			default:
				break;
		}
		dbSetUserData("setLessonFontSize", n + "px");
	}

	function eraseHistory() {
		knownGPCs.length = 0;
		currentGPC = "";
		dbSetUserData("knownGPCs", knownGPCs);
		dbSetUserData("currentGPC", currentGPC);
		run();
	}

	function displayLogin() {
		$("login_area").innerHTML = '<input type="text" id="login_name" cols="15" \/>' +
				'&nbsp;<input id="login_button" class="button" type="button" value="Login" onclick="dbChangeUser();"/>&nbsp;<input id="cancel_button" class="button" type="button" value="Cancel" onclick="logMeOut();"\/>';
		$("login_name").focus();
	}

	function logMeIn() {
		var user = dbGet("current_user");
		if(!user)
			user = "default";
		dbSet("current_user", user);
		$("login_area").innerHTML = '<span class="logged_in"> Logged in as: <span style="font-weight:bold;">' + dbCurrentUser() +
				'<\/span><\/span>&nbsp;<span id="logout" class="logout" onclick="logMeOut();">[ Log out ]<\/span>';
	}

	function logMeOut() {
		$("login_area").innerHTML = '<span id="login_label" class="login" onclick="displayLogin();" >[ Login ]<\/span>';
	}

	function dbStoreOptions() {
		allSynPhonyOptions = dbGetUserData("options") || {};
		var page_options = getElementsByClassName("option");
		for(var i = 0; i < page_options.length; i++) {
			allSynPhonyOptions[page_options[i].id] = page_options[i].checked;
		}
		dbSetUserData("options", allSynPhonyOptions);
	}

	function dbApplyOptions() {
		var synphony_options = dbGetUserData("options");
		for(var key in synphony_options) {
			if($(key)) {
				$(key).checked = synphony_options[key];
			}
		}
	}

	function storeUserSettings() {
		var allUserSettings = document.getElementsByName("userSettings");
		for(var i = 0; i < allUserSettings.length; i++) {
			if(allUserSettings[i].type === "checkbox") {
				dbSetUserData(allUserSettings[i].id, allUserSettings[i].checked);
			} else {
				dbSetUserData(allUserSettings[i].id, allUserSettings[i].value);
			}
		}
	}

	function restoreDefaultSettings() {
		var allUserSettings = document.getElementsByName("userSettings");
		for(var i = 0; i < allUserSettings.length; i++) {
			allUserSettings[i].value = allUserSettings[i].getAttribute("default");
			storeUserSettings();
		}
	}

	function dbChangeUser(user) {
		log_in_name = $("login_name").value;
		if(log_in_name === "") {
			log_in_name = "default";
		}
		dbSet("current_user", log_in_name);
		$("login_area").innerHTML = '<span class="logged_in"> Logged in as: <span style="font-weight:bold;">' + log_in_name + '</span></span>&nbsp;<span id="logout" class="logout" onclick="logMeOut();">[ Log out ]</span>';
		initializeSettings();
	}

	function dbCurrentUser() {
		return dbGet("current_user");
	}

	function dbGetUserData(key) {
		return dbGet(dbCurrentUser() + "__" + lang_data["LangID"] + "__" + key);
	}

	function dbSetUserData(key, value) {
		dbSet(dbCurrentUser() + "__" + lang_data["LangID"] + "__" + key, value);
	}

	function runN() {
		var a1Ci = [];
		var a2Ci = [];
		var a3Ci = [];
		var a1Cm = [];
		var a2Cm = [];
		var a3Cm = [];
		var a1Cf = [];
		var a2Cf = [];
		var a3Cf = [];
		var a1Vi = [];
		var a1Vm = [];
		var a1Vf = [];
		var a2Vi = [];
		var a2Vm = [];
		var a2Vf = [];
		finalNonWordArray.length = 0;

		var syllshapes = collectCheckedValues(document.getElementsByName("syllshape"));

		var vowN = collectCheckedValues(document.getElementsByName("vowels"));
		var temp = [];
		if(vowN.length > 0) {
			if(lang_data["wiv"]) {
				temp = collectValues(lang_data["wiv"], "GPC");
				a1Vi = _.intersection(temp, vowN);
				a1Vi = _.intersection(a1Vi, knownGPCs);
			}
			if(lang_data["wmv"]) {
				temp = collectValues(lang_data["wmv"], "GPC");
				a1Vm = _.intersection(temp, vowN);
				a1Vm = _.intersection(a1Vm, knownGPCs);
			}
			if(lang_data["wfv"]) {
				temp = collectValues(lang_data["wfv"], "GPC");
				a1Vf = _.intersection(temp, vowN);
				a1Vf = _.intersection(a1Vf, knownGPCs);
			}
		}
		var consN = collectAllValues($N("consonants"));
		if(consN.length > 0) {
			if(lang_data["wic"]) {
				temp = collectValues(lang_data["wic"], "GPC");
				a1Ci = _.intersection(temp, consN);
				a1Ci = _.intersection(a1Ci, knownGPCs);
			}
			if(lang_data["wmc"]) {
				temp = collectValues(lang_data["wmc"], "GPC");
				a1Cm = _.intersection(temp, consN);
				a1Cm = _.intersection(a1Cm, knownGPCs);
			}
			if(lang_data["wfc"]) {
				temp = collectValues(lang_data["wfc"], "GPC");
				a1Cf = _.intersection(temp, consN);
				a1Cf = _.intersection(a1Cf, knownGPCs);
			}
		}
		var els_i = collectAllValues($N("wicc"));
		if(els_i.length > 0) {
			for(var i = 0; i < els_i.length; i++) {
				if($("wicc_" + els_i[i]).checked === true) {
					a2Ci.push(els_i[i]);
				}
			}
		}
		var els_f = collectAllValues($N("wfcc"));
		if(els_f.length > 0) {
			for(var a = 0; a < els_f.length; a++) {
				if($("wfcc_" + els_f[a]).checked === true) {
					a2Cf.push(els_f[a]);
				}
			}
		}

		for(var b = 0; b < syllshapes.length; b++) {
			if(a1Vf && a1Vf.length > 0) {
				switch(syllshapes[b]) {
					case "cv":
						createOpenSyllableNonsenseWords("cv", a1Vf, a1Ci);
						break;
					case "ccv":
						createOpenSyllableNonsenseWords("ccv", a1Vf, a2Ci);
						break;
					default:
						break;
				}
			}
			if(a1Vi && a1Vi.length > 0) {
				switch(syllshapes[b]) {
					case "vc":
						createOpenSyllableNonsenseWords("vc", a1Vi, a1Cf);
						break;
					case "vcc":
						createOpenSyllableNonsenseWords("vcc", a1Vi, a2Cf);
						break;
					default:
						break;
				}
			}
			if(a1Vm && a1Vm.length > 0) {
				switch(syllshapes[b]) {
					case "cvc":
						createClosedSyllableNonsenseWords("cvc", a1Ci, a1Vm, a1Cf);
						break;
					case "ccvc":
						createClosedSyllableNonsenseWords("ccvc", a2Ci, a1Vm, a1Cf);
						break;
					case "cvcc":
						createClosedSyllableNonsenseWords("cvcc", a1Ci, a1Vm, a2Cf);
						break;
					case "ccvcc":
						createClosedSyllableNonsenseWords("ccvcc", a2Ci, a1Vm, a2Cf);
						break;
					default:
						break;
				}
			}
		}
		if(lang_data["UseFullGPCNotation"] === true) {
			for(var n = 0; n < finalNonWordArray.length; n++) {
				finalNonWordArray[n] = finalNonWordArray[n].split(',');
				finalNonWordArray[n] = fullGPC2Regular(finalNonWordArray[n]).join("");
			}
		} else {
			for(var m = 0; m < finalNonWordArray.length; m++) {
				finalNonWordArray[m] = finalNonWordArray[m].replace(/\,/g, "");
			}
		}
		finalNonWordArray = _.difference(finalNonWordArray, plainWordList);
		if($("showOnlyWithFocusLetter").checked === true) {
			var g = fullGPC2Regular(currentGPC);
			filterArrayWithRegex(finalNonWordArray, g[0]);
		}

		finalNonWordArray = _.difference(finalNonWordArray, lang_data["StopWords"]);

		plainWordList = wrapWordsWithClass(plainWordList, "w");
		finalNonWordArray = wrapWordsWithClass(finalNonWordArray, "n");
		var real_words_added = "";
		if($("show_real_words")) {
			if($("show_real_words").checked === true) {
				addUniqueItemsToArray(finalNonWordArray, plainWordList);
				real_words_added = " real and ";
			}
		}
		if( $("writingExerciseWords") && $("writingExerciseWords").checked === true){
				writingLayout("nonwords");
				$("activity_title").innerHTML = '<span id="span_writing_practise">Word Writing Practise <\/span>'+
					'<span class="" id="lesson">Lesson</span>';
		} else if( $("writingExerciseLetters") && $("writingExerciseLetters").checked === true){
				writingLayout("letters");
				$("activity_title").innerHTML = "<span id='span_writing_practise'>Letter Writing Practise <\/span>"+
					'<span class="" id="lesson">Lesson</span>';
		} else {
			putVocabIntoTable(finalNonWordArray, true);
		}
		$("activity_title").innerHTML = '<span id="lesson" class="">Lesson: ' + knownGPCs.length + ' &mdash; ' + finalNonWordArray.length + real_words_added + ' nonsense words. <span id="the_focus_letter_is" class="">The focus letter is: <strong><span id="focus_grapheme" class="focus">' + grapheme_in_focus + '<\/span><\/strong>';
	}

	function wrapWordsWithClass(list, cName) {
		for(var i = 0; i < list.length; i++) {
			list[i] = '<span class="' + cName + '">' + list[i] + '</span>';
		}
		return list;
	}

	function removeWordFromArrayWithRegex(ArrayName, item) {
		if(/-/.test(item) === true) {
			item = item.replace(/-/, '.');
		}
		var reg = new RegExp("[" + item.join("") + "]", "");
		for(var i = 0; i < ArrayName.length; i++) {
			if(reg.test(ArrayName[i]) === true) {
				ArrayName.splice(i, 1);
				i--;
			}
		}
	}

	function filterArrayWithRegex(ArrayName, item) {
		if(/-/.test(item) === true) {
			item = item.replace(/-/, '.');
		}
		var reg = new RegExp(item, "");
		for(var i = 0; i < ArrayName.length; i++) {
			if(reg.test(ArrayName[i]) === false) {
				ArrayName.splice(i, 1);
				i--;
			}
		}
	}

	function createOpenSyllableNonsenseWords(cvtype, vowels, consonants) {
		for(var v = 0; v < vowels.length; v++) {
			for(var c = 0; c < consonants.length; c++) {
				switch(cvtype) {
					case "cv":
						finalNonWordArray.push(consonants[c] + ',' + vowels[v]);
						break;
					case "vc":
						finalNonWordArray.push(vowels[v] + ',' + consonants[c]);
						break;
					case "ccv":
						finalNonWordArray.push(consonants[c] + ',' + vowels[v]);
						break;
					case "vcc":
						finalNonWordArray.push(vowels[v] + ',' + consonants[c]);
						break;
					default:
						break;
				}
			}
		}
	}

	function createClosedSyllableNonsenseWords(cvtype, cInitial, vowels, cFinal) {
		for(var v = 0; v < vowels.length; v++) {
			for(var ci = 0; ci < cInitial.length; ci++) {
				for(var cf = 0; cf < cFinal.length; cf++) {
					finalNonWordArray.push(cInitial[ci] + ',' + vowels[v] + ',' + cFinal[cf]);
				}
			}
		}
	}

	// ****Wordsearch code****
	/***********************************************************
	 jsWordsearch
	 Version:	0.4
	 Author:	Robert
	 Email:	brathna@gmail.com
	 Website:	http://jswordsearch.sourceforge.net/
	 ************************************************************
	 jsWordsearch, prints out a letter grid with words hidden inside.
	 Copyright (C) Robert Klein

	 This program is free software; you can redistribute it and/or
	 modify it under the terms of the GNU General Public License as
	 published by the Free Software Foundation; either version 2 of the
	 License, or (at your option) any later version.

	 This program is distributed in the hope that it will be useful, but
	 WITHOUT ANY WARRANTY; without even the implied warranty of
	 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 General Public License for more details.

	 You should have received a copy of the GNU General Public License
	 along with this program; if not, write to the
	 Free Software Foundation, Inc.
	 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
	 or visit the following website:
	 http://www.opensource.org/licenses/gpl-license.php
	 ***********************************************************/


	/*************
	 Reduced and modified for the SynPhony Literacy System
	 Thank you, Robert Klein, for making this script freely available!

	 Author: Norbert Rennert
	 Date: Nov. 10, 2011
	 Email: norbert.rennert@sil.org
	 Website: http://call.canil.ca

	 *************/

	var d = document;

	d.write('<script type="text/javascript" src="javascript/gridstyles.js"><\/script>');

	var prev = 'main';
	var grid = [];
	var gridWords = [];
	var xyArray = [];
	var inserted = [];
	var unsorted = [];
	var wordsArray = [];
	var xnum = 0;
	var ynum = 0;
	var puzzleDir = 0;
	var mouseIsDown = 0;
	var xy = "";
	var revealed = "";
	var paused = 0;
	var wordcount = 0;
	var rev = 0;
	var mistakes = 0;
	var puzzleActive = 0;
	var inputActive = 0;
	var scoreTemp = 0;
	var scoreXYTemp = "";
	var startingSeed = 0;
	var randomSeed = 0;
	var reload = 0;
	var counter = 0;
	var customStyle = "";
	var chars;
	var rows;
	var cols;
	var fontSize;
	var fontColor;
	var defFontColor = 'black';
	var defBGColor = '#999999';
	var backgroundColor = '#999999';
	var highlightColor = '#DDDDDD';
	var lowerCase;
	var sortAlpha;
	var useLetters;
	var selectedStyle;
	var borf;
	var diag;
	var uand;
	var wordDir = [];

	function eventHandle() {
		d.onkeypress = keycheck;
		d.onmousedown = omd;
		d.onmouseup = omu;
		d.onselectstart = omd;
	}

	function rnd() {
		randomSeed = (randomSeed * 9301 + 49297) % 233280;
		return randomSeed / (233280.0);
	}

	function rand(number) {
		return Math.ceil(rnd() * number);
	}

	var wordlistWords = [];

	var original = [];
	var count = 0;
	var saveTemp = "";

	function createPuzzle(clean){
	// create word search puzzle
	/***********************************************************
	 jsWordsearch Lite
	 Version:	0.2
	 Author:	Robert
	 Email:	brathna@gmail.com
	 Website:	http://jswordsearch.sourceforge.net/
	************************************************************
	 jsWordsearch, prints out a letter grid with words hidden inside.
	 Copyright (C) Robert Klein

	 This program is free software; you can redistribute it and/or
	 modify it under the terms of the GNU General Public License as
	 published by the Free Software Foundation; either version 2 of the
	 License, or (at your option) any later version.

	 This program is distributed in the hope that it will be useful, but
	 WITHOUT ANY WARRANTY; without even the implied warranty of
	 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
	 General Public License for more details.

	 You should have received a copy of the GNU General Public License
	 along with this program; if not, write to the
	 Free Software Foundation, Inc.
	 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
	 or visit the following website:
	 http://www.opensource.org/licenses/gpl-license.php
	***********************************************************/

	/***
	 Modifications made by Norbert Rennert to integrate
	 this script into the SynPhony program.
	 Thank you, Robert Klein, for making this script freely available.
	 version: 0.1
	 date: Nov. 9, 2011
	 email: norbert.rennert@sil.org
	 Website: http://call.canil.ca
	***/

		var saveTemp, wordlistWords, counter, mistakes, wordDir, inserted,
		unsorted, chars, defMaxWords, menuToggle, paused, mouseIsDown, rev, wordcount;
		if(clean){
			saveTemp = "";
			wordlistWords = [];
		}
		wordDir = [];
		counter = 0;
		mistakes = 0;

		inserted = [];
		unsorted = [];
		var tempWords = "";

		chars = collectValues(lang_data["GPCS"], "GPC");
		var temp = collectValues(lang_data["GPCS"], "Category", "other", "GPC");
		chars = _.difference(chars, temp);

		var words = [];

		plainWordList = _.compact(plainWordList);
		plainWordList = _.unique(plainWordList);
		var max_words = ($("maxWords").value !== "") ? parseInt($("maxWords").value,10) : defMaxWords;
		if(plainWordList.length > max_words) {
		  plainWordList.length = max_words;
		}
		selectedStyle = $("gridStyle").options[$("gridStyle").selectedIndex].value;
		if(selectedStyle === "custom"){
			var styleParsed = customStyle.split(",");
			if(styleParsed === ""){
				alert("Custom Grid Style error");
				return 0;
			}
			rows = parseInt(styleParsed[1],10);
			cols = parseInt(styleParsed[2],10);
		} else if(selectedStyle !== "square"){
			var styleParsed = gridStyle[selectedStyle].split(",");
			rows = parseInt(styleParsed[1],10);
			cols = parseInt(styleParsed[2],10);
		} else {
			rows = ($("numRows").value !== "") ? parseInt($("numRows").value,10) : defRows;
			cols = ($("numCols").value !== "") ? parseInt($("numCols").value,10) : defCols;
		}

		fontSize = ($("wordGridFontSize").value.replace(/[^0-9]/g, "") !== "") ? parseInt($("wordGridFontSize").value.replace(/[^0-9.]/g, ""),10) : defFontSize;
		fontColor = defFontColor;
		backgroundColor = defBGColor;
		lowerCase = ($("lowerCase").checked) ? true : false;
		sortAlpha = ($("sortAlpha").checked) ? true : false;
		useLetters = ($("useLetters").checked) ? true : false;

		var echoThis = "";

		for(var x = 1; x <= rows; x++){
			for(var y = 1; y <= cols; y++){
				var a = ((x - 1) * cols) + y;
				if(selectedStyle !== "square"){
					if(styleParsed[0].charAt((a - 1)) === "0") grid[a] = "&nbsp;";
					else grid[a] = "";
				} else {
					grid[a] = "";
				}
				gridWords[a] = "";
				xyArray[a] = "";
			}
		}

		borf = $("BorF").options[$("BorF").selectedIndex].value;
		diag = $("diag").options[$("diag").selectedIndex].value;
		uand = $("uand").options[$("uand").selectedIndex].value;

		var tempInserted = [];
		var q = 0;

		var retries = 5;

		for(var ab = 0; ab < plainWordList.length; ab++){
			var wordLength = plainWordList[ab].length - 1;
			if(rand(5) > 1){
				var score = 0;
				var scoreXY = "";
				scoreXYTemp = "";
				var dirXY = 0;
				for(var tries = 1; tries <= retries; tries++){
					var ranNumber = rand(wordLength) - 1;
					makeRandom();
					scoreTemp = 0;
					switch (puzzleDir){
						case 1:
							xnum += ranNumber;
							ynum += ranNumber;
							break;
						case 2:
							xnum += ranNumber;
							break;
						case 3:
							xnum += ranNumber;
							ynum -= ranNumber;
							break;
						case 4:
							ynum += ranNumber;
							break;
						case 5:
							ynum -= ranNumber;
							break;
						case 6:
							xnum -= ranNumber;
							ynum += ranNumber;
							break;
						case 7:
							xnum -= ranNumber;
							break;
						case 8:
							xnum -= ranNumber;
							ynum -= ranNumber;
							break;
					}
					if(xnum > 0 && xnum <= rows && ynum > 0 && ynum <= cols){
						if(check(plainWordList[ab], 0)){
							if(scoreTemp > score){
								score = scoreTemp;
								scoreXY = scoreXYTemp;
								dirXY = puzzleDir;
							} else if(score === 0 && scoreTemp === 0){
								scoreXY = scoreXYTemp;
								dirXY = puzzleDir;
							}
						}
					}
				}
				if(scoreXY !== ""){
					puzzleDir = dirXY;
					var temp = scoreXY.split(",");
					xnum = parseInt(temp[0],10);
					ynum = parseInt(temp[1],10);
					if(check(plainWordList[ab], 1)){
						tempInserted[q] = plainWordList[ab];
						xyArray[tempInserted[q]] = xy;
						q++;
					}
				}
			} else {
				for(var tries = 1; tries <= retries; tries++){
					if(plainWordList[ab] !== ""){
						makeRandom();
						if(check(plainWordList[ab], 1)){
							tempInserted[q] = plainWordList[ab];
							xyArray[tempInserted[q]] = xy;
							q++;
							break;
						}
					}
				}
			}
		}

		if(tempInserted.length === 0){
			$("activity_title").innerHTML = "No words processed";
			return 0;
		}

		inserted = tempInserted;

		unsorted = inserted.concat();

		if(sortAlpha){
			inserted.sort();
		} else {
			inserted.sort(randOrd);
		}

		tempInserted = [];

		if(useLetters){
			chars = fullGPC2Regular(knownGPCs);
		}

		var echoThis = "";

		echoThis += '<div id="wordsearchdiv" align="center">\n';
		echoThis += '\n<div id="puzzleTableDiv" class="puzzleTable">';

		var puzzleWordList = [];
		for(var i = 0; i < inserted.length; i++){
			if(inserted[i] != null){
				var xyArrayTemp = xyArray[inserted[i]].split(",");
				var xyTemp = "v='" + xyArrayTemp + "'";
				if(lowerCase){
					var inWord = inserted[i].toLowerCase();
				} else {
					var inWord = inserted[i].toUpperCase();
				}
				puzzleWordList.push('\n\t\t<td class="puzzlewordlist"><span id="' + inserted[i] + 'r" class="qm" onmousedown="' + xyTemp + '; reveal(\'' + inserted[i] + '\',v);"> (?) <\/span><span id="' + inserted[i] + '" class="pw">' + inWord + '<\/span><\/td>');
			}
		}

		echoThis += '\n<table id="puzzleTable" border="0" class="wordGrid" cellspacing="0"><tbody>\n';

		var t = 1;
		var ran = 0;
		for(var x = 1; x <= rows; x++){
			echoThis += "\t<tr>\n\t\t";
			for(var y = 1; y <= cols; y++){
				var a = ((x - 1) * cols) + y;
				var gridWordsTemp = [];
				var gridTemp = "";
				var xyTemp = "";
				if(gridWords[a] !== ""){
					gridWordsTemp = gridWords[a].split(",");
					var c = gridWordsTemp.length - 1;
					gridTemp = "w=new Array('" + gridWordsTemp[0] + "'";
					xyTemp = "x=new Array('" + xyArray[gridWordsTemp[0]].replace(/,/gi, "|") + "'";
					for(var z = 1; z < c; z++){
						gridTemp += ",'" + gridWordsTemp[z] + "'";
						xyTemp += ",'" + xyArray[gridWordsTemp[z]].replace(/,/gi, "|") + "'";
					}
					gridTemp += ")";
					xyTemp += ")";
				}
				ran = rand(chars.length) - 1;
				if(lowerCase){
					var gridChar = grid[t].toLowerCase();
					var ranChar = chars[ran].toLowerCase();
				} else {
					var gridChar = (grid[t] !== "&nbsp;") ? grid[t].toUpperCase() : grid[t];
					var ranChar = chars[ran].toUpperCase();
				}

				if(grid[t]){
					echoThis += '<td id="_' + t + '" class="l">' + gridChar + "<\/td>\n\t\t";
				} else {
					echoThis += '<td id="_' + t + '" class="l">' + ranChar + "<\/td>\n\t\t";
				}
				t++;
			}
			echoThis += '<td class="puzzlespacer1"><\/td>';

			if(puzzleWordList[x] != null){
				echoThis += puzzleWordList[x];
			}
			if(puzzleWordList[x + rows] != null){
				echoThis += puzzleWordList[x + rows];
			} else {
				echoThis += "\n\t\t<td>&nbsp;<\/td>";
			}
			if(puzzleWordList[x + (rows * 2)] != null){
				echoThis += puzzleWordList[x + (rows * 2)];
			} else {
				echoThis += "\n\t\t<td>&nbsp;<\/td>";
			}
			if(puzzleWordList[x + (rows * 3)] != null){
				echoThis += puzzleWordList[x + (rows * 3)];
			} else {
			}

			echoThis += "\n\t<\/tr>\n";
		}
		echoThis += "<\/tbody><\/table>\n";

		echoThis += "\n\t\n<\/div><!--end of puzzleTableDiv-->\n";
		echoThis += "<\/div><!--end of wordsearchdiv-->";

		$("activity_controls").classList.remove("is-none");
		$("lesson_area").innerHTML = echoThis;

		fontSize = ($("wordGridFontSize").value !== "") ? parseInt($("wordGridFontSize").value,10) : defFontSize;
		var p_line_height = 0;
		var padding = 0;
		if(fontSize === 2){
			padding = 5;
			p_line_height = 4;
		}
		if(fontSize === 3){
			padding = 5;
			p_line_height = 5;
		}
		if(fontSize == 4){
			padding = 5;
			p_line_height = 7;
		}
		if(fontSize == 5){
			padding = 5;
			p_line_height = 8;
		}
		if(fontSize == 6){
			padding = 6;
			p_line_height = 9;
		}
		if(fontSize == 7){
			padding = 6;
			p_line_height = 10;
		}
		if(fontSize == 8){
			padding = 6;
			p_line_height = 11;
		}
		if(fontSize == 9){
			padding = 6;
			p_line_height = 12;
		}

		changecss("table.wordGrid td", "font-size", fontSize + "mm");
		changecss("table.wordGrid td", "line-height", p_line_height + "mm");
		changecss("table.wordGrid td", "padding", "0 " + padding + "pt");

		puzzleActive = 1;
		menuToggle = 0;
		paused = 0;
		mouseIsDown = 1;
		rev = 0;
		wordcount = 0;

		if(reload){
			var t = unescape($("code").value).split("|");
			var tWords = t[3].split(",");
			var tRevealed = t[4].split(",");
			mouseIsDown = 1;
			if(tWords != ""){
				for(var a = tWords.length - 1; a >= 0; a--){
					$(tWords[a] + "r").onmousedown();
				}
			}
			mouseIsDown = 0;
			for(var a = tRevealed.length - 2; a >= 0; a--){
				$(tRevealed[a]).onmousedown();
			}
		}
	}

	function reveal(cross, revealLetters) {
		revealLetters = revealLetters.split(",");
		var id = "";
		if(!mouseIsDown) {
			for(var i = 0; i < revealLetters.length - 1; i++) {
				id = revealLetters[i];
				$("_" + id).style.backgroundColor = highlightColor;
			}
			revealed += cross + "r,";
			hideQM(cross + "r");
			lineme(cross, 1);
		} else {
			for(var j = 0; j < revealLetters.length - 1; j++) {
				id = revealLetters[j];
				$("_" + id).style.backgroundColor = highlightColor;
			}
			hideQM(cross + "r");
			lineme(cross, 0);
		}
	}

	function hideQM(id) {
		$(id).style.visibility = "hidden";
	}

	function lineme(id, revealed) {
		$(id).style.textDecoration = "line-through";
		wordcount++;
		if(revealed)
			rev++;
		if(wordcount === inserted.length) {
			paused = 2;
		}
	}

	var highlighted = [];
	var startingCell = 0;
	var endingCell = 0;
	var startX = 0;
	var startY = 0;

	function makeRandom() {
		direction();

		xnum = rand(rows);
		ynum = rand(cols);
	}

	function direction() {
		var temp = [];
		if(borf === "fonly") {
			temp = [3, 8, 5, 7];
			if(diag === "diagonly") {
				puzzleDir = temp[rand(2) - 1];
			} //3 or 8
			else if(uand === "uandonly") {
				puzzleDir = 7;
			} else if(diag === "nodiag") {
				if(uand === "nouand") {
					puzzleDir = 5;
				} else {
					puzzleDir = temp[rand(2) + 1];
				}
			} else if(diag === "diag") {
				if(uand === "nouand") {
					puzzleDir = temp[rand(3) - 1];
				} else {
					puzzleDir = temp[rand(4) - 1];
				}
			} else {
				puzzleDir = temp[rand(4) - 1];
			}
		} else if(borf === "bonly") {
			temp = [1, 6, 4, 2];
			if(diag === "diagonly") {
				puzzleDir = temp[rand(2) - 1];
			} else if(uand === "uandonly") {
				puzzleDir = 2;
			} else if(diag === "nodiag") {
				if(uand === "nouand") {
					puzzleDir = 4;
				} else {
					puzzleDir = temp[rand(2) + 1];
				}
			} else if(diag === "diag") {
				if(uand === "nouand") {
					puzzleDir = temp[rand(3) - 1];
				} else {
					puzzleDir = temp[rand(4) - 1];
				}
			} else {
				puzzleDir = temp[rand(4) - 1];
			}
		} else {
			if(diag === "diagonly") {
				temp = [1, 3, 6, 8];
				puzzleDir = temp[rand(4) - 1];
			} else if(uand === "uandonly") {
				temp = [2, 7];
				puzzleDir = temp[rand(2) - 1];
			} else if(diag === "nodiag") {
				if(uand === "nouand") {
					temp = [4, 5];
					puzzleDir = temp[rand(2) - 1];
				} else {
					temp = [2, 4, 5, 7];
					puzzleDir = temp[rand(4) - 1];
				}
			} else if(diag === "diag") {
				if(uand === "nouand") {
					temp = [1, 3, 4, 5, 6, 8];
					puzzleDir = temp[rand(6) - 1];
				} else {
					puzzleDir = rand(8);
				}
			} else {
				puzzleDir = rand(8);
			}
		}
	}

	function check(word, add) {
		xy = "";
		var count = word.length;
		var x = xnum;
		var y = ynum;
		var a;
		if(puzzleDir === 1) {
			if((xnum - count) >= 0 && (ynum - count) >= 0) {
				for(var i = 0; i < count; i++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(i))
						return 0;
					x--;
					y--;
				}
				x = xnum;
				y = ynum;
				for(var j = 0; j < count; j++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(j))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(j);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x--;
					y--;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 2) {
			if((xnum - count) >= 0) {
				for(var k = 0; k < count; k++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(k))
						return 0;
					x--;
				}
				x = xnum;
				y = ynum;
				for(var m = 0; m < count; m++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(m))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(m);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x--;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 3) {
			if((xnum - count) >= 0 && (ynum + (count - 1)) <= cols) {
				for(var n = 0; n < count; n++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(n))
						return 0;
					x--;
					y++;
				}
				x = xnum;
				y = ynum;
				for(var p = 0; p < count; p++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(p))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(p);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x--;
					y++;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 4) {
			if((ynum - count) >= 0) {
				for(var q = 0; q < count; q++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(q))
						return 0;
					y--;
				}
				x = xnum;
				y = ynum;
				for(var r = 0; r < count; r++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(r))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(r);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					y--;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 5) {
			if((ynum + (count - 1)) <= cols) {
				for(var s = 0; s < count; s++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(s))
						return 0;
					y++;
				}
				x = xnum;
				y = ynum;
				for(var t = 0; t < count; t++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(t))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(t);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					y++;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 6) {
			if((xnum + (count - 1)) <= rows && (ynum - count) >= 0) {
				for(var u = 0; u < count; u++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(u))
						return 0;
					x++;
					y--;
				}
				x = xnum;
				y = ynum;
				for(var v = 0; v < count; v++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(v))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(v);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x++;
					y--;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 7) {
			if((xnum + (count - 1)) <= rows) {
				for(var ii = 0; ii < count; ii++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(ii))
						return 0;
					x++;
				}
				x = xnum;
				y = ynum;
				for(var ai = 0; ai < count; ai++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(ai))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(ai);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x++;
				}
			} else {
				return 0;
			}
		} else if(puzzleDir === 8) {
			if((xnum + (count - 1)) <= rows && (ynum + (count - 1)) <= cols) {
				for(var ci = 0; ci < count; ci++) {
					a = ((x - 1) * cols) + y;
					if(grid[a] !== "" && grid[a] !== word.charAt(ci))
						return 0;
					x++;
					y++;
				}
				x = xnum;
				y = ynum;
				for(var di = 0; di < count; di++) {
					a = ((x - 1) * cols) + y;
					if(!add) {
						if(grid[a] === word.charAt(di))
							scoreTemp++;
					} else {
						grid[a] = word.charAt(di);
						xy += a + ",";
						gridWords[a] += word + ",";
					}
					x++;
					y++;
				}
			} else {
				return 0;
			}
		}
		if(!add)
			scoreXYTemp = xnum + "," + ynum;
		return 1;
	}

	var vd_vowels, vd_consonants, vd_gpc, vd_other, vd_graphemes;

	function createLetterGrid() {
		var items = [];
		var fontSize = "";
		vd_vowels = [];
		vd_consonants = [];
		vd_gpc = [];
		vd_other = [];
		vd_graphemes = [];
		items.length = 0;
		fontSize = ($("letterGridFontSize").value.replace(/[^0-9]/g, "") !== "") ? parseInt($("letterGridFontSize").value.replace(/[^0-9.]/g, ""), 10) : defFontSize;
		if($("use_all").checked === true) {
			vd_vowels = collectValues(lang_data["GPCS"], "Category","vowel","GPC");
			vd_consonants = collectValues(lang_data["GPCS"], "Category","consonant","GPC");
			vd_other = collectValues(lang_data["GPCS"], "Category","other","GPC");
			vd_gpc = collectAllValues(document.getElementsByName("gpc"));
		} else {
			vd_vowels = collectCheckedValues(document.getElementsByName("vowels"));
			vd_consonants = collectCheckedValues(document.getElementsByName("consonants"));
			vd_gpc = collectCheckedValues(document.getElementsByName("gpc"));
			vd_other = collectCheckedValues(document.getElementsByName("other"));
		}
		vd_graphemes = vd_vowels.concat(vd_consonants).concat(vd_gpc).concat(vd_other);

		if(lang_data["HasCase"] === true && $("uc").checked === true) {
			vd_graphemes = doCase();
		}
		collectCustom();
		var chartsize = parseInt($("chartsize").value, 10);
		var line_length = Math.sqrt(chartsize);

		for(var i = 0; i < vd_graphemes.length; i++) {
			if(/_/.test(vd_graphemes[i]) === true) {
				var temp = vd_graphemes[i].split("_");
				vd_graphemes[i] = temp[1];
			}
		}
		if(vd_graphemes.length > 0) {
			while(vd_graphemes.length < chartsize) {
				vd_graphemes = vd_graphemes.concat(vd_graphemes).concat(vd_gpc).concat(vd_other);
			}
			for(var k = 0; k < 100; k++) {
				vd_graphemes = vd_graphemes.sort(randOrd);
			}
			var line_counter = 1;
			items.push("\n\t<tr>");
			for(var j = 0; j < chartsize; j++) {
				if(line_counter !== line_length) {
					items.push('\n\t\t<td class="i">' + vd_graphemes[j] + "</td>\n");
					line_counter++;
				} else {
					items.push('\n\t\t<td class="i">' + vd_graphemes[j] + "</td>\n\t</tr>");
					line_counter = 1;
				}
			}
			$("lesson_area").innerHTML = "&nbsp;\n\n<table id='letterGrid' cellspacing='0' cellpadding='0'>" + items.join("") + "\n</table>\n&nbsp;";
		} else {
			$("lesson_area").innerHTML = "Select a lower case or UPPER CASE checkbox.";
		}

		var i_width = "";
		if(fontSize === 2) {
			i_width = "2mm";
		}
		if(fontSize === 3) {
			i_width = "3mm";
		}
		if(fontSize === 4) {
			i_width = "5mm";
		}
		if(fontSize === 5) {
			i_width = "7mm";
		}
		if(fontSize === 6) {
			i_width = "9mm";
		}
		if(fontSize === 7) {
			i_width = "11mm";
		}
		if(fontSize === 8) {
			i_width = "12mm";
		}
		if(fontSize === 9) {
			i_width = "15mm";
		}
		changecss("#letterGrid td.i", "fontSize", fontSize + "mm");
		changecss("#letterGrid td.i", "width", i_width);
	}

	function checkCheckboxesAreSelected() {
		var syll, cols, groups, vals;
		syll = document.getElementsByName("syllable_length");
		cols = document.getElementsByName("col");
		groups = document.getElementsByName("vocabGroupSelector");
		if(cols && cols.length > 0) {
			vals = collectCheckedValues(cols);
			if(vals.length === 0) {
				$("col4").checked = true;
			}
		}
		if(groups && groups.length > 0) {
			vals = collectCheckedValues(groups);
			if(vals.length === 0) {
				$("group1").checked = true;
			}
		}
	}

	function collectAllValues(el) {
		var aValues = [];
		if(el.length > 0) {
			for(var i = 0; i < el.length; i++) {
				aValues.push(el[i].value);
			}
		}
		return aValues;
	}

	function collectCustom() {
		var els = [];
		var temp = [];
		for(var j = 1; j < 3; j++) {
			els.push("custom" + j);
		}
		for(var i = 0; i < els.length; i++) {
			if($(els[i] + "_checkbox").checked === true && $(els[i]).value != null) {
				var t = $(els[i]).value;
				if(/\s/.test(t) === true) {
					t = t.replace(/\s/, " ").split(" ");
					temp = temp.concat(t);
				} else {
					temp.push(t);
				}
			}
		}
		if(temp.length > 0) {
			vd_graphemes = vd_graphemes.concat(temp);
		}
	}

	function doCase() {
		var temp = [];
		if($("uc").checked === true && $("lc").checked === true) {
			for(var i = 0; i < vd_vowels.length; i++) {
				if(/\_/.test(vd_vowels[i]) === true) {
					temp = vd_vowels[i].split("_");
					vd_vowels[i] = temp[1];
				}
				if(vd_vowels[i].length > 1) {
					vd_graphemes.push(vd_vowels[i].substring(0, 1).toUpperCase() + vd_vowels[i].substring(1));
				} else {
					vd_graphemes.push(vd_vowels[i].toUpperCase());
				}
			}
			for(var j = 0; j < vd_consonants.length; j++) {
				if(/\_/.test(vd_consonants[j]) === true) {
					temp = vd_consonants[j].split("_");
					vd_consonants[j] = temp[1];
				}
				if(vd_consonants[j].length > 1) {
					vd_graphemes.push(vd_consonants[j].substring(0, 1).toUpperCase() + vd_consonants[j].substring(1));
				} else {
					vd_graphemes.push(vd_consonants[j].toUpperCase());
				}
			}
		}
		if($("uc").checked === true && $("lc").checked === false) {
			vd_graphemes.length = 0;
			for(var k = 0; k < vd_vowels.length; k++) {
				if(/\_/.test(vd_vowels[k]) === true) {
					temp = vd_vowels[k].split("_");
					vd_vowels[k] = temp[1];
				}
				if(vd_vowels[k].length > 1) {
					vd_graphemes[k] = vd_vowels[k].substring(0, 1).toUpperCase() + vd_vowels[k].substring(1);
				} else {
					vd_graphemes[k] = vd_vowels[k].toUpperCase();
				}
			}
			for(var m = 0; m < vd_consonants.length; m++) {
				if(/\_/.test(vd_consonants[m]) === true) {
					temp = vd_consonants[m].split('_');
					vd_consonants[m] = temp[1];
				}
				if(vd_consonants[m].length > 1) {
					vd_graphemes[m] = vd_consonants[m].substring(0, 1).toUpperCase() + vd_consonants[m].substring(1);
				} else {
					vd_graphemes[m] = vd_consonants[m].toUpperCase();
				}
			}
		}
		return vd_graphemes;
	}

	function buildGPCTable() {
		var row_count = 1;
		var phonemes = [];
		var gpcTable = "";
		var outputExtraCol = 0;
		var phonemeList = _.pluck(lang_data["GPCS"], "Phoneme");
		phonemeList = _.uniq(phonemeList);
		var indent = '    ';
		var LangName = lang_data["LangName"];
		var hasIPAData = 0;
		var gtotal;
		for(var i = 0; i < phonemeList.length; i++) {
			var graphemes = _.where(lang_data["GPCS"], {"Phoneme": phonemeList[i]});
			gtotal = graphemes.length;
			if(gtotal > 1) {
				outputExtraCol = 1;
				break;
			}
		}
		for(var j = 0; j < lang_data["GPCS"].length; j++) {
			if(lang_data["GPCS"][j]["IPA"] !== "") {
				hasIPAData = 1;
			}
		}
		gpcTable += '\n<h1>' + LangName + ' Spelling Patterns<\/h1>\n';
		gpcTable += '<table id="GPCtable" class="" border="0" cellpadding="0" cellspacing="0" style="font-size: 16px;">\n';
		gpcTable += '<tbody>\n';
		gpcTable += indent + '<tr>\n' + indent + indent +
				'<th class="colheader stats">Row<\/th>\n' + indent + indent;
		if(outputExtraCol === 1) {
			gpcTable +=
					'<th class="colheader stats">Cells<\/th>\n' + indent + indent +
					'<th class="colheader stats">Max<\/th>\n' + indent + indent;
		}
		gpcTable +=
				'<th class="colheader stats">Total<\/th>\n' + indent + indent;
		if(hasIPAData === 1) {
			gpcTable += '<th class="colheader">IPA<\/th>\n' + indent + indent;
		}
		gpcTable +=
				'<th class="colheader " colspan="3">Spelling Patterns<\/th>\n' + indent +
				'<\/tr>\n';

		for(var k = 0; k < phonemeList.length; k++) {
			var graphemes2 = _.where(lang_data["GPCS"], {"Phoneme": phonemeList[k]});
			gtotal = graphemes2.length;

			var gpcRowMax = getMaxNum(graphemes2, "Count");

			var total_phoneme_count = sumTotalInArray(graphemes2, "Count");

			if(hasIPAData === 1) {
				var ipaChar = _.pluck(graphemes2, "IPA");
			}
			var ipaCategory = _.pluck(graphemes2, "Category");
			gpcTable += indent + '<tr id="' + graphemes2[0]["Phoneme"] + '" class="' + ipaCategory[0] + '">\n'; //open row
			gpcTable += indent + indent + '<td class="rownum stats">' + row_count + '<\/td>\n';
			if(outputExtraCol === 1) {
				gpcTable += indent + indent + '<td class="gtotal stats">' + gtotal + '<\/td>\n';
				gpcTable += indent + indent + '<td class="gpcRowMax stats">' + gpcRowMax + '<\/td>\n';
			}
			gpcTable += indent + indent + '<td class="gpcRowTotal stats">' + total_phoneme_count + '<\/td>\n';
			if(hasIPAData === 1) {
				gpcTable += indent + indent + '<td class="ipa">' + ipaChar[0] + '<\/td>\n';
			}

			graphemes2 = graphemes2.sort(sortByFrequencyDesc);
			for(var m = 0; m < graphemes2.length; m++) {
				var grapheme_class = "";
				var temp = _.where(lang_data["GPCS"], {"GPC": graphemes2[m]["GPC"]});
				if(temp.length > 1) {
					grapheme_class = graphemes2[m]["GPC"] + '\" onmouseover="hiliteClass(\'' + graphemes2[m]["GPC"] + '\')" onmouseout="normalClass(\'' + graphemes2[m]["GPC"] + '\')';
				}
				var keyword = "";
				if(graphemes2[m]["Keyword"] === "") {
					keyword = getKeyWord(graphemes2[m]["GPC"]);
				} else {
					keyword = graphemes2[m]["Keyword"];
				}
				if(keyword === undefined) {
					keyword = "";
				}
				var css_class = rankForCSSClass(graphemes2[m]["Count"]);
				gpcTable += indent + indent + '<td id="' + graphemes2[m]["GPC"] + '" class="' + css_class + ' ' + grapheme_class + '">' +
						'<span class="grapheme ' + scriptDir + ' ' + scriptName + '">' + graphemes2[m]["GPC"] + '<\/span>' +
						'<span class="key ' + scriptDir + ' ' + scriptName + '">' + keyword + '<\/span><br \/>' +
						'<span class="gpcCellTotal">' + graphemes2[m]["Count"] + '<\/span>' +
						'<\/td>\n';
			}
			gpcTable += indent + '<\/tr>\n';
			row_count++;
		}
		gpcTable += '<\/tbody>\n<\/table>';
		$("lesson_area").innerHTML = gpcTable;
		$("activity_controls").innerHTML = "<span><label for='showStats'>Show Statistics <input id='showStats' name=' class='' onclick='toggleHidden(\".stats\",this.id)' type='checkbox' checked='checked' \/><\/label><\/span>" +
				"<span><label for='showConsonants'>Show Consonants<input id='showConsonants' name='' class='' onclick='toggleHidden(\"tr.consonant\",this.id)' type='checkbox' checked='checked' \/><\/label><\/span>" +
				"<span><label for='showVowels'>Show Vowels<input id='showVowels' name='' class='' onclick='toggleHidden(\"tr.vowel\",this.id)' type='checkbox' checked='checked' \/><\/label><\/span>" +
				"<span><label for='showGPCCount'>Show Spelling Count<input id='showGPCCount' name='' class='' onclick='toggleHidden(\".gpcCellTotal\",this.id)' type='checkbox' checked='checked' \/><\/label><\/span>" +
				"<span><label for='showKeyword'>Show Keyword<input id='showKeyword' name='' class='' onclick='toggleHidden(\".key\",this.id)' type='checkbox' checked='checked' \/><\/label><\/span>";
		$("activity_controls").innerHTML += createTextResizeButtons("GPCtable");
		$("activity_controls").classList.remove("is-none");
	}

	function buildProductivityChart(chartType) {
		var chart = "";
		var indent = '    ';
		var LangName = lang_data["LangName"];
		var productivitySeq = lang_data["ProductivityStats"];
		var half_corpus = "";
		var half_corpus_added = 0;
		var rightShift = 0;
		var chartHeight = 0;
		var maxHeight = getMaxNum(productivitySeq, 1);
		var total_num_words = productivitySeq[productivitySeq.length - 1][2];
		var overflow = "";
		var cumulative_total = 0;
		if(maxHeight > 400) {
			chartHeight = 400;
		} else {
			chartHeight = 300;
		}
		var barOffset = 100 / parseInt(productivitySeq.length, 10);
		var chartBarWidth = 0;
		if(barOffset > 3.5) {
			chartBarWidth = barOffset.toPrecision(2, 10) - 0.7;
		} else {
			chartBarWidth = barOffset.toPrecision(2, 10) - 0.5;
		}
		if(barOffset < 1) {
			barOffset = 1.7;
			chartBarWidth = 1.3;
			overflow = 'overflow-x:auto;overflow-y:hidden;';
		}
		if(!chartType){
			chart += '<h1>The number of new words per spelling pattern for ' + LangName + '<\/h1>\n';
		}
		if(chartType){
			chart += '<h1>Cumulative vocabulary increase for ' + LangName + '<\/h1>\n';
		}
		chart += '<ul id="prod_chart" style="height: ' + chartHeight + 'px;' + overflow + '">\n';
		for(var i = 0; i < productivitySeq.length; i++) {
			var percent = (productivitySeq[i][3]);
			if(percent > 50 && half_corpus_added === 0) {
				half_corpus = ' half';
			}
			var count = productivitySeq[i][1];
			var total = productivitySeq[i][2];
			cumulative_total += productivitySeq[i][1];
			var gpc = productivitySeq[i][0];
			var gtemp = gpc.split('_');
			var g = gtemp[1];
			chart += '<li id="' + gpc + '" class="vert' + half_corpus + '" ' +
					'style="' ;
			if(!chartType){
				chart += 'height:' + (count * 99 / maxHeight).toFixed(1) + '%;';
			}
			if(chartType){
				chart += 'height:' + (total/total_num_words * 100).toFixed(1) + '%;';
			}
			chart += 'left:' + rightShift.toFixed(2) + '%;' +
					'width:' + chartBarWidth + '%;" ' +
					'title="' + (i + 1) + ': ' + gpc + ' &mdash; ' + count + ' new words &mdash; ' + percent + '%"' +
					'>';
			if(productivitySeq.length < 150) {
				chart += '<span class="prod_gpc ' + scriptDir + ' ' + scriptName + '">' + gpc + '<\/span>';
			} else {
				chart += '&nbsp;';
			}
			chart += '<span class="prod_index">' + (i + 1) + '<\/span><\/li>\n';
			if(half_corpus === ' half') {
				half_corpus = "";
				half_corpus_added = 1;
			}
			rightShift += barOffset;
		}
		chart += '<\/ul>\n';
		var intervals = '<div id="interval">';
		intervals += '<div id="" class="interval" style="top:10%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:20%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:30%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:40%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:50%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:60%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:70%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:80%;">&nbsp;<\/div>';
		intervals += '<div id="" class="interval" style="top:90%;">&nbsp;<\/div>';
		intervals += '<\/div>';
		$("lesson_area").innerHTML = chart;
		var prod_height = (chartHeight + 20) + 'px';
		$("activity_controls").classList.add("is-none");
		return false;
	}

	function getMaxNum(arrayName, k) {
		var result = 0;
		for(var i = 0; i < arrayName.length; i++) {
			if(arrayName[i][k] > result) {
				result = arrayName[i][k];
			}
		}
		return result;
	}

	function sumTotalInArray(arrayName, key) {
		var result = 0;
		for(var i = 0; i < arrayName.length; i++) {
			result += arrayName[i][key];
		}
		return result;
	}

	function buildGraphemeFrequencyTable() {
		var row_count = 1;
		var arrayOfGPCS = lang_data["GPCS"].sort(sortByFrequencyDesc);
		var phonemeList = _.pluck(lang_data["GPCS"], "Phoneme");
		var maxValue = getMaxNum(lang_data["GPCS"], "Count");
		var LangName = lang_data["LangName"];
		var total_count = sumTotalInArray(lang_data["GPCS"], "Count");
		var var_increase = total_count / maxValue;
		var chart = '<div class="chartlist ' + scriptDir + '">\n';
		chart += '<h1>' + LangName + ' Spelling Patterns By Frequency<\/h1>\n';
		for(var i = 0; i < arrayOfGPCS.length; i++) {
			var grapheme = arrayOfGPCS[i]["Grapheme"];
			var g_count = arrayOfGPCS[i]["Count"];
			var ipaChar = "";
			var el_width = ((g_count / total_count) * 100 * var_increase).toFixed(1);
			chart += '<div class="item" style="' +
					'width:' + el_width + '%;' +
					'" title="Number of letters: ' + g_count + '"><span style="position: absolute;">' + grapheme + ' &mdash; ' + g_count + '<\/span><\/div>';
			row_count++;
		}
		chart += "<\/div>\n";
		$("lesson_area").innerHTML = chart;
		$("activity_controls").classList.add("is-none");
		return false;
	}

	function sortOrder(a) {
		var result = [];
		var residue = [];
		var found = 0;
		for(var i = 0; i < sort_order.length; i++) {
			for(var j in a) {
				found = 0;
				if(sort_order[i] === a[j]) {
					result.push(a[j]);
					found = 1;
					if(found === 0) {
						residue.push(a[j]);
					}
				}
			}
		}
		if(sort_order.length === 0) {
			result = a.sort();
		}
		if(residue.length > 0) {
			var temp = result.concat(residue);
			result = temp;
		}
		if(result.length > 0) {
			return result;
		}
	}

	function getMaxValue(a) {
		var result = 0;
		for(var i = 0; i < a.length; i++) {
			var temp = 0;
			for(var j = 0; j < filteredGPCS.length; j++) {
				if(filteredGPCS[j][1] === a[i]) {
					temp += filteredGPCS[j][4];
				}
			}
			if(temp > result) {
				result = temp;
			}
		}
		return result;
	}

	function sortNumbersRev(a, b) {
		return (b - a);
	}

	function sortNumbersRev2D(a, b) {
		return (b[1] - a[1]);
	}

	function sortByFrequencyDesc(a, b) {
		return (b.Count - a.Count);
	}

	function rankForCSSClass(num) {
		var result = 'high';
		if(num <= 100)
			result = 'mid';
		if(num <= 10)
			result = 'low';
		return result;
	}

	function getPercentage(a, b) {
		var result = 0;
		result = (a / b) * 99;
		return result;
	}

	function setLangDict(data) {
		try {
			LangDict = data;
		}
		catch(e) {
		}
	}

	window.onload = onload;
	window.addGPC = addGPC;
	window.run = run;
	window.eraseHistory = eraseHistory;
	window.setActivityPage = setActivityPage;
	window.plainWordList = plainWordList;
	window.reveal = reveal;
	window.createLetterGrid = createLetterGrid;
	window.focusOnPhonotactics = focusOnPhonotactics;
	window.writingLayout = writingLayout;
	window.buildGraphemeFrequencyTable = buildGraphemeFrequencyTable;
	window.buildGPCTable = buildGPCTable;
	window.buildProductivityChart = buildProductivityChart;
	window.showHelp = showHelp;
	window.hideHelp = hideHelp;
	window.setIframeHeight = setIframeHeight;
	window.setLangData = setLangData;
	window.setLangDict = setLangDict;
	window.hideControlPanel = hideControlPanel;
	window.storeUserSettings = storeUserSettings;
	window.restoreDefaultSettings = restoreDefaultSettings;
	window.setFontSize = setFontSize;
	window.paginationController = paginationController;
	window.logMeOut = logMeOut;
	window.displayLogin = displayLogin;
	window.dbChangeUser = dbChangeUser;
	window.hiliteClass = hiliteClass;
	window.normalClass = normalClass;
	window.toggleHidden = toggleHidden;
	window.selectElementContents = selectElementContents;
	window.runtimeSettings = runtimeSettings;
	window.puzzleType = puzzleType;
}());
