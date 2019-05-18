//
function openWindowWithPost(url, name, keys, values, option) {
    var newWindow;
    if (typeof option == "undefined") {
        newWindow = window.open(url, name);
    } else {
        newWindow = window.open(url, name, option);
    }

    if (!newWindow) return false;
    var html = "";
    html += "<html><head>";
    html += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    html += "</head><body><form id='formid' method='post' action='" + url + "'>";
    if (keys && values && (keys.length == values.length))
        for (var i = 0; i < keys.length; i++)
            html += "<input type='hidden' name='" + keys[i] + "' value='" + values[i] + "'/>";
    html += "</form><script type='text/javascript'>document.getElementById(\"formid\").submit()</script></body></html>";

    newWindow.document.write(html);
    return newWindow;
}

function openWindowWithPost1(url, name, keys, values, option) {
    var html = "<form name='" + name + "' id='formid' method='post' target='" + name + "'>";
    if (keys && values && (keys.length == values.length))
        for (var i = 0; i < keys.length; i++)
            html += "<input type='hidden' name='" + keys[i] + "' value='" + values[i] + "'/>";
    html += "</form>"
    var frm = $(html).get(0);
    frm.action = url;
    frm.target = name;

    if (typeof option == "undefined") {
        frm.onsubmit = function() {
            window.open(url, name);
        };
    } else {
        frm.onsubmit = function() {
            window.open(url, name, option);
        };
    }
    frm.submit();
}

function __afterTwitterSetting() {}

bugs.personMedia = {
    layer: null,
    setting: function() {
        if (!g_isLogged) {
            bugs.ui.showLoginLayer();
            return;
        }

        var url = g_urlAjax + "/external/connectionManager";
        $.get(url, function(result) {
            if (result != "") {
                if (bugs.personMedia.layer != null) {
                    bugs.personMedia.layer.remove();
                }
                bugs.personMedia.layer = $(result);
                bugs.personMedia.layer.css({ position: "absolute", left: "50%", top: 186, "margin-left": -227 });
                bugs.personMedia.layer.appendTo("body");

                /*
                __afterTwitterSetting = function() {
                	alert("");
                	__afterTwitterSetting();
                };
                */
            } else {}
        });
    },
    twitterAuth: function() {
        bugs.personMedia.close();
        bugs.twitter.popupAuth();
    },
    cancelTwitter: function() {
        var url = g_urlAjax + "/external/twitter/cancel";
        $.post(url, function(result) {
            if (result == "200") {

                $("#twitterAuthY").hide();
                $("#twitterAuthN").show();
                bugs.ui.showAlert("�곕룞�� �댁젣 �섏뿀�듬땲��.", { css: "layerAdultNotice" });
            } else {
                bugs.ui.showAlert("�곕룞 �댁젣媛� �ㅽ뙣 �섏��듬땲��.", { css: "layerAdultNotice" });
            }
        });
    },
    close: function() {

        if (bugs.personMedia.layer != null) {
            bugs.personMedia.layer.hide();
            bugs.personMedia.layer.remove();

        }
    },
    log: function(cols, nums, scriptYn) {
        if (g_msrl != false) {
            if (typeof nums != "undefined") {
                nums[nums.length] = g_msrl;
            }
        }
        if (typeof scriptYn == "undefined") scriptYn = false;
        bugs.logging.add(bugs.twitter.logId, cols, nums, scriptYn);
    }
}




