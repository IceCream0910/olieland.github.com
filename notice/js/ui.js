if (typeof(bugs.ui) == "undefined") bugs.ui = {};

bugs.ui.DEFAULT_POPUP_OPTION = {
    caller: null,
    title: null,
    css: "",
    modal: true,
    layout: "",
    position: "",
    alertButtons: true,
    closeButtons: true,
    cancelButtons: false,
    msgDesc: "",
    onInit: function(popup) {},
    onOk: function(popup) { return true; },
    onCancel: function(popup) { return true; },
    onClose: function(popup) { return true; },
    onHide: function() {}
};

bugs.ui.modalLayerM = {
    show: function() {
        $('#m_contentModalLayer').show();
    },
    hide: function() {
        $('#m_contentModalLayer').hide();
    }
};

bugs.ui.modalLayer = {
    layer: null,
    show: function() {

        if (!this.layer) {
            this.layer = jQuery("<div></div>").attr("id", "_modalLayer").css({
                "z-index": "990",
                "filter": "alpha(opacity=30)",
                "opacity": "0.2",
                "-moz-opacity": "0.2",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "background-color": "black"
            }).appendTo("body");
        }

        var width = jQuery(document).width();
        var height = jQuery(document).height();
        if (jQuery.browser.msie) {
            var bodyHeight = jQuery("body").height();
            var windowHeight = jQuery(window).height();
            /* Block layer 踰꾧렇濡� 二쇱꽍泥섎━(�곹솕,�곌씀誘멸린��)
            try {
            	var wrapHeight = jQuery("#wrap").height();

            	height = (windowHeight > bodyHeight ? windowHeight : bodyHeight) > wrapHeight ? (windowHeight > bodyHeight ? windowHeight : bodyHeight) : wrapHeight;
            } catch (e) {
            	height = windowHeight > bodyHeight ? windowHeight : bodyHeight;
            }
            */
        }

        this.layer.css({ width: "100%", height: height }).show();
    },
    show_dark: function() {

        if (!this.layer) {
            this.layer = jQuery("<div></div>").attr("id", "_modalLayer").css({
                "z-index": "900",
                "filter": "alpha(opacity=60)",
                "opacity": "0.6",
                "-moz-opacity": "0.6",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "background-color": "black"
            }).appendTo("body");
        }

        var width = jQuery(document).width();
        var height = jQuery(document).height();
        if (jQuery.browser.msie) {
            var bodyHeight = jQuery("body").height();
            var windowHeight = jQuery(window).height();
        }

        this.layer.css({ width: "100%", height: height }).show();
    },

    show_dark2: function() {

        if (!this.layer) {
            this.layer = jQuery("<div></div>").attr("id", "_modalLayer").css({
                "z-index": "900",
                "filter": "alpha(opacity=75)",
                "opacity": "0.75",
                "-moz-opacity": "0.75",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "background-color": "black"
            }).appendTo("body");
        }

        var width = jQuery(document).width();
        var height = jQuery(document).height();
        if (jQuery.browser.msie) {
            var bodyHeight = jQuery("body").height();
            var windowHeight = jQuery(window).height();
        }

        this.layer.css({ width: "100%", height: height }).show();
    },

    hide: function() {
        if (this.layer) this.layer.hide();

        if (typeof this.callLater == "function") {
            this.callLater();
            this.callLater = null;
        }
    },

    callLater: null
};

bugs.ui.TITLE_LOGO = "LOGO";

bugs.ui.popup = bugs.create();
bugs.ui.popup.prototype = {
    type: "popup",

    initialize: function(msg, option) {
        this.msg = msg;
        this.option = bugs.overed(bugs.clone(bugs.ui.DEFAULT_POPUP_OPTION), option || {});

        if (this.option.title == "LOGO") this.option.title = "";

        this.makeLayer();
    },

    makeLayer: function() {

        if (typeof(this.msg) == "string") {
            if (this.option.title == "layerLogin" && this.option.position == "header") {
                this.layer = jQuery(this.getHtml2()).insertAfter("#loginHeader a:eq(0)");
            } else if (this.option.title == "layerLogin" || this.option.title == "adult") {
                this.layer = jQuery(this.getHtml2()).appendTo("body");
            } else {
                this.layer = jQuery(this.getHtml()).appendTo("body");
            }
        } else {
            // �대� �덈뒗 dom object濡� �덉씠�� �앹꽦
            if (this.option.title == "layerLoginInfo" || this.option.position == "header") {
                this.layer = jQuery(this.msg).insertAfter("#loginHeader a:eq(0)");
            } else if (this.option.title == "layerLoginInfoMLM") {
                this.layer = jQuery(this.msg).insertAfter("#loginHeader p.userID");
            } else {
                this.layer = jQuery(this.msg).appendTo("body");
            }

            if (this.layer.find("h1").length) {
                this.option.title = this.layer.find("h1").html();
            }

            var css = [];
            this.layer.eachClass(function(index, item) {
                if (item == "layer" || item == "alertMessage" || item == "title" || item == "noTitle") return;

                css.push(item);
            }.bind(this));

            if (css.length == 1) this.option.css = css[0];
            else this.option.css = css;
        }
        if (this.option.title != "layerLogin") {
            this.layer.find("button[btnType=close]").click(function() {
                this.hide();
                return false;
            }.bind(this));
            this.makeButtons();

        } else {
            jQuery("#layerLoginClose").click(function() {
                try {
                    bugs.layerFocusNavi.remove(this.layer);
                } catch (e) {};
                this.hide();
                return false;
            }.bind(this));
        }

        this.onInit();
    },

    makeButtons: function() {
        this.layer.find("button[btnType=ok]").unbind("click").click(function() {
            try { bugs.layerFocusNavi.remove(this.layer); } catch (e) {};

            if (this.option.onOk(this)) this.hide();
        }.bind(this));

        this.layer.find("button[btnType=cancel]").unbind("click").click(function() {
            try { bugs.layerFocusNavi.remove(this.layer); } catch (e) {};

            if (this.option.onCancel(this)) this.hide();
        }.bind(this));

        this.layer.find("button[btnType=close]").unbind("click").click(function() {
            try { bugs.layerFocusNavi.remove(this.layer); } catch (e) {};

            if (this.option.onClose(this)) this.hide();
        }.bind(this));

        if (this.option.okBtnTitle) {
            this.layer.find("button[btnType=ok]").text(this.option.okBtnTitle);
        }
    },

    setTitle: function(title) {
        this.layer.find("h1:first").html(title);
    },

    getHtml: function() {

        var html = "<aside class=\"layer alertMessage " + (!this.option.title ? "noTitle " : "title") + this.option.css + "\" style=\"display:none;\">" +
            "<div class=\"box-shadow\"></div>";

        if (this.option.title) {
            html += "<header class=\"layer-title\">" +
                "<h1>" + this.option.title + "</h1>" +
                "</header>";
        }

        html += "<section class=\"layerContents\">" +
            "<div class=\"message " + (!this.option.msgDesc ? "msg1 " : "msg2") + "\">" +
            "<p>" + this.msg + "</p>";
        if (this.option.msgDesc)
            msg += "<p class=\"desc\">" + this.msgDesc + "</p>";

        html += "</div>";

        html += "<p class=\"btns\">";

        if (this.option.alertButtons)
            html += "<button class=\"btnNormal\" btnType=\"ok\">�뺤씤</button>";

        if (this.option.cancelButtons)
            html += "<button class=\"btnNormal\" btnType=\"cancel\">痍⑥냼</button>";

        html += "</p>";

        html += "</section>";

        if (this.option.closeButtons)
            html += "<button class=\"btnClose\" btnType=\"close\">�リ린</button>";
        html += "</aside>";

        return html;
    },
    getHtml2: function() {
        return this.msg;
    },
    innerHtml: function(html) {
        if (typeof html != "undefined") {
            if (typeof(this.msg) == "string") {
                jQuery("section.layerContents", this.layer).children().not("button[btnType=cancel]").remove();
                jQuery("section.layerContents", this.layer).children().not("button[btnType=ok]").remove();
                jQuery("section.layerContents", this.layer).prepend(html);
                //jQuery("div.content", this.layer).html(html);
            } else {
                this.layer.html(jQuery(this.msg).html());
            }
        }
    },
    onInit: function() {
        this.option.onInit(this);
    },

    show: function(msg, option) {

        if (msg) {
            if (this.type == "alert")
                this.layer.find("section.layerContents > div > p").html(msg);
            else if (this.type == "alertMobile")
                this.layer.find("div.layerAlertWrap > p").html(msg);
            else {
                this.innerHtml(msg);
                this.makeButtons();
            }
        }

        if (!bugs.valid.isNull(option)) {
            option.onInit(this);
        }

        this.option = bugs.overed(this.option, option || {});
        var css = this.option.css;

        this.layer.eachClass(function(index, item) {
            if (item == "layer" || item == "alertMessage" || item == "title" || item == "noTitle") return;

            jQuery(this).removeClass(item);
        }.bind(this.layer));

        if (typeof(this.option.css) == "object") {
            for (var i in this.option.css)
                this.layer.addClass(this.option.css[i]);
        } else this.layer.addClass(css);

        //----- modal dialog 泥섎━ -----------------------------------------------
        if (this.option.modal) {
            if (this.option.title == "layerLogin")
                bugs.ui.modalLayer.show_dark();
            else
                bugs.ui.modalLayer.show();
        }
        //---------------------------------------------------------------------
        //湲곗〈怨� �ㅻⅤ寃� �묒쁿�� �⑤뵫 14 媛믪씠 �ㅼ뼱媛��� outerWidth濡� 蹂�寃�
        var left = jQuery(window).scrollLeft() + ((jQuery(window).width() - this.layer.outerWidth()) >> 1);
        var top = jQuery(window).scrollTop() + ((jQuery(window).height() - this.layer.height()) >> 1);

        if (this.option.title == "adult") top = top + 20;

        if (this.option.width) {
            this.layer.css({ width: this.option.width });
        }

        if (this.option.title == "layerLogin" && this.option.position == "header") {
            this.layer.css({ right: 20, top: 35 }).show();
            this.layer.show();
            this.layer.attr("tabIndex", -1).focus();
        } else if (this.option.position == "fix") {
            this.layer.show();

        } else {
            this.layer.css({ left: left, top: top }).show();
            this.layer.attr("tabIndex", -1).focus();
        }

        //if(!(this.option.title =="layerLogin" && this.option.position=="header")){
        var caller = null;
        try {
            caller = this.option.caller || window.event.target;
        } catch (e) {};

        bugs.layerFocusNavi.add(this.layer, caller, this.hide.bind(this));
        //}

        if (
            (this.layer.find(".btnNormal").length < 1 && this.layer.find(".btnClose").length < 1) ||
            (this.option.title == "layerLogin" && this.option.position == "header") ||
            (this.option.title == "layerLoginInfo")
        ) {
            $(document).bind("click", { obj: this.layer }, bugs.ui.popupClick);
        }


        try {
            this.stopEvent();
        } catch (e) {
            //nothing
        }

        return this;
    },

    hide: function() {
        if (this.option.modal) bugs.ui.modalLayer.hide();
        if (this.option.onHide) this.option.onHide();
        try {
            bugs.layerFocusNavi.remove(this.layer);
        } catch (e) {};
        this.layer.hide(
            //jQuery.proxy(function() { this.remove(); }, this)
        );

    },
    stopEvent: function(e) {

        if (!e) var e = window.event;

        //e.cancelBubble is supported by IE -
        // this will kill the bubbling process.
        e.cancelBubble = true;
        e.returnValue = false;

        //e.stopPropagation works only in Firefox.
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();

        return false;

    },

    addModalMsg: function(id, msg) {
        var html = "" +
            "<div class=\"layerModal\" style=\"top:0px;display:none;\">" +
            "	<div class=\"content\">" +
            "		<p>" + msg + "</p>" +
            "		<div class=\"btnArea\"><span class=\"button typeME\"><a href=\"#\">�뺤씤</a></span></div>" +
            "	</div>" +
            "	<div class=\"layerBg bgTR\"></div>" +
            "	<div class=\"layerBg bgTL\"></div>" +
            "</div>";

        this.modalMsgList[id] = jQuery(html).appendTo(this.layer);
    },

    showModalMsg: function(msg, option) {
        this.option = bugs.overed(this.option, option || {});
        if (!this.modalMsgLayer) {
            var html = "" +
                +"<aside class=\"layer alertMessage noTitle\" style=\"display:block;top:200px;left:800px;\">" +
                "<div class=\"box-shadow\"></div>" +
                "<section class=\"layerContents\">" +
                "	<div class=\"message msg1\">" +
                "		<p></p>" +
                "	</div>" +
                "	<p class=\"btns\">" +
                "		<button class=\"btnNormal\" btnType=\"ok\">�뺤씤</button>" +
                "	</p>" +
                "</section>" +
                "<button class=\"btnClose\" btnType=\"cancel\">�リ린</button>" +
                "</aside>";

            this.modalMsgLayer = jQuery(html).appendTo(this.layer).find("button[btnType=ok]").click(function() {
                this.modalMsgLayer.hide();
                this.option.onOk();
                return false;
            }.bind(this)).end();
        }
        this.modalMsgLayer.find("div.message p").html(msg);
        var left = (this.modalMsgLayer.parent().width() - this.modalMsgLayer.width()) >> 1;
        var top = (this.modalMsgLayer.parent().height() - this.modalMsgLayer.height()) >> 1;
        this.modalMsgLayer.css({ top: top, left: left }).show();

    },

    getLayer: function() {
        return this.layer;
    },

    reposition: function() {
        var left = jQuery(window).scrollLeft() + ((jQuery(window).width() - this.layer.width()) >> 1);
        var top = jQuery(window).scrollTop() + ((jQuery(window).height() - this.layer.height()) >> 1);

        this.layer.css({ left: left, top: top });
    },
    remove: function() {
        if (this.layer) {
            try {
                bugs.layerFocusNavi.remove(this.layer);
            } catch (e) {};
            this.layer.remove();
        }
        this.layer == null;
    }
};

