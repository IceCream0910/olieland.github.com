Function.prototype.bind = function() {
    // http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Functions:arguments
    var _$A = function(a) { return Array.prototype.slice.call(a); };
    if (arguments.length < 2 && (typeof arguments[0] == "undefined")) return this;
    var __method = this,
        args = _$A(arguments),
        object = args.shift();
    return function() {
        return __method.apply(object, args.concat(_$A(arguments)));
    };
};

jQuery.fn.extend({
    getClasses: function() {
        var classes = [];

        jQuery(this).each(function() {
            classes = classes.concat(jQuery(this).attr("class").split(" "));
        });

        return classes;
    },

    eachClass: function(callback) {
        jQuery(this).each(function() {
            var _class = jQuery(this).attr("class");
            if (typeof _class != "undefined")
                jQuery.each(_class.split(" "), callback);
        });

        return this;
    },

    setTextField: function(e, maxLength) {
        jQuery(this).focus(function() {
            jQuery(this).removeClass("default").addClass("focus").unbind("focus");
        }).keyup(function() {
            if (!e || !maxLength) return;

            var bytes = bugs.utils.byteSize($(this).val());

            var html = "(" + bytes + " / " + maxLength + ")";
            if (bytes > maxLength) html = "<em>湲��먯닔媛� 珥덇낵�섏뿀�듬땲��. �ㅼ떆 �낅젰�� 二쇱꽭��.</em>" + html;
            e.html(html);
        });

        return this;
    },

    openWindow: function(callback) {
        jQuery(this).click(function() {
            var href = jQuery(this).attr("href");
            window.open(href);

            if (typeof(callback) == "function") callback();

            return false;
        });
        return this;
    },

    popupWindow: function(option, callback) {
        var opt = bugs.overed({
            method: "GET",
            objFrom: null,
            url: null,
            name: null,
            width: 500,
            height: 500,
            top: 0,
            left: 0,
            center: 0,
            location: 0,
            menubar: 0,
            toolbar: 0,
            status: 0,
            scrollbars: 0,
            resizable: 0
        }, option || {});

        var top, left;
        if (opt.center) {
            if ($.browser.msie) {
                top = (window.screenTop - 120) + ((((document.documentElement.clientHeight + 120) / 2) - (opt.height / 2)));
                left = window.screenLeft + ((((document.body.offsetWidth + 20) / 2) - (opt.width / 2)));
            } else {
                top = window.screenY + (((window.outerHeight / 2) - (opt.height / 2)));
                left = window.screenX + (((window.outerWidth / 2) - (opt.width / 2)));
            }
        } else {
            top = opt.top;
            left = opt.left;
        }

        var features = "width=" + opt.width +
            ",height=" + opt.height +
            ",location=" + opt.location +
            ",menuBar=" + opt.menubar +
            ",toolbar=" + opt.toolbar +
            ",status=" + opt.status +
            ",scrollbars=" + opt.scrollbars +
            ",resizable=" + opt.resizable;

        var objPopup = null;
        if (opt.method.toUpperCase() == "POST") {
            objPopup = window.open("", opt.name, features + ",top=" + top + ",left=" + left);

            $(opt.objFrom).attr("method", "post");
            $(opt.objFrom).attr("target", opt.name);
            $(opt.objFrom).attr("action", opt.url);
            $(opt.objFrom).submit();
        } else {
            objPopup = window.open(opt.url, opt.name, features + ",top=" + top + ",left=" + left);
        }

        if (objPopup == null) {
            alert("李⑤떒�� �앹뾽李쎌쓣 �덉슜 �꾩뿉 �댁슜�섏떎 �� �덉뒿�덈떎.");
        } else {
            objPopup.focus();
        }

        return objPopup;
    },

    nextInput: function(nextElem, maxLength) {
        jQuery(this).keyup(function() {
            if (!nextElem || !maxLength) return;
            if ($(this).val().length >= maxLength) {
                jQuery(this).removeClass("focus").addClass("default");
                $(nextElem).focus();
            }
        });
        return this;
    }
});