bugs.twitter = {
    logId: 201,
    popupAuth: function(text, isSave) {
        if (typeof isSave == "undefinde") isSave = true;

        var url = g_urlMusic + '/external/twitter/authorize?decorator=blank';
        if (isSave == false) {
            url = url + "&save=false";
        }
        if (!bugs.valid.empty(text)) {
            url = url + "&text=" + encodeURIComponent(text);
            //var win = openWindowWithPost1(url, "_twitter", ["text"], [text], 'width=800,height=400,top=100,left=100,resizable=yes,scrollbars=no');
            //win.focus();
        } else {
            //			var win = window.open(url,'_twitter','width=800,height=400,top=100,left=100,resizable=yes,scrollbars=no');
            //			win.focus();
        }
        var win = window.open(url, '_twitter', 'width=1080,height=400,top=100,left=100,resizable=yes,scrollbars=no');
        win.focus();

    },
    popupStatus: function(text, url) {
        if (typeof text == "undefined") return;
        // () �뚮Ц�� IE�먯꽌 援먯감�ㅽ겕由쏀듃 諛⑹�瑜� �꾪빐�� �섏씠吏�瑜� 蹂�寃쏀뻽�ㅺ퀬 �섏��� 異붽���
        text = text.replace(/\(/g, "<");
        text = text.replace(/\)/g, ">");
        //var url =  "http://twitter.com/?status=" + encodeURIComponent(text);
        var url = "http://twitter.com/share?text=" + encodeURIComponent(text) + "&url=" + (url || "");
        var win = window.open(url, '_twitterStatus', 'width=600,height=280,top=100,left=100,resizable=yes,scrollbars=no');
        try { win.focus(); } catch (e) {}
    },
    checkAuth: function(success, fail) {
        var url = g_urlAjax + '/external/twitter/checkAuth';
        $.get(url, function(result) {
            bugs.log.log(result);
            if (typeof result != "undefined" && result == "1") {
                success();
            } else {
                fail();
            }
        });
    },
    textTemplate: '<h2 class="twitter">�몄쐞�곕줈 蹂대궡湲�</h2>' +
        '<div class="sendCode">' +
        '	<p><%=text%></p>' +
        '</div>' +
        '<div class="btnArea">' +
        '	<span class="button typeME"><a href="javascript:void(0);">�뺤씤</a></span>' +
        '	<span class="button typeM"><a href="javascript:void(0);">痍⑥냼</a></span>' +
        '</div>',
    connectTemplate: '<p class="textAdminC">' +
        '	�몄쐞�� �몄쬆�뺣낫瑜� ���ν븯�쒕㈃<br />蹂대떎 �쎄쾶 怨듭쑀�� �� �덉뒿�덈떎.' +
        '</p>' +
        '<div class="btnArea">' +
        '	<span class="button typeME"><a href="javascript:void(0);">�뺤씤</a></span>' +
        '	<span class="button typeM"><a href="javascript:void(0);">痍⑥냼</a></span>' +
        '</div>',
    updateLayer: null,
    updateStatus: function(text, url) {
        bugs.twitter.popupStatus(text, url);
        return;
        if (!g_isLogged) {
            bugs.twitter.statusPopup(text, function() {
                bugs.twitter.popupAuth(text);
            });
            //bugs.twitter.popupStatus(text);
            return;
        } else {
            bugs.twitter.checkAuth(
                function() { // success
                    bugs.twitter.statusPopup(text, function() {
                        var updateUrl = g_urlAjax + "/external/twitter/updateStatus";
                        $.post(updateUrl, { text: text }, function(result) {
                            bugs.twitter.updateLayer.hide();
                            bugs.twitter.updateLayer.remove();

                            if (200 == result) {
                                //								bugs.ui.showAlert("�몄쐞�곗뿉 蹂대궡湲� �깃났 �섏��듬땲��.", {css : "layerAdultNotice"});
                                alert("怨듭쑀�섏뿀�듬땲��.");
                                return;
                            } else {
                                //								bugs.ui.showAlert("�몄쐞�곗뿉 蹂대궡湲곌� �ㅽ뙣 �섏��듬땲��.<br/>�좎떆 �꾩뿉 �ㅼ떆 �쒕룄�섏뿬 二쇱꽭��.", {css : "layerAdultNotice"});
                                alert("怨듭쑀�섏� 紐삵뻽�듬땲��. �좎떆 �� �ㅼ떆 �쒕룄�� 二쇱꽭��.");
                                return;
                            }

                        });
                    });
                },
                function() { // fail
                    bugs.twitter.connectPopup(text);
                }
            );
        }
    },
    statusPopup: function(text, initOk) {
        var tmp = new bugs.template(bugs.twitter.textTemplate, { text: text });
        bugs.twitter.updateLayer = new bugs.ui.popup(tmp.html(), {
            title: "蹂대궡湲�",
            css: "layerSendContent"
        });
        bugs.twitter.updateLayer.layer.find(".btnArea span:first a").click(function() {
            initOk();
            bugs.twitter.updateLayer.hide();
            bugs.twitter.updateLayer.remove();
        }).end().find(".btnArea span:last a").click(function() {
            bugs.twitter.updateLayer.hide();
            bugs.twitter.updateLayer.remove();
        });

        bugs.twitter.updateLayer.show();
    },
    popup: null,
    connectPopup: function(text) {
        var connectPopup = new bugs.ui.popup(bugs.twitter.connectTemplate, {
            title: "�몄쐞�� �곕룞�섍린",
            css: "layerAdminMsg"
        });
        bugs.twitter.popup = connectPopup;
        bugs.twitter.popup.layer.find(".btnArea span:first a").click(function() {
            bugs.twitter.popupAuth(text);
            bugs.twitter.popup.hide();
            bugs.twitter.popup.remove();
        }).end().find(".btnArea span:last a").click(function() {
            bugs.twitter.popupAuth(text, false);
            //bugs.twitter.popupStatus(text);
            bugs.twitter.popup.hide();
            bugs.twitter.popup.remove();
        });
        bugs.twitter.popup.show();
    },
    artist: function(artistId, artistNm) {
        //var url = bugs.url.artistPage(artistId);
        $.get(g_urlAjax + "/shortenurl/getUrl", { "type": "artist", "id": artistId }, function(result) {
            var url = result;

            if (typeof url == "undefined") return;
            var text = artistNm + " #踰낆뒪";
            bugs.twitter.updateStatus(text, url);
            bugs.personMedia.log(["twitter", "artist"], [artistId]);
        });
    },
    album: function(albumId, title, artistNm) {
        //var url = bugs.url.albumPage(albumId);
        $.get(g_urlAjax + "/shortenurl/getUrl", { "type": "album", "id": albumId }, function(result) {
            var url = result;

            if (typeof url == "undefined") return;
            var text = title.replace(/\\\'/g, "'") + " - " + artistNm + " #踰낆뒪";
            bugs.twitter.updateStatus(text, url);
            bugs.personMedia.log(["twitter", "album"], [albumId]);
        });
    },
    mv: function(mvId, title, artistNm) {
        var url = bugs.url.mvPage(mvId);
        if (typeof url == "undefined") return;
        var text = title.replace(/\\\'/g, "'") + " - " + artistNm + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "mv"], [mvId]);
    },

    esAlbum: function(albumId, title) {
        var url = bugs.url.esAlbumPage(albumId);
        if (typeof url == "undefined") return;
        var text = "[裕ㅼ쭅PD�⑤쾾] " + title.replace(/\\\'/g, "'") + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "esAlbum"], [albumId]);
    },
    musicPD: function(musicPDId, musicPDName) {
        var url = bugs.url.musicPDPage(musicPDId);
        if (typeof url == "undefined") return;
        var text = "[裕ㅼ쭅PD] " + musicPDName + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "musicPD"], [musicPDId]);
    },
    openAlbum: function(albumId, title) {
        var url = bugs.url.openAlbumPage(albumId);
        if (typeof url == "undefined") return;
        var text = "[怨듦컻�⑤쾾] " + title.replace(/\\\'/g, "'") + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "openAlbum"], [albumId]);
    },
    track: function(trackId, title, artistNm) {
        //var url = bugs.url.trackPage(trackId);
        $.get(g_urlAjax + "/shortenurl/getUrl", { "type": "track", "id": trackId }, function(result) {
            var url = result;

            if (typeof url == "undefined") return;
            var text = title.replace(/\\\'/g, "'") + " - " + artistNm + " #踰낆뒪";
            bugs.twitter.updateStatus(text, url);
            bugs.personMedia.log(["twitter", "track"], [trackId]);
        });
    },
    etc: function(url, title, eventId) {
        //		var url = bugs.url.trackPage(trackId);
        if (typeof url == "undefined") return;

        var text;
        if (eventId == 'kakaomusic') {
            text = title + " -  #移댁뭅�ㅻ�吏�";
        } else {
            text = title + " -  #踰낆뒪";
        }

        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "etc"], [eventId], true);
    },
    common: function(url, title) {
        if (typeof url == "undefined") return;
        var text = title + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
    },
    common2: function(url, title) {
        if (typeof url == "undefined") return;
        var text = title;
        bugs.twitter.updateStatus(text, url);
    },
    chart: function(chart, type, cn, date1, date2) {
        if (chart != "bugs") return;
        var text = "";
        var url = g_urlMusic + "/chart/" + chart + "/" + type + "?cn=" + cn;
        if (type == "newrealtime") {
            text = "踰낆뒪 �ㅼ떆媛� 李⑦듃(" + date1 + ")" + " #踰낆뒪";
        } else if (type == "realtime") {
            text = "踰낆뒪 �쇨컙 李⑦듃(" + date1 + ") " + " #踰낆뒪";
        } else if (type == "top1000") {
            text = "踰낆뒪 二쇨컙 李⑦듃(" + date1 + "~" + date2 + " ) " + " #踰낆뒪";
        }
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "chart", type], [cn]);
    },
    musiclounge: function(share_url, title, product_id) {
        var url;
        url = share_url;

        var text = "[裕ㅼ쭅�쇱슫吏�] " + title;
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "musiclounge"], [product_id]);
    },
    musicloungeBaseball: function(share_url, title, product_id) {
        var url;
        url = share_url;

        var text = title;
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "musicloungeBaseball"], [product_id]);
    },
    special: function(unicontent_id, corner, title, share_url) {
        var url;
        if (share_url == undefined || share_url == "")
            url = g_urlMusic + "/specialView/" + corner + "/" + unicontent_id;
        else
            url = share_url;

        var text = "[�ㅽ럹��] " + title + " #踰낆뒪";
        bugs.twitter.updateStatus(text, url);
        bugs.personMedia.log(["twitter", "special"], [unicontent_id]);
    },
    cancel: function() {}
}