bugs.ui.loadingLayer = bugs.create();
bugs.ui.loadingLayer.prototype = {
    layerPopupHtml: '<aside class="layer layerLoading" style="display:block;top:50px;left:10px;">' +
        '<div class="box-shadow"></div>' +
        '<section class="layerContents">' +
        '<div class="loadingDiv"><div class="loadingImg"></div><%=obj.title%></div>' +
        '</section>' +
        '</aside>',
    appendHtml: '<div class="contentsLoading">' +
        '<div class="loadingImg"></div>' +
        '<%=obj.title%></div>',
    initialize: function(title, obj, isPrepend) { //parameter : title, obj(��[append]/臾�[popup]), isPrepend(true/false[append])
        this.title = title || "濡쒕뵫 以�...";
        this.obj = obj || null;
        this.isPrepend = isPrepend || false;

        var tmp = null;
        if (this.obj == null) { //layer popup �뺥깭 �쇰븣
            tmp = new bugs.template(this.layerPopupHtml, { title: this.title });
            this.layer = jQuery(tmp.html()).appendTo("body");
        } else { // obj append �뺥깭 �쇰븣
            tmp = new bugs.template(this.appendHtml, { title: this.title });
            if (isPrepend) {
                this.layer = jQuery(tmp.html()).prependTo(this.obj);
            } else {
                this.layer = jQuery(tmp.html()).appendTo(this.obj);
            }
        }

        this.layer.hide();

        // if(!bugs.mobile.isMobile()){
        //     this.layer.find('div.loadingImg').animateSprite({
        //         fps: 12,
        //         animations: {
        //             right: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        //         },
        //         loop: true,
        //         autoplay: true
        //     });
        // }

    },
    show: function(css) {

        if (typeof css == "undefined") { //default
            if (this.obj == null) { //layer popup �뺥깭 �쇰븣
                css = { position: "absolute", left: "50%", top: 316, "margin-left": -146 };
            } else { // obj append �뺥깭 �쇰븣
                css = {};
            }
        }
        this.layer.css(css);
        //		this.layer.find('div.loadingImg').animateSprite('play');
        this.layer.show();
    },
    hide: function() {
        //		this.layer.find('div.loadingImg').animateSprite('stop');
        this.layer.hide();
    },
    remove: function() {
        //		this.layer.find('div.loadingImg').animateSprite('stop');
        // 		this.layer.find('div.loadingImg').remove();
        if (this.layer) this.layer.remove();
        //		this.layer.remove();
    }
};

bugs.ui.alert = bugs.create();
bugs.ui.alert.prototype = {
    getHtml: function() {
        var _layerClass = "layer alertMessage";
        if (typeof this.option.layerClass != "undefined") _layerClass = this.option.layerClass;

        var html = "<aside class=\"" + _layerClass + " " + this.option.css + " noTitle\" style=\"display:none;\">" +
            "<div class=\"box-shadow\"></div>" +
            "<section class=\"layerContents\">" +
            "<div class=\"message msg1\">" +
            "<p></p>" +
            "</div>";
        if (this.option.alertButtons) {
            html += "<p class=\"btns\">" +
                "<button class=\"btnNormal\" btnType=\"ok\">�뺤씤</button>" +
                "</p>";
        }
        html += "</section>";

        if (this.option.alertButtons)
            html += "<button class=\"btnClose\" >�リ린</button>";

        html += "</aside>";
        return html;
    },

    onInit: function() {
        this.type = "alert";

        this.layer.find("div.message > p").html(this.msg);

        this.layer.find("p.btns > button.btnNormal").click(function() {
            this.hide();
            if (typeof(this.option.onOk) == "function") this.option.onOk(this);
            return false;
        }.bind(this));

        this.layer.find("button.btnClose").click(function() {
            this.hide();
            if (typeof(this.option.onCancel) == "function") this.option.onCancel(this);
            return false;
        }.bind(this));

        this.layer.find("button.layerClose").click(function() {
            this.hide();
            if (typeof(this.option.onCancel) == "function") this.option.onCancel(this);
            return false;
        }.bind(this));

        if (typeof this.option.onInit == "function") {
            this.option.onInit(this);
        }
    }
};
bugs.extend(bugs.ui.alert, bugs.ui.popup);

bugs.ui.alert.mobile = bugs.create();
bugs.ui.alert.mobile.prototype = {
    getHtml: function() {
        var _layerClass = "layerAlert";
        if (typeof this.option.layerClass != "undefined") _layerClass = this.option.layerClass;

        if ("tiles" == this.option.layout) {
            var html = "<div class=\"" + _layerClass + " " + this.option.css + "\" style=\"display:none;\">" +
                "	<div class=\"layerAlertWrap\">" +
                "		<p></p>";

            if (this.option.alertButtons) {
                html += "		<div class=\"btnArea\"></div>";
            }

            if (this.option.closeButtons) {
                html += "		<div class=\"closeArea\"><p class=\"close\">�リ린</p></div>";
            }

            html += "	</div>" +
                "</div>";
        } else {
            var html = "<div class=\"" + _layerClass + " " + this.option.css + "\" style=\"display:none;\">" +
                "	<div class=\"layerAlertWrap\">" +
                "		<p></p>";

            if (this.option.alertButtons) {
                html += "		<div class=\"btnArea\">" +
                    "			<a href=\"javascript:void(0);\" class=\"button btnTypeM\">�뺤씤</a>" +
                    "		</div>";
            }

            html += "	</div>" +
                "</div>";
        }


        return html;
    },

    onInit: function() {
        this.type = "alertMobile";

        this.layer.find("div.layerAlertWrap > p").html(this.msg);

        if (!bugs.valid.isNull(this.option.buttons)) {
            this.layer.find("div.layerAlertWrap > div.btnArea").empty().html(this.option.buttons);
        }

        if ("tiles" == this.option.layout) {
            this.layer.find("div.layerAlertWrap p.close").click(function() {
                this.hide();
                if (typeof(this.option.onCancel) == "function") this.option.onCancel(this);
                return false;
            }.bind(this));
        } else {
            this.layer.find("div.btnArea a.button").click(function() {
                this.hide();
                if (typeof(this.option.onOk) == "function") this.option.onOk(this);
                return false;
            }.bind(this));
        }

        if (typeof this.option.onInit == "function") {
            this.option.onInit(this);
        }
    }
};
bugs.extend(bugs.ui.alert.mobile, bugs.ui.popup);

bugs.ui.showPopup = function(msg, option) {
    if (!bugs.ui._popup) bugs.ui._popup = new bugs.ui.popup(msg, option).show();
    else bugs.ui._popup.show(msg, bugs.overed(bugs.clone(bugs.ui.DEFAULT_POPUP_OPTION), option || {}));
};

bugs.ui.showAlert = function(msg, option) {
    if (!bugs.ui._alert) bugs.ui._alert = new bugs.ui.alert(msg, option).show();
    else bugs.ui._alert.show(msg, bugs.overed(bugs.clone(bugs.ui.DEFAULT_POPUP_OPTION), option || {}));
};

bugs.ui.showAlertMobile = function(msg, option) {
    if (!bugs.ui._alertMobile) bugs.ui._alertMobile = new bugs.ui.alert.mobile(msg, option).show();
    else bugs.ui._alertMobile.show(msg, bugs.overed(bugs.clone(bugs.ui.DEFAULT_POPUP_OPTION), option || {}));
};

//------------------------------ 濡쒓렇�� �덉씠��  -----------------------------------------------------------------//

bugs.ui.showLoginAlert = function(code, option) {
    var opt = bugs.overed({
        msrl: "",
        layerLogin: true,
        css: "layer loginV2 dimborder"
    }, option || {});

    if (code != "OK") {
        //nothing
    } else {
        bugs.ui.pcLoginLog();
    }
};