bugs = {
    create: function() {
        return function() { this.initialize.apply(this, arguments); };
    },
    overed: function(destination, source) {
        for (var property in source) { destination[property] = source[property]; }
        return destination;
    },
    extend: function(ext, sup) {
        var ext_prototype = ext.prototype;
        var sup_prototype = sup.prototype;
        for (var property in sup_prototype) { if (!ext_prototype[property]) ext_prototype[property] = sup_prototype[property]; }
    },
    clone: function(obj) {
        var newObj = {};
        for (var property in obj) newObj[property] = obj[property];
        return newObj;
    },
    log: {
        LEVEL: 2,
        levels: {
            DEBUG: 0,
            INFO: 1,
            ERROR: 2
        },
        setLogLevel: function(lv) {
            if (lv == "DEBUG") bugs.log.LEVEL = bugs.log.levels.DEBUG;
            else if (lv == "INFO") bugs.log.LEVEL = bugs.log.levels.DEBUG;
            else if (lv == "ERROR") bugs.log.LEVEL = bugs.log.levels.DEBUG;
        },
        log: function(s) {
            try {
                if (typeof(console) != "undefined") console.log(s);
                //else alert(bugs.object.toString(s));
            } catch (e) {}
        },
        debug: function(s) {
            if (bugs.log.LEVEL <= bugs.log.levels.DEBUG) bugs.log.log(s);;
        },
        info: function(s) {
            if (bugs.log.LEVEL <= bugs.log.levels.INFO) bugs.log.log(s);;
        },
        error: function(s) {
            if (bugs.log.LEVEL <= bugs.log.levels.ERROR) bugs.log.log(s);;
        },
        dump: function(s) {
            var newLog = "";
            switch ((typeof s).toLowerCase()) {
                case "object":
                    $.each(s, function(key, value) {
                        newLog += "[" + (typeof value) + "] " + key + " : " + value + "\n";
                    });
                    break;

                case "string":
                default:
                    newLog += "[" + (typeof s) + "] " + s;
            }
            bugs.log.log(newLog);
        }
    },
    date: {
        yyyyMMdd: function(d) {
            if (!d) d = new Date();
            return d.yyyyMMdd();
        }
    },
    math: {
        abs: function(x) {
            return Math.abs(x);
        },
        random: function(n) {
            if (typeof(n) == "undefined") return Math.random();
            else return bugs.math.floor(Math.random() * n, 0);
        },
        round: function(n, index) {
            return bugs.math._get(Math.round, n, index);
        },
        ceil: function(n, index) {
            return bugs.math._get(Math.ceil, n, index);
        },
        floor: function(n, index) {
            return bugs.math._get(Math.floor, n, index);
        },
        _get: function(type, n, index) {
            if (typeof(index) == "undefined" || index == null) {
                index = 0;
            }
            //if(index==0) return eval("Math."+type+"(n)");
            if (index == 0) return type(n);
            else {
                var p = Math.pow(10, index);
                //				return eval("Math."+type+"(n * p) / p");
                return type(n * p) / p;
            }
        }
    },
    cookie: {
        set: function(name, value) {
            var argc = arguments.length;
            var argv = arguments;
            var expires = (argc > 2) ? argv[2] : null;
            var path = (argc > 3) ? argv[3] : null;
            var domain = (argc > 4) ? argv[4] : null;
            var secure = (argc > 5) ? argv[5] : false;
            var encode = (argc > 6) ? argv[6] : true;

            var expireDate = new Date();
            expireDate.setTime(expires);

            document.cookie = name + "=" + (encode ? escape(value) : value) +
                ((expires == null) ? "" : ("; expires =" + expireDate.toGMTString())) +
                ((path == null) ? "" : ("; path =" + path)) +
                ((domain == null) ? "" : ("; domain =" + domain)) +
                ((secure == true) ? "; secure" : "");
        },
        get: function(name) {
            var dcookie = document.cookie;
            var cname = name + "=";
            var clen = dcookie.length;
            var cbegin = 0;
            while (cbegin < clen) {
                var vbegin = cbegin + cname.length;
                if (dcookie.substring(cbegin, vbegin) == cname) {
                    var vend = dcookie.indexOf(";", vbegin);
                    if (vend == -1) vend = clen;
                    return unescape(dcookie.substring(vbegin, vend));
                }
                cbegin = dcookie.indexOf(" ", cbegin) + 1;
                if (cbegin == 0) break;
            }
            return "";
        },
        del: function(name) {
            var expTime = new Date();
            expTime.setTime(expTime.getTime() - 1);

            var cookieVal = bugs.cookie.get(name);
            if (cookieVal != null) {
                bugs.cookie.set(name, cookieVal, expTime);
            }
        }
    },
    visible: function(e) {
        var _is_display = false;
        if (e) {
            return (e.get(0).style.display != "none");
        } else
            return false;
        /*
        if(e) e.each(function() {if(this.style.display != "none") _is_display = true; });
        return _is_display;
        */
    },
    focusNblur: function(selector, focusClass, blurClass) {
        if (typeof focusClass == "undefined") focusClass = "focus";
        if (typeof blurClass == "undefined") blurClass = "default";
        $(selector).focus(function(e) {
            var ee = $(e.target);
            ee.removeClass(blurClass);
            ee.addClass(focusClass);
        }).blur(function(e) {
            var ee = $(e.target);
            ee.removeClass(focusClass);
            ee.addClass(blurClass);
        });
    },
    object: {
        toString: function(obj) {
            var str = "";
            if (typeof obj == "string") return obj;
            else {
                for (var property in obj) {
                    str += property + ":" + "{" + bugs.object.toString(obj[property]) + "}";
                }
                return str;
            }
        },
        empty: function(obj) {
            if (typeof obj == "undefine" || obj == null) return true;
            if (typeof obj == "string") return bugs.valid.empty(obj);
            if (typeof obj == "object") {
                var _ret = true;
                for (var property in obj) {
                    _ret = false;
                    break;
                }
                return _ret;
            }
        }
    },
    utils: {
        stripTag: function(s) {
            s = s.replace(/&(lt|gt);/g, function(strMatch, p1) { return (p1 == "lt") ? "<" : ">"; });
            return s.replace(/<\/?[^>]+(>|$)/g, "");
        },
        toTag: function(s) {
            s = s.replace(/&(lt|gt);/g, function(strMatch, p1) { return (p1 == "lt") ? "<" : ">"; });
            return s;
        },
        cutstring: function(s, length, postfix) {
            if (!s) return "";
            if (!postfix) postfix = "";
            if (s.length <= length) return s;
            //			if(bugs.utils.byteSize(s) <= length) return s;
            else return s.substring(0, length) + postfix;
        },
        cutstring1: function(s, length) {
            return bugs.utils.cutstring(s, length, "...");
        },

        cutstring2: function(s, length) {
            if (s.length <= length) {
                return s;
            } else {
                return bugs.utils.trim(s.substring(0, length)) + "...";
            }
        },

        trim: function(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        },
        replaceAll: function(str, srchStr, toStr) {
            while (str.indexOf(srchStr) != -1)
                str = str.replace(srchStr, toStr);

            return str;
        },
        byteSize: function(str, twoByteWeight) {
            if (typeof twoByteWeight == "undefined") twoByteWeight = 2;
            if (!str || typeof str != 'string') return 0;
            var cnt = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127)
                    cnt += twoByteWeight;
                else
                    cnt++;
            }

            return Math.ceil(cnt);
        },
        strlengthByByte: function(str, size, twoByteWeight) {
            if (typeof twoByteWeight == "undefined") twoByteWeight = 2;
            if (!str || typeof str != 'string') return 0;
            var cnt = 0,
                len = 0;

            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127)
                    cnt += twoByteWeight;
                else
                    cnt++;
                if (cnt > size) return len;
                len++;

            }
            return len;
        },
        strlen: function(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 128)
                    len += 2;
                else
                    len++;
            }
            return len;
        },
        numToStr: function(num) {
            if (num.length < 4) return num;

            while (num.indexOf(",") >= 0) {
                num = num.replace(",", "");
            }

            return num;
        },
        strToNum: function(str) {
            var num = "";
            var getString = "" + str;

            while (getString.length > 3) {
                num = "," + getString.substring(getString.length - 3, getString.length) + num;
                getString = getString.substring(0, getString.length - 3);
            }

            if (getString != "") num = "" + getString + num;

            return num;
        },
        cutbytestring: function(s, size, postfix, twoByteWeight) {
            if (!s) return "";
            if (!postfix) postfix = "";
            if (bugs.utils.byteSize(s) <= size) return s;
            else return s.substring(0, bugs.utils.strlengthByByte(s, size, twoByteWeight)) + postfix;
        },
        cutbytestring1: function(s, size, twoByteWeight) {
            return bugs.utils.cutbytestring(s, size, "...", twoByteWeight);
        },
        cut: function(str, size, postfix) {
            if (typeof(postfix) == 'undefined') postfix = '...';

            var bytes = bugs.utils.byteSize(str);
            if (bytes < size) return str;

            var cnt = 0,
                len = 0,
                t = -1;

            for (var i = 0; i < str.length; i++) {
                cnt += (str.charCodeAt(i) > 127) ? 2 : 1;

                if (t < 0 && (cnt + postfix.length > size)) t = len;

                if (cnt > size) break;
                len++;
            }

            if (cnt <= size) return str.substring(0, len);
            else return str.substring(0, t) + postfix;
        },
        cutline: function(str, size, line, postfix) {
            if (typeof(postfix) == 'undefined') postfix = '...';

            var cnt = 0,
                ln = 0,
                start = 0,
                end = 0;
            var result = '';

            for (var i = 0; i < str.length; i++) {
                cnt += (str.charCodeAt(i) > 127) ? 2 : 1;
                if (cnt > size) {
                    var tmp = str.substring(start, end);
                    ln++;

                    if (ln < line) result += tmp + "\n";
                    else {
                        if (i <= str.length - 1) tmp = bugs.utils.cut(tmp + postfix, size, postfix);

                        result += tmp;
                        break;
                    }

                    start = end++;
                    cnt = (str.charCodeAt(i) > 127) ? 2 : 1;
                } else end++;
            }

            if (ln < line && end > start) result += str.substring(start, end);

            return result;
        },
        countLine: function(str) {
            var line = 1;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) == 10) line++;
            }

            return line;
        },
        addCommas: function(nStr) {
            nStr += '';
            x = nStr.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        // img out over
        imgOver: function(obj) {
            obj.src = obj.src.replace("Off.gif", "Over.gif");
        },
        imgOut: function(obj) {
            obj.src = obj.src.replace("Over.gif", "Off.gif");
        },

        imgOver2: function(obj) {
            obj.attr("src", obj.attr("src").replace("Off.gif", "Over.gif"));
        },

        imgOut2: function(obj) {
            obj.attr("src", obj.attr("src").replace("Over.gif", "Off.gif"));
        },

        /*
        imgError : function(obj, defaultSize) {
        	if(!obj) return;

        	// defaultSize媛� argument�� �덈떎硫� �뚯뒪 �대�吏�媛� �몃꽕�쇱씠 �꾨땶 �ㅻ━吏��� �대�吏�濡�
        	// �대떦 �대�吏�媛� �놁쑝硫� 諛붾줈 default �대�吏�瑜� 蹂댁뿬以�. (�몃꽕�� �쒕쾭 遺��� 以꾩엫)
        	if(defaultSize) {
        		obj.onerror = null;
        		obj.src = bugs.url.defaultThumbnail(obj.src, defaultSize);
        		//obj.src = g_urlThumbnail + "/requestDefaultImage?url=" + encodeURIComponent(obj.src);
        	}
        	else {
        		obj.onerror = function() {
        			obj.onerror = null;
        			obj.src = bugs.url.defaultThumbnail(obj.src);
        		};
        		obj.src = g_urlThumbnail + "/request?url=" + encodeURIComponent(obj.src);
        	}
        },
        setImgError : function(selector) {
        	return $(selector).one("error", function() {
        		$(this).one("error", function() {
        			$(this).attr("src", bugs.url.defaultThumbnail($(this).attr("src")));
        		});

        		$(this).attr("src", g_urlThumbnail + "/request?url=" + encodeURIComponent($(this).attr("src")));
        	});
        },
        */
        imgError: function(obj, defaultSize) {
            if (!obj) return;

            // defaultSize媛� argument�� �덈떎硫� �뚯뒪 �대�吏�媛� �몃꽕�쇱씠 �꾨땶 �ㅻ━吏��� �대�吏�濡�
            // �대떦 �대�吏�媛� �놁쑝硫� 諛붾줈 default �대�吏�瑜� 蹂댁뿬以�. (�몃꽕�� �쒕쾭 遺��� 以꾩엫)
            if (defaultSize) {
                obj.onerror = null;
                obj.src = bugs.url.defaultThumbnail(obj.src, defaultSize);
            } else {
                obj.onerror = null;
                obj.src = bugs.url.defaultThumbnail(obj.src);
            }
        },
        setImgError: function(selector) {
            return $(selector).one("error", function() {
                $(this).attr("src", bugs.url.defaultThumbnail($(this).attr("src")));
            });
        },

        bannerError: function(obj) {
            if (!obj) return;

            obj.onerror = null;
            obj.src = "//file.bugsm.co.kr/bugs/images/common/noalbumD.gif";
        },
        setBannerError: function(selector) {
            return $(selector).one("error", function() {
                $(this).attr("src", "//file.bugsm.co.kr/bugs/images/common/noalbumD.gif");
            });
        },
        moreView: function(anchor, obj, height) {
            if (typeof obj == "undefined") return;
            if (typeof obj == "string") obj = $(obj);
            if (typeof height == "undefined") height = 80;
            anchor = $(anchor);
            if (obj.css("overflow") == "hidden") {
                obj.css({ "height": null, "overflow": "visible" });
                anchor.parent().addClass("close");
                anchor.html(anchor.html().replace("�붾낫湲�", "�リ린"));
            } else {
                bugs.log.log(obj.find("img"));
                obj.find("img").hide();

                obj.css({ "height": height, "overflow": "hidden" });
                anchor.parent().removeClass("close");
                anchor.html(anchor.html().replace("�リ린", "�붾낫湲�"));
            }

        },
        toggleMoreView: function(anchor) {
            anchor = $(anchor);
            if (anchor.text() == "�붾낫湲�") {
                anchor.parent().addClass("close");
                anchor.html(anchor.html().replace("�붾낫湲�", "�リ린"));
            } else {
                anchor.parent().removeClass("close");
                anchor.html(anchor.html().replace("�リ린", "�붾낫湲�"));
            }
        },
        parentOpenClose: function(obj, headSelector, listSelector) {
            var oo = $(headSelector);
            if (oo.hasClass("open")) {
                oo.removeClass("open").addClass("close");
                $(listSelector).hide();
            } else if (oo.hasClass("close")) {
                oo.removeClass("close").addClass("open");
                $(listSelector).show();
            }

        },
        focus: function(obj) {
            var oo = $(obj);
            if (typeof oo.get(0) != "undefined") oo.get(0).focus();
        },
        openWindow: function(obj) {
            window.open(obj.href);
            return false;
        },
        closeWindow: function() {
            if ($.browser.msie && $.browser.version >= 7) {
                window.open("about:blank", "_self").close();
            } else {
                window.opener = self;
                self.close();
            }
        },
        anchor: function(target, speed, callback) {
            if (arguments.length == 1) {
                speed = 1000;
                callback = function() {};
            } else if (arguments.length == 2) {
                if (typeof speed == "undefind") {
                    speed = 1000;
                    callback = function() {};
                } else if (typeof speed == "function") {
                    callback = speed;
                    speed = 1000;
                }
            }

            target = $(target);
            var targetOffset = target.offset().top;
            $('html,body').animate({ scrollTop: targetOffset }, speed, callback);
        },
        urlParam: function(paramsName, url) {
            if (bugs.valid.empty(paramsName)) return null;
            if (typeof url == "undefined") url = document.location.href;

            var idx = url.indexOf("?");
            if (idx > 0) {
                var queryString = url.substring(idx + 1);
                if (!bugs.valid.empty(queryString)) {
                    var params = queryString.split("&");
                    if (typeof params != "undefined" && params.length > 0) {
                        for (var i = 0; i < params.length; i++) {
                            var pStr = params[i].split("=");
                            var pName = pStr[0];
                            var pValue = pStr[1];
                            if (paramsName == pName) return pValue;
                        }
                    }
                }
            }
            return null;
        },
        addUrlParam: function(url, params) {
            if (bugs.valid.empty(url)) return "";
            if (typeof params != "object") return url;

            var idx = url.indexOf("?");
            if (idx > -1) {
                var queryString = url.substring(idx + 1);
                if (!bugs.valid.empty(queryString)) {
                    var paramArray = queryString.split("&");
                    if (typeof paramArray != "undefined" && paramArray.length > 0) {
                        for (var i = 0; i < paramArray.length; i++) {
                            var pStr = paramArray[i].split("=");
                            var pName = pStr[0];
                            var pValue = pStr[1];
                            if (typeof(params[pName]) == "undefined") {
                                params[pName] = pValue;
                            }
                        }
                    }
                }
                return url.substring(0, idx) + "?" + $.param(params);
            } else {
                return url + "?" + $.param(params);
            }
        },
        trListUp: function(c) {
            var list = $(c).closest("table").find("tbody > tr");
            var tr = $(c).closest("tr");
            var idx = list.index(tr);
            if (idx <= 0) return;

            var before = list.eq(idx - 1);
            before.before(tr);
        },

        trListDown: function(c) {
            var list = $(c).closest("table").find("tbody > tr");
            var tr = $(c).closest("tr");
            var idx = list.index(tr);
            if (idx >= list.length - 1) return;

            var after = list.eq(idx + 1);
            after.after(tr);
        },
        prettyJson: function(jsonStr) {
            var indent = "  ";
            var result = "";

            var indentDepth = 0;
            var targetStr = "";

            for (var i = 0; i < jsonStr.length; i++) {
                targetStr = jsonStr.substring(i, i + 1);
                if (targetStr == "{" || targetStr == "[") {
                    result += targetStr + "\n";
                    indentDepth++;
                    for (var j = 0; j < indentDepth; j++) result += indent;
                } else if (targetStr == "}" || targetStr == "]") {
                    result += "\n";
                    indentDepth--;
                    for (var j = 0; j < indentDepth; j++) result += indent;
                    result += targetStr;
                } else if (targetStr == ",") {
                    result += targetStr + "\n";
                    for (var j = 0; j < indentDepth; j++) result += indent;
                } else result += targetStr;
            }
            return result;
        },
        parseJson: function(jsonStr) {
            if ($.browser.msie && $.browser.version < 8) {
                return eval('(' + jsonStr + ')');
            } else {
                return JSON.parse(jsonStr);
            }
        },
        getBannerRandomExtractByWeight: function(bannerList) {

            var totalWeight = 0;
            for (var i = 0; i < bannerList.length; i++) {
                totalWeight += bannerList[i].weight || bannerList[i].random_rate;
            }

            var randomIndex = -1;
            var random = Math.random() * totalWeight;

            for (var i = 0; i < bannerList.length; i++) {
                random -= bannerList[i].weight || bannerList[i].random_rate;
                if (random < 0) {
                    randomIndex = i;
                    break;
                }
            }
            return bannerList[randomIndex];
        }
    },
    valid: {
        isNull: function(obj) {
            return (obj == null || obj == "" || obj == "<undefined>" || obj == "undefined" || obj == "NaN") ? true : false;
        },
        empty: function(str) {
            if (typeof str == "string" && bugs.utils.trim(str).length > 0)
                return false;
            return true;
        },
        email: function(str) {
            return (/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/).test(str);
        },
        kor: function(str) {
            str = bugs.utils.trim(str);
            return (/^[媛�-��]+$/).test(str);
        },
        bigeng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[A-Z]+$/).test(str);
        },
        smalleng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[a-z]+$/).test(str);
        },
        eng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[a-zA-Z]+$/).test(str);
        },
        numbigeng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9A-Z]+$/).test(str);
        },
        numsmalleng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9a-z]+$/).test(str);
        },
        numeng: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9a-zA-Z]+$/).test(str);
        },
        notnumeng: function(str) {
            str = bugs.utils.trim(str);
            return (/[^0-9a-zA-Z]+$/).test(str);
        },
        numengkor: function(str) {
            str = bugs.utils.trim(str);
            return (/^[媛�-��0-9a-zA-Z]+$/).test(str);
        },
        numengkor4special: function(str) {
            str = bugs.utils.trim(str);
            return (/^[媛�-��0-9a-zA-Z\+,\-,\.,\_]+$/).test(str);
        },
        notkor: function(str) {
            str = bugs.utils.trim(str);
            return (/[媛�-��]+/).test(str);
        },
        numdash: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9]{1}[0-9\-]+$/).test(str);
        },
        url: function(str) {
            str = bugs.utils.trim(str);
            return (/^http:\/\/([\w\-]+\.)+/).test(str);
        },
        num: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9]+$/).test(str);
        },
        special: function(str) {
            str = bugs.utils.trim(str);
            return (/^[\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        numspecial: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        bigengspecial: function(str) {
            str = bugs.utils.trim(str);
            return (/^[A-Z\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        smallengspecial: function(str) {
            str = bugs.utils.trim(str);
            return (/^[a-z\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        engspecial: function(str) {
            str = bugs.utils.trim(str);
            return (/^[a-zA-Z\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        numengspecial: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9a-zA-Z\!,\@,\#,\$,\%,\^,\&,\*,\?,\_,\~]+$/).test(str);
        },
        phone: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9]{1,3}-[0-9]{3,4}-[0-9]{4}$/).test(str);
        },
        dateYMD: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/).test(str);
        },
        dateYMDHS: function(str) {
            str = bugs.utils.trim(str);
            return (/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/).test(str);
        },
        include2byte: function(str) {
            if (!str || typeof str != 'string') return false;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127)
                    return true;
            }
            return false;
        },
        isSsnCheck: function(strSsn) {
            strSsn = bugs.utils.trim(strSsn);
            if (strSsn.length != 13) return false;
            var isForeigner = false;
            switch (strSsn.substr(6, 1)) {
                case '5':
                case '6':
                case '7':
                case '8':
                    isForeigner = true;
                    break;
                default:
                    isForeigner = false;
                    break;
            }

            if (isForeigner) {
                return bugs.valid.isFgnSsnCheck(strSsn);
            } else {
                var strCheckKey = '234567892345';
                var nCheckNo = 0,
                    nCheckVal = 0,
                    rVal;

                for (var i = 0; i < strCheckKey.length; i++) {
                    nCheckNo += strSsn.charAt(i) * strCheckKey.charAt(i);
                }
                nCheckVal = strSsn.charAt(i);

                rVal = 11 - (nCheckNo % 11);
                if (rVal > 9) rVal = (rVal % 10);

                return (nCheckVal == rVal) ? true : false;
            }
        },
        isFgnSsnCheck: function(strSsn) {
            strSsn = bugs.utils.trim(strSsn);
            if (strSsn.length != 13) return false;
            var strCheckKey = '234567892345';
            var nCheckNo = 0,
                nCheckVal = 0,
                rVal;
            var nList = new Array(13);

            for (var i = 0; i < 13; i++) {
                nList[i] = strSsn.charAt(i);
            }

            if (nList[11] < 6) return false;
            if ((nList[7] * 10 + nList[8]) & 1) return false;

            for (var i = 0; i < strCheckKey.length; i++) {
                nCheckVal += nList[i] * strCheckKey.charAt(i);
            }

            if ((nCheckVal = 11 - (nCheckVal % 11)) >= 10) nCheckVal -= 10;
            if ((nCheckVal += 2) >= 10) nCheckVal -= 10;

            return (nCheckVal != nList[12]) ? false : true;
        }
    },
    mainurl: function() {
        var url = document.location.href;
        //return url;
        if (url.indexOf("www.bugs.co.kr") > 0 || url.indexOf("music.bugs.co.kr") > 0) {
            return "https://music.bugs.co.kr";
        } else return _staticUrl;
    },
    url: {
        artistPage: function(artist_id) {
            if (typeof artist_id == "undefined") return;
            return g_urlMusic + "/artist/" + artist_id;
        },
        albumPage: function(album_id) {
            if (typeof album_id == "undefined") return;
            return g_urlMusic + "/album/" + album_id;
        },
        mvPage: function(mv_id) {
            if (typeof mv_id == "undefined") return;
            return g_urlMusic + "/mv/" + mv_id;
        },
        esAlbumPage: function(es_album_id) {
            if (typeof es_album_id == "undefined") return;
            return g_urlMusic + "/musicpd/albumview/" + es_album_id;
        },
        musicPDPage: function(musicpd_id) {
            if (typeof musicpd_id == "undefined") return;
            return g_urlMusic + "/musicpd/pdlistdetail/" + musicpd_id;
        },
        specialPage: function(unicontent_id) {
            if (typeof unicontent_id == "undefined") return;
            return g_urlMusic + "/specialview/" + unicontent_id;
        },
        specialPage2: function(unicontent_id, corner_nm) {
            if (typeof unicontent_id == "undefined") return;
            return g_urlMusic + "/specialView/" + corner_nm + "/" + unicontent_id;
        },
        openAlbumPage: function(open_album_id) {
            if (typeof open_album_id == "undefined") return;
            return g_urlMusic + "/musicpd/openalbum/" + open_album_id;
        },
        trackPage: function(track_id) {
            if (typeof track_id == "undefined") return;
            return g_urlMusic + "/track/" + track_id;
        },
        memberPage: function(userId) {
            if (typeof userId == "undefined") return;
            return g_urlMe + "/" + userId;
        },
        noticePage: function(srl) {
            if (typeof srl == "undefined") return;
            return g_urlMusic + "/board/notice?srl=" + srl;
        },
        albumThumbnail: function(album_id, size, ext) {
            if (typeof album_id == "undefined") return;
            if (typeof ext == "undefined") ext = ".jpg";
            return g_urlClipimg + "/album/images/" + size + "/" + Math.floor(album_id / 100) + "/" + album_id + ext;
        },
        mvThumbnail: function(mv_id, size) {
            if (typeof mv_id == "undefined") return;
            return g_urlClipimg + "/mv/images/" + size + "/" + Math.floor(mv_id / 100) + "/" + mv_id + ".jpg";
        },
        mvhdThumbnail: function(mv_id, size) {
            if (typeof mv_id == "undefined") return;
            return g_urlClipimg + "/mvhd/images/" + size + "/" + Math.floor(mv_id / 100) + "/" + mv_id + ".jpg";
        },
        bsideFeedThumbnail: function(originalUrl, width, height) {
            return g_urlClipimg + "/thumb/fitin/" + width + "x" + height + "/bs/bside/" + originalUrl;
        },
        mvsqThumbnail: function(mv_id, size) {
            if (typeof mv_id == "undefined") return;
            return g_urlClipimg + "/mvsq/images/" + size + "/" + Math.floor(mv_id / 100) + "/" + mv_id + ".jpg";
        },
        artistThumbnail: function(artist_id, size, ext) {
            if (typeof artist_id == "undefined") return;
            if (typeof ext == "undefined") ext = ".jpg";
            return g_urlClipimg + "/artist/images/" + size + "/" + Math.floor(artist_id / 100) + "/" + artist_id + ext;
        },
        unicontentThumbnail: function(unicontent_id, type, size) {
            if (typeof unicontent_id == "undefined") return;
            if (typeof ext == "undefined") ext = ".jpg";
            return g_urlClipimg + "/uniContent/banner/" + Math.floor(unicontent_id / 100) + "/" + unicontent_id + "/" + type + "_" + size + "x" + size + ext;
        },
        unicontentThumbnail2: function(nkey, img_type) {
            if (typeof nkey == "undefined") return;
            if (typeof ext == "undefined") ext = ".jpg";

            var image_name = "";
            if (typeof img_type != "undefined") {
                if (img_type == "TITLE_MOBILE") image_name = "title_mobile_306";
                else if (img_type == "NOW_60") image_name = "now_60x60";
            }
            return g_urlClipimg + "/uniContent/banner/" + nkey + "/" + image_name + ext;
        },
        uniContentImage: function(nkey, type) {
            ext = ".jpg";
            path = nkey;
            if (typeof(nkey) == "number")
                path = Math.floor(nkey / 100) + "/" + nkey;
            return g_urlClipimg + "/uniContent/banner/" + path + "/" + type + ext;
        },
        sectionImage: function(nkey, type) {
            ext = ".jpg";
            path = nkey;
            if (typeof(nkey) == "number")
                path = Math.floor(nkey / 100) + "/" + nkey;
            return g_urlClipimg + "/sectionItem/banner/" + path + "/" + type + ext;
        },
        esalbumThumbnail: function(esalbum_id) {
            if (typeof esalbum_id == "undefined") return;
            if (typeof ext == "undefined") ext = ".jpg";
            return g_urlClipimg + "/essential/images/original/" + Math.floor(esalbum_id / 100) + "/" + esalbum_id + ext;
        },
        ThemaThumbnail: function(thema_id, size, ext) {
            if (typeof thema_id == "undefined") return;
            if (typeof ext == "undefined") ext = ".png";
            return "//file.bugsm.co.kr/nbugs" + "/radioTheme/new/" + size + "/" + thema_id + ext;
        },
        SpecialErrorThumbnail: function(size) {
            var width = size;
            var height = "";
            if (size == "118") height = "70";
            if (size == "170") height = "100";
            if (size == "200") height = "113";
            if (size == "224") height = "126";
            if (size == "306") height = "182";

            return "//file.bugsm.co.kr/wbugs/common/i_default_" + width + "x" + height + ".png";
        },
        defaultThumbnail: function(src, defaultSize) {
            var index = src.indexOf("?");
            if (index > -1 && src.indexOf("version=") < -1) {
                src = decodeURIComponent(src.substring(index + 5));
            }

            var tmp = src.split("/");
            var type = tmp[tmp.length - 7];
            var width, height;

            if (type == "member" || type == "playlist") {
                width = height = defaultSize ? defaultSize : tmp[tmp.length - 5];
                if (width != 50 && width != 200) {
                    width = 200;
                    height = 200;
                }
                return "//file.bugsm.co.kr/wbugs/common/i_defaultMyAlbum_" + width + "x" + height + ".png";
            } else {

                type = tmp[tmp.length - 5];
                width = defaultSize ? defaultSize : tmp[tmp.length - 3];
                height = width;

                if ((type == "interview" || type == "review" || type == "mv" || type == "mvhd" || type == "uniContent") && width == "118") height = "70";
                if ((type == "interview" || type == "review" || type == "mv" || type == "mvhd" || type == "uniContent") && width == "170") height = "100";
                if ((type == "interview" || type == "review" || type == "mv" || type == "mvhd" || type == "uniContent") && width == "200") height = "113";
                if ((type == "interview" || type == "review" || type == "mv" || type == "mvhd" || type == "uniContent") && width == "224") height = "126";
                if ((type == "interview" || type == "review" || type == "mv" || type == "mvhd" || type == "uniContent") && width == "306") height = "182";

                if (isNaN(width)) {
                    width = "200";
                    height = "200";
                }
            }

            return "//file.bugsm.co.kr/wbugs/common/i_default_" + width + "x" + height + ".png";
        }
    },

    checkFlash: function() {
        if ($.browser.chrome || $.browser.safari) {
            if (swfobject.getFlashPlayerVersion().major == 0) {

                var faqUrl = "";
                if ($.browser.chrome) faqUrl = "http://help.bugs.co.kr/sub?target=bugs/faq/list%3FfaqId%3D31058%26categoryNo%3D4622";
                else if ($.browser.safari) faqUrl = "http://help.bugs.co.kr/sub?target=bugs/faq/list%3FfaqId%3D31110%26categoryNo%3D4622";

                var html = "<p>Adobe Flash Player瑜�<br/>�ъ슜�� �� �덈룄濡� �ㅼ젙�� 諛붽퓭 二쇱꽭��.<br />" +
                    "<span><a href=\"" + faqUrl + "\" onclick=\"return bugs.utils.openWindow(this);\">Flash �뚮젅�댁뼱 �ㅼ젙踰� 蹂대윭媛�湲�</a></span></p>";

                var flashPopup = new bugs.ui.popup(html, {
                    css: "layerDownDRM",
                    title: bugs.ui.TITLE_LOGO
                });
                flashPopup.show();
                return;
            }
        }

        var flashInstalled = swfobject.hasFlashPlayerVersion("10");
        if (flashInstalled) {

        } else {
            var html = "<p>�ㅼ슫濡쒕뱶 留ㅻ땲���� Adobe Flash Player 10<br/> �댁긽�� �ㅼ튂�섏뀛�� �ъ슜 媛��ν빀�덈떎.<br />" +
                "<span><a href=\"http://www.adobe.com/go/getflashplayer\" onclick=\"return bugs.utils.openWindow(this);\">Flash �뚮젅�댁뼱 諛쏄린</a></span></p>";

            var flashPopup = new bugs.ui.popup(html, {
                css: "layerDownDRM",
                title: bugs.ui.TITLE_LOGO
            });

            flashPopup.show();
        }
    }
};

bugs.template = bugs.create();
bugs.template.prototype = {
    initialize: function(tmpl, json) {
        this.setTemplate(tmpl);
        this.setData(json);
    },
    setFile: function(src) {
        // TODO
    },
    setTemplate: function(tmpl) { if (tmpl) this._template = tmpl; },

    setData: function(data) {
        if (data && data != "") {
            this._data = bugs.overed(this._data || {}, data || {});
        } else {
            this._data = {};
        }
    },
    html: function() {
        var js = this._template.replace(/[\r\t\n]/g, " ")
            .replace(/'(?=[^%]*%>)/g, "\t")
            .split("'").join("\\'")
            .split("\t").join("'")
            .replace(/<%=(.+?)%>/g, "',$1,'")
            .split("<%").join("');")
            .split("%>").join("write.push('");
        var f = new Function('obj', "var write=[];with (obj){write.push('" + js + "');}return write.join('');");
        if (!this._data) return f;
        var r = f(this._data);
        return r;
    }

};


bugs.layermenu = {
    simpleDownObj: null,
    layerCaller: null,
    multiMvLayer: null,
    isComplete: true,
    isPlayer: location.href.indexOf("/newPlayer") > -1 || location.href.indexOf("/newRadio") > -1 || location.href.indexOf("/mvPlayer") > -1 ? true : false,
    showClickLayer: function(sel) {
        $(sel).toggle();
        $(sel).find('.content').css('width', $(sel).width() - 7);
        $(sel).find('.bgTR').css('height', $(sel).find('.content').outerHeight());
    },

    setShareSNSHtml: function(type) {

        var html = "";

        html += "				<a href=\"javascript:;\"  onclick=\"try{var e= window.event; if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}}catch(e){} $('#layerSNS').toggle(); return false;\"  class=\"detailDisclosure\">怨듭쑀�섍린</a>\n";
        html += "				<aside id=\"layerSNS\" class=\"layer layer-select share\" style=\"display:none;\">\n";
        html += "					<div class=\"box-shadow\"></div>\n";
        html += "					<h1>�좏깮 �덉씠��</h1>\n";
        html += "					<div class=\"innerScroll\">\n";
        html += "						<ul class=\"list-layer-select sns\">\n";
        html += "							<li><a href=\"javascript:;\" class=\"ks\" onclick=\"javascript:RecommendClickLog.sendMoreActionLog('share');bugs.layermenu.shareSNS('" + type + "','ks');\" atype=\"share\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "							<li><a href=\"javascript:;\" class=\"fb\" onclick=\"javascript:RecommendClickLog.sendMoreActionLog('share');bugs.layermenu.shareSNS('" + type + "','fb');\" atype=\"share\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "							<li><a href=\"javascript:;\" class=\"tw\" onclick=\"javascript:RecommendClickLog.sendMoreActionLog('share');bugs.layermenu.shareSNS('" + type + "','tw');\" atype=\"share\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "							<li><a href=\"javascript:;\" class=\"copyLink\" onclick=\"javascript:RecommendClickLog.sendMoreActionLog('share');bugs.layermenu.openShareUrlLayer('" + type + "',null,null,event);\" atype=\"share\"><span class=\"icon\"></span>留곹겕蹂듭궗 <span class=\"blind\">留곹겕蹂듭궗</span></a></li>\n";
        html += "						</ul>\n";
        html += "					</div>\n";
        html += "				</aside>\n";

        return html;

    },

    getAdultNoticeHtml: function(adultNoticeType, displayMsg) {
        html = "";
        if (adultNoticeType == "LIMIT") {
            html += "			<li><a href=\"javascript:bugs.ui.adult.limit();\">" + displayMsg + "</a></li>\n";
        } else if (adultNoticeType == "NOTICE") {
            html += "			<li><a href=\"javascript:bugs.ui.adult.notice();\">" + displayMsg + "</a></li>\n";
        } else {
            html += "			<li><a href=\"javascript:bugs.ui.showLoginLayer();\">" + displayMsg + "</a></li>\n";
        }

        return html;
    },
    makeMvMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";


        if (obj.isBSide && obj.isMyBSideMv == "Y") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerModifyBSideContent('" + obj.mv_id + "', 'mv');bugs.wiselog.area('list_mv_06" + obj.logType + "');\">�섏젙<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (obj.isStat && !obj.isExist) { // connect
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerGoBSideStatistics('" + obj.artist_id + "','" + obj.mv_id + "', 'mv');bugs.wiselog.area('list_mv_07" + obj.logType + "');\">�듦퀎<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        if (obj.isStat && obj.isExist) { // Exist
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerGoBSideStatistics('" + obj.artist_id + "','" + obj.mv_id + "', 'mv',false);bugs.wiselog.area('list_mv_07" + obj.logType + "');\">�듦퀎<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        /*
        		if(obj.mvStrType != "NONE"){
        			if(obj.adultNoticeType == "PASS"){
        				html +="			<li><a href=\"javascript:bugs.music.viewMusicVideo('"+obj.mv_id+"',false); bugs.wiselog.area('list_mv_08_mv');\" atype=\"playlist\">�ъ깮紐⑸줉�� 異붽�<span class=\"blind\">-�덉갹</span></a></li>\n";
        			}else{
        				html += this.getAdultNoticeHtml(obj.adultNoticeType, "�ъ깮紐⑸줉�� 異붽�");
        			}
        		}
        */
        if (!obj.isBSide) {
            if (obj.mvDownType != "NONE") {
                if (obj.adultNoticeType == "PASS") {
                    html += "	<li><a href=\"javascript:;\" onclick=\"bugs.music.downloadMusicVideo(" + obj.mv_id + ",'" + obj.mvDownType + "');\" id=\"mvLayerDirectDownBtn\"  atype=\"down\">�ㅼ슫濡쒕뱶<span class=\"blind\">-�덉갹</span></a></li>\n";
                } else {
                    html += this.getAdultNoticeHtml(obj.adultNoticeType, "�ㅼ슫濡쒕뱶");
                }
            }
        }

        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("MV");
        html += "			</li>";

        if (obj.isLikeYN == "Y") {
            html += "			<li><a id=\"mvLike\" href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.mv_id + "', likes.TYPE_MV);\"  atype=\"like\">醫뗭븘 痍⑥냼</a></li>\n";
        } else {
            html += "			<li><a id=\"mvLike\" href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.mv_id + "', likes.TYPE_MV);\"  atype=\"like\">醫뗭븘</a></li>\n";
        }




        if (obj.album_tp != "MF" && obj.album_tp != "SD") {
            if (obj.trackStatus == "OK") {
                html += "			<li class=\"divider\"><a href=\"" + bugs.url.trackPage(obj.track_id) + "\" atype=\"track\">怨� �뺣낫<span class=\"blind\">-�섏씠吏� �대룞</span></a></li>\n";
            }
            html += "			<li><a href=\"" + bugs.url.albumPage(obj.album_id) + "\" atype=\"album\">�⑤쾾 �뺣낫<span class=\"blind\">-�섏씠吏� �대룞</span></a></li>\n";

        }

        if (obj.isBSide && obj.isMyBSideMv == "") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerReportBSideContent(this, '" + obj.mv_id + "', 'mv');bugs.wiselog.area('list_mv_07" + obj.logType + "');\">�좉퀬</a></li>\n";
        }

        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeMvMoreActionDownOnlyHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";

        if (obj.mvDownType != "NONE") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.downloadMusicVideo(" + obj.mv_id + ",'" + obj.mvDownType + "');\"\" id=\"mvLayerDirectDownBtn\">�ㅼ슫濡쒕뱶<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeAlbumMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        if (obj.albumTrackStrYN == "Y") {
            html += "			<li><a href=\"javascript:bugs.music.listenAlbum('" + obj.album_id + "',false);RecommendClickLog.sendMoreActionLog('playlist');\" atype=\"playlist\">�ъ깮紐⑸줉�� 異붽�<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        html += "			<li><a href=\"javascript:bugs.layermenu.addAlbumTrackToMyAlbum('" + obj.album_id + "');RecommendClickLog.sendMoreActionLog('my_album');\" atype=\"my_album\">�� �⑤쾾�� �닿린<span class=\"blind\">-�덉갹</span></a></li>\n";
        if (obj.albumTrackDownYN == "Y" && !g_isGuest) {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.downloadAlbum('" + obj.album_id + "');RecommendClickLog.sendMoreActionLog('download');\" atype=\"down\">�ㅼ슫濡쒕뱶<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (obj.albumBundleDownType != "") {
            if (obj.adultCheckVal == "" || obj.adultCheckVal == "1") {
                html += "			<li><a href=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + "');\" atype=\"down\">�⑤쾾援щℓ<span class=\"blind\">-�덉갹</span></a></li>\n";
            } else {
                var strFunc = "";
                if (obj.adultCheckVal == "2") {
                    strFunc = "bugs.ui.adult.limit();";
                } else if (obj.adultCheckVal == "3") {
                    strFunc = "bugs.ui.adult.notice();";
                } else {
                    strFunc = "bugs.ui.showLoginLayer();";
                }
                html += "			<li><a href=\"javascript:" + strFunc + "\" atype=\"down\">�⑤쾾援щℓ<span class=\"blind\">-�덉갹</span></a></li>\n";
            }
        }

        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("ALBUM");
        html += "			</li>\n";

        if (obj.isLikeYN == "Y") {
            html += "			<li><a id=\"albumLike\" href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('dislike');bugs.layermenu.layerLikeAction(this,'" + obj.album_id + "', likes.TYPE_ALBUM);\" atype=\"like\">醫뗭븘 痍⑥냼</a></li>\n";
        } else {
            html += "			<li><a id=\"albumLike\" href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('like');bugs.layermenu.layerLikeAction(this,'" + obj.album_id + "', likes.TYPE_ALBUM);\" atype=\"like\" >醫뗭븘</a></li>\n";
        }
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },
    makeTrackMoreActionHtml: function(obj) {
        var isSearch = false;
        if (typeof bugsSearchLog != "undefined") {
            isSearch = true;
            //bugsSearchLog.setTrackListAction(chks, "my_album");
        }
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";

        if (obj.layer_type == "MUSIC4U" || obj.layer_type == "BSIDE_FEED") {
            html += "			<li><a href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('playlist');bugs.music.listen('" + obj.track_id + "',false);\">�ъ깮紐⑸줉�� 異붽�<span class=\"blind\">-�덉갹</span></a></li>\n";
            html += "			<li><a href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('my_album');bugs.layermenu.addTrackToMyAlbum('" + obj.track_id + "');\" >�� �⑤쾾�� �닿린<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (obj.isBSide && obj.isMyBSideTrack == "Y") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerModifyBSideContent('" + obj.track_id + "', 'track');bugs.wiselog.area('list_tr_20" + obj.logType + "');\">�섏젙<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        if (obj.isStat && !obj.isExist) { // connect
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerGoBSideStatistics('" + obj.artist_id + "','" + obj.track_id + "', 'track');bugs.wiselog.area('list_tr_21" + obj.logType + "');\">�듦퀎<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        if (obj.isStat && obj.isExist) { // Exist
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerGoBSideStatistics('" + obj.artist_id + "','" + obj.track_id + "', 'track',false);bugs.wiselog.area('list_tr_21" + obj.logType + "');\">�듦퀎<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (obj.radioMethod != "NONE" && !obj.isMusicCast) {

            html += "			<li><a href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('radio');" + obj.radioMethod + "; \" atype=\"radio\">�쇰뵒�� �ｊ린<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (!obj.isMusicCast) {
            html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
            html += this.setShareSNSHtml("TRACK");
            html += "			</li>\n";
        }

        if (obj.isLikeYN == "Y") {
            html += "			<li><a id=\"trackLike\" href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('dislike');bugs.layermenu.layerLikeAction(this,'" + obj.track_id + "', likes.TYPE_TRACK);\" atype=\"like\">醫뗭븘 痍⑥냼</a></li>\n";
        } else {
            html += "			<li><a id=\"trackLike\" href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('like');bugs.layermenu.layerLikeAction(this,'" + obj.track_id + "', likes.TYPE_TRACK);\" atype=\"like\">醫뗭븘</a></li>\n";
        }

        if (obj.showDeleteYN == "Y") {
            var contentId = "";
            if (obj.deleteType == "MYALBUM_TRACK") {
                contentId = obj.playlist_track_id;
            } else {
                contentId = obj.track_id;
            }
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerDeleteTrack('" + obj.listName + "','" + contentId + "','" + obj.deleteType + "','" + obj.page + "');\">��젣</a></li>\n";
        }

        if (obj.isBSide && !obj.isStat) {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerReportBSideContent(this, '" + obj.track_id + "', 'track');bugs.wiselog.area('list_tr_19" + obj.logType + "');\">�좉퀬</a></li>\n";
        }
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";

        return html;
    },

    makeTrackMoreActionDeleteOnlyHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";

        //媛쒖씤�� �곸뿭�� �꾩슂�쒖� �뺤씤 �꾩슂
        if (obj.isBSide && obj.isMyBSideTrack == "Y") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerModifyBSideContent('" + obj.track_id + "', 'track');\">�섏젙<span class=\"blind\">-�덉갹</span></a></li>\n";
        }
        if (obj.isBSide && obj.isMyBSideTrack != "") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerGoBSideStatistics('" + obj.track_id + "', 'track');\">�듦퀎<span class=\"blind\">-�덉갹</span></a></li>\n";
        }

        if (obj.deleteType == "MYALBUM_TRACK" || obj.deleteType == "LISTEN_TRACK") {
            var content_id = obj.deleteType == "MYALBUM_TRACK" ? obj.playlist_track_id : obj.track_id;
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerDeleteTrack('" + obj.listName + "','" + content_id + "','" + obj.deleteType + "','" + obj.page + "');\">��젣</a></li>\n";
        }

        if (obj.deleteType == "PURCHASED_TRACK" || obj.deleteType == "LIKE_TRACK") {
            if (obj.deleteType == "LIKE_TRACK") {
                html += "			<li><a id=\"trackLike\" href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.track_id + "', likes.TYPE_TRACK);\">醫뗭븘 痍⑥냼</a></li>\n";
            }

        }

        if (obj.isBSide && obj.isMyBSideTrack == "") {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerReportBSideContent(this, '" + obj.track_id + "', 'track');\">�좉퀬</a></li>\n";
        }

        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },


    makeArtistMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.listenArtistTracks(" + obj.artist_id + ");RecommendClickLog.sendMoreActionLog('popular');\" atype=\"play\">�멸린怨� �ｊ린</a></li>\n";
        if (obj.radioMethod != "NONE") {
            html += "			<li><a href=\"javascript:;\" onclick=\"RecommendClickLog.sendMoreActionLog('radio');" + obj.radioMethod + ";\" atype=\"radio\">�쇰뵒�� �ｊ린</a></li>\n";
        }

        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("ARTIST", $(html));
        html += "			</li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeMultiArtistHtml: function(obj, target, wise_log_str) {
        var targetString = "";

        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select scArtist\" style=\"display:inline-block; overflow: hidden; max-width: 50%;font-size:13px;line-height:20px;text-overflow:ellipsis;vertical-align:top;white-space:nowrap; \"  >\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";

        if (obj.length > 0) {
            for (var i = 0, size = obj.length; i < size; i++) {
                var linkUrl = g_urlMusic + "/artist/" + obj[i].artist_id;
                if (wise_log_str) {
                    linkUrl = linkUrl + wise_log_str;
                }
                var artist_nm = obj[i].artist_nm;
                if (target == "_blank") {
                    targetString = "target=\"_blank\"";
                } else {
                    targetString = "";
                }
                html += "		<li><a href=\"" + linkUrl + "\" title=\"" + artist_nm + "\" " + targetString + " artistId=\"" + obj[i].artist_id + "\">" + artist_nm + "</a></li>\n";
            }
        }
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";

        return html;
    },

    // SNS 怨듭쑀 �덉씠��
    makeSNSShareHtml: function(content_type, content_id, param, content_title, artist_name, share_url) {

        //		var content
        var html = "";
        html += "	<aside id=\"commonLayerMenu\" class=\"layer layer-select share\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select sns\">\n";

        if (content_type == "TRACK") {
            html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.trackPage(content_id) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.facebook2.track('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.twitter.track('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        } else if (content_type == "ARTIST") {
            html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.artistPage(content_id) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.facebook2.artist('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.twitter.artist('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        } else if (content_type == "ALBUM") {
            html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.albumPage(content_id) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.facebook2.album('" + content_id + "', '" + param.title.replace(/\'/g, '').replace(/\"/g, '') + "', '" + param.name + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.twitter.album('" + content_id + "', '" + param.title.replace(/\'/g, '\\\'').replace(/\"/g, '%22') + "', '" + param.name + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        } else if (content_type == "ESALBUM") {
            html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.esAlbumPage(content_id) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.facebook2.esAlbum('" + content_id + "', '" + param.title + "', '" + param.name + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.twitter.esAlbum('" + content_id + "', '" + param.title + "', '" + param.name + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        } else if (content_type == "MUSICPD") {
            html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.musicPDPage(content_id) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.facebook2.musicPD('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            html += "		<li><a href=\"javascript:bugs.twitter.musicPD('" + content_id + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + artist_name + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        } else if (content_type == "SPECIAL") {
            var corner_nm = artist_name;

            if (share_url == undefined || share_url == "") { // 援� �ㅽ럹�� (URL 怨듭쑀)
                html += "		<li><a href=\"javascript:bugs.kakao.story2('" + bugs.url.specialPage2(content_id, corner_nm) + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
                html += "		<li><a href=\"javascript:bugs.facebook2.special('" + content_id + "', '" + corner_nm + "', '" + content_title.replace(/\'/g, '\\\'') + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
                html += "		<li><a href=\"javascript:bugs.twitter.special('" + content_id + "', '" + corner_nm + "', '" + content_title.replace(/\'/g, '\\\'') + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            } else {
                html += "		<li><a href=\"javascript:bugs.kakao.story2('" + share_url + "');\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
                html += "		<li><a href=\"javascript:bugs.facebook2.special('" + content_id + "', '" + corner_nm + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + share_url + "');\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
                html += "		<li><a href=\"javascript:bugs.twitter.special('" + content_id + "', '" + corner_nm + "', '" + content_title.replace(/\'/g, '\\\'') + "', '" + share_url + "');\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
            }
        }

        html += "		</ul>\n";
        html += "	</div>\n";
        html += "	</aside>";

        return html;
    },

    // SNS 怨듭쑀 �덉씠��
    makeUrlShareHtml: function(url, params) {

        url = url || location.href;
        params = params || {};

        var title = params.title || "踰낆뒪";

        window._temp_snsShare = {};

        window._temp_snsShare.kakao = function() {
            bugs.kakao.story2(url);
        };

        window._temp_snsShare.facebook = function() {
            bugs.facebook2.popup(url, title);
        };

        window._temp_snsShare.twitter = function() {
            bugs.twitter.popupStatus(title, url);
        };


        var html = "";
        html += "	<aside id=\"commonLayerMenu\" class=\"layer layer-select share\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select sns\">\n";
        html += "		<li><a href=\"javascript:_temp_snsShare.kakao();\" class=\"ks\"><span class=\"icon\"></span>移댁뭅�ㅼ뒪�좊━ <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "		<li><a href=\"javascript:_temp_snsShare.facebook();\" class=\"fb\"><span class=\"icon\"></span>�섏씠�ㅻ턿 <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "		<li><a href=\"javascript:_temp_snsShare.twitter();\" class=\"tw\"><span class=\"icon\"></span>�몄쐞�� <span class=\"blind\">怨듭쑀�섍린-�덉갹</span></a></li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "	</aside>";

        return html;
    },

    // �⑤쾾 �섏씠吏� - �⑤쾾 援щℓ
    makeBuyAlbumHtml: function(obj) {
        var html = "";
        html += "	<aside id=\"commonLayerMenu\" class=\"layer layer-select buyMusic\" style=\"display:none;\" >";
        html += "	<div class=\"box-shadow\"></div>";
        html += "	<h1>�좏깮 �덉씠��</h1>";
        html += "	<div class=\"innerScroll\">";
        html += "<ul class=\"list-layer-select\">";

        var adultCheckhtml = "";

        if (obj.adultCheckVal != "" && obj.adultCheckVal != "1") {
            if (obj.adultCheckVal == "2") {
                adultCheckhtml = "		<a href=\"javascript:;\" onclick=\"javascript:bugs.ui.adult.limit();\">";
            } else if (obj.adultCheckVal == "3") {
                adultCheckhtml = "		<a href=\"javascript:;\" onclick=\"javascript:bugs.ui.adult.notice();\">";
            } else {
                adultCheckhtml = "		<a href=\"javascript:;\" onclick=\"javascript:bugs.ui.showLoginLayer();\">";
            }
        }

        // MP3 �ㅼ슫濡쒕뱶
        if (obj.isAlbumDnlRightsYNAllTrack == "T") {
            html += "<li>";

            if (obj.adultCheckVal == "" || obj.adultCheckVal == "1") {
                if (obj.albumDnlPrice == 0)
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":T');\">";
                else
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":T' " + obj.addParams + ");\">";
            } else {
                html += adultCheckhtml;
            }

            html += "				<span class=\"type\">MP3</span>";

            if (obj.albumCoverPrice >= 0 && obj.albumDiscountRate == 0) {
                html += "			<span class=\"price\">&nbsp;</span>";
                html += "			<span class=\"dcPrice\"><strong>" + Number(obj.albumCoverPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }
            if (obj.albumCoverPrice > 0 && obj.albumDiscountRate > 0) {
                html += "			<span class=\"price through\">" + Number(obj.albumCoverPrice).toLocaleString('en').split(".")[0] + "</span>";
                html += "			<span class=\"dcPrice\"><strong>" + Number(obj.albumDnlPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }

            html += "				<span class=\"btnBuy\">援щℓ</span>";

            html += "			</a>";
            html += "</li>";
        }
        // FLAC(16) �ㅼ슫濡쒕뱶
        if (obj.isAlbumFlacDnlRightsYNAllTrack == "T") {
            html += "<li>";

            if (obj.adultCheckVal == "" || obj.adultCheckVal == "1") {
                if (obj.albumFlacDnlPrice == 0)
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":F16');\">";
                else
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":F16' " + obj.addParams + ");\">";
            } else {
                html += adultCheckhtml;
            }

            html += "		<span class=\"type\">FLAC 16/44.1</span>";

            if (obj.albumFlacCoverPrice >= 0 && obj.albumFlacDiscountRate == 0) {
                html += "<span class=\"price\">&nbsp;</span>";
                html += "	<span class=\"dcPrice\"><strong>" + Number(obj.albumFlacCoverPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }
            if (obj.albumFlacCoverPrice > 0 && obj.albumFlacDiscountRate > 0) {
                html += "<span class=\"price through\">" + Number(obj.albumFlacCoverPrice).toLocaleString('en').split(".")[0] + "</span>";
                html += "<span class=\"dcPrice\"><strong>" + Number(obj.albumFlacDnlPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }

            if (obj.albumFlacDnlPrice == 0)
                html += "<span class=\"btnBuy\">援щℓ</span>";
            else
                html += "<span class=\"btnBuy\">援щℓ</span>";

            html += "		</a>";
            html += "	</li>";
        }
        // FLAC(24) �ㅼ슫濡쒕뱶
        if (obj.isAlbumFlac24DnlRightsYNAllTrack == "T") {
            html += "<li>";

            if (obj.adultCheckVal == "" || obj.adultCheckVal == "1") {
                if (obj.albumFlac24DnlPrice == 0)
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":F24');\" >";
                else
                    html += "		<a href=\"javascript:;\" onclick=\"javascript:bugs.music.downloadAlbumCache('" + obj.album_id + ":F24' " + obj.addParams + ");\">";
            } else {
                html += adultCheckhtml;
            }

            html += "		<span class=\"type\">FLAC 24/" + (obj.sample_rate != "" ? obj.sample_rate : +"44.1") + "</span>";

            if (obj.albumFlac24CoverPrice >= 0 && obj.albumFlac24DiscountRate == 0) {
                html += "<span class=\"price\">&nbsp;</span>";
                html += "	<span class=\"dcPrice\"><strong>" + Number(obj.albumFlac24CoverPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }
            if (obj.albumFlac24CoverPrice > 0 && obj.albumFlac24DiscountRate > 0) {
                html += "<span class=\"price through\">" + Number(obj.albumFlac24CoverPrice).toLocaleString('en').split(".")[0] + "</span>";
                html += "<span class=\"dcPrice\"><strong>" + Number(obj.albumFlac24DnlPrice).toLocaleString('en').split(".")[0] + "</strong>��</span>";
            }

            if (obj.albumFlac24DnlPrice == 0)
                html += "<span class=\"btnBuy\">援щℓ</span>";
            else
                html += "<span class=\"btnBuy\">援щℓ</span>";

            html += "		</a>";
            html += "	</li>";
        }

        html += "</ul>";
        html += "	</div>";
        html += "	</aside>";


        return html;
    },

    // �몃옓 �섏씠吏� - 怨� �ㅼ슫濡쒕뱶/援щℓ
    makeDnlHtml: function(obj) {
        var ePointInfo = "";
        if (obj.ePointInfo && obj.ePointInfo.esAlbumId) {
            ePointInfo = ", '', " + obj.ePointInfo.esAlbumId + ",'MUSICPD'";
        } else if (obj.ePointInfo && obj.ePointInfo.albumReviewId) {
            ePointInfo = ", '', " + obj.ePointInfo.albumReviewId + ",'ALBUM_REVIEW'";
        }
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select download\" style=\"display:none;\" >";
        html += "	<div class=\"box-shadow\"></div>";
        html += "	<h1>�좏깮 �덉씠��</h1>";
        html += "	<div class=\"innerScroll\">";
        html += "		<ul class=\"list-layer-select\">";
        if (obj.trackDnlRightsYN == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.download('" + obj.track_id + ":T" + "'" + ePointInfo + ")\" >�ㅼ슫濡쒕뱶</a></li>";
        if (obj.trackFlacDnlRightsYN == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.download('" + obj.track_id + ":F16" + "'" + ePointInfo + ")\">FLAC 16/" + obj.svcFlacSampleRate + " �ㅼ슫濡쒕뱶</a></li>";
        if (obj.trackFlac24DnlRightsYN == "Y") {
            var spectrogramHtml = "";
            if (obj.spectrogram) {
                var spectrogramJsonStr = JSON.stringify([obj.spectrogram]);
                var funcStr = "bugs.layermenu.spectrogramLayer(event,\'" + escape(spectrogramJsonStr) + "\');";
                spectrogramHtml = "<button title=\"24bit FLAC �뚯썝 �ㅽ럺�몃줈洹몃옩 蹂닿린\" class=\"iconSpectrogram\" onclick=\"" + funcStr + "\" type=\"button\">24bit FLAC �뚯썝 �ㅽ럺�몃줈洹몃옩 蹂닿린</button>";
            }
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.download('" + obj.track_id + ":F24" + "'" + ePointInfo + ")\">FLAC 24/" + obj.svcFlac24SampleRate + " �ㅼ슫濡쒕뱶" + spectrogramHtml + "</a></li>";
        }
        html += "		</ul>";
        html += "	</div>";
        html += "</aside>";

        return html;

    },
    makeMvHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select downloadMusicVideo\" style=\"display:none;\" >";
        html += "	<div class=\"box-shadow\"></div>";
        html += "	<h1>�좏깮 �덉씠��</h1>";
        html += "	<div class=\"innerScroll\">";
        html += "		<ul class=\"list-layer-select\">";
        if (obj.mediaYn == "Y") {
            if (obj.multiMvYn == "Y") {
                html += "		<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.showMultiMvLayer(" + obj.track_id + ");\" atype=\"info\">蹂닿린</a></li>";
            } else {
                html += "		<li><a href=\"javascript:;\" onclick=\"bugs.music.viewMV(" + obj.mv_id + ");\"  atype=\"info\">蹂닿린</a></li>";
            }
        }

        if (obj.svcFullhdYn == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.dnFullMV(" + obj.mv_id + ");\"  atype=\"down\">1080p �ㅼ슫濡쒕뱶</a></li>";

        if (obj.svcHdYn == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.dnHdMV(" + obj.mv_id + ");\"  atype=\"down\">720p �ㅼ슫濡쒕뱶</a></li>";

        if (obj.svcSdYn == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.dnSdMV(" + obj.mv_id + ");\"  atype=\"down\">480p �ㅼ슫濡쒕뱶</a></li>";

        html += "		</ul>";
        html += "	</div>";
        html += "</aside>";

        return html;
    },

    makeEsAlbumMoreActionHtml: function(obj) {

        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        html += "			<li><a href=\"javascript:bugs.music.listenEsalbum(" + obj.esalbum_id + ")\" atype=\"playlist\">�ъ깮紐⑸줉�� 異붽�<span class=\"blind\">-�덉갹</span></a></li>\n";
        html += "			<li><a href=\"javascript:; \" onclick=\"bugs.layermenu.addEsAlbumToMyAlbum(" + obj.esalbum_id + ")\" atype=\"my_album\">�� �⑤쾾�� �닿린<span class=\"blind\">-�덉갹</span></a></li>\n";
        if (!g_isGuest)
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.downloadEsAlbum(" + obj.esalbum_id + ");\" atype=\"down\">�ㅼ슫濡쒕뱶<span class=\"blind\">-�덉갹</span></a></li>\n";
        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("ESALBUM");
        html += "			</li>\n";
        if (obj.isLikeYN == "Y") {
            html += "			<li><a id=\"esalbumLike\" href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.esalbum_id + "', likes.TYPE_ESALBUM);\" atype=\"like\">醫뗭븘 痍⑥냼</a></li>\n";
        } else {
            html += "			<li><a id=\"esalbumLike\" href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.esalbum_id + "', likes.TYPE_ESALBUM);\" atype=\"like\">醫뗭븘</a></li>\n";
        }
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeAlbumReviewMoreActionHtml: function(obj) {

        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        if ((obj.trackRight || "N") == "Y")
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.listenAlbum('" + obj.album_id + "', false)\">�ъ깮紐⑸줉�� 異붽�<span class=\"blind\">-�덉갹</span></a></li>\n";
        html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.addAlbumTrackToMyAlbum(" + obj.album_id + ")\">�� �⑤쾾�� �닿린<span class=\"blind\">-�덉갹</span></a></li>\n";
        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("ALBUM");
        html += "			</li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeMusicpdMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        html += "			<li onmouseover=\"$('#layerSNS').show();\" onmouseout=\"$('#layerSNS').hide();\">\n";
        html += this.setShareSNSHtml("MUSICPD", $(html));
        html += "			</li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },
    userLikeDeleteOnlyHtml: function(obj) {
        var type = obj.type;
        if (type == "TRACK") {
            type = "likes.TYPE_TRACK";
        } else if (type == "ALBUM") {
            type = "likes.TYPE_ALBUM";
        } else if (type == "ARTIST") {
            type = "likes.TYPE_ARTIST";
        } else if (type == "MV") {
            type = "likes.TYPE_MV";
        } else if (type == "MUSICPDALBUM") {
            type = "likes.TYPE_ESALBUM";
        } else if (type == "MUSICPD") {
            type = "likes.TYPE_MEMBER";
        } else if (type == "MUSICCAST_CHANNEL") {
            type = "likes.TYPE_MUSICCAST_CHANNEL";
        } else {
            type == "";
        }
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        if (type != "") {
            html += "		<ul class=\"list-layer-select\">\n";
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.layerLikeAction(this,'" + obj.id + "', " + type + ");\">醫뗭븘 痍⑥냼</a></li>\n";
            html += "		</ul>\n";
        }
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    raioPlayerMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        html += "			<li><a href=\"" + g_urlMusic + "/track/" + obj.track_id + (bugs.radio.type == "musiccast" ? "?wl_ref=nRadio_08_18" : "?wl_ref=nRadio_09_07") + "\" target=\"_blank\">怨� �뺣낫</a></li>\n";
        if (obj.album_tp != "MF") {
            html += "			<li><a href=\"" + g_urlMusic + "/album/" + obj.album_id + (bugs.radio.type == "musiccast" ? "?wl_ref=nRadio_08_19" : "?wl_ref=nRadio_09_08") + "\" target=\"_blank\">�⑤쾾 �뺣낫</a></li>\n";
        }


        html += "			<li><a href=\"javascript:;\" onclick=\"bugs.radio.putTrackToMyAlbum(" + obj.track_id + ");\">�� �⑤쾾�� �닿린</a></li>\n";
        //		html +="			<li><a href=\"javascript:;\" onclick=\"bugs.layermenu.addTrackToMyAlbum('" + obj.track_id + "');\" target=\"_blank\">�� �⑤쾾�� �닿린</a></li>\n";
        if (!g_isGuest)
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.download(" + obj.track_id + ");\">�ㅼ슫濡쒕뱶</a></li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    musiccastPlayerMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        html += "			<li><a href=\"" + g_urlMusic + "/radio/musiccast/episode/" + obj.episode_id + "?wl_ref=nRadio_08_16\" target=\"_blank\">�먰뵾�뚮뱶 �뺣낫</a></li>\n";
        html += "			<li><a href=\"" + g_urlMusic + "/radio/musiccast/channel/" + obj.channel_id + "?wl_ref=nRadio_08_17\" target=\"_blank\">梨꾨꼸 �뺣낫</a></li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },

    makeMyAlbumListMoreActionHtml: function(obj) {
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        if (obj.totalCount > 0) {
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.myAlbumList.listenMyAlbum('" + obj.myAlbumId + "', false);\">�ъ깮紐⑸줉�� 異붽�</a></li>\n";
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.myAlbumList.addMyAlbumToMyAlbumTrack($('" + obj.callerSelector + "'), '" + obj.myAlbumId + "');\">�� �⑤쾾�� �닿린</a></li>\n";
            html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.myAlbumList.downMyAlbumTrackAll('" + obj.myAlbumId + "', " + obj.totalCount + ");\">�ㅼ슫濡쒕뱶</a></li>\n";
        }
        html += "			<li><a href=\"javascript:;\" onclick=\"playlists.update('" + obj.myAlbumId + "');\">�쒕ぉ �섏젙</a></li>\n";
        html += "			<li><a href=\"javascript:;\" onclick=\"bugs.music.myAlbumList.deleteMyAlbum('" + obj.page + "', '" + obj.myAlbumId + "');\">��젣</a></li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },


    makeShareUrlLayerHtml: function(obj) {
        var html = "";
        html += "<aside  id=\"commonLayerMenu\" class=\"layer layerCopyLink " + obj.className + "\" >";
        html += "	<div class=\"box-shadow\"></div>";
        if (obj.className) {
            html += "	<div class=\"layerTap topRight\"></div>";
        }
        html += "	<section class=\"layerContents\">";
        html += "		<p class=\"desc\">URL �좏깮 �� Ctrl+C瑜� �꾨Ⅴ�쒕㈃ 蹂듭궗�� �� �덉뒿�덈떎.</p>";
        html += "		<p class=\"url\">" + obj.url + "</p>";
        html += "	</section>";
        html += "	<button class=\"btnClose\" type=\"submit\">�リ린</button>";
        html += "</aside>";
        return html;
    },

    musicCastChannelMoreActionHtml: function(obj) {
        var logStr = "";
        var html = "";
        html += "<aside id=\"commonLayerMenu\" class=\"layer layer-select contextualMenu\" style=\"display:none;\">\n";
        html += "	<div class=\"box-shadow\"></div>\n";
        html += "	<h1>�좏깮 �덉씠��</h1>\n";
        html += "	<div class=\"innerScroll\">\n";
        html += "		<ul class=\"list-layer-select\">\n";
        if (obj.type == "RADIO" || obj.type == "RADIO_HOME") {
            if (obj.type == "RADIO_HOME") {
                logStr = "&wl_ref=nRadio_04_05";
            } else {
                logStr = "&wl_ref=nRadio_07_05";
            }
            html += "			<li><a href=\"" + g_urlMusic + "/radio/channelmanagment?stationId=" + obj.id + "&stationTitle=" + encodeURIComponent(obj.msg) + logStr + "\">梨꾨꼸�뺣낫</a></li>\n";
        } else {
            if (obj.type == "MUSICCAST_HOME") {
                logStr = "?wl_ref=nRadio_04_02";
            } else {
                logStr = "?wl_ref=nRadio_07_02";
            }
            html += "			<li><a href=\"" + g_urlMusic + "/radio/musiccast/channel/" + obj.id + logStr + "\">梨꾨꼸�뺣낫</a></li>\n";
        }


        if (obj.type == "RADIO" || obj.type == "RADIO_HOME") {
            if (obj.type == "RADIO_HOME") {
                logStr = "bugs.wiselog.area('nRadio_04_06');";
            } else {
                logStr = "bugs.wiselog.area('nRadio_07_06');";
            }
        } else {
            if (obj.type == "MUSICCAST_HOME") {
                logStr = "bugs.wiselog.area('nRadio_04_03');";
            } else {
                logStr = "bugs.wiselog.area('nRadio_07_03');";
            }

        }
        html += "			<li><a href=\"javascript:;\" onclick=\"" + logStr + " bugs.layermenu.layerMusicCastChnnelDelete(this,'" + obj.id + "', '" + obj.type + "');\">梨꾨꼸 ��젣</a></li>\n";
        html += "		</ul>\n";
        html += "	</div>\n";
        html += "</aside>";
        return html;
    },


    //�몃옓 由ъ뒪�� 裕ㅼ쭅鍮꾨뵒�� �꾩씠肄� 硫붾돱 �덉씠��
    mv: function(obj, track_id, mv_id, mediaYn, svcFullhdYn, svcHdYn, svcSdYn, mediaNo, mvAdultYn, mvGrade, multiMvYn) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        this.layerCaller = obj;
        var html = this.makeMvHtml({
            track_id: track_id,
            mv_id: mv_id,
            mediaYn: mediaYn,
            svcFullhdYn: g_isGuest ? "N" : svcFullhdYn,
            svcHdYn: g_isGuest ? "N" : svcHdYn,
            svcSdYn: g_isGuest ? "N" : svcSdYn,
            mediaNo: mediaNo,
            mvAdultYn: mvAdultYn,
            mvGrade: mvGrade,
            multiMvYn: multiMvYn
        });

        try {
            if (typeof bugsSearchLog != "undefined") {
                html = $(html);
                html.find("a").each(function() {
                    var aType = $(this).attr("atype");
                    if (aType != "multiMv") {
                        $(this).one("mousedown", function() {
                            bugsSearchLog.setTrackListAction(obj, aType, 'mv');
                        });
                    }
                });
            }
        } catch (e) {}

        this.show(obj, html, 7, 0);
    },

    //�몃옓由ъ뒪�� �ㅼ슫濡쒕뱶 �꾩씠肄� 硫붾돱 �덉씠��
    down: function(obj, track_id, trackDnlRights, trackFlacDnlRights, svcFlacSampleRate, trackFlac24DnlRights, svcFlac24SampleRate, ePointInfo) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();

        this.layerCaller = obj;
        var htmlMakeParam = {
            track_id: track_id,
            trackDnlRightsYN: eval(trackDnlRights) ? "Y" : "N",
            trackFlacDnlRightsYN: eval(trackFlacDnlRights) ? "Y" : "N",
            svcFlacSampleRate: svcFlacSampleRate || "",
            trackFlac24DnlRightsYN: eval(trackFlac24DnlRights) ? "Y" : "N",
            svcFlac24SampleRate: svcFlac24SampleRate || "",
            ePointInfo: ePointInfo || null
        }

        obj = $(obj);
        if (obj.data("spectrogram")) {
            htmlMakeParam.spectrogram = obj.data("spectrogram");

            this.show(obj, this.makeDnlHtml(htmlMakeParam), 7, 0);
        } else {
            if (!this.isComplete) {
                return;
            }

            this.isComplete = false;
            $.ajax({
                type: 'GET',
                url: g_urlAjax + "/track/" + track_id + "/ajax/spectrogram",
                data: { "decorator": "blank" },
                success: function(data) {
                    this.isComplete = true;
                    if (data.isExists) {
                        obj.data("spectrogram", data.spectrogram);
                        htmlMakeParam.spectrogram = data.spectrogram;
                    }

                    this.show(obj, this.makeDnlHtml(htmlMakeParam), 7, 0);
                }.bind(this),
                error: function(error) {
                    this.isComplete = true;
                    this.show(obj, this.makeDnlHtml(htmlMakeParam), 7, 0);
                }.bind(this),
                dataType: "json",
                cache: false
            });
        }
    },

    // SNS 怨듭쑀 �덉씠��
    share_sns: function(obj, share_type, content_id, content_title, artist_name, share_url) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;

        var param = {
            id: content_id,
            title: $(obj).attr("title"),
            name: $(obj).attr("name")
        };
        callObj.data("paramData", param);

        var html;
        if (share_type != "SPECIAL")
            html = this.makeSNSShareHtml(share_type, content_id, param, content_title, artist_name);
        else
            html = this.makeSNSShareHtml(share_type, content_id, param, content_title, artist_name, share_url);

        this.show(obj, html, 7, 43);
    },

    // �쇰컲 怨듭쑀 �덉씠��
    share: function(obj, url, params) {
        this.removeOldLayer();

        var html = this.makeUrlShareHtml(url + "?ap=T", params);
        this.show(obj, html, 7, 43);
    },

    // �⑤쾾 援щℓ �덉씠��
    buy_album: function(obj, album_id, sample_rate, isDnlRights, isFlacDnlRights, isFlac24DnlRights, coverPrice, dnlPrice, discountRate, flacCoverPrice, flacDnlPrice, flacDiscountRate, flac24CoverPrice, flac24DnlPrice, flac24DiscountRate, adultCheckVal, addParams) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();

        this.layerCaller = obj;
        var html = this.makeBuyAlbumHtml({
            album_id: album_id,
            sample_rate: sample_rate || "",
            isAlbumDnlRightsYNAllTrack: isDnlRights || "",
            isAlbumFlacDnlRightsYNAllTrack: isFlacDnlRights || "",
            isAlbumFlac24DnlRightsYNAllTrack: isFlac24DnlRights || "",
            albumCoverPrice: coverPrice,
            albumDnlPrice: dnlPrice,
            albumDiscountRate: discountRate,
            albumFlacCoverPrice: flacCoverPrice,
            albumFlacDnlPrice: flacDnlPrice,
            albumFlacDiscountRate: flacDiscountRate,
            albumFlac24CoverPrice: flac24CoverPrice,
            albumFlac24DnlPrice: flac24DnlPrice,
            albumFlac24DiscountRate: flac24DiscountRate,
            adultCheckVal: adultCheckVal,
            addParams: addParams
        });

        this.show(obj, html, 7, 115);
    },

    //�ㅼ쨷 �꾪떚�ㅽ듃 �덉씠��
    openMultiArtistSearchResultPopLayer: function(obj, artist_data, target, checkPosition) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        this.layerCaller = obj;
        var html = this.makeMultiArtistHtml(this.getMultiArtistInfoArr(artist_data), target || "", $(obj).attr("wise_log_str"));
        try {
            if (typeof bugsSearchLog != "undefined") {
                var html = $(html);
                html.find("a").one("mousedown", function() {
                    if (bugsSearchLog.currPage == "album") {
                        bugsSearchLog.setAlbumListAction(obj, "info", "artist", $(this).attr("artistId"));
                    } else if (bugsSearchLog.currPage == "mv") {
                        bugsSearchLog.setMvListAction(obj, "info", "artist", $(this).attr("artistId"));
                    } else if (bugsSearchLog.currPage == "lyrics") {
                        bugsSearchLog.setLyricsListAction(obj, "info", "artist", $(this).attr("artistId"));
                    } else {
                        bugsSearchLog.setTrackListAction(obj, "info", "artist", $(this).attr("artistId"));
                    }
                });

            }
        } catch (e) {}
        if (typeof checkPosition != "undefined") {
            this.show(obj, html, 3, 0, null, checkPosition);
        } else {
            this.show(obj, html, 3, 0);
        }
        try {
            bugs.scroll.setScrollBar("#commonLayerMenu .innerScroll", true);
        } catch (e) {}
    },

    getMultiArtistNamesWithComma: function(multi_artist_infoset) {
        var multi_artist_list = "";
        var artist_set = multi_artist_infoset.split("\\n");

        for (var i = 0; i < artist_set.length; i++) {
            var artist_info = artist_set[i].split("||");

            if (artist_info.length == 3) {
                if (artist_info[2] != "" && artist_info[2] != "undefined")
                    multi_artist_list += artist_info[1];

                if (i < artist_set.length - 1)
                    multi_artist_list += ", ";
            }
        }

        return multi_artist_list;
    },


    getMultiArtistInfoArr: function(artist_data) {
        var rev_artist_data = artist_data.replace(/##/, "\'");
        var artist_set = rev_artist_data.split("\\n");
        if (artist_set.length == 1) {
            //javascript�먯냼 html text濡� element 留뚮뱾�뚮뒗 �붽구濡� split �댁빞��.
            artist_set = rev_artist_data.split("\n");
        }
        var artistInfoArr = [];
        for (var i = 0, size = artist_set.length; i < size; i++) {
            var artist_info = artist_set[i].split("||");
            if (artist_info.length == 3) {
                var artistInfo = {};
                if (artist_info[2] != "" && artist_info[2] != "undefined") {
                    artistInfo.artist_id = artist_info[2];
                    artistInfo.artist_nm = artist_info[1];

                } else {
                    artistInfo.artist_nm = artist_info[1];
                }
                artistInfoArr.push(artistInfo);
            }
        }

        return artistInfoArr;
    },

    setLikeYNOnAjax: function(type, data_id) {

        var url = "",
            data = {};
        if (type == "album") url = g_urlAjax + "/ajax/getAlbumLike", data = { "albumId": data_id };
        else if (type == "track") url = g_urlAjax + "/ajax/getTrackLike", data = { "trackId": data_id };
        else if (type == "mv") url = g_urlAjax + "/ajax/getMvLike", data = { "mvId": data_id };
        else if (type == "esalbum") url = g_urlAjax + "/ajax/getEsAlbumLike", data = { "esAlbumId": data_id };

        $.post(url, data,
            function(result) {
                if (result != undefined) {
                    if (result == true) { // 醫뗭븘 �뺣낫媛� �덉쑝硫�
                        $("#commonLayerMenu").find("a#" + type + "Like").text("醫뗭븘 痍⑥냼");
                        $(bugs.layermenu.layerCaller).attr("isLikeYN", "Y");
                    } else { // 醫뗭븘 �뺣낫媛� �놁쑝硫�
                        $("#commonLayerMenu").find("a#" + type + "Like").text("醫뗭븘");
                        $(bugs.layermenu.layerCaller).attr("isLikeYN", "N");
                    }
                }
            });
    },

    //�몃옓由ъ뒪�� �붾낫湲� �꾩씠肄� 硫붾돱
    trackMoreAction: function(obj, track_id, playlist_track_id, album_id, radioMethod, reloadYN, likeAjax, logType) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();

        var callObj = $(obj);
        this.layerCaller = callObj;
        var param = {
            track_id: track_id,
            playlist_track_id: playlist_track_id,
            album_id: album_id,
            radioMethod: radioMethod,
            track_title: callObj.attr("track_title"),
            artist_name: callObj.attr("artist_disp_nm"),
            artist_id: callObj.attr("artist_id"),
            isLikeYN: callObj.attr("isLikeYN"),
            showDeleteYN: callObj.attr("showDeleteYN"),
            deleteType: callObj.attr("deleteType"),
            listName: callObj.attr("listName"),
            isBSide: callObj.attr("isBSide") === "Y" ? true : false,
            isStat: callObj.attr("isStat") === "Y",
            isExist: callObj.attr("isExist") === "Y",
            isMyBSideTrack: callObj.attr("isMyBSideTrack") || "",
            isBSidePage: callObj.attr("isBSidePage") == "Y" ? true : false,
            isMusicCast: callObj.attr("isMusicCast") == "Y" ? true : false,
            logType: logType || "",
            layer_type: callObj.attr("layer_type") || "",
            page: callObj.attr("page") || "1"
        };

        $.ajax({
            url: g_urlMusic + "/connect/ajax/check/meta",
            data: { meta_type: "TRACK", svc_meta_id: track_id + "" },
            success: function(data) {
                if (data.relationLoginUser != null &&
                    (data.relationLoginUser == 'MY_BSIDE_META' ||
                        data.relationLoginUser == 'MY_ARTIST_BSIDE_META' ||
                        data.relationLoginUser == 'MY_COMPANY_BSIDE_META' ||
                        data.relationLoginUser == 'MY_EXIST_META')) {
                    param.isStat = true;
                    if (data.relationLoginUser == 'MY_EXIST_META') {
                        param.isExist = true;
                    }
                }

                if (data.relationLoginUser != null && data.relationLoginUser == 'MY_BSIDE_META') {
                    if (data.isStopBsideMember != 'Y') {
                        param.isMyBSideTrack = "Y";
                    } else {
                        param.isMyBSideTrack = "Y_BUT_STOP";
                    }
                }

                callObj.data("paramData", param);
                var html = this.makeTrackMoreActionHtml(param);
                $(this.layerCaller).attr("reloadYN", reloadYN || "N");

                try {
                    if (typeof bugsSearchLog != "undefined") {
                        html = $(html);
                        html.find("a").each(function() {
                            var aType = $(this).attr("atype");
                            if (aType == "radio" || aType == "like" || aType == "share") {

                                $(this).one(aType == "like" ? "mousedown" : "click", function() {
                                    bugsSearchLog.setTrackListAction(callObj, aType, 'track');
                                });
                            }
                        });
                    }
                } catch (e) {}

                this.show(obj, html, 7, -34);


                // 醫뗭븘 �뺣낫 �명똿 (AJAX)
                if (g_isLogged == true && likeAjax == "Y") {
                    if (!param.isBSidePage) {
                        this.setLikeYNOnAjax("track", track_id);
                    }
                }

            }.bind(this)
        });

    },

    //�몃옓 ��젣留� 媛��ν븳寃쎌슦
    trackMoreActionDeleteOnly: function(obj, track_id, playlist_track_id, deleteType) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var html = this.makeTrackMoreActionDeleteOnlyHtml({
            track_id: track_id,
            playlist_track_id: playlist_track_id,
            deleteType: deleteType,
            isLikeYN: $(obj).attr("isLikeYN"),
            listName: $(obj).attr("listName"),
            isBSide: callObj.attr("isBSide") == "Y" ? true : false,
            isMyBSideTrack: callObj.attr("isMyBSideTrack") || "",
            page: callObj.attr("page") || "1"
        });
        this.layerCaller = callObj;
        if (deleteType == "LIKE_TRACK") {
            $(this.layerCaller).attr("reloadYN", "Y");
        }
        this.show(obj, html, 7, -35);
    },

    //�⑤쾾由ъ뒪�� �붾낫湲� �꾩씠肄� 硫붾돱
    albumMoreAction: function(obj, album_id, albumTrackStrYN, albumTrackDownYN, albumBundleDownType, reloadYN, strCallBack, likeAjax) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var param = {
            album_id: album_id,
            album_title: $(obj).attr("album_title"),
            artist_name: $(obj).attr("artist_name"),
            albumTrackDownYN: albumTrackDownYN,
            albumTrackStrYN: albumTrackStrYN,
            albumBundleDownType: g_isGuest ? false : albumBundleDownType,
            adultCheckVal: $(obj).attr("adultCheckVal"),
            isLikeYN: $(obj).attr("isLikeYN")

        };
        callObj.data("paramData", param);
        var html = this.makeAlbumMoreActionHtml(param);

        try {
            if (typeof bugsSearchLog != "undefined") {
                html = $(html);
                html.find("a").each(function() {
                    var aType = $(this).attr("atype");
                    if (aType == "playlist" || aType == "my_album" || aType == "down" || aType == "like" || aType == "share") {

                        $(this).one(aType == "like" ? "mousedown" : "click", function() {
                            bugsSearchLog.setAlbumListAction(callObj, aType);
                        });
                    }
                });
            }
        } catch (e) {}

        $(this.layerCaller).attr("reloadYN", reloadYN || "N");
        this.layerCaller.strCallBack = strCallBack || "";
        this.show(obj, html, 7, -49);

        // 醫뗭븘 �뺣낫 �명똿 (AJAX)
        if (g_isLogged == true && likeAjax == "Y") {
            this.setLikeYNOnAjax("album", album_id);
        }
    },

    //裕ㅻ퉬由ъ뒪�� �붾낫湲� �꾩씠肄� 硫붾돱
    mvMoreAction: function(obj, mv_id, track_id, album_id, album_tp, mvDownType, mvStrType, adultNoticeType, reloadYN, likeAjax, trackStatus, logType) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var param = {
            mv_id: mv_id,
            track_id: track_id,
            album_id: album_id,
            mvDownType: g_isGuest ? "NONE" : mvDownType,
            mvStrType: mvStrType,
            adultNoticeType: adultNoticeType,
            album_tp: album_tp,
            isLikeYN: $(obj).attr("isLikeYN"),
            trackStatus: trackStatus,
            isBSide: callObj.attr("isBSide") == "Y" ? true : false,
            isStat: callObj.attr("isStat") === "Y",
            isExist: callObj.attr("isExist") === "Y",
            isMyBSideMv: callObj.attr("isMyBSideMv") || "",
            isBSidePage: callObj.attr("isBSidePage") == "Y" ? true : false,
            mv_title: callObj.attr("mv_title"),
            artist_name: callObj.attr("artist_disp_nm"),
            artist_id: callObj.attr("artist_id"),
            logType: logType || ""
        };
        callObj.data("paramData", param);
        var html = this.makeMvMoreActionHtml(param);

        $(this.layerCaller).attr("reloadYN", reloadYN || "N");
        var tempObj = $(obj);

        try {
            if (typeof bugsSearchLog != "undefined") {
                html = $(html);
                html.find("a").each(function() {
                    var aType = $(this).attr("atype");
                    if (aType == "playlist" || aType == "down" || aType == "like") {

                        $(this).one(aType == "like" ? "mousedown" : "click", function() {
                            bugsSearchLog.setMvListAction(obj, aType, "mv");
                        });
                    } else {
                        if (aType == "track") {
                            $(this).one("mousedown", function() {
                                bugsSearchLog.setMvListAction(obj, "info", aType);
                            });
                        }

                        if (aType == "album") {
                            $(this).one("mousedown", function() {
                                bugsSearchLog.setMvListAction(obj, "info", aType);
                            });
                        }
                    }
                });
            }
        } catch (e) {}

        if (tempObj.attr("isPurchasedYN") == "Y" && typeof tempObj.attr("bitRate") != "undefined") {
            var self = this;
            this.show(obj, html, 7, -50, function() {
                $("#mvLayerDirectDownBtn")[0].onclick = function() { return false };
                new bugs.downloader.button($("#mvLayerDirectDownBtn"), {
                    type: "mv",
                    downloadId: mv_id,
                    isOnClickRemoveOldLayer: true
                }, self.simpleDownObj);
            });
        } else {
            this.show(obj, html, 7, -50);
        }

        // 醫뗭븘 �뺣낫 �명똿 (AJAX)
        if (g_isLogged == true && likeAjax == "Y") {
            if (!param.isBSidePage) {
                this.setLikeYNOnAjax("mv", mv_id);
            }
        }
    },

    //援щℓ蹂닿��� �꾩떆�댁젣 裕ㅻ퉬 �꾩슜
    mvMoreActionDownOnly: function(obj, mv_id, mvDownType) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.makeMvMoreActionDownOnlyHtml({
            mv_id: mv_id,
            mvDownType: mvDownType
        });

        this.layerCaller = obj;
        $(this.layerCaller).attr("reloadYN", "N");
        var tempObj = $(obj);
        if (tempObj.attr("isPurchasedYN") == "Y" && typeof tempObj.attr("bitRate") != "undefined") {
            var self = this;
            this.show(obj, html, 7, -50, function() {
                $("#mvLayerDirectDownBtn")[0].onclick = function() { return false };
                new bugs.downloader.button($("#mvLayerDirectDownBtn"), {
                    type: "mv",
                    downloadId: mv_id
                }, self.simpleDownObj);
            });
        } else {
            this.show(obj, html, 7, -50);
        }

    },

    showMultiMvLayer: function(track_id) {
        $("#multiMvListLayer").remove();
        $.ajax({
            type: 'GET',
            url: g_urlAjax + "/mv/list/" + track_id,
            data: { "decorator": "blank" },
            success: function(data) {
                var mvHtml = $(data);
                if (mvHtml.has("aside.layer.listMusicVideo")) {
                    var contentWindow = $(window);

                    if ($("#promotionContainer").length > 0) {
                        mvHtml.appendTo("#promotionContainer");
                    } else {
                        mvHtml.appendTo("body");
                    }

                    this.multiMvLayer = mvHtml.find(".btnClose").one("click", function(e) {
                        bugs.layerFocusNavi.remove(this.multiMvLayer);
                        this.removeMultiMvLayer();
                    }.bind(this)).end().show();

                    this.multiMvLayer.css({
                        left: (contentWindow.scrollLeft() + ((contentWindow.width() - $("#multiMvListLayer").width()) >> 1)) + "px",
                        top: (contentWindow.scrollTop() + ((contentWindow.height() - $("#multiMvListLayer").height()) >> 1)) + "px"
                    });

                    bugs.layerFocusNavi.add(this.multiMvLayer, this.layerCaller, this.removeMultiMvLayer.bind(this));
                } else {
                    alert("裕ㅼ쭅鍮꾨뵒�� �뺣낫瑜� 諛쏆븘�ㅼ� 紐삵뻽�듬땲��.");
                }
            }.bind(this),
            error: function(error) {
                alert("裕ㅼ쭅鍮꾨뵒�� �뺣낫瑜� 諛쏆븘�ㅼ� 紐삵뻽�듬땲��.");
            },
            dataType: "HTML",
            cache: false
        });
    },


    removeMultiMvLayer: function(event) {
        this.multiMvLayer.hide().remove();
    },

    //�꾪떚�ㅽ듃由ъ뒪�� �붾낫湲� �꾩씠肄� 硫붾돱
    artistMoreAction: function(obj, artist_id, listenType, radioMethod, reloadYN) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var param = {
            artist_id: artist_id,
            listenType: listenType,
            radioMethod: radioMethod,
            isLikeYN: $(obj).attr("isLikeYN"),
            artist_name: $(obj).attr("artist_nm")

        };
        callObj.data("paramData", param);
        var html = this.makeArtistMoreActionHtml(param);

        try {
            if (typeof bugsSearchLog != "undefined") {
                html = $(html);
                html.find("a").each(function() {
                    var aType = $(this).attr("atype");
                    if (aType == "play" || aType == "radio" || aType == "like" || aType == "share") {

                        $(this).one("mousedown", function() {
                            bugsSearchLog.setArtistListAction(obj, aType, "artist", artist_id);
                        });
                    }
                });
            }
        } catch (e) {}
        $(this.layerCaller).attr("reloadYN", reloadYN || "N");

        this.show(obj, html, 7, -38);
    },

    //裕ㅼ쭅pd�⑤쾾 �붾낫湲� �꾩씠肄� 硫붾돱
    esAlbumMoreAction: function(obj, params, reloadYN, likeAjax) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var params = {
            esalbum_id: $(obj).attr("esalbum_id"),
            esalbum_title: $(obj).attr("esalbum_title"),
            pd_nickname: $(obj).attr("pd_nickname"),
            isLikeYN: $(obj).attr("isLikeYN")
        };
        callObj.data("paramData", params);
        var html = this.makeEsAlbumMoreActionHtml(params);

        try {
            if (typeof bugsSearchLog != "undefined") {
                html = $(html);
                html.find("a").each(function() {
                    var aType = $(this).attr("atype");
                    if (aType == "playlist" || aType == "my_album" || aType == "down" || aType == "like" || aType == "share") {

                        $(this).one("mousedown", function() {
                            bugsSearchLog.setEsAlbumAction(callObj, aType);
                        });
                    }
                });
            }
        } catch (e) {}

        $(this.layerCaller).attr("reloadYN", reloadYN || "N");
        this.show(obj, html, 7, -50);

        // 醫뗭븘 �뺣낫 �명똿 (AJAX)
        if (g_isLogged == true && likeAjax == "Y") {
            this.setLikeYNOnAjax("esalbum", params.esalbum_id);
        }
    },

    //裕ㅼ쭅pd�⑤쾾 �붾낫湲� �꾩씠肄� 硫붾돱
    albumReviewMoreAction: function(obj, album_id, track_right) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var params = {
            album_id: album_id,
            album_title: $(obj).attr("album_title"),
            artist_name: $(obj).attr("artist_name"),
            trackRight: track_right
        };
        callObj.data("paramData", params);
        var html = this.makeAlbumReviewMoreActionHtml(params);
        this.show(obj, html, 7, -50);
    },


    userLikeDeleteOnly: function(obj, id, type) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.userLikeDeleteOnlyHtml({
            id: id,
            type: type
        });

        this.layerCaller = obj;
        $(this.layerCaller).attr("reloadYN", "Y");
        this.show(obj, html, 7, -50);

    },
    musicpdMoreAction: function(obj, msrl, reloadYN) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var callObj = $(obj);
        this.layerCaller = callObj;
        var param = {
            isLikeYN: $(obj).attr("isLikeYN"),
            msrl: msrl,
            musicpd_info_id: $(obj).attr("musicpd_info_id"),
            musicpd_name: $(obj).attr("musicpd_name")
        };
        callObj.data("paramData", param);
        var html = this.makeMusicpdMoreActionHtml(param);
        $(this.layerCaller).attr("reloadYN", reloadYN || "N");
        this.show(obj, html, 7, -50);

    },


    raioPlayerMoreAction: function(obj, track) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.raioPlayerMoreActionHtml({
            track_id: track.track_id,
            album_id: track.album_id,
            album_tp: track.album_tp
        });

        this.layerCaller = obj;
        this.layerCaller.reloadYN = "N";
        this.show(obj, html, 7, -50);
    },

    musiccastPlayerMoreAction: function(obj, episodeId, channelId) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.musiccastPlayerMoreActionHtml({
            episode_id: episodeId,
            channel_id: channelId
        });

        this.layerCaller = obj;
        this.layerCaller.reloadYN = "N";
        this.show(obj, html, 7, -50);
    },

    myAlbumListMoreAction: function(callerSelector, myAlbumId, page, totalCount) {
        var obj = $(callerSelector);
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.makeMyAlbumListMoreActionHtml({
            myAlbumId: myAlbumId,
            page: page,
            callerSelector: callerSelector,
            totalCount: totalCount
        });

        this.layerCaller = obj;
        this.layerCaller.reloadYN = "N";
        this.show(obj, html, 7, -30);
    },


    musicCastChannelMoreAction: function(obj, id, type, msg) {
        if (!this.checkShowLayer(obj)) {
            return;
        }
        this.removeOldLayer();
        var html = this.musicCastChannelMoreActionHtml({
            id: id,
            type: type,
            msg: msg
        });

        this.layerCaller = obj;
        this.layerCaller.reloadYN = "N";
        this.show(obj, html, 7, -30);
    },

    shareSNS: function(contentType, type) {
        var obj = this.layerCaller.data("paramData");
        if (contentType == "ALBUM") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.albumPage(obj.album_id));
            } else if (type == "fb") {
                bugs.facebook2.album(obj.album_id, obj.album_title, obj.artist_name);
            } else if (type == "tw") {
                bugs.twitter.album(obj.album_id, obj.album_title, obj.artist_name);
            }
        } else if (contentType == "TRACK") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.trackPage(obj.track_id));
            } else if (type == "fb") {
                bugs.facebook2.track(obj.track_id, obj.track_title, obj.artist_name);
            } else if (type == "tw") {
                bugs.twitter.track(obj.track_id, obj.track_title, obj.artist_name);
            }

        } else if (contentType == "ARTIST") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.artistPage(obj.artist_id));
            } else if (type == "fb") {
                bugs.facebook2.artist(obj.artist_id, obj.artist_name);
            } else if (type == "tw") {
                bugs.twitter.artist(obj.artist_id, obj.artist_name);
            }
        } else if (contentType == "MV") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.mvPage(obj.mv_id));
            } else if (type == "fb") {
                bugs.facebook2.mv(obj.mv_id, obj.mv_title, obj.artist_name);
            } else if (type == "tw") {
                bugs.twitter.mv(obj.mv_id, obj.mv_title, obj.artist_name);
            }
        } else if (contentType == "MUSICPD") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.musicPDPage(obj.musicpd_info_id));
            } else if (type == "fb") {
                bugs.facebook2.musicPD(obj.musicpd_info_id, obj.musicpd_name);
            } else if (type == "tw") {
                bugs.twitter.musicPD(obj.musicpd_info_id, obj.musicpd_name);
            }
        } else if (contentType == "ESALBUM") {
            if (type == "ks") {
                bugs.kakao.story2(bugs.url.esAlbumPage(obj.esalbum_id));
            } else if (type == "fb") {
                bugs.facebook2.esAlbum(obj.esalbum_id, obj.esalbum_title);
            } else if (type == "tw") {
                bugs.twitter.esAlbum(obj.esalbum_id, obj.esalbum_title);
            }
        }
    },

    openShareUrlLayer: function(type, caller, contentId, e) {

        try { var e = window.event; if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; } } catch (e) {}
        var url = g_urlMusic;
        if (url.indexOf("://") <= -1) url = location.protocol + url;
        var param = null;
        var shareParam = {};
        if (typeof caller != "undefined" && caller != null) {
            caller = $(caller);
            this.layerCaller = caller;
            shareParam.className = "info";
            if (!this.checkShowLayer(caller)) {
                return false;
            }
        } else {
            caller = this.layerCaller;
            param = this.layerCaller.data("paramData");
            shareParam.className = "";
        }

        this.removeOldLayer();

        if (type == "TRACK") {
            contentId = contentId ? contentId : param.track_id;
            url += "/track/";
        } else if (type == "ALBUM") {
            contentId = contentId ? contentId : param.album_id;
            url += "/album/";
        } else if (type == "ARTIST") {
            contentId = contentId ? contentId : param.artist_id;
            url += "/artist/";
        } else if (type == "MV") {
            contentId = contentId ? contentId : param.mv_id;
            url += "/mv/";
        } else if (type == "MUSICPD") {
            contentId = contentId ? contentId : param.musicpd_info_id;
            url += "/musicpd/pdlistdetail/";
        } else if (type == "ESALBUM") {
            contentId = contentId ? contentId : param.esalbum_id;
            url += "/musicpd/albumview/";
        } else if (type == "MUSICCAST_CHANNEL") {
            contentId = contentId ? contentId : param.esalbum_id;
            url += "/radio/musiccast/channel/";
        } else if (type == "MUSICCAST_EPISODE") {
            contentId = contentId ? contentId : param.esalbum_id;
            url += "/radio/musiccast/episode/";
        }

        url += contentId;
        shareParam.url = url;

        var html = this.makeShareUrlLayerHtml(shareParam);
        html = $(html);
        html.find(".btnClose").click(function(e) {
            bugs.layerFocusNavi.remove(this.html);
            this.removeOldLayer();
        }.bind(this));

        //bugs.layerFocusNavi.add(this.multiMvLayer, this.layerCaller, this.removeMultiMvLayer.bind(this));
        this.show(caller, html, 9, -142);
        $(document).unbind("click", bugs.layermenu.hideWhenDocumentClick);

    },


    addAlbumTrackToMyAlbum: function(album_id) {
        bugs.music.addAlbumToMyAlbum(this.layerCaller, album_id);
    },

    addTrackToMyAlbum: function(track_id) {
        bugs.music.addTrackToMyAlbum(this.layerCaller, track_id);
    },

    addEsAlbumToMyAlbum: function(es_album_id) {
        this.removeOldLayer();

        if (!g_isLogged) {
            bugs.ui.showLoginLayer();
            return;
        }

        if (!es_album_id) {
            //			bugs.ui.showAlert("裕ㅼ쭅pd�⑤쾾 �뺣낫媛� �놁뒿�덈떎.", {css : "layerAdultNotice"});
            alert("裕ㅼ쭅PD �⑤쾾 �뺣낫媛� �놁뒿�덈떎.");
            return;
        }

        bugs.music.getEsAlbum_tracks(es_album_id, function(data) {

            if (data.trackIds) {
                playlists.showPlaylistLayer($(this.layerCaller), data.trackIds);
            } else {
                //				bugs.ui.showAlert("裕ㅼ쭅pd�⑤쾾�� 怨≪젙蹂닿� �놁뒿�덈떎.");
                alert("裕ㅼ쭅PD �⑤쾾�� 怨� �뺣낫媛� �놁뒿�덈떎.");
            }

        }.bind(this));
    },

    layerLikeAction: function(target, id, type) {
        this.removeOldLayer();
        if (!g_isLogged) {
            bugs.ui.showLoginLayer();

        } else {

            var caller = $(this.layerCaller);
            var callBack = this.layerCaller.strCallBack || "";
            if (callBack != "" && typeof callBack != "undefined") {
                var isYN = "Y";
                if (caller.attr("isLikeYN") == "Y") {
                    isYN = "N";
                } else {
                    isYN = "Y";
                }
                //javascript�먯꽌 �⑤쾾由ъ뒪�� 留뚮뱶�� 寃쎌슦 �⑤쾾�곗씠�� 媛앹껜 媛믪쓣 諛붽퓭二쇨린 �꾪빐�� 肄쒕갚�� 諛쏆븘 �몄텧�댁���
                if (callBack)
                    callBack = new Function(callBack + "(" + id + ",'" + isYN + "')");
            }
            if (caller.attr("isLikeYN") == "Y") {
                likes.deletes(id, type, { anchor: $(target) }, function() {
                        alert("痍⑥냼�섏뿀�듬땲��.", function() {
                            if (caller.attr("reloadYN") == "Y" || caller[0].reloadYN == "Y") {
                                bugs.navigator.goState(window.location.href);
                                return;
                            } else {
                                if (typeof callBack == "function") {
                                    callBack();
                                }
                                $(target).text("醫뗭븘");
                                $(caller).attr("isLikeYN", "N");
                            }
                        });
                    },
                    function() {
                        alert("��젣�� �� �놁뒿�덈떎.\n�좎떆 �� �ㅼ떆 �쒕룄�� 二쇱꽭��.");
                    });
            } else {
                likes.adds(id, type, { anchor: $(target) }, function() {
                        RecommendClickLog.sendMoreActionLog('like');
                        alert("醫뗭븘�� �뚯븙�� �댁븯�듬땲��.", function() {
                            if (typeof callBack == "function") {
                                try {
                                    callBack();
                                } catch (e) {}
                            }
                            $(target).text("醫뗭븘 痍⑥냼");
                            $(caller).attr("isLikeYN", "Y");
                        });
                    },
                    function(e) {
                        alert("醫뗭븘�� �뚯븙�� �댁� 紐삵뻽�듬땲��.\n�좎떆 �� �ㅼ떆 �쒕룄�� 二쇱꽭��.");
                    });
            }
        }

    },

    layerDeleteTrack: function(listName, trackId, deleteType, page) {
        if (!g_isLogged) {
            bugs.ui.showLoginLayer();
            return;
        }
        var func = new Function(listName + ".deleteTrack($(this.layerCaller),'" + trackId + "', '" + deleteType + "', '" + page + "');").bind(this);
        func();
    },

    layerReportBSideContent: function(caller, contentId, contentType) {
        if (!contentType)
            return;

        params = {
            caller: $(caller).closest("#commonLayerMenu").data().caller,
            content_type: contentType,
            target_id: contentId
        };

        bugs.userReport.clickCommonReportBtn(params);
    },

    layerModifyBSideContent: function(contentId, contentType) {
        if (!g_isLogged) {
            bugs.ui.showLoginLayer();
            return;
        }
        bugs.connect.manage.trackmv.showModifyTrackMvLayerForCommon(contentId, contentType);
    },

    layerGoBSideStatistics: function(artistId, contentId, contentType, isConnect) {
        if (!g_isLogged) {
            bugs.ui.showLoginLayer();
            return;
        }
        if (typeof(isConnect) === 'undefined')
            isConnect = false;

        if (isConnect)
            bugs.connect.graph.showLayer(contentId, contentType, artistId);
        else
            bugs.connect.graph.showLayer(contentId, contentType, artistId, null, null, null, null, false);
    },

    layerMusicCastChnnelDelete: function(caller, id, type) {
        var params = { decorator: "blank" };
        var url = g_urlAjax;

        if (type == "RADIO" || type == "RADIO_HOME") {
            url += "/radio/deletechannel/" + id;
        } else {
            url += "/radio/musiccast/channel/" + id + "/delete"
        }

        $.ajax({
            type: 'POST',
            url: url,
            data: params,
            success: function(result) {
                if (result) {
                    alert("梨꾨꼸�� ��젣�덉뒿�덈떎.", function() {
                        if (type == "RADIO_HOME") {
                            try {
                                //radioHome�� �덈뒗 func
                                retrieveMusicCastMyChannel();
                            } catch (e) {}
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    alert("梨꾨꼸�� ��젣�섏� 紐삵뻽�듬땲��.");
                }
            }.bind(this),
            error: function(error) {
                alert("梨꾨꼸�� ��젣�섏� 紐삵뻽�듬땲��.");
            },
            dataType: "json",
            cache: false
        });
    },


    spectrogramLayer: function(event, spectrogramList, obj) {
        this.removeOldLayer();
        if (obj && typeof obj == "object") {
            this.layerCaller = $(obj);
        }

        try { event.preventDefault(); } catch (e) {}
        try { event.stopPropagation(); } catch (e) {}

        spectrogramList = unescape(spectrogramList);
        var source = JSON.parse(spectrogramList);
        if (source.length == 0) return;
        var spectrogramLayer = new bugs.music.photoLayer(
            null, { source: source, page: 1, row: 8 }, "TRACK_SPECTROGRAM", this.layerCaller
        );

        spectrogramLayer.open();

        bugs.wiselog.area("list_tr_spectro");

    },

    spectrogramReport: function(trackId) {
        window.open(g_urlMusic + "/track/" + trackId + "/spectrogram/report");
    },

    hideWhenDocumentClick: function(e) {
        if (e.data.button.index(e.target) < 0 && e.data.button.children().index(e.target) < 0 &&
            e.data.layer.index(e.target) < 0 && e.data.layer.children("*").index(e.target) < 0) {
            $(document).unbind("click", bugs.layermenu.hideWhenDocumentClick);
            bugs.layerFocusNavi.remove(e.data.layer, e.data.button);
            e.data.layer.hide().remove();
        }
    },

    removeOldLayer: function() {
        if ($("#commonLayerMenu").length > 0) {
            $(document).unbind("click", bugs.layermenu.hideWhenDocumentClick);
            bugs.layerFocusNavi.remove($("#commonLayerMenu"));
            $("#commonLayerMenu").hide().remove();
        }
    },

    checkShowLayer: function(obj) {
        if (typeof(this.layerCaller) != "undefined" && this.layerCaller != null) {
            if ($(obj).is($(this.layerCaller)) ||
                $(obj)[0] == $(this.layerCaller)[0]) {
                if ($("#commonLayerMenu").is(":visible")) {
                    try { event.preventDefault(); } catch (e) {}
                    try { event.stopPropagation(); } catch (e) {}
                    $(this.layerCaller).focus();
                    this.removeOldLayer();
                    return false;
                }
            }
        }
        return true;
    },

    show: function(obj, html, top, left, callBack, checkPosition) {
        var oobj = $(obj);

        try { //
            playlists.playlistLayerHide();
        } catch (e) {};

        var layer = $(html).css("visibility", "").appendTo("body");
        if (typeof checkPosition != "undefined") {
            bugs.layermenu.layerEventHandler(oobj, layer, top, left, checkPosition);
        } else {
            bugs.layermenu.layerEventHandler(oobj, layer, top, left);
        }


        if (layer.children("#layerSNS")) { //怨듭쑀�섍린 �덉씠�닿� �ы븿�� 寃쎌슦 �꾩튂 媛믪뿉 �곕씪�� 醫뚯슦濡� �덉씠�대� �꾩썙以���
            var dWidth = $("#wrap").width();
            var cTop = "-35px";
            var cLeft = layer.position().left + layer.width();
            if (dWidth - (cLeft + 131) > (layer.width()) + 10) {
                cLeft = (layer.width()) + "px";
            } else {
                cLeft = "-128px";
            }
            layer.find("#layerSNS").css({ "margin-left": cLeft, "margin-top": cTop });
        }
        $(document).unbind("click", bugs.layermenu.hideWhenDocumentClick).bind("click", { button: oobj, layer: layer }, bugs.layermenu.hideWhenDocumentClick);

        if (typeof callBack == "function") {
            callBack();
        }

        layer.data("caller", obj);
    },

    layerEventHandler: function(caller, layer, _top, _left, checkPosition) {
        var a = caller;

        if (typeof a.attr("layerPositionTarget") != "undefined" && a.attr("layerPositionTarget") != "") {
            var p = caller.parents(a.attr("layerPositionTarget"));
            layer.show();

            //var pWidth = a.index() % 2
            layer.css({
                "top": a.offset().top + a.height() + _top,
                "left": (Math.floor(p.offset().left) + Math.floor(p.width()) - Math.floor(layer.width())) - 1
            });

            $(window).resize(function() {
                setTimeout(function() {
                    layer.css({
                        "top": a.offset().top + a.height() + _top,
                        "left": (Math.floor(p.offset().left) + Math.floor(p.width()) - Math.floor(layer.width())) - 1
                    });
                }, 300);
            });
        } else {
            if (typeof checkPosition != "undefined") {

                var self = this;
                self.layerWidthFidex(layer);

                var cTop = caller.offset().top;
                var layerHeight = layer.height();
                var cLeft = caller.offset().left;
                var layerWidth = layer.width();
                if ($(window).height() - cTop > layerHeight + 15) {
                    cTop = cTop + a.height() + _top;
                } else {
                    cTop = cTop - layerHeight - 5;
                }
                if (cLeft - 20 <= layerWidth / 2) {
                    cLeft = 20;
                } else if ($(window).width() < cLeft + (layerWidth / 2) + 20) {
                    cLeft = $(window).width() - 20 - layerWidth;
                } else {

                    cLeft = cLeft - (layer.width() / 2) + (caller.width() / 2) + _left;

                }

                layer.css({
                    "top": cTop,
                    "left": cLeft
                }).show();

                $(window).resize(function() {
                    setTimeout(function() {
                        self.layerWidthFidex(layer);

                        cTop = caller.offset().top;
                        layerHeight = layer.height();
                        cLeft = caller.offset().left;
                        layerWidth = layer.width();
                        if ($(window).height() - cTop > layerHeight + 15) {
                            cTop = cTop + a.height() + _top;
                        } else {
                            cTop = cTop - layerHeight - 5;
                        }


                        if (cLeft - 20 <= layerWidth / 2) {
                            cLeft = 20;
                        } else if ($(window).width() < cLeft + (layerWidth / 2) + 20) {
                            cLeft = $(window).width() - 20 - layerWidth;
                        } else {
                            cLeft = (layer.width() / 2) + (caller.width() / 2) + _left;
                        }

                        layer.css({
                            "top": cTop,
                            "left": cLeft
                        });
                    }, 500);
                });

            } else {
                var self = this;
                self.layerWidthFidex(layer);
                layer.css({
                    "top": caller.offset().top + a.height() + _top,
                    "left": caller.offset().left - (layer.width() / 2) + (caller.width() / 2) + _left
                }).show();

                $(window).resize(function() {
                    setTimeout(function() {
                        self.layerWidthFidex(layer);
                        layer.css({
                            "top": caller.offset().top + a.height() + _top,
                            "left": caller.offset().left - (layer.width() / 2) + (caller.width() / 2) + _left
                        });
                    }, 500);
                });
            }
        }

        //�붾㈃�� 蹂댁뿬吏��� �곹깭�ъ빞�댁꽌 �ш린�� �꾩튂
        bugs.layerFocusNavi.add(layer, caller, this.removeOldLayer);
    },

    layerEventHandler2: function(caller, layer, _top, _left) {
        //------------------ 釉뚮씪�곗졇蹂� �덉쇅 泥섎━ -----------------//
        var yy = 0;
        var xx = 0;
        if ($.browser.name == "msie") {
            yy = -44;
            if ($.browser.versionNumber == "6")
                yy = -14;
        } else if ($.browser.name == "firefox") {
            yy = -10;
        }
        if (caller.find("img").width() < 30) { // 裕ㅼ쭅�쇱씠�� �묒� �ㅽ�
            xx = xx - caller.find("img").width() - 3;
            if ($.browser.name == "msie") yy = yy + 10;
        } else if (caller.find("img").height() == 57) { // TOP �꾪떚�ㅽ듃
            if ($.browser.name == "msie") yy = yy - 20;
        } else if (caller.find("img").width() == 83) { // TOP �꾪떚�ㅽ듃  TOP3
            if ($.browser.name == "msie") yy = yy + 20;
        } else if (caller.find("img").width() == 35 && caller.find("img").height() == 35) { // ���몄쓽 裕ㅼ쭅�쇱씠�� �щ엺醫뗭븘
            xx = xx - 17;
        }

        if (caller.attr("type") == "image") { // 援щℓ蹂닿���/裕ㅻ퉬 > 醫뗭븘
            xx = xx - 10;
            yy = yy + 20;
            if ($.browser.name == "msie") yy = yy + 25;
        }
        //------------------ 釉뚮씪�곗졇蹂� �덉쇅 泥섎━ -----------------//

        var e = caller.offset();
        var x = e.left + _left + xx;
        var y = e.top + caller.find("img").height() + _top + yy + 10;


        layer.css("left", x + "px");
        layer.css("top", y + "px");
        layer.show();
        bugs.layerFocusNavi.add(layer, caller, this.removeOldLayer);
    },

    descLayerDisplayNotAgain: function(sel) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + 30);
        bugs.cookie.set(sel, "Y", oDate);
        $("#" + sel).hide();
    },

    descLayerDisplayCheck: function(sel) {
        if (bugs.cookie.get(sel) == "Y") {
            $("#" + sel).hide();
        } else {
            $("#" + sel).show();
            this.descLayerDisplaySizeCheck(sel);
        }
    },

    descLayerDisplaySizeCheck: function(sel) {
        $("#" + sel).find('.content').css('width', $("#" + sel).width() - 5);
        $("#" + sel).find('.bgTR').css('height', $("#" + sel).find('.content').outerHeight());
    },

    layerWidthFidex: function(layer) {
        if (this.isPlayer) {
            layer.show().css("visibility", "hidden").css("width", "");
            var maxWidth = Math.abs($(window).width() * 0.8);
            var ulWidth = layer.find("ul").width();
            if (ulWidth > maxWidth) {
                layer.width(maxWidth);
            } else {
                layer.width(ulWidth);
            }
            layer.css("visibility", "visible");
        } else {
            layer.show();
        }
    }
};



