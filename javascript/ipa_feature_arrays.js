/*
ARRAY of IPA FEATURES
Source: BasicIPAInfo.xml
Path of xml file: C:\Program Files (x86)\SIL\FieldWorks 8\Templates
Datestamp of xml file: 29/10/2012
Processed using: ipa.cct
Processed date: April 15, 2013

Array values:
	[0] = character
	[1] = unicode code point
	[2] = description
	[3] = binary features

Binary features values:
	1=Positive
	0=Negative
	_=Not Applicable

Binary features position:
0  consonantal           15 round
1  sonorant              16 coronal
2  syllabic              17 anterior
3  voice                 18 distributed
4  spreadglottis         19 dorsal
5  constrictedglottis    20 high
6  continuant            21 low
7  nasal                 22 front
8  strident              23 back
9  lateral               24 tense
10 delayedrelease        25 atr
11 approximant           26 rtr
12 implosive             27 pharyngeal
13 labial                28 long
14 labiodental

*/

var affricates = ["ʣ","ʤ","ʦ","ʧ","ʨ"];
var tone = ["↑","↓","˥˧","˧˩","˦˥˦","˩˨","˦˥","˥˩","˩˥","²","³","¹","˥","˦","˧","˨","˩","̀","́","̂","̄","̋","̌","̏","᷄","᷅","᷈","⁴","⁵","⁶","⁷","⁸","⁹","↗"];
var ipa_features = [
	["˥˧","uFFFFFFF9","High falling tone","_____________________________"],
	["˧˩","uFFFFFFFA","Low falling tone","_____________________________"],
	["˦˥˦","uFFFFFFFB","Rising-falling tone","_____________________________"],
	["˩˨","uFFFFFFFC","Low rising tone","_____________________________"],
	["˦˥","uFFFFFFFD","High rising tone","_____________________________"],
	["˥˩","uFFFFFFFE","Falling tone","_____________________________"],
	["˩˥","uFFFFFFFF","Rising tone","_____________________________"],
	["a","u0061","Open front unrounded vowel","01110010__110_00___101000__10"],
	["b","u0062","Voiced bilabial plosive","10010000_000010001__________0"],
	["c","u0063","Voiceless palatal plosive","10000000_0000_0_10_11010____0"],
	["d","u0064","Voiced alveolar plosive","10010000_0000_0_110_________0"],
	["e","u0065","Close-mid front unrounded vowel","01110010__110_00101100101__10"],
	["f","u0066","Voiceless labiodental fricative","10000010_010011001__________0"],
	["g","u0067","Voiced velar plosive","10010000_0000_0_00_110_1____0"],
	["h","u0068","Voiceless glottal fricative","100010____100_0_____________0"],
	["i","u0069","Close front unrounded vowel","01110010__110_00101110101__10"],
	["j","u006A","Voiced palatal approximant","11010010__110_0_101110101__10"],
	["k","u006B","Voiceless velar plosive","10000000_0000_0_00_110_1____0"],
	["l","u006C","Voiced alveolar lateral approximant","11010010_1110_0_110_________0"],
	["m","u006D","Voiced bilabial nasal","11010001_000010001__________0"],
	["n","u006E","Voiced alveolar nasal","11010001_0000_0_110_________0"],
	["o","u006F","Close-mid back rounded vowel","01110010__110101___100011__10"],
	["p","u0070","Voiceless bilabial plosive","10000000_000010001__________0"],
	["q","u0071","Voiceless uvular plosive","10000000_0000_0____10001____0"],
	["r","u0072","Voiced alveolar trill","1101001000110_0_110_________1"],
	["s","u0073","Voiceless alveolar fricative","1000001010100_0_110_________0"],
	["t","u0074","Voiceless alveolar plosive","10000000_0000_0_110________00"],
	["u","u0075","Rounded close back vowel","01110010__110101___110011__10"],
	["v","u0076","Voiced labiodental fricative","10010010_010011001__________0"],
	["w","u0077","Voiced labial-velar approximant","11010010__110101___110011__10"],
	["x","u0078","Voiceless velar fricative","10000010_0100_0_00_110_1____0"],
	["y","u0079","Close front rounded vowel","01110010__110101101110101__10"],
	["z","u007A","Voiced alveolar fricative","1001001010100_0_110_________0"],
	["²","u00B2","Custom use tone","_____________________________"],
	["³","u00B3","Custom use tone","_____________________________"],
	["¹","u00B9","Custom use tone","_____________________________"],
	["æ","u00E6","Near-open front unrounded vowel","01110010__110_00___101101__10"],
	["ç","u00E7","Voiceless palatal fricative","10000010_0100_0_10_11010____0"],
	["ð","u00F0","Voiced dental fricative","1001001000100_0_111_________0"],
	["ø","u00F8","Close-mid front rounded vowel","01110010__110101101100101__10"],
	["ħ","u0127","Voiceless pharyngeal fricative","10000010_0100_0______10____10"],
	["ŋ","u014B","Voiced velar nasal","11010001_0000_0_00_110_1____0"],
	["œ","u0153","Open-mid front rounded vowel","01110010__110101___100100__10"],
	["ƈ","u0188","Voiceless palatal implosive","10000100_0001_0_10_11010____0"],
	["ƍ","u018D","Voiced rounded/labialized dental fricative","_____________________________"],
	["ƙ","u0199","Voiceless velar implosive","10000100_0001_0_00_110_1____0"],
	["ƥ","u01A5","Voiceless bilabial implosive","10000100_000110001__________0"],
	["ƪ","u01AA","Voiceless labialized postalveolar fricative","_____________________________"],
	["ƫ","u01AB","Voiceless palatalized alveolar plosive","_____________________________"],
	["ƭ","u01AD","Voiceless alveolar implosive","10000100_0001_0_100_________0"],
	["ƺ","u01BA","Voiced labialized postalveolar fricative","_____________________________"],
	["ǀ","u01C0","Dental click","1000_000_0_0____110_________0"],
	["ǁ","u01C1","Alveolar lateral click","_____________________________"],
	["ǂ","u01C2","Palatoalveolar click","___000000000000010110010___01"],
	["ǃ","u01C3","(post)alveolar click","1__0000000000000110100_____01"],
	["ȡ","u0221","Voiced palatalized postalveolar (alveolo-palatal) plosive - used by sinologists","_____________________________"],
	["ȵ","u0235","Voiced palatalized postalveolar (alveolo-palatal) nasal - used by sinologists","_____________________________"],
	["ȶ","u0236","Voiceless palatalized postalveolar (alveolo-palatal) plosive - used by sinologists","_____________________________"],
	["ɐ","u0250","Near-open central unrounded vowel","01110010___1_______101_11__10"],
	["ɑ","u0251","Open back unrounded vowel","01110010__110_00___101010___0"],
	["ɒ","u0252","Open back rounded vowel","01110010__110101___101010__10"],
	["ɓ","u0253","Voiced bilabial implosive","10010100_000110001__________0"],
	["ɔ","u0254","Open-mid back rounded vowel","01110010__110101___100010__10"],
	["ɕ","u0255","Voiceless alveolo-palatal fricative","10000010_0100_0____11010____0"],
	["ɖ","u0256","Voiced retroflex plosive","10010000_0000_0_100_________0"],
	["ɗ","u0257","Voiced dental/alevolar implosive","10010100_0001_0_100_________0"],
	["ɘ","u0258","Close-mid unrounded vowel","01110010___1___0___100_10__10"],
	["ə","u0259","Mid central unrounded vowel","01110010__110_0____100011__10"],
	["ɚ","u025A","Rhoticized close-mid central unrounded vowel","_____________________________"],
	["ɛ","u025B","Open-mid front unrounded vowel","01110010__110_00___100100__10"],
	["ɜ","u025C","Open-mid central unrounded vowel","01110010__110_00___100010__10"],
	["ɝ","u025D","Rhotacized open-mid central unrounded vowel","_____________________________"],
	["ɞ","u025E","Open-mid central rounded vowel","01110010__110101___100010__10"],
	["ɟ","u025F","Voiced palatal plosive","10010000_0000_0_10_11010____0"],
	["ɠ","u0260","Voiced velar implosive","10010100_0001_0_00_110_1____0"],
	["ɡ","u0261","Voiced velar plosive","10010000_0000_0_00_110_1____0"],
	["ɢ","u0262","Voiced uvular plosive","10010000_0000_0____10001____0"],
	["ɣ","u0263","Voiced velar fricative","10010010_0100_0_00_1_0_1____0"],
	["ɤ","u0264","Close-mid back unrounded vowel","01110010__110_000__100011__10"],
	["ɥ","u0265","Voiced labial palatal approximant","11010010__11010110____1_1__10"],
	["ɦ","u0266","Voiced glottal fricative","100110____100_0_____________0"],
	["ɧ","u0267","Voiceless coarticulated velar and palatoalveolar fricative","1000001010100_0_101110_1____0"],
	["ɨ","u0268","Close central unrounded vowel","01110010__110_00___110011__10"],
	["ɩ","u0269","Near-close front unrounded vowel","_____________________________"],
	["ɪ","u026A","Near-close front unrounded vowel","01110010__110_00101110100__10"],
	["ɫ","u026B","Velarized voiced alveolar lateral approximant","11010010_1_1____110110_1____0"],
	["ɬ","u026C","Voiceless alveolar lateral fricative","10000010_1100_0_110_________0"],
	["ɭ","u026D","Voiced retroflex lateral approximant","11010010_1110_0_100_________0"],
	["ɮ","u026E","Voiced alveolar lateral fricative","10010010_1100_0_110_________0"],
	["ɯ","u026F","Close back unrounded vowel","01110010__110_00___110011__10"],
	["ɰ","u0270","Voiced velar approximant","11010010__110_0_00_110_11__10"],
	["ɱ","u0271","Voiced labiodental nasal","11010001_000011001__________0"],
	["ɲ","u0272","Voiced palatal nasal","11010001_0000_0_10_11010____0"],
	["ɳ","u0273","Voiced retroflex nasal","11010001_0000_0_100_________0"],
	["ɴ","u0274","Voiced uvular nasal","11010001_0000_0____10001____0"],
	["ɵ","u0275","Close-mid central rounded vowel","01110010__110101___100010__10"],
	["ɶ","u0276","Open front rounded vowel","01110010__110101___101100__10"],
	["ɷ","u0277","Near-close back unrounded vowel","_____________________________"],
	["ɸ","u0278","Voiceless bilabial fricative","10000010_010010001__________0"],
	["ɹ","u0279","Voiced alveolar approximant","11010010__110_0_100100_10__10"],
	["ɺ","u027A","Alveolar lateral flap","1101001001110_0_110_________0"],
	["ɻ","u027B","Voiced retroflex approximant","01010010__110_0_100100_10__10"],
	["ɼ","u027C","Voiced strident apico-alveolar trill (e.g. czech ř)","_____________________________"],
	["ɽ","u027D","Voiced retroflexed flap","11010010_0110_0_100_________0"],
	["ɾ","u027E","Voiced alveolar flap","11010010_0110_0_110_________0"],
	["ɿ","u027F","Apical dental unrounded syllabic alveolar fricative - used by sinologists","_____________________________"],
	["ʀ","u0280","Voiced uvular trill","11010010_0110_0____10001____1"],
	["ʁ","u0281","Voiced uvular fricative","10010010_0100_0____10001___00"],
	["ʂ","u0282","Voiceless retroflex fricative","1000001010100_0_100_________0"],
	["ʃ","u0283","Voiceless postalveolar fricative","1000001010100_0_101110_0____0"],
	["ʄ","u0284","Voiced palatal implosive","10010100_0001_0_10_11010____0"],
	["ʅ","u0285","Apical retroflex unrounded syllabic alveolar fricative - used by sinologists","_____________________________"],
	["ʆ","u0286","Voiceless alveopalatal fricative","_____________________________"],
	["ʇ","u0287","Voiceless alveolar click","_____________________________"],
	["ʈ","u0288","Voiceless retroflex plosive","10000000_0000_0_100_________0"],
	["ʉ","u0289","Close central rounded vowel","01110010__110101___110011__10"],
	["ʊ","u028A","Near-close back rounded vowel","01110010__110101___110010__10"],
	["ʋ","u028B","Voiced labiodental approximant","11010010__11011001______1__10"],
	["ʌ","u028C","Open-mid back unrounded vowel","01110010__110_00___100010__10"],
	["ʍ","u028D","Voiceless labial-velar approximant","11000010__110101___110011__10"],
	["ʎ","u028E","Voiced palatal lateral approximant","11010010_1110_0_10_11010____0"],
	["ʏ","u028F","Near-close front rounded vowel","01110010__110101101110100__10"],
	["ʐ","u0290","Voiced retroflex fricative","1001001010100_0_100_________0"],
	["ʑ","u0291","Voiced alveolo-palatal fricative","1001001010100_0_10111010____0"],
	["ʒ","u0292","Voiced postalveolar fricative","1001001010_0____101110_0____0"],
	["ʓ","u0293","Voiced alveopalatal fricative","_____________________________"],
	["ʔ","u0294","Voiceless glottal plosive","10000100__000_0____________00"],
	["ʕ","u0295","Voiced pharyngeal fricative","10010010_0000_0_______0____10"],
	["ʖ","u0296","Voiceless alveolar lateral click","_____________________________"],
	["ʗ","u0297","Voiceless postalveolar click","_____________________________"],
	["ʘ","u0298","Bilabial click","10000000_010010001_________11"],
	["ʙ","u0299","Voiced bilabial trill","11010010_011010001_________11"],
	["ʚ","u029A","Lower-mide central rounded vowel","_____________________________"],
	["ʛ","u029B","Voiced uvular implosive","10010100_0001_0____10001____0"],
	["ʜ","u029C","Voiceless epiglottal fricative","100011____100_0_______0_____0"],
	["ʝ","u029D","Voiced palatal fricative","10010010_0100_0_10_11010____0"],
	["ʟ","u029F","Voiced velar lateral approximant","11010010_1110_0_00_110_1____0"],
	["ʠ","u02A0","Voiceless uvular implosive","10000100_0001_0____10001____0"],
	["ʡ","u02A1","Epiglottal plosive","000101____000_0____10101____0"],
	["ʢ","u02A2","Voiced epiglottal fricative","000100____100_0_______0_____0"],
	["ʣ","u02A3","Voiceless dental/alveolar affricate","_____________________________"],
	["ʤ","u02A4","Voiced postalveolar affricate","1001001010100000101110_0____0"],
	["ʥ","u02A5","Voiced alveopalatal fricative","_____________________________"],
	["ʦ","u02A6","Voiceless alveolar affricate","_____________________________"],
	["ʧ","u02A7","Voiceless postalveolar affricate","_____________________________"],
	["ʨ","u02A8","Voiceless alveolo-palatal affricate","_____________________________"],
	["ʮ","u02AE","Apical dental rounded syllabic alveolar fricative - used by sinologists","_____________________________"],
	["ʯ","u02AF","Apical dental rounded syllabic retroflex fricative - used by sinologists","_____________________________"],
	["ʰ","u02B0","Aspirated","00_010_____0_________________"],
	["ʱ","u02B1","Breathy voice modification","_____________________________"],
	["ʲ","u02B2","Palatalized","___________________110_1_____"],
	["ʷ","u02B7","Labialized","_____________1_1_____________"],
	["ʸ","u02B8","Palatalized (Americanist)","_____________________________"],
	["ʼ","u02BC","Ejective","_____1_______________________"],
	["ː","u02D0","Long","____________________________1"],
	["ˑ","u02D1","Half-long","____________________________0"],
	["˞","u02DE","Rhoticity","_____________________________"],
	["ˠ","u02E0","Velarized","___________________11__1_____"],
	["ˡ","u02E1","Lateral release","_________11__________________"],
	["ˤ","u02E4","Pharyngealized","_____1_____________1___1_____"],
	["˥","u02E5","Tone extra high","_____________________________"],
	["˦","u02E6","High tone","_____________________________"],
	["˧","u02E7","Mid tone","_____________________________"],
	["˨","u02E8","Low tone","_____________________________"],
	["˩","u02E9","Tone extra low","_____________________________"],
	["̀","u0300","Low tone","_____________________________"],
	["́","u0301","High tone","_____________________________"],
	["̂","u0302","Tone falling","_____________________________"],
	["̃","u0303","Nasalized","_______1_____________________"],
	["̄","u0304","Mid tone","_____________________________"],
	["̆","u0306","Extra-short","_____________________________"],
	["̈","u0308","Centralized","_____________________________"],
	["̊","u030A","Voiceless","_____________________________"],
	["̋","u030B","Tone extra high","_____________________________"],
	["̌","u030C","Tone rising","_____________________________"],
	["̏","u030F","Tone extra low","_____________________________"],
	["̘","u0318","Advanced tongue root","_________________________10__"],
	["̙","u0319","Retracted tongue root","_________________________01__"],
	["̚","u031A","No audible release","_____________________________"],
	["̜","u031C","Less rounded","_____________________________"],
	["̝","u031D","Raised","_____________________________"],
	["̞","u031E","Lowered","_____________________________"],
	["̟","u031F","Advanced","_____________________________"],
	["̠","u0320","Retracted","_____________________________"],
	["̡","u0321","Diacritic - palatalized","_____________________________"],
	["̢","u0322","Retroflex or r-colored vowels","_____________________________"],
	["̤","u0324","Breathy voiced","____11_______________________"],
	["̥","u0325","Voiceless","___0_________________________"],
	["̩","u0329","Syllabic","__1__________________________"],
	["̪","u032A","Dental","________________1_1__________"],
	["̫","u032B","Labialized","_____________________________"],
	["̬","u032C","Voiced","___1_________________________"],
	["̯","u032F","Non-syllabic","__0__________________________"],
	["̰","u0330","Creaky voiced","_____________________________"],
	["̴","u0334","Velarized or pharyngealized","___________________11__1_____"],
	["̹","u0339","More rounded","_______________1_____________"],
	["̺","u033A","Apical","________________1_0__________"],
	["̻","u033B","Laminal","________________1_1__________"],
	["̼","u033C","Linguolabial","_____________________________"],
	["̽","u033D","Mid-centralized","_____________________________"],
	["͜","u035C","Double articulation","_____________________________"],
	["͡","u0361","Double articulation","_____________________________"],
	["β","u03B2","Voiced bilabial fricative","10010010_010010001__________0"],
	["θ","u03B8","Voiceless dental fricative","1000001000100_0_111_________0"],
	["σ","u03C3","Voiceless rounded/labialized dental fricative","_____________________________"],
	["χ","u03C7","Voiceless uvular fricative","10000010_0100_0____10001___00"],
	["ᴀ","u1D00","Open central vowel used by sinologists - between [a] and [ɑ] = [ä] used unofficially as an open central vowel","_____________________________"],
	["ᴇ","u1D07","mid front unrounded vowel between [e] and [ɛ]","_____________________________"],
	["ᵃ","u1D43","Superscript a","_____________________________"],
	["ᵄ","u1D44","Superscript inverted a","_____________________________"],
	["ᵅ","u1D45","Superscript rounded a","_____________________________"],
	["ᵆ","u1D46","Superscript ae","_____________________________"],
	["ᵉ","u1D49","Superscript e","_____________________________"],
	["ᵊ","u1D4A","Superscript inverted e","_____________________________"],
	["ᵋ","u1D4B","Superscript epsilon","_____________________________"],
	["ᵐ","u1D50","Superscript m","11010001_0000100____________0"],
	["ᵑ","u1D51","Superscript eng","11010001_0000_0____110_1____0"],
	["ᵒ","u1D52","Superscript o","_____________________________"],
	["ᵓ","u1D53","Superscript open o","_____________________________"],
	["ᵘ","u1D58","Superscript u","_____________________________"],
	["ᵚ","u1D5A","Superscript inverted m","_____________________________"],
	["ᶛ","u1D9B","Superscript inverted rounded a","_____________________________"],
	["ᶟ","u1D9F","Superscript backwards epsilon","_____________________________"],
	["ᶤ","u1DA4","Superscript barred i","_____________________________"],
	["ᶦ","u1DA6","Superscript small capital i","_____________________________"],
	["ᶮ","u1DAE","Superscript left-tail n (at left)","11010001_0000_0____11010____0"],
	["ᶱ","u1DB1","Superscript barred o","_____________________________"],
	["ᶶ","u1DB6","Superscript barred u","_____________________________"],
	["ᶷ","u1DB7","Superscript upsilon","_____________________________"],
	["ᶺ","u1DBA","Superscript inverted v","_____________________________"],
	["᷄","u1DC4","Tone high rising","_____________________________"],
	["᷅","u1DC5","Tone low rising","_____________________________"],
	["᷈","u1DC8","Tone rising-falling","_____________________________"],
	["ⁱ","u2071","Superscript i","_____________________________"],
	["⁴","u2074","Custom use tone","_____________________________"],
	["⁵","u2075","Custom use tone","_____________________________"],
	["⁶","u2076","Custom use tone","_____________________________"],
	["⁷","u2077","Custom use tone","_____________________________"],
	["⁸","u2078","Custom use tone","_____________________________"],
	["⁹","u2079","Custom use tone","_____________________________"],
	["ⁿ","u207F","Nasal release","11010001_0000_0_110_________0"],
	["↑","u2191","Upstep (tone)","_____________________________"],
	["↓","u2193","Downstep (tone)","_____________________________"],
	["↗","u2197","Global rise (tone)","_____________________________"]
];