bugs.ui.showLoginLayer = function(option, beforeLongLoginYn) {

    var strLongLoginYn = "";
    if (beforeLongLoginYn == 'Y') strLongLoginYn = "checked";

    // 蹂댁뿬吏��� 怨듯넻 �덉씠�� 紐⑤몢 �リ린
    bugs.layermenu.removeOldLayer();

    var opt = bugs.overed({
        rUrl: location.href,
        openWindow: false,
        rType: "X"
    }, option || {});

    var msg = "";

    if (opt.position == 'header') {
        msg += "<aside class=\"layer loginV2\">";
    } else {
        msg += "<aside class=\"layer loginV2 dimborder\">";
    }

    msg += "<div class=\"box-shadow\"></div>";

    if (opt.position == 'header') {
        msg += "<div class=\"layerTap\"></div>";
    }

    msg +=
        "	<header class=\"layer-title\">" +
        "	<h1>濡쒓렇��/�뚯썝媛���</h1>" +
        "	</header>" +
        "	<div class=\"loginTypeSet\">" +
        "	<h2>濡쒓렇�� �� �댁슜�섏떎 �� �덉뒿�덈떎.</h2>" +
        "<form method=\"post\" id=\"frmLoginLayer\" name=\"frmLoginLayer\" onsubmit=\"return false;\" >" +
        "<input type=\"hidden\" id=\"rUrl\" name=\"rUrl\" value=\"" + opt.rUrl + "\"  />" +
        "	<div class=\"loginType\">" +
        "		<div class=\"paycoLogin\">" +
        "			<p>PAYCO �꾩씠�붾줈<br />媛꾪렪�� 濡쒓렇�� �ㅼ뼇�� �쒗깮源뚯�!</p>" +
        "			<a href=\"javascript:void(0);\" id=\"payco-auth-popup\" class=\"btnPaycoLogin\"><span>PAYCO</span>濡� 濡쒓렇��</a>" +
        "		</div>" +
        "		<a href=\"javascript:void(0);\" id=\"to_bugs_login\"class=\"loginBtn btnBugsLogin\">踰낆뒪 �꾩씠�� �먮뒗 �대찓�쇰줈 濡쒓렇��</a>" +
        "		<a href=\"javascript:void(0);\" id=\"fb-auth-layer\" class=\"loginBtn btnFbLogin\">Facebook�쇰줈 濡쒓렇��</a>" +
        "       <div class=\"hangamePlus\">" +
        "           <a href=\"javascript:void(0);\" id=\"hangame-auth-popup\" class=\"loginBtn btnHPlusLogin\">�쒓쾶�� Plus �뚯썝 濡쒓렇��</a>" +
        "           <button type=\"button\" class=\"btnGuide\" onclick=\"$('.layerTipHangamePlus').show();\">�덈궡</button>" +
        "           <aside class=\"layer tooltip layerTipHangamePlus\">" +
        "               <div class=\"box-shadow\"></div>" +
        "               <div class=\"layerTap\"></div>" +
        "               <section class=\"layerContents\">" +
        "                   <ul>" +
        "                       <li>�쒓쾶�� 1留뚯썝 �댁긽 Plus �뚯썝 �꾩씠�붾줈 踰낆뒪�� 濡쒓렇�명븯硫� �댁슜沅뚯쓣 �쒓났�섎뒗 �대깽�몄엯�덈떎.</li>" +
        "                       <li>�섎뱽湲�(�ㅽ듃由щ컢)�� �먮뒗 �섎뱽湲�+�ㅻ쭏�명룿 �ㅼ슫濡쒕뱶�� �댁슜沅뚯쓣 �쒓났�섎ŉ, 留ㅼ썡 �щ씪吏� �� �덉뒿�덈떎.</li>" +
        "                       <li>�쒓쾶�� Plus �뚯썝 媛��낃린媛� �숈븞 �쒗깮�� 諛쏆쓣 �� �덉쑝�� �뱀궗 �ъ젙�� �곕씪 �ъ쟾 怨듭� �� 醫낅즺�� �� �덉뒿�덈떎.</li>" +
        "                   </ul>" +
        "               </section>" +
        "               <span class=\"btnClose\"onclick=\"$('.layerTipHangamePlus').hide();\"></span>" +
        "           </aside>" +
        "       </div>" +
        "		<div class='options saveLogin'>" +
        "			<input type='checkbox' id=\"longLoginYn\" name=\"longLoginYn\" class='persist' " + strLongLoginYn + "> <label for='longLoginYn'>�좏깮�� �꾩씠�붾줈 濡쒓렇�� �곹깭 �좎�</label><span class='icon persistGuide'>濡쒓렇�� �곹깭 �좎���?</span>" +
        "			<div class=\"messagePersist msgPrivacy\">" +
        "				<p>媛쒖씤�뺣낫 蹂댄샇瑜� �꾪빐 <strong>媛쒖씤 PC</strong>�먯꽌留� �ъ슜�섏꽭��.<a href=\"http://help.bugs.co.kr/sub?target=bugs/faq/list%3FfaqId%3D26234%26categoryNo%3D4601\" target=\"_blank\" class=\"btnMore\">�먯꽭�� 蹂닿린</a></p>" +
        "				<span class=\"btnClose\">�リ린</span>" +
        "				<span class=\"layerTab\"></span>" +
        "			</div>" +
        "			<div class=\"messagePersist msgPersistGuide\">" +
        "				<p>留ㅻ쾲 �꾩씠��/鍮꾨�踰덊샇瑜� �낅젰�섏� �딆븘�� 濡쒓렇�� �뺣낫瑜� <br/>�좎��� �� �덈뒗 湲곕뒫�낅땲��.</p>" +
        "				<span class=\"btnClose\">�リ린</span>" +
        "				<span class=\"layerTab\"></span>" +
        "			</div>" +
        "		</div>" +
        " 		<a href=\"javascript:void(0);\" id=\"go_register\" class=\"loginBtn btnJoinBugs\">踰낆뒪 �뚯썝媛���</a>" +
        "	</div>" +
        "	<span id=\"layerLoginClose\" class=\"btnClose\">�リ린</span>" +
        "</div>" +
        "	</form>";
    msg += "</fieldset>	" +
        "</aside>";

    var saveId = bugs.cookie.get('saveId');

    //珥덇린��
    if (bugs.ui._loginLayer) {
        bugs.ui._loginLayer.remove();
        bugs.ui._loginLayer = null;
    }
    if (!bugs.ui._loginLayer) {

        var layerClass = "layer loginV2 dimborder";
        var isModal = true;

        if (opt.position == 'header') {
            layerClass = "layer loginV2";
            isModal = false;
        } else {
            layerClass = "layer loginV2 dimborder";
        }

        bugs.ui._loginLayer = new bugs.ui.popup(msg, {
            title: "layerLogin",
            caller: opt.caller,
            position: opt.position,
            modal: isModal,
            css: layerClass,
            onInit: function(popup) {


                var $loginContainer = $('.layer.loginV2 .loginTypeSet');

                $loginContainer.find('.icon.persistGuide').click(function(ev) {
                    var position = $(this).position();
                    var $message = $('.messagePersist.msgPersistGuide');

                    $message.toggle($(this)[0].checked);
                    $('.messagePersist.msgPrivacy').hide();
                });
                $loginContainer.find('#longLoginYn').click(function(ev) {
                    var position = $(this).position();
                    var $message = $('.messagePersist.msgPrivacy');

                    $message.toggle($(this)[0].checked);
                    $('.messagePersist.msgPersistGuide').hide();
                });

                $loginContainer.find('.messagePersist .btnClose').click(function(ev) {
                    $('.messagePersist').hide();
                });

                jQuery('#to_bugs_login').click(function(event) {
                    var longLoginYn = jQuery(".layer.loginV2 .loginTypeSet #longLoginYn").is(":checked") ? "Y" : "N";
                    bugs.ui.showLoginLayerBugs(opt, longLoginYn);

                });
                jQuery('#payco-auth-popup').click(function(event) {
                    var longLoginYn = jQuery(".layer.loginV2 .loginTypeSet #longLoginYn").is(":checked") ? "Y" : "N";
                    window.open(g_urlSecure + "/member/payco/login?longLoginYn=" + longLoginYn + "&returnUri=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl)), "paycoLoginPopup", "width=420, height=550");
                });
                jQuery('#hangame-auth-popup').click(function(event) {
                    var longLoginYn = jQuery(".layer.loginV2 .loginTypeSet #longLoginYn").is(":checked") ? "Y" : "N";
                    var ieVersion = bugs.utils.getIEVersion();
                    if (ieVersion != 0) {
                        location.href = g_urlSecure + "/member/hangame/oauth/bridge?longLoginYn=" + longLoginYn + "&returnUri=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl));
                    } else {
                        window.open(g_urlSecure + "/member/hangame/oauth/bridge?longLoginYn=" + longLoginYn + "&returnUri=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl)), "hangameLoginPopup", "width=450, height=620");
                    }
                });
                jQuery('#go_register').click(function(event) {

                    if (location.href.indexOf("Player?trackId=") > -1 || location.href.indexOf("Player?mvId=") > -1 || location.href.indexOf("newPlayer?") > -1 || location.href.indexOf("Radio?") > -1 || location.href.indexOf("pay/offlineCoupon/") > -1) {
                        window.open(g_urlMusic + "/member/bregister?rUrl=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl)));
                    } else {
                        location.href = g_urlMusic + "/member/bregister?rUrl=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl));
                    }

                });
                jQuery('#fb-auth-layer').click(function(event) {
                    var longLoginYn = jQuery(".layer.loginV2 .loginTypeSet #longLoginYn").is(":checked") ? "Y" : "N";

                    var rUrl = bugs.ui._loginLayer.layer.find("#rUrl").val();
                    if (rUrl.indexOf("://") <= -1) rUrl = location.protocol + rUrl;

                    if (rUrl != undefined && rUrl != "")
                        bugs.fb.openLogin2(longLoginYn, rUrl);
                    else
                        bugs.fb.openLogin2(longLoginYn);
                });
                window.fbAsyncInit = function() {
                    FB.init({
                        appId: '122936701116206',
                        version: 'v2.12',
                        //channelUrl : 'http://music.bugs.co.kr/channel.html', // Channel File
                        status: true,
                        cookie: true,
                        xfbml: true,
                        oauth: true
                    });
                };
                (function() {
                    var e = document.createElement('script');
                    e.async = true;
                    e.src = document.location.protocol +
                        '//connect.facebook.net/ko_KR/sdk.js';
                    try {
                        document.getElementById('fb-root').appendChild(e);;
                    } catch (e) {}
                }());

            }
        }).show();

    } else {
        bugs.ui._loginLayer.layer.find("#rUrl").val(opt.rUrl);
        bugs.ui._loginLayer.show();
    }

    //jQuery("#user_id").focus();

    //�ㅼ떆媛� �ㅽ�諛⑹넚 �뚮Ц�� 濡쒓렇�� �덉씠�닿� �뚮옒�쒗뵆�덉씠�� �ㅻ줈 �④린�뚮Ц�� �뚮옒�쒗뵆�덉씠�� �덉씠�� �④�
    if (typeof castType != "undefined" && castType == "live") {
        hideVideoLayer();
    }

};

var isSafari = (navigator.userAgent.toLocaleLowerCase().search("mac") >= 0 && navigator.userAgent.toLocaleLowerCase().search("safari") >= 0 && navigator.userAgent.toLocaleLowerCase().search("chrome") < 0);
var isWin10 = (navigator.userAgent.toLocaleLowerCase().search("windows nt 10.0") >= 0 && navigator.userAgent.toLocaleLowerCase().search("rv:11") >= 0);
var isEdge = (navigator.userAgent.toLocaleLowerCase().search("windows") >= 0 && navigator.userAgent.toLocaleLowerCase().search("edge") >= 0);
var isXP = (navigator.userAgent.toLocaleLowerCase().search("windows nt 5.1") >= 0);
var isIE78 = (navigator.userAgent.toLocaleLowerCase().search("msie 7.0") >= 0 || navigator.userAgent.toLocaleLowerCase().search("msie 8.0") >= 0);
var audio = null;

bugs.ui.showLoginLayerBugs = function(option, beforeLongLoginYn) {

    var strLongLoginYn = "";
    if (beforeLongLoginYn == 'Y') strLongLoginYn = "checked";
    // 蹂댁뿬吏��� 怨듯넻 �덉씠�� 紐⑤몢 �リ린
    bugs.layermenu.removeOldLayer();

    var opt = bugs.overed({
        rUrl: location.href,
        openWindow: false,
        rType: "X"
    }, option || {});

    var msg = "";

    if (opt.position == 'header') {
        msg += "<aside class=\"layer loginV2\">";
    } else {
        msg += "<aside class=\"layer loginV2 dimborder\">";
    }

    msg += "<div class=\"box-shadow\"></div>";

    if (opt.position == 'header')
        msg += "<div class=\"layerTap\"></div>";

    msg += "		<header class=\"layer-title\">" +
        "		<h1>踰낆뒪 �꾩씠�� �먮뒗 �대찓�쇰줈 濡쒓렇��<a href=\"javascript:void(0)\"  id=\"to_payco_login\" class=\"prevlink\" style=\"cursor:pointer;\" ><span class=\"icon\"></span><span class=\"blind\">�댁쟾</span></a></h1>" +
        "		</header>";

    msg += "<fieldset class=\"bugsLoginSet\">" +
        "	<legend><span class=\"icon\"></span>踰낆뒪 �꾩씠�� �먮뒗 �대찓�쇰줈 濡쒓렇�� �낅젰��</legend>" +
        "	<form method=\"post\" id=\"frmLoginLayer\" name=\"frmLoginLayer\" onsubmit=\"return false;\" >" +
        "	<div class=\"loginWrap\">" +
        "		<div class=\"login\" >" +
        "			<p class=\"input\">" +
        "				<input type=\"hidden\" id=\"rUrl\" name=\"rUrl\" value=\"" + opt.rUrl + "\"  />" +
        "				<input type=\"hidden\" id=\"key\" value=\"\"/>" +
        "				 <audio id=\"captchaAudio\" hidden>" +
        "				<source id=\"captchaVideoSource\" src=\"\" type=\"audio/wav\">" +
        "				</audio>" +
        "				<span class=\"username\">" +
        "					<input type=\"text\" id=\"user_id\" name=\"user_id\">" +
        "					<label for=\"user_id\" class=\"\"><em>�꾩씠��</em> �먮뒗 <em>�대찓��</em>(�덉떆 ID@bugs.co.kr)</label>" +
        "				</span>" +
        "				<span class=\"password\">" +
        "					<input type=\"password\" id=\"passwd\" name=\"passwd\">" +
        "					<label for=\"passwd\" class=\"\">鍮꾨�踰덊샇</label>" +
        "				</span>" +
        "			</p>" +
        "			<div class=\"captcha\" id=\"captcha\" style=\"display:none\">" +
        "				<div class=\"chkCaptcha\" id=\"captcha_image\">" +
        "					<span><img src=\"\" id=\"captchaImg\" alt=\"�몄쬆臾몄옄\"></span>";
    //�ы뙆由ъ씤 寃쎌슦 �뚯꽦�ｊ린 踰꾪듉 ��젣
    if (isSafari || isWin10) {
        msg += "		<button type=\"button\" class=\"btnNormal btnReroad big\" onClick=\"getCaptcha('img');\">�덈줈怨좎묠</button>" +
            "					<button type=\"button\" class=\"btnNormal btnVoice\" onClick=\"getCaptcha('sound');\">�뚯꽦 �ｊ린</button>";
    } else {
        msg += "		<button type=\"button\" class=\"btnNormal btnReroad\" onClick=\"getCaptcha('img');\">�덈줈怨좎묠</button>" +
            "					<button type=\"button\" class=\"btnNormal btnVoice\" onClick=\"getCaptcha('sound');\">�뚯꽦 �ｊ린</button>";
    }
    msg += "		</div>" +
        "				<div class=\"chkCaptcha\" id=\"captcha_sound\" style=\"display:none\">" +
        "					<span>�뚯꽦 �덈궡 �ｊ린 以� ...</span>" +
        "					<button type=\"button\" class=\"btnNormal btnReroad\" onClick=\"getCaptcha('sound');\">�덈줈怨좎묠</button>" +
        "					<button type=\"button\" class=\"btnNormal btnImage\" onClick=\"getCaptcha('img');\">�대�吏� 蹂닿린</button>" +
        "				</div>" +
        "				<span class=\"inputCaptcha\">" +
        "					<input type=\"text\" id=\"inputCaptcha\" name=\"capText\">" +
        "					<label for=\"inputCaptcha\" class=\"\">�먮룞�낅젰諛⑹� 臾몄옄瑜� �낅젰�댁＜�몄슂.</label>" +
        "				</span>" +
        "			</div>" +
        "			<div class=\"validation\" style=\"display:none\">" +
        "				<p>" +
        "					<span class=\"icon\"></span><span id=\"loginDesc\"></span>" +
        "				</p>" +
        "			</div>" +
        "			<button class=\"submit\" style=\"cursor:pointer;\">濡쒓렇��</button>" +
        "		</div>" +
        "		<div class=\"saveOption\">" +
        "			<div class=\"options saveID\">" +
        "				<input type=\"checkbox\" id=\"checkSaveId\" name=\"checkSaveId\"> <label for=\"checkSaveId\">�꾩씠�� ����</label>" +
        "			</div>" +
        "			<div class='options saveLogin'>" +
        "				<input type='checkbox' id=\"longLoginYn\" name=\"longLoginYn\" class='persist' " + strLongLoginYn + "> <label for='longLoginYn'>�좏깮�� �꾩씠�붾줈 濡쒓렇�� �곹깭 �좎�</label><span class='icon persistGuide'>濡쒓렇�� �곹깭 �좎���?</span>" +
        "				<div class=\"messagePersist msgPrivacy\">" +
        "					<p>媛쒖씤�뺣낫 蹂댄샇瑜� �꾪빐 <strong>媛쒖씤 PC</strong>�먯꽌留� �ъ슜�섏꽭��.<a href=\"http://help.bugs.co.kr/sub?target=bugs/faq/list%3FfaqId%3D26234%26categoryNo%3D4601\" target=\"_blank\" class=\"btnMore\">�먯꽭�� 蹂닿린</a></p>" +
        "					<span class=\"btnClose\">�リ린</span>" +
        "					<span class=\"layerTab\"></span>" +
        "				</div>" +
        "				<div class=\"messagePersist msgPersistGuide\">" +
        "					<p>留ㅻ쾲 �꾩씠��/鍮꾨�踰덊샇瑜� �낅젰�섏� �딆븘�� 濡쒓렇�� �뺣낫瑜� <br/>�좎��� �� �덈뒗 湲곕뒫�낅땲��.</p>" +
        "					<span class=\"btnClose\">�リ린</span>" +
        "					<span class=\"layerTab\"></span>" +
        "				</div>" +
        "			</div>" +
        "		</div>" +
        "		<div class=\"addon\">" +
        "			<a href=\"" + g_urlSecure + "/member/find/id\" class=\"btnNormal find\">�꾩씠��/鍮꾨�踰덊샇 李얘린</a>" +
        "			<a href=\"javascript:void(0);\" id= \"go_register\" class=\"btnNormal join\">踰낆뒪 �뚯썝媛���</a>" +
        "		</div>" +
        "		<span id=\"layerLoginClose\" class=\"btnClose\" >�リ린</span>" +
        "	</div>" +
        "	</form>";
    msg += "</fieldset>	" +
        "</aside>";

    var saveId = bugs.cookie.get('saveId');

    //珥덇린��
    if (bugs.ui._loginLayer) {
        bugs.ui._loginLayer.remove();
        bugs.ui._loginLayer = null;
    }

    if (!bugs.ui._loginLayer) {

        var layerClass = "layer loginV2 dimborder";
        var isModal = true;

        if (opt.position == 'header') {
            layerClass = "layer loginV2";
            isModal = false;
        } else {
            layerClass = "layer loginV2 dimborder";
        }

        bugs.ui._loginLayer = new bugs.ui.popup(msg, {
            title: "layerLogin",
            caller: opt.caller,
            position: opt.position,
            modal: isModal,
            css: layerClass,
            onInit: function(popup) {

                jQuery('#to_payco_login').click(function(event) {
                    var longLoginYn = jQuery("#longLoginYn").is(":checked") ? "Y" : "N";
                    bugs.ui.showLoginLayer(opt, longLoginYn);
                });
                jQuery('#go_register').click(function(event) {
                    if (location.href.indexOf("Player?trackId=") > -1 || location.href.indexOf("Player?mvId=") > -1 || location.href.indexOf("newPlayer?") > -1 || location.href.indexOf("Radio?") > -1 || location.href.indexOf("pay/offlineCoupon/") > -1) {
                        window.open(g_urlMusic + "/member/bregister?rUrl=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl)));
                    } else {
                        location.href = g_urlMusic + "/member/bregister?rUrl=" + (opt.rUrl == undefined || opt.rUrl == "" ? encodeURIComponent(location.href) : encodeURIComponent(opt.rUrl));
                    }
                });

                //id,passwd
                var id = popup.layer.find("#frmLoginLayer input#user_id");
                var passwd = popup.layer.find("#frmLoginLayer input#passwd");

                //effect
                var $loginContainer = $('.layer.loginV2 .bugsLoginSet');

                $loginContainer.find('.input input').focus(function() {
                    var $target = $('label[for=' + $(this).attr('id') + ']');
                    $target.hide();
                });
                $loginContainer.find('.input input').blur(function() {
                    if ($(this).val().length > 0) return;
                    var $target = $('label[for=' + $(this).attr('id') + ']');
                    $target.show();
                });

                //captcha effect
                $("#inputCaptcha").focus(function() {
                    var $target = $('label[for=' + $(this).attr('id') + ']');
                    $target.hide();
                });
                $("#inputCaptcha").blur(function() {
                    if ($(this).val().length > 0) return;
                    var $target = $('label[for=' + $(this).attr('id') + ']');
                    $target.show();
                });

                $loginContainer.find('.icon.persistGuide').click(function(ev) {
                    var position = $(this).position();
                    var $message = $('.messagePersist.msgPersistGuide');

                    $message.toggle($(this)[0].checked);
                    $('.messagePersist.msgPrivacy').hide();
                });
                $loginContainer.find('#longLoginYn').click(function(ev) {
                    var position = $(this).position();
                    var $message = $('.messagePersist.msgPrivacy');

                    $message.toggle($(this)[0].checked);
                    $('.messagePersist.msgPersistGuide').hide();
                });

                $loginContainer.find('.messagePersist .btnClose').click(function(ev) {
                    $('.messagePersist').hide();
                });

                var saveId = bugs.cookie.get('saveId');
                if (!bugs.valid.empty(saveId)) {
                    id.val(saveId).focus();
                    $("label[for=user_id]").hide();
                    jQuery("#checkSaveId").attr("checked", "checked");
                }

                setTimeout(function() {
                    //alert(id.val().length);
                    if (id.val().length > 1) $('label[for=user_id]').hide();
                    if (passwd.val().length > 1) $('label[for=passwd]').hide();
                }, 200);

                jQuery("#checkAutoLogin").click(function() {
                    if (jQuery(this).is(":checked")) {
                        var show = bugs.cookie.get('autoLogin');
                        if (show != "Y") {
                            bugs.layermenu.showClickLayer('.autoLoginAlert');
                        }
                    } else {
                        jQuery('.autoLoginAlert').hide();
                    }
                });

                $loginContainer.find('#loginClose').click(function() {
                    $('.layer.loginV2').hide();
                });

                var _submitFunc = function() {

                    if (bugs.valid.empty(id.val())) {
                        $("#loginDesc").text("�꾩씠�붾� �낅젰�� 二쇱꽭��.");
                        $(".validation").show();
                        return false;
                    }
                    if (bugs.valid.empty(passwd.val())) {
                        $("#loginDesc").text("鍮꾨�踰덊샇瑜� �낅젰�� 二쇱꽭��.");
                        $(".validation").show();
                        return false;
                    }

                    //罹≪콬 李쎌씠 �대젮�덉쑝硫� 蹂댁븞臾몄옄 泥댄겕瑜� �섍퀬 罹≪콬�� 濡쒓렇�몄쓣 �쒖슫��
                    if ($(".captcha").is(":visible")) {
                        if (bugs.valid.empty($("#inputCaptcha").val())) {
                            $("#loginDesc").text("�먮룞�낅젰諛⑹� 臾몄옄瑜� �낅젰�� 二쇱꽭��.");
                            return false;
                        }
                    }

                    var oDate = new Date();
                    if (jQuery("#checkSaveId").is(":checked")) {
                        oDate.setDate(oDate.getDate() + 30);
                        bugs.cookie.set("saveId", id.val(), oDate, "/", "bugs.co.kr");
                    } else {
                        oDate.setDate(oDate.getDate() - 1);
                        bugs.cookie.set("saveId", "", oDate, "/", "bugs.co.kr");
                    }

                    var longLoginYn = jQuery("#longLoginYn").is(":checked") ? "Y" : "N";

                    var captcha_key = $("#key").val();
                    var captcha_text = $("#inputCaptcha").val();

                    //pushstate ie�섏쐞踰꾩쟾 rUrl �덉쇅泥섎━
                    if ($.browser.msie && $.browser.version <= 9 && opt.rUrl.indexOf("hr#") > -1) {
                        var rUrl = opt.rUrl.substring(opt.rUrl.indexOf("hr#"), opt.rUrl.legnth);
                        opt.rUrl = rUrl.replace("hr#music", g_urlMusic).replace("hr#www", g_urlWww).replace("hr#secure", g_urlSecure).replace("hr#event", g_urlEvent);
                    }

                    if (!isXP) {
                        var objParams = {
                            user_id: bugs.encryption.loginEncrypt(id.val()),
                            passwd: bugs.encryption.loginEncrypt(passwd.val()),
                            captcha: 'Y',
                            key: captcha_key,
                            capText: captcha_text,
                            fr: 'jsonp',
                            longLoginYn: longLoginYn,
                            rUrl: opt.rUrl,
                            encryptYn: bugs.encryption.isValidLoginEncrypt()
                        };
                    } else {
                        var objParams = {
                            user_id: bugs.encryption.loginEncrypt(id.val()),
                            passwd: bugs.encryption.loginEncrypt(passwd.val()),
                            fr: 'jsonp',
                            longLoginYn: longLoginYn,
                            rUrl: opt.rUrl,
                            encryptYn: bugs.encryption.isValidLoginEncrypt()
                        };
                    }

                    jQuery.ajax({
                        //type: 'POST',
                        dataType: "jsonp",
                        cache: false,
                        url: g_urlMember + "/ajax/login",
                        data: objParams,
                        jsonp: "callback",
                        success: function(rtnVal) {

                            if ("OK" == rtnVal.code) {

                                try { bugs.ui.pcLoginLog(); } catch (e) {};

                                location.href = bugs.valid.isNull(rtnVal.rUrl) ? g_urlBase : rtnVal.rUrl;
                            } else {
                                switch (rtnVal.code) {
                                    case "VSTATC":
                                    case "CHECK_NAME_SSN":
                                        $("#loginDesc").text("�섎せ�� 濡쒓렇�� �뺣낫�낅땲��.");
                                        break;
                                    case "PAUSE":
                                        $("#loginDesc").text("�꾩씠�� �먮뒗 鍮꾨�踰덊샇瑜� �뺤씤�댁＜�몄슂.");
                                        break;
                                    case "ALREADY_LOGGED":
                                        $("#loginDesc").text("�대� 濡쒓렇�� �섏뼱 �덉뒿�덈떎.");
                                        break;
                                    case "NSUR":
                                        $("#loginDesc").text("�꾩씠�� �먮뒗 鍮꾨�踰덊샇瑜� �뺤씤�댁＜�몄슂.");
                                        break;
                                    case "UNREGISTER":
                                        $("#loginDesc").text("�꾩씠�� �먮뒗 鍮꾨�踰덊샇瑜� �뺤씤�댁＜�몄슂.");
                                        break;
                                    case "WPWD":
                                        $("#loginDesc").text(rtnVal.loginMsg);
                                        break;
                                    case "FAIL_COUNT_CHECK":
                                        $("#loginDesc").text("�꾩씠�� �먮뒗 鍮꾨�踰덊샇瑜� 5�� �댁긽 �섎せ �낅젰�섏뀲�듬땲��. 媛쒖씤�뺣낫 蹂댄샇瑜� �꾪빐 �먮룞�낅젰諛⑹� 臾몄옄瑜� �낅젰�� 二쇱꽭��.");
                                        getCaptcha('img');
                                        break;
                                    case "WRONG_ANSWER_ERROR":
                                        $("#loginDesc").text("�먮룞�낅젰諛⑹� 臾몄옄瑜� �ㅼ떆 �� 踰� �뺤씤�� 二쇱꽭��.");
                                        break;
                                    case "EXPIRED_KEY_ERROR":
                                        $("#loginDesc").text("�낅젰 �쒗븳�쒓컙�� 珥덇낵�덉뒿�덈떎. �� �몄쬆臾몄옄瑜� �낅젰�� 二쇱꽭��.");
                                        getCaptcha('img');
                                        break;
                                    case "SLEEP_USER":
                                        $("#loginDesc").text("�대㈃ �곹깭濡� �꾪솚�� �꾩씠�붿엯�덈떎.");
                                        if (location.href.indexOf("Player?trackId=") > -1 || location.href.indexOf("Player?mvId=") > -1 || location.href.indexOf("Radio?") > -1) {
                                            $("#layerLoginClose").click();
                                            window.open(g_urlMusic + "/member/sleepIDRelease/simple?userId=" + rtnVal.userId + "&msrl=" + rtnVal.msrl);
                                        } else {
                                            location.href = g_urlMusic + "/member/sleepIDRelease/simple?userId=" + rtnVal.userId + "&msrl=" + rtnVal.msrl;
                                        }
                                        break;
                                    case "LEGAL_REPRESENTATIVE_CHECK":
                                        location.href = rtnVal.next_url;
                                        break;
                                    default:
                                        $("#loginDesc").text("�꾩씠�� �먮뒗 鍮꾨�踰덊샇瑜� �뺤씤�댁＜�몄슂.");
                                        break;
                                }

                                $(".validation").show();
                            }
                        },
                        error: function() {
                            alert('error');
                        }
                    });

                    //jQuery("#frmLoginLayer").submit();
                };

                popup.layer.find(".submit").click(_submitFunc);
                jQuery(passwd).keypress(function(event) {
                    if (event.keyCode == '13') {
                        _submitFunc();
                        return false; //鍮꾪봽�� �쒓굅
                    }
                });

                jQuery(id).keypress(function(event) {
                    if (event.keyCode == '13') {
                        _submitFunc();
                        return false; //鍮꾪봽�� �쒓굅
                    }
                });

                //�뱁뵆�덉씠�댁뿉�� 濡쒓렇�� �ㅽ뙣 �� �먮룞�쇰줈 �⑤뒗 濡쒓렇�� �덉씠�댁뿉�� 留곹겕 踰꾪듉(�뚯썝媛���, 鍮꾨쾲, id 李얘린 �대┃ �� �덉갹�쇰줈 �⑤룄濡� 蹂�寃�)
                if (location.href.indexOf("Player?trackId=") > -1 || location.href.indexOf("Player?mvId=") > -1 || location.href.indexOf("Radio?") > -1 || location.href.indexOf("pay/offlineCoupon/") > -1) {
                    popup.layer.find('.addon a').attr('target', '_blank');
                }



            }
        }).show();

    } else {
        bugs.ui._loginLayer.layer.find("#rUrl").val(opt.rUrl);
        bugs.ui._loginLayer.show();
    }

    //jQuery("#user_id").focus();

    //�ㅼ떆媛� �ㅽ�諛⑹넚 �뚮Ц�� 濡쒓렇�� �덉씠�닿� �뚮옒�쒗뵆�덉씠�� �ㅻ줈 �④린�뚮Ц�� �뚮옒�쒗뵆�덉씠�� �덉씠�� �④�
    if (typeof castType != "undefined" && castType == "live") {
        hideVideoLayer();
    }
};



//header�먯꽌 �ъ슜�섎뒗 濡쒓렇�� �덉씠��
bugs.ui.showLoginLayerForHeader = function(option) {

    //CP濡쒓렇�몄� �앹뾽�쇰줈 泥섎━�쒕떎.
    try {
        var Dns = location.href;
        if (Dns.indexOf("game.bugs") != -1 || Dns.indexOf("shotonline.bugs") != -1) {
            bugs.ui.showLoginPopup();
            return;
        }

    } catch (e) {}

    var opt = bugs.overed({
        position: "header"
    }, option || {});

    bugs.ui.showLoginLayer(opt, 'N');
};

bugs.ui.showLoginInfoLayerForHeader = function() {

    bugs.layermenu.removeOldLayer();

    if (bugs.ui._infoLayer && bugs.ui._infoLayer.layer.is(":visible")) {
        bugs.ui._infoLayer.hide();
    } else {
        bugs.ui._infoLayer = new bugs.ui.popup($('.afterLogin'), {
            title: "layerLoginInfo",
            position: "fix",
            modal: false,
            onOk: function(popup) {}
        }).show();
    }
};

bugs.ui.showLoginInfoLayerForMLMHeader = function() {

    bugs.layermenu.removeOldLayer();

    if (bugs.ui._infoLayer && bugs.ui._infoLayer.layer.is(":visible")) {
        bugs.ui._infoLayer.hide();
    } else {
        bugs.ui._infoLayer = new bugs.ui.popup($('.afterLogin'), {
            title: "layerLoginInfoMLM",
            position: "fix",
            modal: false,
            onOk: function(popup) {}
        }).show();
    }
};

// CP �먯꽌 �묎렐�섎뒗 濡쒓렇�몄� 紐⑤몢 �앹뾽�쇰줈 泥섎━�쒕떎.
bugs.ui.showLoginPopup = function(option) {
    var opt = bugs.overed({
        cp: "",
        rUrl: location.href
    }, option || {});

    jQuery.fn.popupWindow({
        url: g_urlMusic + "/member/login/popup?cp=" + opt.cp + "&rUrl=" + encodeURIComponent(opt.rUrl) + "&decorator=popup",
        name: "LoginPopup",
        width: 358,
        height: 278,
        center: 1
    });
};

bugs.ui.alertAdultNotice = function() {
    var msg = "�뺣낫�듭떊留� �댁슜珥됱쭊 諛� �뺣낫蹂댄샇 <br />" +
        "�깆뿉 愿��� 踰뺣쪧 諛� 泥�냼�� 蹂댄샇踰뺤뿉<br />" +
        "�곕씪 19�� 誘몃쭔�� �댁슜�� �� <br />" +
        "�놁뒿�덈떎.";
    var _alert = new bugs.ui.showAlert(msg, { css: "layerAdultNotice" });
    _alert.show();
};

bugs.ui.alertHoldBackNotice = function(type) {
    var msg = "�대떦 " + (type == "mv" ? "裕ㅼ쭅鍮꾨뵒�ㅻ뒗" : "怨≪�") + " �뚯썝 沅뚮━�ъ쓽<br />" +
        "�붿껌(���쒕갚)�쇰줈 諛쒕ℓ �� �쇱젙湲곌컙\n" +
        "1遺� 誘몃━" + (type == "mv" ? "蹂닿린" : "�ｊ린") + "留� 媛��ν빀�덈떎.";
    alert(msg);
    //	var _alert = new bugs.ui.showAlert(msg, {css : "layerAdultNotice"});
    //_alert.show();
};

bugs.ui.alertFacebookCpNotice = function() {
    alert("Facebook 怨꾩젙�쇰줈 �댁슜�� �� �녿뒗 �쒕퉬�ㅼ엯�덈떎.");
    return;
};

bugs.ui.alertPmangPlusNotice = function() {
    var msg = '<p>�쇰쭩�뚮윭�� 怨꾩젙�쇰줈 濡쒓렇�� ��,<br />�좏깮�섏떊 �쒕퉬�ㅻ뒗 �댁슜�� 遺덇��ν빀�덈떎.</p><div class="btnArea"><span class="button typeME"><a href="javascript:void(bugs.ui.modalLayer.hide());" type="ok">�뺤씤</a></span></div><div class="btnClose"><a href="#"><span>�リ린</span></a></div>';
    var popup = new bugs.ui.popup(msg, { css: "layerFbServiceNot" });
    popup.show();
};

//----- clipboard 移댄뵾 踰꾪듉 -----------------------------------------------------------------------------------------------------------//
bugs.ui.clipboardButtonManager = {
    id: 1,

    buttons: {},

    getUniqueId: function() {
        return bugs.ui.clipboardButtonManager.id++;
    },

    handleEvent: function(event, id) {
        if (this.buttons[id]) this.buttons[id].handleEvent(event);
    }
};

bugs.ui.clipboardButton = bugs.create();
bugs.ui.clipboardButton.prototype = {
    containerId: "BugsClipboardUtilContainer",

    id: 0,

    initialize: function(selector, option) {
        this.id = bugs.ui.clipboardButtonManager.getUniqueId();
        bugs.ui.clipboardButtonManager.buttons[this.id] = this;

        this.button = jQuery(selector).mouseover(this.reposition.bind(this));
        this.option = bugs.overed({
            copyData: "",
            addClass: "",
            zIndex: 100,
            onComplete: function() {}
        }, option || {});

        if (jQuery("#" + this.containerId).length > 0) {
            this.container = jQuery("#" + this.containerId);
            this.swf = jQuery("#BugsClipboardUtil")[0];
            if (this.swf.tagName == "DIV") this.swf = null;
        } else {
            // firefox�먯꽌�� �쇰떒 �붾㈃�� �뚮옒�ш� 蹂댁뿬�� ExternalInterface.addCallback()�� �섍린 �뚮Ц��
            // �쇰떒 �붾㈃�� 蹂댁씠寃뚮걫 scrollTop�쇰줈 container瑜� �앹꽦��
            var top = jQuery(document).scrollTop();
            this.container = jQuery("<div id=\"" + this.containerId + "\"><div id=\"BugsClipboardUtil\"></div></div>").appendTo("body").css({ position: "absolute", width: 10, height: 10, top: top, "z-index": this.option.zIndex });

            var flashvars = {
                id: this.id,
                copyData: this.option.copyData,
                eventHandler: "bugs.ui.clipboardButtonManager.handleEvent"
            };

            var params = {
                wmode: "transparent",
                allowScriptAccess: "always"
            };

            var attr = {
                id: "BugsClipboardUtil"
            };

            swfobject.embedSWF(g_urlSwf + "/BugsClipboardUtil.swf", "BugsClipboardUtil", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars, params, attr, function(e) {
                if (e.success) this.swf = e.ref;
            }.bind(this));
        }
    },

    reposition: function() {
        if (!this.swf) {
            var swf = jQuery("#BugsClipboardUtil")[0];
            if (!swf || swf.tagName == "DIV") return false;

            this.swf = swf;
        }

        var offset = this.button.offset();
        var width = this.button.outerWidth();
        var height = this.button.outerHeight();

        this.container.offset(offset).width(width).height(height);
        if (this.swf.setId) {
            this.swf.setId(this.id);
            this.swf.setCopyData(this.option.copyData);
        }
    },

    setCopyData: function(copyData) {
        this.option.copyData = copyData;

        if (!this.swf) {
            var swf = jQuery("#BugsClipboardUtil")[0];
            if (!swf || swf.tagName == "DIV") return false;

            this.swf = swf;
        }

        if (this.swf.setCopyData)
            this.swf.setCopyData(this.option.copyData);
    },

    handleEvent: function(e) {
        //alert(e);
        switch (e) {
            case "mouseOver":
                this.button.addClass(this.option.addClass);
                break;
            case "mouseOut":
                this.button.removeClass(this.option.addClass);
                break;
            case "complete":
                this.option.onComplete();
                break;
            case "mouseDown":
                break;
            case "mouseUp":
                break;
        }
    }
};
//-----------------------------------------------------------------------------

//----------------------------------------------------------------------------------- �ш린遺��� 19�� �깆씤�몄쬆 而ㅼ뒪���덉씠�� --------------------------------------
bugs.ui.adult = {
    popup: null,
    certTid: null,
    remainTime: 0,
    reloadFunction: null,

    limit: function() {
        alert("19�� 誘몃쭔�� �댁슜�� �� �놁뒿�덈떎.");
        return;
    },


    notice: function(callBack) {
        /*var msg = 	"<div class=\"layerAlert layerMsg layerMember19Msg\">" +
        			"	<div class=\"content\">" +
        			"		<p>�대떦 怨�(or 裕ㅼ쭅鍮꾨뵒��)�� 泥�냼�� �좏빐留ㅼ껜臾쇰줈��<br />19�� 誘몃쭔�� 泥�냼�꾩씠 �댁슜�� �� �놁뒿�덈떎.</p>" +
        			"		<p>�뚯썝�섏쓽 �곕졊�� �뺤씤�섏� �딆븯�쇰�濡�,<br />�꾨옒 踰꾪듉�� �대┃�섏뿬 �곕졊�뺤씤�� �댁＜�쒓린 諛붾엻�덈떎.</p>" +
        			"		<div class=\"btnArea\">" +
        			"			<span class=\"button typeME\"><a href=\"javascript:void(0);\" type=\"adultCheck\" >�곕졊 �뺤씤</a></span>" +
        			"			<span class=\"button typeM\"><a href=\"javascript:void(0);\" type=\"cancel\" >痍⑥냼</a></span>" +
        			"		</div>" +
        			"		<div class=\"btnClose\"><a href=\"javascript:void(0);\" type=\"cancel\"><span>�リ린</span></a></div>" +
        			"	</div>" +
        			"	<div class=\"layerBg bgTL\"></div>" +
        			"</div>";

        if (!bugs.valid.isNull(this.popup)) this.popup.remove();

        this.popup = new bugs.ui.popup(jQuery(msg), {
        	onInit : function(popup) {

        		// �곕졊�뺤씤 踰꾪듉 �대┃
        		popup.layer.find("a[type=adultCheck]").click(function() {
        			bugs.ui.adult.popup.hide();
        			bugs.ui.adult.check("age");
        		});

        	}
        });*/


        if (typeof callBack == "function") {
            bugs.ui.adult.reloadFunction = callBack;
        }

        if (!bugs.useragent.isMobile()) {
            bugs.ui.adult.beforeNotice();
        } else { // mobile

            bugs.ui.adult.openkcp();

        }
    },

    openkcp: function() {

        var width = 410;
        var height = 500;

        var leftpos = screen.width / 2 - (width / 2);
        var toppos = screen.height / 2 - (height / 2);

        var winopts = "width=" + width + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
        var position = ",left=" + leftpos + ", top=" + toppos;

        if (bugs.app != null && bugs.app.isBugsApp()) {
            alert("19�� 誘몃쭔�� �댁슜�� �� �놁뒿�덈떎.\n�ъ꽦媛�議깅��� �뺤콉�� �곕씪 �깆씤 �몄쬆 �� �댁슜�� 二쇱꽭��.");
        } else {
            window.open(g_urlMember + '/kcpCertificationRequest?returnUri=' + encodeURIComponent(location.href), 'auth_popup', winopts + position);
        }
    },

    openkcpForBside: function() {
        var width = 410;
        var height = 500;

        var leftpos = screen.width / 2 - (width / 2);
        var toppos = screen.height / 2 - (height / 2);

        var winopts = "width=" + width + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
        var position = ",left=" + leftpos + ", top=" + toppos;

        window.open('https://secure.bugs.co.kr/member/kcpCertificationRequest?type=bside&returnUri=' + encodeURIComponent(location.href), 'auth_popup', winopts + position);
    },

    openkcpForSelfCheck: function() {

        var width = 410;
        var height = 500;

        var leftpos = screen.width / 2 - (width / 2);
        var toppos = screen.height / 2 - (height / 2);

        var winopts = "width=" + width + ", height=" + height + ", toolbar=no,status=no,statusbar=no,menubar=no,scrollbars=no,resizable=no";
        var position = ",left=" + leftpos + ", top=" + toppos;

        if (bugs.app.isBugsApp()) {
            alert("19�� 誘몃쭔�� �댁슜�� �� �놁뒿�덈떎.\n�ъ꽦媛�議깅��� �뺤콉�� �곕씪 �깆씤 �몄쬆 �� �댁슜�� 二쇱꽭��.");
        } else {
            window.open(g_urlMember + '/kcpCertificationRequest?type=certification&returnUri=' + encodeURIComponent(location.href), 'auth_popup', winopts + position);
        }
    },

    beforeNotice: function() {
        var msg = "<aside class=\"layer layerCertificationGuide title\" style=\"display:block;top:1120px;left:920px;\">" +
            "<div class=\"box-shadow\"></div>"

        +"<header class=\"layer-title\">" +
        "<h1>�깆씤 �몄쬆 �덈궡</h1>" +
        "</header>"

        +
        "<section class=\"layerContents\">" +
        "<span class=\"bgIcon\"></span>" +
        "<p class=\"desc\">" +
        "�� 肄섑뀗痢좊뒗 泥�냼�꾩쑀�대ℓ泥대Ъ濡쒖꽌 �뺣낫�듭떊留� �댁슜珥됱쭊 諛�<br />" +
        "	�뺣낫蹂댄샇 �깆뿉 愿��� 踰뺣쪧 諛� 泥�냼�� 蹂댄샇踰뺤뿉 �곕씪<br />" +
        "	19�� 誘몃쭔�� �댁슜�� �� �놁뒿�덈떎.<br />" +
        "	�ъ꽦媛�議깅��� �뺤콉�� �곕씪 �깆씤 �몄쬆 �� �댁슜�� 二쇱꽭��." +
        "</p>"

        +
        "<p class=\"btns\">" +
        "	<strong>1�꾩뿉 �� 踰�, �뺤씤�댁＜�몄슂.</strong>" +
        "	<button class=\"btnNormal strong\" id=\"btnOpenCert\">�깆씤 �몄쬆 �섍린</button>" +
        "</p>" +
        "</section>"

        +
        "<button class=\"btnClose\" id=\"btnClose\">�リ린</button>" +
        "</aside>";

        var title = "�깆씤 �몄쬆 �덈궡";
        var adultLayerCss = "layer layerCertificationGuide title";
        var isModal = true;


        var adultLayer = new bugs.ui.popup(msg, {
            title: "adult",
            modal: isModal,
            css: adultLayerCss,
            onInit: function(popup) {

                // �덉씠�� 李� 硫붿꽭吏� 蹂�寃�
                popup.setTitle(title);


                //�リ린踰꾪듉
                popup.layer.find("#btnCancel, #btnClose, #cancelBtnNormal").click(function(e) {

                    try {
                        var Dns = location.href;
                        if (Dns.indexOf("popup/certification") != -1) {
                            self.close();
                            return;
                        }
                    } catch (e) {}

                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();

                    try {
                        bugs.layerFocusNavi.remove(this.layer);
                    } catch (e) {};
                }.bind(this));


                //�몄쬆�섎윭 媛�湲� 踰꾪듉
                popup.layer.find("#btnOpenCert").click(function(e) {

                    try {
                        bugs.ui.adult.openkcp();

                    } catch (e) {}

                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();

                    try {
                        bugs.layerFocusNavi.remove(this.layer);
                    } catch (e) {};
                }.bind(this));

            }
        }).show();
    },

    getObjParams: function(popup) {

        if (bugs.valid.isNull(popup)) return null;

        var objParams = {
            phoneNo1: jQuery.trim(popup.layer.find("#phoneNo1").val()),
            phoneNo2: jQuery.trim(popup.layer.find("#phoneNo2").val()),
            phoneNo3: jQuery.trim(popup.layer.find("#phoneNo3").val()),
            phoneNo: "",

            phoneCorp: jQuery.trim(popup.layer.find("input[name=phoneCorp]:checked").val()),

            birthDateYear: jQuery.trim(popup.layer.find("#birthDateYear").val()),
            birthDateMonth: jQuery.trim(popup.layer.find("#birthDateMonth").val()),
            birthDateDay: jQuery.trim(popup.layer.find("#birthDateDay").val()),

            gender: jQuery.trim(popup.layer.find("input[name=gender]:checked").val()),
            nation: jQuery.trim(popup.layer.find("input[name=nation]:checked").val()),
            name: jQuery.trim(popup.layer.find("#name").val()),
            smsNum: jQuery.trim(popup.layer.find("#smsNum").val()),
            certAgreePrivate: (popup.layer.find("input[name=certAgreePrivate]").is(":checked")) ? "Y" : "N",
            certAgreeIdentity: "Y", //2014.09.17 �깆씤�몄쬆�숈쓽��ぉ 蹂�寃�(��)�쇰줈 �명븳 蹂��섍컪 怨좎젙, 紐⑤컮�� �깆� 蹂�寃쎌씠 �덈릺�덇린�뚮Ц�� �뱀뿉�쒕쭔 怨좎젙

            reSend: jQuery.trim(popup.layer.find("input[name=reSend]").val()),
            check_1: jQuery.trim(popup.layer.find("input[name=check_1]").val()),
            check_2: jQuery.trim(popup.layer.find("input[name=check_2]").val()),
            check_3: jQuery.trim(popup.layer.find("input[name=check_3]").val()),
            CI: jQuery.trim(popup.layer.find("input[name=CI]").val()),
            DI: jQuery.trim(popup.layer.find("input[name=DI]").val()),
            type: ""
        };

        objParams.phoneNo = objParams.phoneNo1 + objParams.phoneNo2 + objParams.phoneNo3;

        return objParams;
    },

    checkParams: function(popup, objParams) {

        if (bugs.valid.isNull(popup) || bugs.valid.isNull(objParams)) {
            alert("�섎せ�� �묎렐�낅땲��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.name)) {
            alert("�대쫫�� �낅젰�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.phoneNo1)) {
            alert("�대��� �욎옄由щ� �낅젰�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.phoneNo2)) {
            alert("�대��� 媛��대뜲 �먮━瑜� �낅젰�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.phoneNo3)) {
            alert("�대��� 留덉�留� �먮━瑜� �낅젰�� 二쇱꽭��.");
            return false;
        }

        if (!bugs.valid.num(objParams.phoneNo)) {
            alert("�대��� 踰덊샇�� �レ옄留� �낅젰�� �� �덉뒿�덈떎.");
            return false;
        }

        if (bugs.valid.isNull(objParams.phoneCorp)) {
            alert("�대룞�듭떊�щ� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.birthDateYear)) {
            alert("�앸뀈�붿씪�� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.birthDateMonth)) {
            alert("�앸뀈�붿씪�� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.birthDateDay)) {
            alert("�앸뀈�붿씪�� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.gender)) {
            alert("�깅퀎�� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if (bugs.valid.isNull(objParams.nation)) {
            alert("援�쟻�� �좏깮�� 二쇱꽭��.");
            return false;
        }

        if ("Y" != objParams.certAgreePrivate) {
            alert("媛쒖씤�뺣낫 �댁슜 諛� �쒖슜�� �숈쓽�� 二쇱꽭��.");
            return false;
        }

        return true;

    },

    showCountdown: function(popup, timeToExpiration, reStart) {
        if (reStart != "") clearInterval(this.certTid);

        bugs.ui.adult.remainTime = timeToExpiration - 1;

        if (bugs.ui.adult.remainTime >= -1) {
            var day = Math.floor(timeToExpiration / (3600 * 24));
            var mod = timeToExpiration % (24 * 3600);
            var hour = Math.floor(mod / 3600);
            var mod = mod % 3600;
            var min = Math.floor(mod / 60);
            var sec = mod % 60;

            popup.layer.find("#countDown").text(min + "遺� " + sec + "珥�");
            if (bugs.ui.adult.remainTime == -1) {
                //popup.layer.find("input, select").attr("disabled", "");
            } else {
                if (popup.layer.find("#authScene").is(":visible") == true) {
                    this.certTid = setTimeout(function() {
                        bugs.ui.adult.showCountdown(popup, bugs.ui.adult.remainTime, "");
                    }, 1000); // will work with every browser
                }
            }
        }
    },

    initData: function(popup) {
        // �곗씠�� 珥덇린��
        popup.layer.find("input[name=check_1]").val("");
        popup.layer.find("input[name=check_2]").val("");
        popup.layer.find("input[name=check_3]").val("");
        popup.layer.find("input[name=CI]").val("");
        popup.layer.find("input[name=DI]").val("");
    },

    initScene: function(popup) {
        // �붾㈃�뺣━
        popup.layer.find("fieldset:eq(0) p.telMsg").empty().hide();

        popup.layer.find("#requestScene").show();
        popup.layer.find("#authScene").hide();

        popup.layer.find("#reqSmsNum").show();
        popup.layer.find("#authSmsNum").hide();

        popup.layer.find("input, select").attr("disabled", false);
    },

    error: function(popup, msg) {
        popup.layer.find("fieldset:eq(0) p.telMsg").empty().html(msg).show();
    },

    popupTerms: function(type) {

        // 怨좎쑀�앸퀎�뺣낫 泥섎━ �숈쓽 �앹뾽 identity
        if ("identity" == type) {
            var popUp = window.open("https://www.kmcert.com/kmcis/comm/kmcisHpDiscrAgreePop.html", "kmcisHpDiscrAgreePop", "width=445,height=550,toolbar=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
            popUp.focus();
        }
        // 媛쒖씤�뺣낫 �섏쭛/�댁슜 �앹뾽 private
        else if ("private" == type) {
            var popUp = window.open(g_urlMusic + "/member/pop/adultPrivate?decorator=popup", "kmcPrivateAgreePop", "width=400,height=263,toolbar=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
            popUp.focus();
        }
        // 痍④툒�꾪긽 consignment
        else {
            var popUp = window.open(g_urlMusic + "/member/pop/adultKMC?decorator=popup", "kmcPop", "width=442,height=400,toolbar=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
            popUp.focus();
        }

    },

    // type : age, game
    check: function(type) {

        try {
            var Dns = location.href;
            if (Dns.indexOf("game.bugs") != -1) {
                window.open(g_urlMusic + "/popup/certification?decorator=popup", 'certification', 'top=10, left=10, width=490, height=510, toolbar=0, directories=0, status=0, menubar=0, scrollbars=0, resizable=0');
                return;
            }
        } catch (e) {}

        var title = "";
        var comments = "";
        var className = "";

        if ("age" == type) {
            title = "踰낆뒪 �깆씤�몄쬆";
            comments = "�� �뺣낫�댁슜�� 泥�냼�꾩쑀�대ℓ泥대Ъ濡쒖꽌 �뺣낫�듭떊留� �댁슜珥됱쭊 諛� �뺣낫蹂댄샇�깆뿉 愿��� 踰뺣쪧 諛� 泥�냼�꾨낫�몃쾿�� �곕씪 19�� 誘몃쭔�� �댁슜�� �� �놁쑝硫� �ъ꽦媛�議깅��� 媛��대뱶�쇱씤�� �곕씪 �깆씤�몄쬆 �덉감瑜� 嫄곗퀜�� �⑸땲��.<a class=\"more\" href=" + g_urlMusic + "/board/notice?notice_tp=0&srl=7026 target='_blank'>�먯꽭�� 蹂닿린</a>";
            className = "desc adult";
        } else if ("game" == type) {
            title = "蹂몄씤 �뺤씤";
            comments = "寃뚯엫 梨꾨꼸留� �쒕퉬�� �댁슜�� �꾪빐 蹂몄씤�뺤씤 �덉감瑜� 嫄곗퀜�� �⑸땲��.";
            className = "desc";
        } else if ("musicpd" == type) {
            title = "蹂몄씤 �뺤씤";
            comments = "裕ㅼ쭅 PD �쒕퉬�� �댁슜�� �꾪빐 蹂몄씤�뺤씤 �덉감瑜� 嫄곗퀜�� �⑸땲��.";
            className = "desc";
        } else {
            title = "蹂몄씤 �뺤씤";
            comments = "�뚯썝�섏쓽 �먰븷�� �쒕퉬�� �댁슜�� �꾪빐 蹂몄씤�뺤씤 �덉감瑜� 嫄곗퀜�� �⑸땲��.";
            className = "desc";
        }

        msg = "<aside class=\"layer layerCertification title\" style=\"display:block;top:50px;left:920px;\">" +
            "	<div class=\"box-shadow\"></div>" +
            "	<header class=\"layer-title\">" +
            "		<h1>" + title + "</h1>		" +
            "	</header>" +
            "	<input type=\"hidden\" name=\"reSend\" value=\"\" />" +
            "	<input type=\"hidden\" name=\"check_1\" value=\"\" />" +
            "	<input type=\"hidden\" name=\"check_2\" value=\"\" />" +
            "	<input type=\"hidden\" name=\"check_3\" value=\"\" />" +
            "	<input type=\"hidden\" name=\"CI\" value=\"\" />" +
            "	<input type=\"hidden\" name=\"DI\" value=\"\" />" +
            "	<section class=\"layerContents\">" +
            "		<div class=\"" + className + "\">" +
            "			<p class=\"text\">" + comments + "</p>" +
            "		</div>" +
            "		<div class=\"inputCertInfo\" id=\"requestScene\">" +
            "		<fieldset>" +
            "			<legend>�몄쬆 �뺣낫 �낅젰</legend>" +
            "			<ul>" +
            "				<li class=\"inputName\">" +
            "					<label>�대쫫</label>" +
            "					<span class=\"inputarea\"><input type=\"text\" id=\"name\"/></span>" +
            "				</li>" +
            "				<li class=\"inputPhoneNum\">" +
            "					<label>�대��� 踰덊샇</label>" +
            "					<span class=\"inputarea\">" +
            "						<select name=\"phoneNo1\" id=\"phoneNo1\">" +
            "							<option value=\"010\" selected=\"selected\">010</option>" +
            "							<option value=\"011\">011</option>" +
            "							<option value=\"016\">016</option>" +
            "							<option value=\"017\">017</option>" +
            "							<option value=\"018\">018</option>" +
            "							<option value=\"019\">019</option>" +
            "						</select>" +
            "						<span>-</span>" +
            "						<input type=\"text\" id=\"phoneNo2\" name=\"phoneNo2\"/>" +
            "						<span>-</span>" +
            "						<input type=\"text\" id=\"phoneNo3\" name=\"phoneNo3\" />" +
            "					</span>" +
            "				</li>" +
            "				<li class=\"inputCompany\">" +
            "					<label>�대룞�듭떊��</label>" +
            "					<span class=\"inputarea\">" +
            "						<input type=\"radio\" id=\"phoneCorp_SKT\" name=\"phoneCorp\" value=\"SKT\" class=\"radio\" checked=\"checked\" /> <label for=\"phoneCorp_SKT\">SKT</label>" +
            "						<input type=\"radio\" id=\"phoneCorp_KTF\" name=\"phoneCorp\" value=\"KTF\" class=\"radio\" /> <label for=\"phoneCorp_KTF\">KT</label>" +
            "						<input type=\"radio\" id=\"phoneCorp_LGT\" name=\"phoneCorp\" value=\"LGT\" class=\"radio\" /> <label for=\"phoneCorp_LGT\">LGT</label>" +
            "					</span>" +
            "				</li>" +
            "				<li class=\"inputBirth\">" +
            "					<label>�앸뀈�붿씪</label>" +
            "					<span class=\"inputarea\">" +
            "						<select name=\"birthDateYear\" id=\"birthDateYear\">" +
            "						</select>" +
            "						<select name=\"birthDateMonth\" id=\"birthDateMonth\">" +
            "						</select>" +
            "						<select name=\"birthDateDay\" id=\"birthDateDay\">" +
            "						</select>" +
            "					</span>" +
            "				</li>" +
            "				<li class=\"inputGender\">" +
            "					<label>�깅퀎</label>" +
            "					<span class=\"inputarea\">" +
            "						<input type=\"radio\" name=\"gender\" id=\"male\"  value=\"0\" class=\"radio\" checked=\"checked\" /> <label for=\"male\">��</label>" +
            "						<input type=\"radio\" name=\"gender\" id=\"feamle\"  value=\"1\" class=\"radio\" /> <label for=\"feamle\">��</label>" +
            "					</span>" +
            "				</li>" +
            "				<li class=\"inputNationality\">" +
            "					<label>援�쟻</label>" +
            "					<span class=\"inputarea\">" +
            "						<input type=\"radio\" id=\"native\" name=\"nation\"  value=\"0\" class=\"radio\" checked=\"checked\" /> <label for=\"native\">�닿뎅��</label>" +
            "						<input type=\"radio\" id=\"foreigner\" name=\"nation\"  value=\"1\" class=\"radio\" /> <label for=\"foreigner\">�멸뎅��</label>" +
            "					</span>" +
            "				</li>" +
            "			</ul>" +
            "			<p class=\"agreeChk\">" +
            "				<input type=\"checkbox\" id=\"certAgreePrivate\" name=\"certAgreePrivate\" value=\"Y\" />" +
            "				<label for=\"agreeChk\"><a href=\"javascript:bugs.ui.adult.popupTerms('private');\">媛쒖씤�뺣낫 �섏쭛/�댁슜</a>�� �숈쓽�⑸땲��.</label>" +
            "			</p>" +
            "		</fieldset>" +
            "		<p class=\"btns\">" +
            "			<button id=\"reqSmsNum\" class=\"btnNormal strong\">�몄쬆踰덊샇 �붿껌</button>" +
            "			<button id=\"btnCancel\"class=\"btnNormal\">痍⑥냼</button>" +
            "		</p>" +
            "		</div>" +
            "		<div class=\"inputCertNumber\" id=\"authScene\" style=\"display:none;\">" +
            "			<strong class=\"inputCertMessage\"><span id=\"showPhoneNo\"></span>濡� 諛쒖넚�� �몄쬆踰덊샇 6�먮━瑜� �낅젰�� 二쇱꽭��</strong>" +
            "			<fieldset>" +
            "				<legend>�몄쬆踰덊샇�낅젰</legend>" +
            "				" +
            "				<div class=\"inputNum\">" +
            "					<label>�몄쬆踰덊샇</label>" +
            "					<span class=\"inputarea\"><input type=\"text\" id=\"smsNum\" name=\"smsNum\" maxLength=\"6\" />" +
            "						<span>�⑥� �쒓컙 <em id=\"countDown\">2遺� 54珥�</em> �대궡�� �낅젰�� 二쇱꽭��.</span>" +
            "					</span>" +
            "				</div>" +
            "				<p class=\"recheck\" id=\"reSendSmsNum\">" +
            "					�몄쬆踰덊샇瑜� 諛쏆� 紐삵븯�⑤떎硫� <a href=\"javascript:void(0);\">�몄쬆踰덊샇 �ㅼ떆諛쏄린</a>" +
            "				</p>" +
            "			</fieldset>" +
            "			<p class=\"btns\">" +
            "				<button id=\"authSmsNum\" class=\"btnNormal strong\">�몄쬆�뺤씤</button>" +
            "				<button class=\"btnNormal\" id=\"cancelBtnNormal\">痍⑥냼</button>" +
            "			</p>" +
            "		</div>" +


            "	</section>" +
            "	<button id=\"btnClose\" class=\"btnClose\">�リ린</button>" +
            "</aside>";

        var adultLayerCss = "layer layerCertification title";
        var isModal = true;

        if (location.href.indexOf("Radio?") > -1 || location.href.indexOf("Player?") > -1) {
            adultLayerCss = "layer layerCertification title player";
            isModal = false;
        }

        var adultLayer = new bugs.ui.popup(msg, {
            title: "adult",
            modal: isModal,
            css: adultLayerCss,
            onInit: function(popup) {

                // �덉씠�� 李� 硫붿꽭吏� 蹂�寃�
                popup.setTitle(title);

                // 珥덇린��
                bugs.ui.adult.initData(popup);
                bugs.ui.adult.initScene(popup);

                var t = new Date();
                var yy = t.getFullYear();

                var optionDateYear = "<option value=\"\">��</option>";
                for (var i = yy; i >= 1900; i--) {
                    optionDateYear += "<option value=\"" + i + "\">" + i + "</option>";
                }

                var optionDateMonth = "<option value=\"\">��</option>";
                for (var i = 1; i <= 12; i++) {
                    optionDateMonth += "<option value=\"" + i + "\">" + i + "</option>";
                }

                var optionDateDay = "<option value=\"\">��</option>";
                for (var i = 1; i <= 31; i++) {
                    optionDateDay += "<option value=\"" + i + "\">" + i + "</option>";
                }

                popup.layer.find("select[name=birthDateYear]").append(optionDateYear);
                popup.layer.find("select[name=birthDateMonth]").append(optionDateMonth);
                popup.layer.find("select[name=birthDateDay]").append(optionDateDay);

                //�リ린踰꾪듉
                popup.layer.find("#btnCancel, #btnClose, #cancelBtnNormal").click(function(e) {

                    try {
                        var Dns = location.href;
                        if (Dns.indexOf("popup/certification") != -1) {
                            self.close();
                            return;
                        }
                    } catch (e) {}

                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();

                    try {
                        bugs.layerFocusNavi.remove(this.layer);
                    } catch (e) {};
                }.bind(this));

                // �몄쬆踰덊샇 諛쏄린
                popup.layer.find("#reqSmsNum, #reSendSmsNum a").click(function(e) {

                    // �ъ쟾�� 援щ텇
                    if (!bugs.valid.isNull(jQuery(e.currentTarget).attr("data-reSend"))) {
                        popup.layer.find("input[name=reSend]").val(jQuery(e.currentTarget).attr("data-reSend"));
                    }

                    var objParams = bugs.ui.adult.getObjParams(popup);

                    objParams.type = type;

                    if (bugs.ui.adult.checkParams(popup, objParams)) {

                        // �몄쬆踰덊샇 �붿껌
                        jQuery.ajax({
                            type: 'GET',
                            dataType: "jsonp",
                            cache: false,
                            url: g_urlMember + "/cert/request/key?callback=?",
                            data: objParams,
                            success: function(rtnVal) {

                                if (rtnVal.code == "OK") {

                                    // �꾨떖 �곗씠�� �낅젰
                                    if (!bugs.valid.isNull(rtnVal.data)) {
                                        popup.layer.find("input[name=check_1]").val(rtnVal.data.check_1);
                                        popup.layer.find("input[name=check_2]").val(rtnVal.data.check_2);
                                        popup.layer.find("input[name=check_3]").val(rtnVal.data.check_3);
                                        popup.layer.find("input[name=CI]").val(rtnVal.data.CI);
                                        popup.layer.find("input[name=DI]").val(rtnVal.data.DI);

                                        // 紐⑤뱺 �낅젰李� �ㅻ뱶 泥섎━
                                        //popup.layer.find("input, select").not("input[name=smsNum]").attr("disabled", "disabled");
                                        popup.layer.find("input[name=smsNum]").focus();

                                        // �붾㈃�뺣━
                                        popup.layer.find("fieldset:eq(0) p.telMsg").empty().hide();

                                        popup.layer.find("#requestScene").hide();
                                        popup.layer.find("#authScene").show();

                                        popup.layer.find("#reqSmsNum").hide();
                                        popup.layer.find("#authSmsNum").show();

                                        // �뺣낫�쒖떆
                                        popup.layer.find("#showPhoneNo").text(objParams.phoneNo);
                                        popup.layer.find("#smsNum").focus();

                                        // 移댁슫��
                                        if ("Y" == objParams.reSend) {
                                            bugs.ui.adult.showCountdown(popup, 180, "reStart");
                                        } else {
                                            bugs.ui.adult.showCountdown(popup, 180, "");
                                        }
                                    } else {

                                        alert("蹂몄씤�몄쬆 �뺣낫瑜� �뺤씤�� �� �놁뒿�덈떎.");
                                        return;

                                    }
                                } else {
                                    alert(rtnVal.message);
                                    return;
                                }
                            },
                            error: function() {
                                alert("蹂몄씤�뺤씤�섏� 紐삵뻽�듬땲��. �ㅼ떆 �쒕룄�� 二쇱꽭��.");
                                return;
                            }
                        });
                    }
                });

                //�몄쬆�뺤씤 踰꾪듉
                popup.layer.find("#authSmsNum").click(function(e) {

                    // �쒗븳�쒓컙 �뺤씤
                    if (bugs.ui.adult.remainTime == -1) {
                        alert('�낅젰 �쒗븳�쒓컙�� 珥덇낵�덉뒿�덈떎.\n�몄쬆踰덊샇 �ㅼ떆 諛쏄린瑜� �좏깮�� 二쇱꽭��.');
                        return false;
                    }

                    var objParams = bugs.ui.adult.getObjParams(popup);

                    objParams.type = type;

                    if (bugs.ui.adult.checkParams(popup, objParams)) {

                        if (bugs.valid.isNull(objParams.smsNum)) {
                            alert('�몄쬆踰덊샇瑜� �낅젰�� 二쇱꽭��.');
                            return false;
                        }

                        if (objParams.smsNum.length != 6) {
                            alert('�몄쬆踰덊샇 6�먮━瑜� �뺥솗�섍쾶 �낅젰�� 二쇱꽭��.');
                            return false;
                        }

                        if (bugs.valid.isNull(objParams.check_1) || bugs.valid.isNull(objParams.check_2) || bugs.valid.isNull(objParams.check_3)) {
                            alert('�몄쬆踰덊샇 �꾩넚 �� �댁슜�� 二쇱꽭��.');
                            return false;
                        }

                        jQuery.ajax({
                            type: 'GET',
                            dataType: "jsonp",
                            cache: false,
                            url: g_urlMember + "/cert/auth/key?callback=?",
                            data: objParams,
                            success: function(rtnVal) {
                                if (rtnVal.code == "OK") {
                                    if (rtnVal.data < 19 && "age" == type) {
                                        var msg = "19�� 誘몃쭔�� �댁슜�� �� �놁뒿�덈떎.";
                                        alert(msg);
                                        return;
                                    } else {

                                        try {
                                            var Dns = location.href;
                                            if (Dns.indexOf("popup/certification") != -1) {
                                                opener.location.reload();
                                                self.close();
                                                return;
                                            }
                                        } catch (e) {}

                                        if (bugs.ui.adult.reloadFunction != null && typeof bugs.ui.adult.reloadFunction == "function") {
                                            bugs.ui.adult.reloadFunction();
                                            return;
                                        }
                                        location.reload();
                                    }
                                } else {
                                    alert(rtnVal.message);
                                    return;
                                }
                            },
                            error: function() {
                                alert(title + "�� �ㅽ뙣�섏��듬땲��. 蹂몄씤�뺤씤 �뺣낫瑜� �ㅼ떆 �낅젰�� 二쇱꽭��.");
                                return;
                            }
                        });

                    }

                });

            }
        }).show();

    },

    nullTmp: {}
};

bugs.ui.popupClick = function(e) {
    var layerObj = $(e.data.obj);
    var target = $(e.target);
    var targetClass = target.parents('aside').attr('class');
    var targetClass2 = target.parents('div#loginHeader').attr('class');


    if (!(!bugs.valid.isNull(targetClass2) && targetClass2.indexOf("login") >= 0) &&
        (bugs.valid.isNull(targetClass) || targetClass.indexOf("layer") < 0)) {

        layerObj.hide();
        bugs.layerFocusNavi.remove(layerObj);
        $(document).unbind("click", bugs.ui.popupClick);

        var tClass = target.parent('div').attr('class');

        if (tClass == "login" || (!bugs.valid.isNull(tClass) && tClass.indexOf("myinfo") != -1)) {
            if (!e) var e = window.event;
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }

    }

};

bugs.ui.setLayCtrl = function(selector) {
    $(selector).attr("layCtrl", "Y");
    $(document).on("mouseup", bugs.ui.offLayCtrl);
};

bugs.ui.offLayCtrl = function() {
    $("[layCtrl]").hide();
    $("[layCtrl]").removeAttr("layCtrl");
    $(document).off("mouseup", bugs.ui.offLayCtrl);
};

bugs.ui.cp = {
    headerGameMenuToggle: function() {
        $('.layer.gameMenu').toggle();
        bugs.wiselog.area('M_header_02_02');
        bugs.ui.setLayCtrl('.layer.gameMenu');
    },
    footerFamilySiteMenu: function() {
        $('.layer.familysiteMenu').toggle();
        bugs.wiselog.area('M_fotter_03_01');
        bugs.ui.setLayCtrl('.layer.familysiteMenu');
    }
};

bugs.ui.pcLoginLog = function() {

    try {

        //Pc �뺣낫 異붿텧
        var f_ver = swfobject.getFlashPlayerVersion();
        var browserName; //釉뚮씪�곗�紐�
        var browserVer; //釉뚮씪�곗� 踰꾩쟾
        var browserLang; //釉뚮씪�곗� �몄뼱
        var browserResolution; //�댁긽��
        var browserWidth; //理쒕� 媛�濡쒓만��
        var browserHeight; //理쒕� �몃줈湲몄씠
        var browserOS = "Win"; //OS醫낅쪟
        var browserFlashVer; //flash踰꾩쟾

        browserWidth = 0; // 珥덇린��
        browserHeight = 0; // 珥덇린��

        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)) {

            browserName = "msie";
            browserVer = '11.0';

        } else if ((navigator.userAgent.indexOf("msie") != -1)) {

            browserName = "msie";
            browserVer = navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1];

        } else {

            try {
                browserName = jQuery.browser.name;
                browserVer = jQuery.browser.version;
            } catch (e) {
                browserName = 'unknown';
                browserVer = "1";
            }

            if (navigator.userAgent.match(/Edge/i)) {
                browserName = 'Edge';
                browserVer = browserVer = '12.0';
            }

        }

        if (navigator.userAgent.indexOf('Mac') != -1) {
            browserOS = "Mac";
        } else {
            if (navigator.appVersion.indexOf("NT 5.1") != -1) browserOS = "WinXP";
            if (navigator.appVersion.indexOf("NT 6.0") != -1) browserOS = "WinVista";
            if (navigator.appVersion.indexOf("NT 6.1") != -1) browserOS = "Win7";
            if (navigator.appVersion.indexOf("NT 6.2") != -1) browserOS = "Win8";
            if (navigator.appVersion.indexOf("NT 10") != -1) browserOS = "Win10";
        }

        browserLang = navigator.browserLanguage;
        browserResolution = screen.width + " x " + screen.height;
        browserWidth = screen.availWidth;
        browserHeight = screen.availHeight;
        browserFlashVer = f_ver.major + "." + f_ver.minor + "." + f_ver.release;
        if (browserWidth == null || browserHeight == null) {
            browserWidth = 0;
            browserHeight = 0;
        }
        if (browserWidth == "" || browserHeight == "") {
            browserWidth = 0;
            browserHeight = 0;
        }

        objParams = {
            browserName: browserName.toLowerCase(),
            browserVer: browserVer,
            browserLang: browserLang,
            browserResolution: browserResolution,
            browserWidth: browserWidth,
            browserHeight: browserHeight,
            browserOS: browserOS,
            browserFlashVer: browserFlashVer,
            decorator: "blank"
        };

        jQuery.post(
            g_urlAjax + "/logging/pcLogInsert",
            objParams,
            function(response) {
                //location.href=g_urlMusic+"/index/";
            }
        );

    } catch (e) {}
};

bugs.ui.showPlayerSettingLayer = function() {
    // 蹂댁뿬吏��� 怨듯넻 �덉씠�� 紐⑤몢 �リ린
    bugs.layermenu.removeOldLayer();

    // 荑좏궎�먯꽌 �뺣낫 媛��몄삤湲�
    var selectedPlayer = bugs.cookie.get('defaultPlayer') || "";

    if (selectedPlayer == "" || selectedPlayer == "WEB") {
        $('input:radio[name=radio_player_type1]:input[value=WEB]').attr("checked", true);
    } else {
        $('input:radio[name=radio_player_type1]:input[value=MAC]').attr("checked", true);
    }

    if (bugs.ui._playerSettingLayer && bugs.ui._playerSettingLayer.layer.is(":visible")) {
        bugs.ui._playerSettingLayer.hide();
    } else {
        bugs.ui._playerSettingLayer = new bugs.ui.popup($('.layerSettingPlayer.selectPlayer'), {
            title: "layerSettingPlayer.selectPlayer",
            modal: true,
            onInit: function(popup) {
                popup.layer.find("button.btnNormal").unbind("click").click(function() {
                    var rpt = $(":input:radio[name=radio_player_type1]:checked").val();
                    var oDate = new Date();
                    oDate.setDate(oDate.getDate() + 365);
                    bugs.cookie.set("defaultPlayer", rpt, oDate, "/", "bugs.co.kr");
                    if (typeof updateHeaderPlayerMenu == "function")
                        updateHeaderPlayerMenu(rpt);

                    if (rpt == "WEB") {
                        bugs.wiselog.area('player_Header_01');
                    } else { // rtp == "MAC"
                        bugs.wiselog.area('player_Header_02');
                    }

                    alert("�ㅼ젙�� ���λ릺�덉뒿�덈떎.", function() {
                        bugs.ui.modalLayer.hide();
                        popup.layer.hide();
                    });
                    return false;
                });

                popup.layer.find("button.btnClose").unbind("click").click(function() {
                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();
                    return false;
                });

            }
        }).show();
    }
};

bugs.ui.showPlayerSelectLayer = function(type, params) {
    // 蹂댁뿬吏��� 怨듯넻 �덉씠�� 紐⑤몢 �リ린
    bugs.layermenu.removeOldLayer();

    // 荑좏궎�먯꽌 �뺣낫 媛��몄삤湲�
    var selectedPlayer = bugs.cookie.get('defaultPlayer') || "";

    if (selectedPlayer == "" || selectedPlayer == "WEB") {
        $('input:radio[name=radio_player_type2]:input[value=WEB]').attr("checked", true);
    } else {
        $('input:radio[name=radio_player_type2]:input[value=MAC]').attr("checked", true);
    }

    if (bugs.ui._playerSelectLayer && bugs.ui._playerSelectLayer.layer.is(":visible")) {
        bugs.ui._playerSelectLayer.hide();
    } else {
        bugs.ui._playerSelectLayer = new bugs.ui.popup($('.layerSettingPlayer.guide'), {
            title: "layerSettingPlayer.guide",
            modal: true,
            onInit: function(popup) {
                popup.layer.find("button.btnNormal").unbind("click").click(function() {
                    var rpt = $(":input:radio[name=radio_player_type2]:checked").val();
                    var oDate = new Date();
                    oDate.setDate(oDate.getDate() + 365);
                    bugs.cookie.set("defaultPlayer", rpt, oDate, "/", "bugs.co.kr");
                    bugs.cookie.set("dpConfirm", $("#setPlayerSelectionConfirm").is(':checked') ? "N" : "Y", oDate, "/", "bugs.co.kr");
                    if (typeof updateHeaderPlayerMenu == "function")
                        updateHeaderPlayerMenu(rpt);

                    if (rpt == "WEB") { // Web Player �ㅼ젙�쇰줈 cookie媛� 諛붾�뚯뿀�쇰땲, 洹몃깷 bugs.music.listen�� 洹몃�濡� �ㅼ떆 �몄텧�대룄 臾대갑
                        bugs.wiselog.area('player_List_01');
                        if (type == "TRACKALL") {
                            params.obj.listenAll(params.btn, params.type, params.tapToPlay, { macPlayerCheck: "N" });
                        } else {
                            bugs.music.listen(params.trackId, params.autoplay, { macPlayerCheck: "N" });
                        }
                    } else { // if(rpt == "MAC")
                        bugs.wiselog.area('player_List_02');
                        bugs.ui.toastMacPlayerLinked();

                        setTimeout(function() {
                            var runScheme = 'app/tracks/' + params.trackId;
                            if (params.autoplay)
                                runScheme += '?autoplay=Y';

                            if (params.tapToPlay != null)
                                runScheme += (params.autoplay ? '&' : '?') + (params.tapToPlay ? 'deleteAll=Y' : (params.tapToPlay == false ? 'deleteAll=N' : ''));

                            location.href = bugs.app.getBugsScheme(runScheme, 3);
                        }, 2500);
                    }

                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();
                    return false;
                });

                popup.layer.find("button.btnClose").unbind("click").click(function() {
                    bugs.ui.modalLayer.hide();
                    popup.layer.hide();
                    return false;
                });

            }
        }).show();
    }
};

bugs.ui.toastMacPlayerTimer = null;
bugs.ui.toastMacPlayerLinked = function() { // msg : 硫붿떆吏� �댁슜, dimmed : 諛곌꼍 dimmed �щ�, fadeout : fadeout �곸슜�� �쒓컙(�ъ슜�덊븷 寃껋씠�쇰㈃ 0 �먮뒗 undefined)

    var obj;
    if (document.getElementById("layerPlayingMacPlayer") == null) {
        obj = document.createElement("aside");
        obj.id = "layerPlayingMacPlayer"
        obj.className = "layer layerPlayingPlayer";
        obj.style.display = "none";

        var layer = '<div class="box-shadow"></div>';
        layer += '	<section class="layerContents">';
        layer += '	<strong class="message">踰낆뒪 �뚮젅�댁뼱濡� �ъ깮�⑸땲��.</strong>';
        layer += '		<ul>';
        layer += '			<li>踰낆뒪 �뱀긽�� &gt; �뚮젅�댁뼱 �좏깮�먯꽌 �뚮젅�댁뼱瑜� 蹂�寃쏀븷 �� �덉뒿�덈떎.</li>';
        layer += '			<li>�뱀떆 踰낆뒪 �뚮젅�댁뼱媛� �ㅽ뻾�섏� �딅뒗�ㅻ㈃? <a href="https://music.bugs.co.kr/serviceGuide/pc/bugsPlayer?sub=macPlayer" onclick="$(\'.layerPlayingPlayer\').hide();" target="_blank">[�ㅼ튂 �덈궡 諛붾줈媛�湲�]</a></li>';
        layer += '		</ul>';
        layer += '	</section>';

        obj.innerHTML = layer;
        document.body.appendChild(obj);
    } else {
        obj = document.getElementById("layerPlayingMacPlayer"); // $("#layerPlayingMacPlayer");
    }

    clearTimeout(bugs.ui.toastMacPlayerTimer);

    var _position = "absolute";
    var _top = Math.max(0, (($(window).height() - $(obj).outerHeight()) / 2) + $(window).scrollTop()) + "px";
    var _left = Math.max(0, (($(window).width() - $(obj).outerWidth()) / 2) + $(window).scrollLeft()) + "px";

    $(obj).hide();
    $(obj).css({ 'position': _position, 'top': _top, 'left': _left });
    $(obj).fadeIn(1000);

    bugs.ui.toastMacPlayerTimer = layerFadeoutTimer = setTimeout(function() {
        $(obj).fadeOut(1000);
    }, 5000);
};

if (!isXP && !isIE78) var song = new Audio();

// 罹≪콬 異붽�
var getCaptcha = function(type) {
    if (!isXP && !isIE78) {
        $("#inputCaptcha").val("");
        song.pause();
        if (!isEdge) {
            $("#captchaAudio")[0].pause();
        }

        //IE�� 寃쎌슦 pause
        if (audio != null) {
            audio.stop();
            audio.currentTime = 0;
            audio.setAttribute('src', '');
        }
    }

    jQuery.ajax({
        type: 'POST',
        dataType: "jsonp",
        cache: false,
        url: g_urlSecure + "/api/internal/member/captcha/key",
        data: null,
        jsonp: "callback",
        success: function(rtnVal) {
            $("#key").val(rtnVal.data.key);

            // �뚯꽦�멸꼍��
            if (type == 'sound') {
                if (!isSafari && !isWin10) {

                    var soundUrl = rtnVal.data.soundSrc;
                    $("#captchaVideoSource").attr('src', soundUrl);

                    if (!isIE78) song = new Audio(soundUrl);

                    try {
                        if (!song.canPlayType('audio/wav')) {
                            throw new Error('');
                        }
                        if (!isIE78) song.play();

                    } catch (e) {
                        var playerArea = document.getElementById("captchaAudio");
                        playerArea.innerHTML = "<embed src='" + soundUrl + "' id='embed_audio' hidden='true' showstatusbar='false' showcontrols='false' showaudiocontrols='false' showtracker='false' type='audio/wav'>";
                        audio = document.getElementById("embed_audio");
                        audio.setAttribute('src', soundUrl);
                        audio.setAttribute('hidden', true);
                        audio.setAttribute('autostart', true);
                        audio.setAttribute('showstatusbar', false);
                        audio.setAttribute('showcontrols', false);
                        audio.setAttribute('showaudiocontrols', false);
                        audio.setAttribute('showtracker', false);
                        playerArea.appendChild(audio);
                    }

                    $("#captcha_image").hide();
                    $("#captcha_sound").show();

                    $(".btnImage").focus();
                }
                //�대�吏��� 寃쎌슦
            } else {
                $("#captchaImg").attr('src', rtnVal.data.imgSrc);

                $("#captcha_sound").hide();
                $("#captcha_image").show();

                $(".btnVoice").focus();
            }

            //mac safari�� 寃쎌슦 �뚯꽦�ｊ린 踰꾪듉 ��젣
            if (isSafari) {
                $("#btnCaptchaReload").addClass("big");
            }

            $("#captcha").show();
        },
        async: false,
        error: function() {
            $("#loginDesc").text('�쇱떆�곸씤 �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎. �좎떆 �� �ㅼ떆 �쒕룄�� 二쇱꽭��.').show();
        }
    });

}

//-----------------------------------------------------------------------------