bugs.layerFocusNavi = {
    caller: null,
    remove: function(layer, caller, callback) {
        this.removeTabKeyHandler(layer);
        if (typeof isRemove != "undefined" && isRemove) {
            try { $(target).hide().remove(); } catch (e) {};
        }

        if (typeof caller != "undefined") {
            $(caller).focus();
        } else {
            $(this.caller).focus();
        }

        if (typeof callback == "function") {
            try { callback(); } catch (e) {}
        }
    },

    add: function(layer, caller, closeFunc) {
        if ($(caller).parents("#commonLayerMenu").attr("id") != "commonLayerMenu") {
            this.caller = caller;
        };

        //		if($(layer).attr("id") == "alert") {
        //		} else {
        $(layer).attr("tabIndex", -1).focus();
        //		}
        $(layer).unbind("keydown", this.tabKeyHandler)
            .bind("keydown", { caller: caller, closeFunc: closeFunc }, this.tabKeyHandler.bind(this));
    },

    removeTabKeyHandler: function(target) {
        $(target).unbind("keydown", this.tabKeyHandler);
    },

    tabKeyHandler: function(e) {
        var code = e.witch || e.keyCode;
        var lastFocusTarget = e.data.caller || this.caller;
        var focusableObjs = null;

        this.caller = lastFocusTarget;

        if ($(e.target).attr("id") == "bugsAlert") {
            if (code == 13) // Enter Key �뚮━硫� ESC �� �숈옉怨� �숈씪�섍쾶 泥섎━
                code = 27;
        }

        if (e.shiftKey && code == 9) {
            focusableObjs = $(e.currentTarget).find(":focusable");

            if (focusableObjs.index(e.target) == 0 || e.target == e.currentTarget) {
                this.removeTabKeyHandler(e.currentTarget);

                if (typeof e.data.closeFunc == "function") {
                    try { e.data.closeFunc(); } catch (e) {}
                }

                this.remove(e.currentTarget, lastFocusTarget, true);

                try { e.preventDefault(); } catch (e) {};
                try { e.stopPropagation(); } catch (e) {};
            }
        } else if (code == 9) {
            focusableObjs = $(e.currentTarget).find(":focusable");

            if (focusableObjs.index(e.target) == focusableObjs.length - 1) {
                this.removeTabKeyHandler(e.currentTarget);

                if (typeof e.data.closeFunc == "function") {
                    try { e.data.closeFunc(); } catch (e) {}
                }
                this.remove(e.currentTarget, lastFocusTarget);
                try { e.preventDefault(); } catch (e) {};
                try { e.stopPropagation(); } catch (e) {};
            }
        } else if (code == 27) {
            this.removeTabKeyHandler(e.currentTarget);

            if (typeof e.data.closeFunc == "function") {
                try { e.data.closeFunc(); } catch (e) {}
            }
            this.remove(e.currentTarget, lastFocusTarget);
            try { e.preventDefault(); } catch (e) {};
            try { e.stopPropagation(); } catch (e) {};
        }
    }

};