function findByIPAChar(item){
	for(var i = 0; i < ipa_features.length; i++){
		if(ipa_features[i][0] == item){
			return ipa_features[i];
		}
	}
}

function findIPAByMoA(a,moa){
	//a = array to check (eg: aGPC[i] which can contain multiple items)
	//moa = string: manner of articulation
	var result = [];
	if(a[5]){
		switch(moa){
			case 'consonant' :
				if( a[5].charAt(2) == '0' ){//-Syllabic
					result.push(a);
				}
			break;
			case 'vowel' :
				if( a[5].charAt(2) == '1' ){//+Syllabic
					result.push(a);
				}
			break;
			case 'plosive' :
				if(    a[5].charAt(0) == '1'//+Consonantal
					  && a[5].charAt(1) == '0'//-Sonorant
					  && a[5].charAt(2) == '0'//-Syllabic
					  && a[5].charAt(10) == '0'//-delayedrelease
					){
					result.push(a);
				}
			break;
			case 'nasal' :
				if(    a[5].charAt(1)  == '1' //+Sonorant
					  && a[5].charAt(7)  == '1' //+Nasal
					  && a[5].charAt(11) == '0' //-approximant
					){
					result.push(a);
				}
			break;
			case 'fricative' :
				if(    a[5].charAt(1) == '0' //-Sonorant
					  && a[5].charAt(6) == '1' //+Continuant
					){
					result.push(a);
				}
			break;
			//case 'lateral' :
			//	if (a[5].charAt(9) == '1' ){//+Lateral
			//		result.push(a);
			//	}
			//break;
			case 'flap' :
				if(  a[5].charAt(0) == '1'//+consonantal
					&& a[5].charAt(11) == '1'//+approximant
				){
					result.push(a);
				}
			break;
			case 'latfric' :
				if (a[5].charAt(9) == '1'){
					//+consonantal
					//+approximant
					result.push(a);
				}
			break;




		//if(findIPAByMoA(aGPC[i],'flap').length > 0) lettersGroupedByFeatures['flap'].push(aGPC[i][0]);
		//if(findIPAByMoA(aGPC[i],'trill').length > 0) lettersGroupedByFeatures['trill'].push(aGPC[i][0]);
		//if(findIPAByMoA(aGPC[i],'latfric').length > 0) lettersGroupedByFeatures['latfric'].push(aGPC[i][0]);
		//if(findIPAByMoA(aGPC[i],'latappr').length > 0) lettersGroupedByFeatures['latappr'].push(aGPC[i][0]);
		if(findIPAByMoA(aGPC[i],'implosive').length > 0) lettersGroupedByFeatures['implosive'].push(aGPC[i][0]);
		}
	}
	return result;
}

