/* eslint-disable */
// @ts-nocheck

export function codeSyntaxHigh(elmnt, mode) {
	var lang = (mode || "html");
	var lang = (mode || "html");
	const elmntObj = (document.getElementById(elmnt) || elmnt);
	let elmntTxt = elmntObj.innerHTML;
	/* HTML */
	const tagcolor = getComputedStyle(docEle).getPropertyValue("--HTML-tagcolor"),
		tagnamecolor = getComputedStyle(docEle).getPropertyValue("--HTML-tagnamecolor"),
		attributecolor = getComputedStyle(docEle).getPropertyValue("--HTML-attributecolor"),
		attributevaluecolor = getComputedStyle(docEle).getPropertyValue("--HTML-attributevaluecolor"),
		commentcolor = getComputedStyle(docEle).getPropertyValue("--HTML-commentcolor");
	/* CSS */
	const cssselectorcolor = getComputedStyle(docEle).getPropertyValue("--CSS-selectorcolor"),
		csspropertycolor = getComputedStyle(docEle).getPropertyValue("--CSS-propertycolor"),
		csspropertyvaluecolor = getComputedStyle(docEle).getPropertyValue("--CSS-propertyvaluecolor"),
		cssdelimitercolor = getComputedStyle(docEle).getPropertyValue("--CSS-delimitercolor"),
		cssimportantcolor = getComputedStyle(docEle).getPropertyValue("--CSS-importantcolor");
	/* JS */
	const jscolor = getComputedStyle(docEle).getPropertyValue("--JS-color"),
		jskeywordcolor = getComputedStyle(docEle).getPropertyValue("--JS-keywordcolor"),
		jsstringcolor = getComputedStyle(docEle).getPropertyValue("--JS-stringcolor"),
		jsnumbercolor = getComputedStyle(docEle).getPropertyValue("--JS-numbercolor"),
		jspropertycolor = getComputedStyle(docEle).getPropertyValue("--JS-propertycolor");

/* New colors - need to set properties
var tagcolor = "gray";
var tagnamecolor = "#569cd6";
var attributecolor = "#9cdcfe";
var attributevaluecolor = "#ce9178";
var commentcolor = "green";
var cssselectorcolor = "brown";
var csspropertycolor = "red";
var csspropertyvaluecolor = "#006aff";
var cssdelimitercolor = "black";
var cssimportantcolor = "red";
var jscolor = "black";
var jskeywordcolor = "#006aff";
var jsstringcolor = "brown";
var jsnumbercolor = "red";
var jspropertycolor = "black";
*/attributecolor
	elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
	if (!lang) {
		lang = "html";
	}
	if (lang == "html") {
		elmntTxt = htmlMode(elmntTxt);
	}
	if (lang == "css") {
		elmntTxt = cssMode(elmntTxt);
	}
	if (lang == "js") {
		elmntTxt = jsMode(elmntTxt);
	}
	elmntObj.innerHTML = elmntTxt;

	function extract(str, start, end, func, repl) {
		let s, e, d = "",
			a = [];
		while (str.search(start) > -1) {
			s = str.search(start);
			e = str.indexOf(end, s);
			if (e == -1) {
				e = str.length;
			}
			if (repl) {
				a.push(func(str.substring(s, e + (end.length))));
				str = str.substring(0, s) + repl + str.substr(e + (end.length));
			} else {
				d += str.substring(0, s);
				d += func(str.substring(s, e + (end.length)));
				str = str.substr(e + (end.length));
			}
		}
		this.rest = d + str;
		this.arr = a;
	}

	function htmlMode(txt) {
		let rest = txt,
			done = "",
			php, comment, angular, startpos, endpos, note, i;
		comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
		rest = comment.rest;
		while (rest.indexOf("&lt;") > -1) {
			note = "";
			startpos = rest.indexOf("&lt;");
			if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
				note = "css";
			}
			if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
				note = "javascript";
			}
			endpos = rest.indexOf("&gt;", startpos);
			if (endpos == -1) {
				endpos = rest.length;
			}
			done += rest.substring(0, startpos);
			done += tagMode(rest.substring(startpos, endpos + 4));
			rest = rest.substr(endpos + 4);
			if (note == "css") {
				endpos = rest.indexOf("&lt;/style&gt;");
				if (endpos > -1) {
					done += cssMode(rest.substring(0, endpos));
					rest = rest.substr(endpos);
				}
			}
			if (note == "javascript") {
				endpos = rest.indexOf("&lt;/script&gt;");
				if (endpos > -1) {
					done += jsMode(rest.substring(0, endpos));
					rest = rest.substr(endpos);
				}
			}
		}
		rest = done + rest;
		for (i = 0; i < comment.arr.length; i++) {
			rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
		}
		return rest;
	}

	function tagMode(txt) {
		let rest = txt,
			done = "",
			startpos, endpos, result;
		while (rest.search(/(\s|<br>)/) > -1) {
			startpos = rest.search(/(\s|<br>)/);
			endpos = rest.indexOf("&gt;");
			if (endpos == -1) {
				endpos = rest.length;
			}
			done += rest.substring(0, startpos);
			done += attributeMode(rest.substring(startpos, endpos));
			rest = rest.substr(endpos);
		}
		result = done + rest;
		result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
		if (result.substr(result.length - 4, 4) == "&gt;") {
			result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
		}
		return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
	}

	function attributeMode(txt) {
		let rest = txt,
			done = "",
			startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
		while (rest.indexOf("=") > -1) {
			endpos = -1;
			startpos = rest.indexOf("=");
			singlefnuttpos = rest.indexOf("'", startpos);
			doublefnuttpos = rest.indexOf('"', startpos);
			spacepos = rest.indexOf(" ", startpos + 2);
			if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
				endpos = rest.indexOf(" ", startpos);
			} else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
				endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
			} else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
				endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
			}
			if (!endpos || endpos == -1 || endpos < startpos) {
				endpos = rest.length;
			}
			done += rest.substring(0, startpos);
			done += attributeValueMode(rest.substring(startpos, endpos + 1));
			rest = rest.substr(endpos + 1);
		}
		return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
	}

	function attributeValueMode(txt) {
		return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
	}

	function commentMode(txt) {
		return "<span style=color:" + commentcolor + ">" + txt + "</span>";
	}

	function cssMode(txt) {
		let rest = txt,
			done = "",
			s, e, comment, i, midz, c, cc;
		comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
		rest = comment.rest;
		while (rest.search("{") > -1) {
			s = rest.search("{");
			midz = rest.substr(s + 1);
			cc = 1;
			c = 0;
			for (i = 0; i < midz.length; i++) {
				if (midz.substr(i, 1) == "{") {
					cc++;
					c++
				}
				if (midz.substr(i, 1) == "}") {
					cc--;
				}
				if (cc == 0) {
					break;
				}
			}
			if (cc != 0) {
				c = 0;
			}
			e = s;
			for (i = 0; i <= c; i++) {
				e = rest.indexOf("}", e + 1);
			}
			if (e == -1) {
				e = rest.length;
			}
			done += rest.substring(0, s + 1);
			done += cssPropertyMode(rest.substring(s + 1, e));
			rest = rest.substr(e);
		}
		rest = done + rest;
		rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
		rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
		for (i = 0; i < comment.arr.length; i++) {
			rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
		}
		return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
	}

	function cssPropertyMode(txt) {
		let rest = txt,
			done = "",
			s, e, n, loop;
		if (rest.indexOf("{") > -1) {
			return cssMode(rest);
		}
		while (rest.search(":") > -1) {
			s = rest.search(":");
			loop = true;
			n = s;
			while (loop == true) {
				loop = false;
				e = rest.indexOf(";", n);
				if (rest.substring(e - 5, e + 1) == "&nbsp;") {
					loop = true;
					n = e + 1;
				}
			}
			if (e == -1) {
				e = rest.length;
			}
			done += rest.substring(0, s);
			done += cssPropertyValueMode(rest.substring(s, e + 1));
			rest = rest.substr(e + 1);
		}
		return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
	}

	function cssPropertyValueMode(txt) {
		let rest = txt,
			done = "",
			s;
		rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
		while (rest.search(/!important/i) > -1) {
			s = rest.search(/!important/i);
			done += rest.substring(0, s);
			done += cssImportantMode(rest.substring(s, s + 10));
			rest = rest.substr(s + 10);
		}
		result = done + rest;
		if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
			result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
		}
		return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
	}

	function cssImportantMode(txt) {
		return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
	}

	function jsMode(txt) {
		let rest = txt,
			done = "",
			esc = [],
			i, cc, tt = "",
			sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
		for (i = 0; i < rest.length; i++) {
			cc = rest.substr(i, 1);
			if (cc == "\\") {
				esc.push(rest.substr(i, 2));
				cc = "W3JSESCAPE";
				i++;
			}
			tt += cc;
		}
		rest = tt;
		y = 1;
		while (y == 1) {
			sfnuttpos = getPos(rest, "'", "'", jsStringMode);
			dfnuttpos = getPos(rest, '"', '"', jsStringMode);
			compos = getPos(rest, /\/\*/, "*/", commentMode);
			comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
			numpos = getNumPos(rest, jsNumberMode);
			keywordpos = getKeywordPos("js", rest, jsKeywordMode);
			dotpos = getDotPos(rest, jsPropertyMode);
			if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {
				break;
			}
			mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
			if (mypos[0] == -1) {
				break;
			}
			if (mypos[0] > -1) {
				done += rest.substring(0, mypos[0]);
				done += mypos[2](rest.substring(mypos[0], mypos[1]));
				rest = rest.substr(mypos[1]);
			}
		}
		rest = done + rest;
		for (i = 0; i < esc.length; i++) {
			rest = rest.replace("W3JSESCAPE", esc[i]);
		}
		return "<span style=color:" + jscolor + ">" + rest + "</span>";
	}

	function jsStringMode(txt) {
		return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
	}

	function jsKeywordMode(txt) {
		return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
	}

	function jsNumberMode(txt) {
		return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
	}

	function jsPropertyMode(txt) {
		return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
	}

	function getDotPos(txt, func) {
		let x, i, j, s, e, arr = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
		s = txt.indexOf(".");
		if (s > -1) {
			x = txt.substr(s + 1);
			for (j = 0; j < x.length; j++) {
				cc = x[j];
				for (i = 0; i < arr.length; i++) {
					if (cc.indexOf(arr[i]) > -1) {
						e = j;
						return [s + 1, e + s + 1, func];
					}
				}
			}
		}
		return [-1, -1, func];
	}

	function getMinPos() {
		let i, arr = [];
		for (i = 0; i < arguments.length; i++) {
			if (arguments[i][0] > -1) {
				if (arr.length == 0 || arguments[i][0] < arr[0]) {
					arr = arguments[i];
				}
			}
		}
		if (arr.length == 0) {
			arr = arguments[i];
		}
		return arr;
	}

	function getKeywordPos(typ, txt, func) {
		let words, i, pos, rpos = -1,
			rpos2 = -1,
			patt;
		if (typ == "js") {
			words = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete",
				"do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import",
				"in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static",
				"super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"
			];
		}
		for (i = 0; i < words.length; i++) {
			pos = txt.indexOf(words[i]);
			if (pos > -1) {
				patt = /\W/g;
				if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
					if (pos > -1 && (rpos == -1 || pos < rpos)) {
						rpos = pos;
						rpos2 = rpos + words[i].length;
					}
				}
			}
		}
		return [rpos, rpos2, func];
	}

	function getPos(txt, start, end, func) {
		let s, e;
		s = txt.search(start);
		e = txt.indexOf(end, s + (end.length));
		if (e == -1) {
			e = txt.length;
		}
		return [s, e + (end.length), func];
	}

	function getNumPos(txt, func) {
		let arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="],
			i, j, c, startpos = 0,
			endpos, word;
		for (i = 0; i < txt.length; i++) {
			for (j = 0; j < arr.length; j++) {
				c = txt.substr(i, arr[j].length);
				if (c == arr[j]) {
					if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
						continue;
					}
					endpos = i;
					if (startpos < endpos) {
						word = txt.substring(startpos, endpos);
						if (!isNaN(word)) {
							return [startpos, endpos, func];
						}
					}
					i += arr[j].length;
					startpos = i;
					i -= 1;
					break;
				}
			}
		}
		return [-1, -1, func];
	}
}