bugs.logging = {
    clientYN: false, //true => bugsplayer4
    url: g_urlAjax + "/logging/add",
    add: function(id, cols, nums, scriptYn) {
        if (typeof scriptYn == "undefined") scriptYn = false;
        if (this.clientYN) scriptYn = true;

        if (typeof id == "undefined" || id == null) return; //jhjung WAS null exception 異붽� 12.01.05
        if (typeof cols == "undefined" || cols == null) cols = [];
        if (typeof nums == "undefined" || nums == null) nums = [];
        if (cols.length == 0 && nums.length == 0) return;
        if (this.clientYN)
            cols.push("", "bugsplayer4");

        try {
            if (scriptYn) {
                jQuery.ajax({
                    url: g_urlMusic + "/logging/add",
                    dataType: "script",
                    data: { id: id, "cols[]": cols, "nums[]": nums },
                    success: function(result) {}
                });

            } else {
                var _cols = [];
                $(cols).each(function() {
                    _cols.push(encodeURIComponent(this));
                });
                jQuery.post(bugs.logging.url, { id: id, "cols[]": _cols, "nums[]": nums }, function(result) {

                });
            }
        } catch (ex) {
            bugs.log.log(ex);
        }


    },
    banner: function(bannerId, type) {
        $.ajax({
            url: "/logging/insertBannerLog",
            type: "POST",
            data: { bannerId: bannerId, type: type },
            success: function(result) {},
            error: function() {}
        });
    },
    event: function(eventLogId, inputText, deviceId) {
        if (typeof eventLogId == "undefined") {
            return null;
        }
        if (typeof inputText == "undefined") {
            inputText = null;
        }
        if (typeof deviceId == "undefined") {
            deviceId = null;
        }

        $.ajax({
            url: "/logging/insertEventLog",
            type: "POST",
            data: { eventLogId: eventLogId, inputText: inputText, deviceId: deviceId },
            success: function(result) {},
            error: function() {}
        });
    }
};



