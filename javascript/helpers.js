//helper functions

function $(id){return document.getElementById(id);}
function $N(n){return document.getElementsByName(n);}
function $C(c){return document.getElementsByClassName(c);}

function getDate() {
	var fulldate = [];
	var dNow = new Date();
	var year = dNow.getFullYear();
	var month = dNow.getMonth();
	var date = dNow.getDate();
	var day = dNow.getDay();

	if (month < 10) {
	month = "0" + month;
	}
	if (date < 10) {
	date = "0" + date;
	}
	switch (day) {
	case 0:
		day = "Sunday";
		break;
	case 1:
		day = "Monday";
		break;
	case 2:
		day = "Tuesday";
		break;
	case 3:
		day = "Wednesday";
		break;
	case 4:
		day = "Thursday";
		break;
	case 5:
		day = "Friday";
		break;
	case 6:
		day = "Saturday";
		break;
	default:
		break;
	}
	//fulldate = [year,month,date,day];
	//return fulldate;
	//return dNow.toUTCString();//Mon, 31 Mar 2014 19:05:51 GMT
	return dNow.toDateString();// Mon Mar 31 2014
	//return dNow.toLocaleDateString();//March-31-14
}

function getTime() {
	var dNow = new Date();
	//return dNow.toTimeString();//12:06:06 GMT-0700 (Pacific Standard Time)
	//return dNow.toString();// Mon Mar 31 2014 12:07:58 GMT-0700 (Pacific Standard Time)
	return dNow.toLocaleTimeString();//12:09:27 PM
	//return dNow.getTimezoneOffset();//420
}

function createUUID() {
	// http://www.ietf.org/rfc/rfc4122.txt
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);// bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	});
	return uuid;
}
;

function collectDOMValuesByName(el){
	var els = document.getElementsByName(el);
	var aValues = [];
	for(var i = 0, ilen = els.length; i < ilen; i++){
		aValues.push(els[i].value);
	}
	aValues = _.compact(aValues);
	return aValues;
}

/**
 * Extract values out of complex object collections
 * collectValues(list, key1 , [val1] , [key2], [val2] )
 * if key2 is passed in then the function returns val2,
 * otherwise it returns only the values that match val1 from key1
 * @param {String} list = object or array. eg. MasterCharacterInventory
 * @param {String} key1 = key
 * @param {String} [val1] = [optional] first value
 * @param {String} [key2] = [optional] second key
 * @param {String} [val2] = [optional] second value
 * usage: collectValues(list,"Phonemes") --> returns all values in key "Phonemes"
 * collectValues(list, "Category","consonant","Item") --> returns all values in "Item" whenever "Category" is equal to "consonant"
 */
function collectValues(list, key1, val1, key2, val2) {
	var tempArray = [];
	for (var i in list) {
		if (!val1 && !key2) {
			tempArray.push(list[i][key1]);//collect the values from key1
		} else if (key2) {
			if (list[i][key1] === val1) {
				tempArray.push(list[i][key2]);//collect the values from key2
			}
			//} else {
			//	if(val2.charAt[0] === '/' ){//&& val2.charAt(val2.length - 1) === '/'){
			//			//alert('its a regular expression!!');
			//	}
		}
	}
	return tempArray;
}

/**
 * Update values in specified keys in an object
 * all arguments are obligatory
 * the first two arguments are used to find the appropriate object,
 * the next two arguments update the key and value in the object
 * @param {String} list = the array or object to update
 * @param {String} key1 = the key used to find the correct object
 * @param {String} val1 = the value in key1 used to match the correct object
 * @param {String} key2 = the key to update the new value
 * @param {String} val2 = the value to store in key2
 */
function updateValues(list, key1, val1, key2, val2) {
	for(var i in list) {
		if(list[i][key1] === val1) {
			list[i][key2] = val2;
		}
	}
}

function collectObjectsWithSameValue(arrayName, k1, v) {
	//returns json object
	//returns an object each time a certain value exists in key1
	//returns all objects of parent array in which one key has certain value
	var result = [];
	for (var i = 0; i < arrayName.length; i++) {
		if (arrayName[i][k1] === v) {
			result.push(arrayName[i]);
		}
	}
	return result;
}

/**
 * This function first removes a class name from a set of elements
 * and then assigns it to one specified element.
 * This can be used for navigation menus or highlighting
 * options that have been selected in the UI
 * @param {String} el = the id of an element to add the class to
 * @param {String} sClass = the css class name to add
 * @param {String} n = the content of the name attribute of a set of html
 *    elements to search through and remove any instances of the sClass
 *    it calls the function removeActive first
 * Usage: addActive("id attribute", "class-name", "name attribute")
 */