export const pSBC = (p, c0, c1?: any, l?: any) => {
	let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
	if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
	if (!this.pSBCr) this.pSBCr = (d) => {
		let n = d.length, x = {};
		if (n > 9) {
			[r, g, b, a] = d = d.split(","), n = d.length;
			if (n < 3 || n > 4) return null;
			x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
		} else {
			if (n == 8 || n == 6 || n < 4) return null;
			if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
			d = i(d.slice(1), 16);
			if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
			else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
		} return x
	};
	h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
	if (!f || !t) return null;
	if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
	else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
	a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
	if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
	else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

export function addAlpha(color, opacity) {
	// coerce values so ti is between 0 and 1.
	const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
	return color + _opacity.toString(16).toUpperCase();
}

export function colorNameToHex(colour: string) {
	const colours = {
		"aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
		"beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
		"cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
		"darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
		"darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
		"darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
		"firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
		"gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
		"honeydew": "#f0fff0", "hotpink": "#ff69b4",
		"indianred ": "#cd5c5c", "indigo": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
		"lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
		"lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
		"lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
		"magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
		"mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
		"navajowhite": "#ffdead", "navy": "#000080",
		"oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
		"palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
		"rebeccapurple": "#663399", "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
		"saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
		"tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
		"violet": "#ee82ee",
		"wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
		"yellow": "#ffff00", "yellowgreen": "#9acd32"
	};

	if (typeof colours[colour.toLowerCase()] != 'undefined')
		return colours[colour.toLowerCase()];

	return false;
}

export function getVisibleTextColor(rgba) {
	rgba = rgba.match(/\d+/g);

	if ((rgba[0] * 0.299) + (rgba[1] * 0.587) + (rgba[2] * 0.114) > 186) {
		return 'black';
	} else {
		return 'var(--text-color)';
	}
}

export function hexToRgbA(hex) {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
	}
	throw new Error('Bad Hex');
}

//#endregion