var debug = {
    dump: function() {
        var retVal = '',
            argVal = arguments[0] || '';

        switch ((typeof argVal).toLowerCase()) {
            case 'object':
                $.each(argVal, function(key, value) {
                    retVal += '[' + (typeof value) + '] ' + key + ' => ' + value + '\n';
                });
                break;

            case 'string':
            default:
                retVal += (typeof argVal) + '/' + argVal;
        }
        return retVal;
    }
};

bugs.search = {
    url: g_urlSearch,
    target: 'integrated',
    inputBoxButton: null,
    query: encodeURIComponent($("#headerSearchInput").val()),
    done: false,
    init: function() {
        this.inputBoxButton = $("#headerSearchForm");
        this.query = encodeURIComponent($("#headerSearchInput").val());
    },
    search: function(searchType, searchQuery) {
        if (bugs.searchBoxAd.searchDirectionUrl != "" && bugs.searchBoxAd.searchDirectionUrl != null && bugs.searchBoxAd.searchDirectionUrl != undefined) {
            bugs.searchBoxAd.updateSeachAdViewCnt(bugs.searchBoxAd.searchAdId);
            document.location.href = bugs.searchBoxAd.searchDirectionUrl;
        } else {
            try {
                this.query = searchQuery || $("#headerSearchInput").val();
                document.location.href = g_urlSearch + "/" + searchType + "?q=" + encodeURIComponent(this.query);

            } catch (e) {}

        }
    },

    searchFromButton: function() {
        if (bugs.valid.empty($("#headerSearchInput").val())) {
            alert("寃��됱뼱瑜� �낅젰�댁＜�몄슂.");
            return;
        }
        this.search(this.target, $("#headerSearchInput").val());
    },

    searchForSuggest: function(event, query, logKey) {
        try {
            if (event.stopPropagation) { event.stopPropagation(); }
            if (event.preventDefault) { event.preventDefault(); }
            event.cancelBubble = true;
        } catch (e) {}
        document.location.href = g_urlSearch + "?q=" + encodeURIComponent(query) + "&" + logKey;
    },

    moveArtistPage: function(event, artistId, logKey) {
        try {
            if (event.stopPropagation) { event.stopPropagation(); }
            if (event.preventDefault) { event.preventDefault(); }
            event.cancelBubble = true;
        } catch (e) {}

        var artistUrl = bugs.url.artistPage(artistId);
        if (typeof logKey != "undefined") {
            if (artistUrl.indexOf("?") > -1) {
                logKey = "&" + logKey;
            } else {
                logKey = "?" + logKey;
            }
            artistUrl = artistUrl + logKey;
        }
        document.location.href = artistUrl;
    },

    //�섏씠�쇱씠�� 湲몄씠 , �ㅼ젣 由ъ뒪�� 異붿텧
    highLight: function(type) {
        var aList = "";
        var anchorLength = "";

        if (type == "track" || type == "musiccast" || type == "integrated") {
            aList = $(".list.trackList tbody tr a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "album" || type == "integrated") {
            aList = $(".list.listView.albumList li .info a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "artist" || type == "integrated") {
            aList = $(".list.listView.artistList li .info a.artistTitle");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "mv" || type == "integrated") {
            aList = $(".list.listView.mvList li .info a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "lyric") {
            aList = $(".list.trackList.lyrics tbody tr a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "musicpd" || type == "integrated") {
            aList = $(".list.listView.musicPDAlbumList .info a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "special" || type == "integrated") {
            aList = $(".list.listView.specialList .info a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "integrated") {
            aList = $("#searchClassicOpusArea").find("p a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }

        if (type == "suggest") {
            aList = $("#suggest li a");
            anchorLength = aList.length;
            bugs.search.highLightMark(aList, anchorLength);
        }


    },
    //�섏씠�쇱씠�� 留덊겕�� �명똿
    highLightMark: function(aList, anchorLength) {
        var query = $("#headerSearchInput").val();
        var regQuery = query.replace(/\\/gi, "\\\\");
        regQuery = regQuery.replace(/(\(|\)|\[|\]|\\|\;|\?|\+|\*|\\)/g, function(strMatch, p1) {
            if (p1 == "(") {
                return "\\(";
            } else if (p1 == ")") {
                return "\\)";
            } else if (p1 == "[") {
                return "\\[";
            } else if (p1 == "]") {
                return "\\]";
            } else if (p1 == "\\") {
                return "\\";
            } else if (p1 == ";") {
                return "\\;";
            } else if (p1 == "?") {
                return "\\?";
            } else if (p1 == "+") {
                return "\\+";
            } else if (p1 == "*") {
                return "\\*";
            }

            return "";
        });

        var reg = new RegExp(regQuery, "gi");
        for (var i = 0; i < anchorLength; i++) {
            if (aList.eq(i).hasClass("thumbnail") == false && aList.eq(i).hasClass("btn") == false) {
                bugs.search.setMarkupTextNode(aList.eq(i)[0], query, reg);
            }
        }
    },

    setMarkupTextNode: function(node, query, reg) {
        var $node = $(node)
        var tempElement = "";
        if ($node.children().length > 0) {
            tempElement = $node.children();
            $node.children().remove();
        }
        if (reg.test($node.text())) {
            $node.html($node.text().replace(reg, "<mark>$&</mark>")).prepend(tempElement);
        } else {
            $node.prepend(tempElement);
        }
    },

    //濡ㅻ쭅
    rolling: function() {
        $(".keyword.single").hide();
        $(".keyword.single").eq(0).show();
        bugs.search.rollingStart();
    },
    rollingStart: function() {
        num = 0;
        if (window.topKeywordIntervalId) {
            clearInterval(window.topKeywordIntervalId);
        }
        window.topKeywordIntervalId = setInterval(function() {
            $(".keyword.single").eq(num - 1).hide();
            $(".keyword.single").eq(num).animate({ top: "-=28px" }, "slow", function() {
                num++;
                $(".keyword.single").css("top", "0px");
                if (num == 10) {
                    num = 0;
                }
            }).show();
        }, 2000);
    },
    //�묒옘由� 由ъ뒪�� �명똿
    dataSet: function(list) {
        var paramList = list;
        var ch = "<h1>�멸린</h1>";

        for (var i = 0; i < list.length; i++) {
            ch += "<a href='#' class='keyword single'>";
            ch += "<em class='ranking'>" + paramList[i][0] + "</em>";
            ch += "<strong class='title'>" + paramList[i][1] + "</strong>";

            if (paramList[i][2] == 0) {
                ch += "<p class='change none'>";
            } else if (paramList[i][2] < 0) {
                ch += "<p class='change down'>";
            } else if (paramList[i][2] > 0) {
                ch += "<p class='change up'>";
            } else if (paramList[i][2] == 'NEW') {
                ch += "<p class='change'>";
            }

            if (paramList[i][2] == 0) {
                ch += "<span class='arrow'></span>";
                ch += "<em>" + paramList[i][2] + "</em> <span>蹂��숈뾾��</span>";
            } else if (paramList[i][2] < 0) {
                ch += "<span class='arrow'></span>";
                paramList[i][2] = paramList[i][2].replace("-", "");
                ch += "<em>" + paramList[i][2] + "</em> <span>怨꾨떒 �섎씫</span>";
            } else if (paramList[i][2] > 0) {
                ch += "<span class='arrow'></span>";
                ch += "<em>" + paramList[i][2] + "</em> <span>怨꾨떒 �곸듅</span>";
            } else if (paramList[i][2] == 'NEW') {
                ch += "<em>NEW</em>";
            }
            ch += "</p>";
            ch += "</a>";
        }
        $(".popularKeywords").append(ch);

        bugs.search.rolling();
    },
    //noResult �섏씠吏��먯꽌 �몄텧
    topQueryAjax: function() {
        $.ajax({
            url: g_urlAjax + "/top",
            data: {},
            type: "GET",
            dataType: "json",
            timeout: 2000,
            success: function(result) {
                if (result == null || typeof result == "undefined") {
                    return;
                }
                var list = [];
                $.each(result, function(i) {
                    var object = [];
                    object.push(result[i].ranking);
                    object.push(result[i].query);
                    object.push(result[i].delta_ranking);
                    list.push(object);
                });
                bugs.search.dataSet(list);
            },
            error: function() {
                return false;
            }
        });
    }
};


bugs.searchBoxAd = {
    inputBox: null,
    closeButton: null,
    inputBoxButton: null,
    directionUrl: null,
    searchDirectionUrl: null,
    enable: true,
    url: g_urlAjax + "/searchboxad",
    searchDirectionUrl: null,
    searchInput: $("#headerSearchInput"),
    init: function() {
        var self = this;
        this.inputBox = $("#headerSearchInput");
        this.closeButton = $("#keywordClearButton");
        this.inputBoxButton = $("#headerSearchFormButton");
        this.directionUrl = null;
        $.ajax({
            url: bugs.searchBoxAd.url,
            type: "GET",
            dataType: "json",
            success: function(data) {
                self.inputBox.val(data.searchAd.exposure_text);
                self.directionUrl = data.searchAd.link;
                self.searchAdId = data.searchAd.special_search_keyword_id;
                self.searchDirectionUrl = data.searchAd.link;
                if (bugs.valid.empty(data.searchAd.exposure_text)) {
                    self.closeButton.hide();
                }
            },

            error: function(error) {
                self.closeButton.hide();
                return false;
            }
        });
        this.closeButton.click(function() {
            self.closeButtonHandler();
        });

        this.inputBoxButton.click(function() {
            self.clickButton();
        }.bind);

        this.inputBox.click(function(event) {
            $("#suggest").hide();
            self.clickInputBox(event);
        });
    },

    checkInput: function() {
        $("#headerSearchInput").one("focus click", function(event) {
            bugs.searchBoxAd.closeButtonHandler();
        });
    },

    clickButton: function(event) {
        if (this.directionUrl != "") {
            document.location.href = this.directionUrl;
        }
    },
    clickInputBox: function(event) {
        if (event.target.value == "") {
            bugs.searchBoxAd.closeButtonHandler();
        }
    },
    closeButtonHandler: function(event) {
        bugs.searchBoxAd.directionUrl = "";
        bugs.searchBoxAd.searchDirectionUrl = "";
        $("#keywordClearButton").hide();
        $("#headerSearchInput").val('');

        if ($("#suggest").length > 1) {
            $("#suggest").hide();
        }

    },
    deleteText: function() {
        $("#keywordClearButton").click(function() {
            $(this).hide();
            $("#headerSearchInput").val("");
            $("#headerSearchInput").focus();
            this.directionUrl = "";
            this.searchDirectionUrl = "";
        });
    },
    inputBlur: function() {
        $("#headerSearchInput").blur();
    },

    updateSeachAdViewCnt: function(searchAdId) {
        try {
            $.get(g_urlMusic + "/search/searchboxad/viewcnt/" + searchAdId + "/update");
        } catch (e) {}
    }
};

bugs.browser = {

    getInternetExplorerVersion: function() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        } else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent;

            if (ua.search('Trident') != -1) { // �명솚�� 蹂닿린 ��, IE 泥댄겕
                rv = 11;
            } else {
                var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(ua) != null)
                    rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    },

    getWindowsOSVersion: function() {
        var version = 0;

        try {
            if (bugs.browser.isIE())
                version = parseFloat(navigator.userAgent.split("Windows NT ")[1].split(";")[0]);
            else
                version = -1;
        } catch (e) {
            version = -1;
        }

        return version;
    },
    /*		
    		isIE : function() {
    			  var myNav = navigator.userAgent.toLowerCase();
    			  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    		},
    */
    isIE: function() {
        if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
            return true;

        return false;
    }
};

bugs.common_util = {
    checkArtistId: function(artist_id) {
        if (artist_id != null || artist_id.trim() != "") {
            /*
            				Unknown id = 8008124
            				Various Artist id = 533
            				O.S.T artist id = 1000772
            				Classic artist_id = 40652
            				V.A. artist_id = 80019965
            				Cover Version = 80088133
            */
            if (artist_id == 8008124 || artist_id == 533 || artist_id == 1000772 || artist_id == 40652 || artist_id == 80019965 || artist_id == 80088133) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    },
    setLinkUrlWiseLog: function(url, wiseLogCode) {
        if (url != null && url != "") {
            if (url.indexOf("?") == -1) {
                return url + "?wl_ref=" + wiseLogCode;
            } else {
                return url + "&wl_ref=" + wiseLogCode;
            }
        }

        return "";
    }
};


var buyCash = function() {
    window.open(g_urlBilling + '/pay/pg/popProcess', 'cash', 'top=10, left=10, width=750, height=564, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
};


if ("undefined" == typeof bugs.fb) {
    bugs.fb = {
        appid: "122936701116206",
        scope: ['email', 'read_stream'],
        loginPage: g_urlMusic + "/facebook/paramgate2?gourl=" + location.href,
        twtUrl: "http://twtevent.co.kr",
        getMyByAccessToken: function(access_token) {
            var path = 'https://graph.facebook.com/me?access_token=' +
                access_token;

            var queryParams = ['access_token=' + access_token,
                'redirect_uri=' + window.location
            ];
            var query = queryParams.join('&');
            var url = path + query;
            location.href = url;
        },
        getHost: function() {
            if (location.href.indexOf(g_urlMusic) != -1)
                return g_urlMusic;
            else if (location.href.indexOf(g_urlSearch) != -1)
                return g_urlSearch;
            else if (location.href.indexOf(g_urlSecure) != -1)
                return g_urlSecure;
            else if (location.href.indexOf(bugs.fb.twtUrl) != -1)
                return bugs.fb.twtUrl;
            else
            // if (location.href.indexOf(g_urlWww ) != -1)
            if (g_urlWww == "undefined" || g_urlMusic == "undefined")
                return "https://music.bugs.co.kr";
            else return g_urlMusic;
        },
        goFBConnect: function(access_token, data_agree) {
            var params = {
                "agree": data_agree,
                "access_token": access_token
            };
            $.post(this.getHost() + "/facebook/ajax/login", params, function(
                data) {
                if (data) {
                    // alert(data.result);
                    if (data.result == "OK" || data.result == "OK_NEW") {
                        if (typeof(g_msrl) == "undefined")
                        ; {
                            location.reload();
                        }
                    } else if (data.result == "NOT_AGREE") {
                        // �숈쓽 �섏씠吏�濡� �대룞
                        location.href = g_urlSecure + "/fb/agree?access_token=" +
                            access_token;
                    }
                } else {
                    // 湲고� �ㅻ쪟 諛쒖깮
                }
            }, "json");
        },
        loginFBAfterCheck: function(uid) {
            var params = {
                "uid": uid
            };
            $.post(g_urlAjax + "/facebook/checkconnect", params, function(data) {
                if (data) {
                    //alert(data.result);
                    if (data.result == "CONNECTED") {

                        //alert("data.access_token:"+data.access_token);
                        // go login
                        location.href = g_urlSecure + "/facebook/auth?access_token=" + data.access_token + "&song=" + encodeURIComponent(location.href);
                    } else {
                        //alert("�ㅻ쪟 諛쒖깮2");
                    }
                } else {
                    // 湲고� �ㅻ쪟 諛쒖깮
                    //alert("�ㅻ쪟  諛쒖깮1");
                }
            }, "json");
        },
        doAuth: function() {

            FB.login(function() {
                if (typeof(fbResponse) != "undefined" &&
                    fbResponse.authResponse) {
                    var accessToken = fbResponse.authResponse.accessToken;
                    var uid = 0;
                    FB.api('/me', function(response) {
                        uid = response.id;
                        alert("�쒕룞 �먮룞 怨듭쑀 �ㅼ젙�� �꾨즺 �섏뿀�듬땲��.", function() {
                            window.location.href = location.href;
                        });
                    });

                } else {
                    alert("�쒕룞 �먮룞 怨듭쑀 �ㅼ젙�� �꾨즺 �섏뿀�듬땲��.", function() {
                        window.location.href = location.href;
                    });
                }
            }, {
                scope: 'email'
            });

        },
        delPermission: function(permission, fb_token) {

            FB.api("/me/permissions/" + permission + "?access_token=" + fb_token, 'DELETE', function(response) {
                alert("�쒕룞 �먮룞 怨듭쑀 �ㅼ젙�� �댁젣 �섏뿀�듬땲��.", function() {
                    window.location.href = location.href;
                });
            });
        },

        openLogin: function() {
            window.open(g_urlSecure + "/facebook/login?display=popup&longLoginYn=Y&returl=" +
                location.href, "FBLOGIN",
                'scrollbars=yes,resizable=yes,width=500,height=300');
            /*
            window.open(this.getHost() + "/facebook/login?returl="
            		+ location.href, "FBLOGIN",:q!
            		"width=1000,height=570,resizable=yes;scrollbars=yes");
            */
        },
        openLogin2: function(longLoginYn, rUrl) {
            var returnUri = (rUrl == undefined || rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(rUrl));
            window.open(g_urlSecure + "/facebook/login?longLoginYn=" + longLoginYn + "&login_type=onpopup&rUrl=" +
                returnUri, "FBLOGIN",
                'scrollbars=yes,resizable=yes,width=500,height=300');
            /*
            window.open(this.getHost() + "/facebook/login?returl="
            		+ location.href, "FBLOGIN",:q!
            		"width=1000,height=570,resizable=yes;scrollbars=yes");
            */
        },
        openLoginEvent: function() {

            var locationUrl = location.href.substring(0, location.href.indexOf("?") == -1 ? location.href.length : location.href.indexOf("?"));
            window.open(g_urlSecure + "/facebook/login?display=popup&returl=" +
                locationUrl, "FBLOGIN",
                'scrollbars=yes,resizable=yes,width=500,height=300');
            /*
            window.open(this.getHost() + "/facebook/login?returl="
            		+ location.href, "FBLOGIN",
            		"width=1000,height=570,resizable=yes;scrollbars=yes");
            */
        },

        openLoginSelf: function(param1) {

            if (typeof param1 != "undefined") {
                location.href = g_urlSecure + "/facebook/login?login_type=mobileWeb_" + param1;
            } else {
                location.href = g_urlSecure + "/facebook/login?login_type=mobileWeb_";
            }

        },

        openLoginSelf: function(param1, param2) {

            var fbLoginUrl = g_urlSecure + "/facebook/login";
            if (typeof param1 != "undefined") {
                if (param1 == "ALSONG") {
                    fbLoginUrl = fbLoginUrl + "?login_type=mobileWebAlsong_&rUrl=";
                } else {
                    fbLoginUrl = fbLoginUrl + "?login_type=mobileWeb_" + param1;
                }
            } else {
                fbLoginUrl = fbLoginUrl + "?login_type=mobileWeb_";
            }

            if (typeof param2 != "undefined") {
                fbLoginUrl = fbLoginUrl + "&rUrl=" + param2;
            }

            location.href = fbLoginUrl;

        },

        openForConnect: function() {
            window.open(this.getHost() + "/facebook/connect?returl=" +
                location.href, "FBLOGIN",
                "width=500,height=300,resizable=0");

        },

        openForInApp: function() {
            window.open(g_urlSecure + "/facebook/login?login_type=inApp&display=popup&longLoginYn=NY&returl=" +
                location.href, "FBLOGIN",
                'scrollbars=yes,resizable=yes,width=500,height=300');
        }
    };
}


Date.prototype.format = function(format) {
    var returnStr = '';
    var replace = Date.replaceChars;
    for (var i = 0; i < format.length; i++) {
        var curChar = format.charAt(i);
        if (i - 1 >= 0 && format.charAt(i - 1) == "\\") {
            returnStr += curChar;
        } else if (replace[curChar]) {
            returnStr += replace[curChar].call(this);
        } else if (curChar != "\\") {
            returnStr += curChar;
        }
    }
    return returnStr;
};
Date.replaceChars = {
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    d: function() {
        return (this.getDate() < 10 ? '0' : '') + this.getDate();
    },
    D: function() {
        return Date.replaceChars.shortDays[this.getDay()];
    },
    j: function() {
        return this.getDate();
    },
    l: function() {
        return Date.replaceChars.longDays[this.getDay()];
    },
    N: function() {
        return this.getDay() + 1;
    },
    S: function() {
        return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th')));
    },
    w: function() {
        return this.getDay();
    },
    z: function() {
        var d = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((this - d) / 86400000);
    },
    W: function() {
        var d = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - d) / 86400000) + d.getDay() + 1) / 7);
    },
    F: function() {
        return Date.replaceChars.longMonths[this.getMonth()];
    },
    m: function() {
        return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
    },
    M: function() {
        return Date.replaceChars.shortMonths[this.getMonth()];
    },
    n: function() {
        return this.getMonth() + 1;
    },
    t: function() {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 0).getDate();
    },
    L: function() {
        var year = this.getFullYear();
        return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0));
    },
    o: function() {
        var d = new Date(this.valueOf());
        d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
        return d.getFullYear();
    },
    Y: function() {
        return this.getFullYear();
    },
    y: function() {
        return ('' + this.getFullYear()).substr(2);
    },
    a: function() {
        return this.getHours() < 12 ? 'am' : 'pm';
    },
    A: function() {
        return this.getHours() < 12 ? 'AM' : 'PM';
    },
    B: function() {
        return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);
    },
    g: function() {
        return this.getHours() % 12 || 12;
    },
    G: function() {
        return this.getHours();
    },
    h: function() {
        return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
    },
    H: function() {
        return (this.getHours() < 10 ? '0' : '') + this.getHours();
    },
    i: function() {
        return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
    },
    s: function() {
        return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
    },
    u: function() {
        var m = this.getMilliseconds();
        return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m;
    },
    e: function() {
        return "Not Yet Supported";
    },
    I: function() {
        return "Not Yet Supported";
    },
    O: function() {
        return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';
    },
    P: function() {
        return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';
    },
    T: function() {
        var m = this.getMonth();
        this.setMonth(0);
        var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');
        this.setMonth(m);
        return result;
    },
    Z: function() {
        return -this.getTimezoneOffset() * 60;
    },
    c: function() {
        return this.format("Y-m-d\\TH:i:sP");
    },
    r: function() {
        return this.toString();
    },
    U: function() {
        return this.getTime() / 1000;
    }
};


if (!String.linkify) {
    String.prototype.linkify = function(target) {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

        var propTarget = "";
        if (target) {
            propTarget = "target=" + target;
        }

        return this
            .replace(urlPattern, '<a href="$&" ' + propTarget + '>$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>');
    };
}