function findIPAByFeatures(f,v){
	//f = feature (string)
	//v = value (string 1,0,_)
	var result = [];
	for(var i = 0; i < ipa_features.length; i++){
		switch(f){
			case 'consonantal'        : if(ipa_features[i][3].charAt(0)  === v){result.push(ipa_features[i]);} break;
			case 'sonorant'           : if(ipa_features[i][3].charAt(1)  === v){result.push(ipa_features[i]);} break;
			case 'syllabic'           : if(ipa_features[i][3].charAt(2)  === v){result.push(ipa_features[i]);} break;
			case 'voice'              : if(ipa_features[i][3].charAt(3)  === v){result.push(ipa_features[i]);} break;
			case 'spreadglottis'      : if(ipa_features[i][3].charAt(4)  === v){result.push(ipa_features[i]);} break;
			case 'constrictedglottis' : if(ipa_features[i][3].charAt(5)  === v){result.push(ipa_features[i]);} break;
			case 'continuant'         : if(ipa_features[i][3].charAt(6)  === v){result.push(ipa_features[i]);} break;
			case 'nasal'              : if(ipa_features[i][3].charAt(7)  === v){result.push(ipa_features[i]);} break;
			case 'strident'           : if(ipa_features[i][3].charAt(8)  === v){result.push(ipa_features[i]);} break;
			case 'lateral'            : if(ipa_features[i][3].charAt(9)  === v){result.push(ipa_features[i]);} break;
			case 'delayedrelease'     : if(ipa_features[i][3].charAt(10) === v){result.push(ipa_features[i]);} break;
			case 'approximant'        : if(ipa_features[i][3].charAt(11) === v){result.push(ipa_features[i]);} break;
			case 'implosive'          : if(ipa_features[i][3].charAt(12) === v){result.push(ipa_features[i]);} break;
			case 'labial'             : if(ipa_features[i][3].charAt(13) === v){result.push(ipa_features[i]);} break;
			case 'labiodental'        : if(ipa_features[i][3].charAt(14) === v){result.push(ipa_features[i]);} break;
			case 'round'              : if(ipa_features[i][3].charAt(15) === v){result.push(ipa_features[i]);} break;
			case 'coronal'            : if(ipa_features[i][3].charAt(16) === v){result.push(ipa_features[i]);} break;
			case 'anterior'           : if(ipa_features[i][3].charAt(17) === v){result.push(ipa_features[i]);} break;
			case 'distributed'        : if(ipa_features[i][3].charAt(18) === v){result.push(ipa_features[i]);} break;
			case 'dorsal'             : if(ipa_features[i][3].charAt(19) === v){result.push(ipa_features[i]);} break;
			case 'high'               : if(ipa_features[i][3].charAt(20) === v){result.push(ipa_features[i]);} break;
			case 'low'                : if(ipa_features[i][3].charAt(21) === v){result.push(ipa_features[i]);} break;
			case 'front'              : if(ipa_features[i][3].charAt(22) === v){result.push(ipa_features[i]);} break;
			case 'back'               : if(ipa_features[i][3].charAt(23) === v){result.push(ipa_features[i]);} break;
			case 'tense'              : if(ipa_features[i][3].charAt(24) === v){result.push(ipa_features[i]);} break;
			case 'atr'                : if(ipa_features[i][3].charAt(25) === v){result.push(ipa_features[i]);} break;
			case 'rtr'                : if(ipa_features[i][3].charAt(26) === v){result.push(ipa_features[i]);} break;
			case 'pharyngeal'         : if(ipa_features[i][3].charAt(27) === v){result.push(ipa_features[i]);} break;
			case 'long'               : if(ipa_features[i][3].charAt(28) === v){result.push(ipa_features[i]);} break;
		}
	}
	if(result.length > 0 ){
		return result;
	}
}