// �쒖옉 - �섏씠�ㅻ턿 怨듭쑀 珥덇린��
window.fbAsyncInit = function() {
    FB.init({
        appId: '122936701116206',
        version: 'v2.12',
        xfbml: true
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.com/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// ��

bugs.facebook2 = {
    popup: function(url) {
        /*			
        			FB.ui(
        					 {
        					  method: 'share_open_graph',
        					  action_type: 'og.likes',
        					  action_properties: JSON.stringify({
        						    object:'https://developers.facebook.com/docs/',
        						  })
        					}, function(response){
        						  // Debug response (optional)
        						  console.log(response);						
        			});			
        */

        if (bugs.browser.getInternetExplorerVersion() == 7) {
            alert("Internet Explorer 7 釉뚮씪�곗��먯꽌�� 吏��먰븯吏� �딅뒗 湲곕뒫�낅땲��.");
            return;
        }

        FB.ui({
            method: 'share',
            href: url
        }, function(response) {
            if (response && !response.error_code) {
                // 怨듭쑀�섏뿀�� �� 泥섎━				alert("怨듭쑀�섏뿀�듬땲��.");
            } else {
                // 怨듭쑀 痍⑥냼 �먮뒗 �ㅻ쪟 諛쒖깮�� 泥섎━		alert("怨듭쑀媛� 痍⑥냼�섏뿀�듬땲��."); alert("怨듭쑀 �꾩쨷�� �ㅻ쪟媛� 諛쒖깮�섏��듬땲��. �ㅼ떆 �쒕룄�� 二쇱꽭��.")
            }
        });
    },
    album: function(albumId, title, artistNm) {
        if (typeof albumId == "undefined")
            return;

        var uu = bugs.url.albumPage(albumId) + "?ap=T";
        var tt = title + " - " + artistNm;
        bugs.facebook2.popup(uu);
        bugs.personMedia.log(["facebook", "album"], [albumId]);
    },
    artist: function(artistId, artistNm) {
        if (typeof artistId == "undefined")
            return;

        var uu = bugs.url.artistPage(artistId);

        bugs.facebook2.popup(uu, artistNm);
        bugs.personMedia.log(["facebook", "artist"], [artistId]);
    },
    track: function(trackId, title, artistNm) {
        if (typeof trackId == "undefined")
            return;

        var uu = bugs.url.trackPage(trackId) + "?ap=T";
        var tt = title + " - " + artistNm;

        bugs.facebook2.popup(uu);
        bugs.personMedia.log(["facebook", "track"], [trackId]);
    },
    mv: function(mvId, title, artistNm) {
        if (typeof mvId == "undefined")
            return;

        var uu = bugs.url.mvPage(mvId);
        var tt = title + " - " + artistNm;

        bugs.facebook2.popup(uu);
        bugs.personMedia.log(["facebook", "mv"], [mvId]);
    },
    esAlbum: function(albumId, title) {
        if (typeof albumId == "undefined")
            return;

        var uu = bugs.url.esAlbumPage(albumId) + "?ap=T";;
        var tt = "[裕ㅼ쭅PD] " + title;
        bugs.facebook2.popup(uu);
        bugs.personMedia.log(["facebook", "esAlbum"], [albumId]);
    },
    musicPD: function(musicPDId, musicPDName) {
        if (typeof musicPDId == "undefined")
            return;

        var uu = bugs.url.musicPDPage(musicPDId);
        var tt = musicPDName + "<br/>裕ㅼ쭅PD";

        bugs.facebook2.popup(uu);
        bugs.personMedia.log(["facebook", "musicPD"], [musicPDId]);
    },
    special: function(unicontent_id, corner, title, share_url) {
        var url;

        if (share_url == undefined || share_url == "")
            url = g_urlMusic + "/specialView/" + corner + "/" + unicontent_id + "?ap=T";
        else
            url = share_url;

        var tt = "[�ㅽ럹��] " + title;

        bugs.facebook2.popup(url);
        bugs.personMedia.log(["facebook", "special"], [unicontent_id]);
    },
    musiclounge: function(url, product_id) {
        bugs.facebook2.popup(url);
        bugs.personMedia.log(["facebook", "musiclounge"], [product_id]);
    },
    etc: function(url, eventID) {
        bugs.facebook2.popup(url);
        bugs.personMedia.log(["facebook", "etc"], [eventID]);
    }
};

bugs.facebook = {
    popup: function(uu, tt) {
        if (typeof uu == "undefined") return;
        var url = "http://www.facebook.com/sharer.php";
        // () �뚮Ц�� IE�먯꽌 援먯감�ㅽ겕由쏀듃 諛⑹�瑜� �꾪빐�� �섏씠吏�瑜� 蹂�寃쏀뻽�ㅺ퀬 �섏��� 異붽���
        tt = tt.replace(/\(/g, "<");
        tt = tt.replace(/\)/g, ">");
        url += "?u=" + escape(uu);
        if (typeof tt != "undefined")
            url += "&t=" + encodeURIComponent(tt);
        var win = window.open(url, 'facebook_share', 'width=772,height=450');
        if (typeof win == 'object') win.focus();
    },
    popup2: function(uu, tt) {
        if (typeof uu == "undefined") return;
        var url = "http://www.facebook.com/sharer.php";
        // () �뚮Ц�� IE�먯꽌 援먯감�ㅽ겕由쏀듃 諛⑹�瑜� �꾪빐�� �섏씠吏�瑜� 蹂�寃쏀뻽�ㅺ퀬 �섏��� 異붽���
        tt = tt.replace(/\(/g, "<");
        tt = tt.replace(/\)/g, ">");
        url += "?u=" + encodeURIComponent(uu);
        if (typeof tt != "undefined")
            url += "&t=" + encodeURIComponent(tt);
        var win = window.open(url, 'facebook_share', 'width=772,height=450');
        win.focus();
    },
    artist: function(artistId, artistNm) {
        if (typeof artistId == "undefined") return;
        var uu = bugs.url.artistPage(artistId);
        //$.get(g_urlMusic + "/shortenurl/getUrl", {"type":"artist", "id":artistId}, function(result) {
        //	var uu = result;
        bugs.facebook.popup(uu, artistNm);
        bugs.personMedia.log(["facebook", "artist"], [artistId]);
        //});
    },
    album: function(albumId, title, artistNm) {
        if (typeof albumId == "undefined") return;
        //var uu = "http://music.bugs.co.kr/external/facebook/album/" + albumId;
        var uu = bugs.url.albumPage(albumId);
        //$.get(g_urlMusic + "/shortenurl/getUrl", {"type":"album", "id":albumId}, function(result) {
        //var uu = result;
        var tt = title + " - " + artistNm;
        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "album"], [albumId]);
        //});
    },
    esAlbum: function(albumId, title) {
        if (typeof albumId == "undefined") return;
        var uu = bugs.url.esAlbumPage(albumId);
        var tt = "[裕ㅼ쭅PD] " + title;
        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "esAlbum"], [albumId]);
    },
    musicPD: function(musicPDId, musicPDName) {
        if (typeof musicPDId == "undefined") return;
        var uu = bugs.url.musicPDPage(musicPDId);
        var tt = musicPDName + "<br/>裕ㅼ쭅PD";
        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "musicPD"], [musicPDId]);
    },
    openAlbum: function(albumId, title) {
        if (typeof albumId == "undefined") return;
        var uu = bugs.url.openAlbumPage(albumId);
        var tt = "[怨듦컻�⑤쾾] " + title;
        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "openAlbum"], [albumId]);
    },
    track: function(trackId, title, artistNm) {
        if (typeof trackId == "undefined") return;
        var uu = bugs.url.trackPage(trackId);
        //$.get(g_urlMusic + "/shortenurl/getUrl", {"type":"track", "id":trackId}, function(result) {
        //var uu = result;
        var tt = title + " - " + artistNm;
        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "track"], [trackId]);
        //});
    },
    chart: function(chart, type, cn, date1, date2) {
        if (typeof type == "undefined") return;
        if (typeof cn == "undefined") return;
        var uu = g_urlMusic + "/chart/" + chart + "/" + type + "?cn=" + cn;
        var tt = "";
        if (type == "newrealtime") {
            tt = "踰낆뒪 �ㅼ떆媛� 李⑦듃";
        } else if (type == "realtime") {
            tt = "踰낆뒪 �쇨컙 李⑦듃(" + date1 + ")";
        } else if (type == "top1000") {
            tt = "踰낆뒪 二쇨컙 李⑦듃(" + date1 + "~" + date2 + " )";
        }

        bugs.facebook.popup(uu, tt);
        bugs.personMedia.log(["facebook", "chart", type], [cn]);
    },
    special: function(unicontent_id, corner, title) {
        var url = g_urlMusic + "/specialView/" + corner + "/" + unicontent_id;
        var tt = "[�ㅽ럹��] " + title;
        bugs.facebook.popup(url, tt);
        bugs.personMedia.log(["facebook", "special"], [unicontent_id]);
    },
    common: function(url, title) {
        bugs.facebook.popup(url, title);
    },
    musiclounge: function(url, product_id, mTitle) {
        bugs.facebook.popup(url, mTitle);
        bugs.personMedia.log(["facebook", "musiclounge"], [product_id]);
    },
    etc: function(url, title, eventID) {
        bugs.facebook.popup(url, title);
        bugs.personMedia.log(["facebook", "etc"], [eventID]);
    }

}