function addActive(el, sClass, n) {
	removeActive(n, sClass);
	if($(el)) {
		$(el).classList.add(sClass);
	}
}

/**
 * Finds elements using the name attribute and removes the specified class
 * from all of them (usually only one of them has the class)
 * this function is called by the function addActive()
 * @param {String} el = element name
 * @param {String} sClass = css class name to remove
 */
function removeActive(n, sClass) {
	var els = document.getElementsByName(n);
	for(var i = 0, ilen = els.length; i < ilen; i++) {
		$(els[i].id).classList.remove(sClass);
	}
}

function toggleCheckedByName(els) {
	var els2toggle = document.getElementsByName(els);
	for (var i = 0; i < els2toggle.length; i++) {
		if (els2toggle[i].checked === true) {
			els2toggle[i].checked = false;
		} else {
			els2toggle[i].checked = true;
		}
	}
}

/**
 * Adds or removes a class name from a DOM element
 * @param {String} id = element id (can be a comma separated string of ids)
 * @param {String} c = class name to toggle
 * Usage example: toggle_el("text_input1","is-none");
 */
function toggleClassById(id,c) {
	var temp = id.split(",");
	for (var i = 0, len = temp.length; i < len; i++) {
		$(temp[i]).classList.toggle(c);
	}
}

function selectFirst(el, num) {
	var elements = document.getElementsByName(el);
	var n = parseInt(num, 10);
	if (elements.length > n) {
		var newels = _.first(elements, n);
		for (var i = 0; i < newels.length; i++) {
			if (newels[i].checked === false) {
			newels[i].checked = true;
			} else {
			newels[i].checked = false;
			}
		}
	}
}

function changecss(theClass, element, value) {
	//Last Updated on July 4, 2011
	//documentation for this script at
	//http://www.shawnolson.net/a/503/altering-css-class-attributes-with-javascript.html
	var cssRules;
	for (var S = 0; S < document.styleSheets.length; S++) {
		try {
			document.styleSheets[S].insertRule(theClass + " { " + element + ": " + value + "; }", document.styleSheets[S][cssRules].length);
		} catch (err) {
			try {
				document.styleSheets[S].addRule(theClass, element + ": " + value + ";");
			} catch (err) {
				try {
					if (document.styleSheets[S]["rules"]) {
					cssRules = "rules";
					} else if (document.styleSheets[S]["cssRules"]) {
						cssRules = "cssRules";
					} else {
						//no rules found... browser unknown
					}
					for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
						if (document.styleSheets[S][cssRules][R].selectorText === theClass) {
							if (document.styleSheets[S][cssRules][R].style[element]) {
								document.styleSheets[S][cssRules][R].style[element] = value;
								break;
							}
						}
					}
				} catch (err) {
					//
				}
			}
		}
	}
}

function isnoneByClass(c) {
	//c = string ClassName
	//can be used to hide a set of elements
	//then set is-block to one of those elements
	var els = document.getElementsByClassName(c);
	for (var i = 0; i < els.length; i++) {
		els[i].classList.remove("is-block");
		els[i].classList.add("is-none");
	}
}

function toggleByClass(c, c1, c2){
	//toggles visibility using class names
	//c = class name of element(s) to change
	//c1, c2 = classes to toggle
	var els = document.getElementsByClassName(c);
	for (var i = 0; i < els.length; i++) {
		if(els[i].classList.contains(c1)){
			els[i].classList.remove(c1);
			els[i].classList.add(c2);
		} else {
			els[i].classList.remove(c2);
			els[i].classList.add(c1);
		}
	}
}

/**
 * toggles class names using getElementById
 * @param {String} el = id of element to change
 * @param {String} c1, c2 = classes to toggle
 */
function toggleById(el, c1, c2){
	if($(el).classList.contains(c1)){
		$(el).classList.remove(c1);
		$(el).classList.add(c2);
	} else {
		$(el).classList.remove(c2);
		$(el).classList.add(c1);
	}
}

	function hide(els) {
		//takes a comma separated string as argument
		var temp = els.split(',');
		for(var i = 0; i < temp.length; i++) {
			if($(temp[i])) {
				$(temp[i]).style.display = "none";
			}
		}
	}

	function show(els) {
		//takes a comma separated string as argument
		var temp = els.split(',');
		for(var i = 0; i < temp.length; i++) {
			if($(temp[i])) {
				$(temp[i]).style.display = "block";
			}
		}
	}

function dbGet(key){
	if(supportsHTML5Storage()){
		var item = localStorage.getItem(key);
		if(!item) return null;
		return JSON.parse(item);
	} else {
		alert("Sorry, your browser is too old. Update your browser now.");
	}
}

function dbSet(key, value){
	if(supportsHTML5Storage()){
		var json = JSON.stringify(value);
		localStorage.setItem(key, json);
	} else {
		alert("Sorry, your browser is too old. Update your browser now.");
	}
}

function dbRemove(key){
	if(supportsHTML5Storage()){
		localStorage.removeItem(key);
	} else {
		return;
	}
}

function supportsHTML5Storage(){
	try {
		return "localStorage" in window && window["localStorage"] !== null;
	} catch (e){
		return false;
	}
}

function toggleClass(el,c1,c2){
	cssjs("swap",$(el),c1,c2);
}

/**
 * cssjs
 * written by Christian Heilmann (http://icant.co.uk)
 * eases the dynamic application of CSS classes via DOM
 * parameters: action act, object obj and class names c1 and c2 (c2 optional)
 * actions: swap exchanges c1 and c2 in object obj
 *   add adds class c1 to object obj
 *   remove removes class c1 from object obj
 *   check tests if class c1 is applied to object obj
 * example: cssjs("swap",$("foo"),"bar","baz");
 */
function cssjs(act, obj, c1, c2) {
	switch(act) {
		case "swap":
			obj.className = cssjs("check", obj, c1) ? obj.className.replace(c2, c1) : obj.className.replace(c1, c2);
			break;
		case "add":
			if(!cssjs("check", obj, c1)) {
				obj.className += obj.className ? " " + c1 : c1;
			}
			break;
		case "remove":
			var rep = obj.className.match(" " + c1) ? " " + c1 : c1;
			obj.className = obj.className.replace(rep, "");
			break;
		case "check":
			return new RegExp("\\b" + c1 + "\\b").test(obj.className);
			break;
		default:
			break;
	}
}


/**
 * Gets a list of the checked values from a group of checkboxes.
 * @param {Array} elements = An array of checkbox elements
 * @returns {Array} aValues = An array of the values of the checkboxes that are checked
 */
function collectCheckedValues(elements) {
	var aValues = [];
	for(var i = 0, ilen = elements.length; i < ilen ; i++) {
		if(elements[i].checked === true) {
			aValues.push(elements[i].value);
		}
	}
	return aValues;
}

/**
 * This function returns an array of DOM nodes that are checked (selected)
 * @param {type} elements = an array of DOM nodes
 * @returns {Array|collectCheckedNodes.aNodes}
 */
function collectCheckedNodes(elements){
	var aNodes = [];
	for(var i = 0, ilen = elements.length; i < ilen; i++){
		if(elements[i].checked === true){
			aNodes.push(elements[i]);
		}
	}
	return aNodes;
}
	/*
	 Developed by Robert Nyman, http://www.robertnyman.com
	 Code/licensing: http://code.google.com/p/getelementsbyclassname/
	 Use Examples
	 getElementsByClassName = function (className, *tag*, *elm*) *optional*
	 To get all elements in the document with a �info-links� class.
	 getElementsByClassName("info-links");
	 To get all div elements within the element named �container�, with a �col� class.
	 getElementsByClassName("col", "div", document.getElementById("container"));
	 To get all elements within in the document with a �click-me� and a �sure-thang� class.
	 getElementsByClassName("click-me sure-thang");
	 */
	var getElementsByClassName = function(className, tag, elm) {
		if(document.getElementsByClassName) {
			getElementsByClassName = function(className, tag, elm) {
				elm = elm || document;
				var elements = elm.getElementsByClassName(className),
						nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
						returnElements = [],
						current;
				for(var i = 0, il = elements.length; i < il; i += 1) {
					current = elements[i];
					if(!nodeName || nodeName.test(current.nodeName)) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		} else if(document.evaluate) {
			getElementsByClassName = function(className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
						classesToCheck = "",
						xhtmlNamespace = "http://www.w3.org/1999/xhtml",
						namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
						returnElements = [],
						elements,
						node;
				for(var j = 0, jl = classes.length; j < jl; j += 1) {
					classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
				}
				try {
					elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
				} catch(e) {
					elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
				}

				node = elements.iterateNext();
				while(node) {
					returnElements.push(node);
					node = elements.iterateNext();
				}
				return returnElements;
			};
		} else {
			getElementsByClassName = function(className, tag, elm) {
				tag = tag || "*";
				elm = elm || document;
				var classes = className.split(" "),
						classesToCheck = [],
						elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
						current,
						returnElements = [],
						match;
				for(var k = 0, kl = classes.length; k < kl; k += 1) {
					classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
				}
				for(var l = 0, ll = elements.length; l < ll; l += 1) {
					current = elements[l];
					match = false;
					for(var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
						match = classesToCheck[m].test(current.className);
						if(!match) {
							break;
						}
					}
					if(match) {
						returnElements.push(current);
					}
				}
				return returnElements;
			};
		}
		return getElementsByClassName(className, tag, elm);
	};