bugs.kakao = {
    appKey: 'a82fbdf7f1b0ff57e67a4bc07fdc365e',
    init: function() {
        Kakao.init(this.appKey);
    },
    cleanup: function() {
        Kakao.Story.cleanup();
    },
    story: function(url, postData, sendUrl, msrl) {
        if (sendUrl) {
            var sUrl = sendUrl +
                "?url=" + url +
                "&title=" + encodeURIComponent(postData.link_info.title) +
                "&desc=" + encodeURIComponent(bugs.utils.cutstring1(postData.link_info.description, 100)) +
                "&cont=" + encodeURIComponent(bugs.utils.cutstring1(postData.content, 100)) +
                "&msrl=" + encodeURIComponent(msrl) +
                "&host=" + encodeURIComponent(postData.link_info.host); // 移댁뭅�ㅻ�吏� 移댁뭅�ㅼ뒪�좊━ 怨듭쑀 �대깽�몃줈 �명빐 異붽�

            sUrl = encodeURIComponent(sUrl);

            if (postData.link_info.host == "www.kakao.com/music" || postData.link_info.host == "music.kakao.com") {
                var link2 = "kakaomusic://app/browser?link=" + sUrl;

                //Create Base64 Object
                var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function(e) { var t = ""; var n, r, i, s, o, u, a; var f = 0;
                        e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++);
                            r = e.charCodeAt(f++);
                            i = e.charCodeAt(f++);
                            s = n >> 2;
                            o = (n & 3) << 4 | r >> 4;
                            u = (r & 15) << 2 | i >> 6;
                            a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 }
                            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function(e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0;
                        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++));
                            o = this._keyStr.indexOf(e.charAt(f++));
                            u = this._keyStr.indexOf(e.charAt(f++));
                            a = this._keyStr.indexOf(e.charAt(f++));
                            n = s << 2 | o >> 4;
                            r = (o & 15) << 4 | u >> 2;
                            i = (u & 3) << 6 | a;
                            t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } }
                        t = Base64._utf8_decode(t); return t }, _utf8_encode: function(e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192);
                                t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224);
                                t += String.fromCharCode(r >> 6 & 63 | 128);
                                t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function(e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r);
                                n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1);
                                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                                n += 2 } else { c2 = e.charCodeAt(n + 1);
                                c3 = e.charCodeAt(n + 2);
                                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                n += 3 } } return t } }
                var link3 = Base64.encode(link2);

                location.href = "kakao88510848277091776://exec?category=kakaomusic&target=" + link3;
            } else {
                com.bugs.app.goFullBrowser(sUrl, true);
            }
            return;
        }

        try {
            this.init();
        } catch (e) {
            //alert(e.message);
        }

        Kakao.Auth.login({
            success: function(authObj) {
                // 濡쒓렇�� �깃났�� API瑜� �몄텧�⑸땲��.
                Kakao.API.request({
                    url: '/v1/user/me',
                    success: function(res) {
                        // 濡쒓렇�� �깃났��, API瑜� �몄텧�⑸땲��.
                        Kakao.API.request({
                            url: '/v1/api/story/linkinfo',
                            data: {
                                url: url
                            }
                        }).then(function(res) {
                            // �댁쟾 API �몄텧�� �깃났�� 寃쎌슦 �ㅼ쓬 API瑜� �몄텧�⑸땲��.
                            postData.link_info.image = res.image;
                            return Kakao.API.request({
                                url: '/v1/api/story/post/link',
                                data: postData
                            });
                        }).then(function(res) {
                            return Kakao.API.request({
                                url: '/v1/api/story/mystory',
                                data: { id: res.id }
                            });
                        }).then(function(res) {
                            //document.getElementById('post-result').innerHTML = JSON.stringify(res);
                            //alert(JSON.stringify(res));

                            // 移댁뭅�� �대깽�� ��, 濡쒓렇 �④린湲� (怨듭쑀媛� 理쒖쥌�곸쑝濡� 泥섎━�� 寃쎌슦)
                            //			            	if(postData.link_info. == "www.kakao.com/music") {
                            //			            	if(msrl != "") {
                            try {
                                void(logShareEventThroughSNS('KAKAOSTORY'));
                            } catch (e) {}
                            //			            	}


                        }, function(err) {
                            //alert(JSON.stringify(err));
                            alert("移댁뭅�ㅼ뒪�좊━ 怨듭쑀 以� �ㅻ쪟媛� 諛쒖깮�덉뒿�덈떎.");
                        });
                    }
                });
            },
            fail: function(errorObj) {
                //			alert("ERROR");
                //			alert(errorObj.error + "////" + errorObj.description);
                //				Object {error: "unauthorized", error_description: "unauthorized - unregistered website domain"}			
            }
        });

    },
    story2: function(url, text) {

        if (bugs.browser.getInternetExplorerVersion() == 7) {
            alert("Internet Explorer 7 釉뚮씪�곗��먯꽌�� 吏��먰븯吏� �딅뒗 湲곕뒫�낅땲��.");
            return;
        }

        try {
            this.init();
        } catch (e) { // �대� 移댁뭅�� �ㅽ넗由� 怨듭쑀�섍린 媛앹껜媛� �앹꽦�섏뼱 �덈떎硫� catch 援щЦ 嫄곗퀜�� 諛붾줈 �섏뼱媛�.
            //alert(e.message);
        }

        Kakao.Story.share({
            url: url,
            text: text || "" // �띿뒪�� �뚮씪硫뷀꽣 異붽�
        });

        this.cleanup(); // 由ъ냼�� �댁젣
    },
    link: function(linkData, sendUrl) {
        if (sendUrl) {
            var sUrl = sendUrl +
                "?url=" + linkData.url +
                "&title=" + encodeURIComponent(linkData.text) +
                "&label=" + encodeURIComponent(linkData.label) +
                "&image=" + linkData.image +
                "&desc=" + encodeURIComponent(linkData.desc) +
                "&btnText=" + encodeURIComponent(linkData.btnText);

            sUrl = encodeURIComponent(sUrl);

            if (linkData.host == "www.kakao.com/music" || linkData.host == "music.kakao.com") {
                var link2 = "kakaomusic://app/browser?link=" + sUrl;

                //Create Base64 Object
                var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function(e) { var t = ""; var n, r, i, s, o, u, a; var f = 0;
                        e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++);
                            r = e.charCodeAt(f++);
                            i = e.charCodeAt(f++);
                            s = n >> 2;
                            o = (n & 3) << 4 | r >> 4;
                            u = (r & 15) << 2 | i >> 6;
                            a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 }
                            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function(e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0;
                        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++));
                            o = this._keyStr.indexOf(e.charAt(f++));
                            u = this._keyStr.indexOf(e.charAt(f++));
                            a = this._keyStr.indexOf(e.charAt(f++));
                            n = s << 2 | o >> 4;
                            r = (o & 15) << 4 | u >> 2;
                            i = (u & 3) << 6 | a;
                            t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } }
                        t = Base64._utf8_decode(t); return t }, _utf8_encode: function(e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192);
                                t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224);
                                t += String.fromCharCode(r >> 6 & 63 | 128);
                                t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function(e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r);
                                n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1);
                                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                                n += 2 } else { c2 = e.charCodeAt(n + 1);
                                c3 = e.charCodeAt(n + 2);
                                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                                n += 3 } } return t } }
                var link3 = Base64.encode(link2);

                location.href = "kakao88510848277091776://exec?category=kakaomusic&target=" + link3;
            } else {
                com.bugs.app.goFullBrowser(sUrl, true);
            }
            return;
        }

        try {
            this.init();
        } catch (e) {
            //alert(e.message);
        }

        Kakao.Link.sendTalkLink({
            label: linkData.label,
            image: {
                src: linkData.image,
                width: '300',
                height: '200'
            },
            webButton: {
                text: "music.bugs.co.kr",
                url: "https://music.bugs.co.kr" // �� �ㅼ젙�� �� �뚮옯�쇱뿉 �깅줉�� �꾨찓�몄쓽 URL�댁뼱�� �⑸땲��.
            },
            webLink: {
                text: linkData.text,
                url: linkData.url // �� �ㅼ젙�� �� �뚮옯�쇱뿉 �깅줉�� �꾨찓�몄쓽 URL�댁뼱�� �⑸땲��.
            },
            fail: function(error) {
                alert("怨듭쑀�섏� 紐삵뻽�듬땲��.");
            }
        });
    }

};


bugs.personEvent = {
    eventLogId: 210,
    log: function(cols, nums) {
        $('.layerSNSEvent').show();

        if (g_msrl != false) {
            if (typeof nums != "undefined") {
                nums[nums.length] = g_msrl;
            }
        }
        bugs.logging.add(this.eventLogId, cols, nums, true);
    }
};