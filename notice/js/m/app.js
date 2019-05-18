var com = new Object();
com.bugs = new Object();
com.bugs.app = new Object();

var com = {};
com.bugs = {};
com.bugs.app = {};

com.bugs.app.BugsLink = function(url) {

    //this.url = encodeURIComponent(url);
    this.url = url;
    this.marketParam = "";
    if (typeof arguments[1] != "undefined") {
        this.marketParam = arguments[1];
    }

    $(document).find("body").append(
        "<iframe id='____bugslink____' width='1' height='1'></iframe>");
    $("#____bugslink____").hide();


    try {
        if (this.isEmptyString(this.url)) {
            throw "IllegalArgumentException";
        }
    } catch (e) {
        if (e == "IllegalArgumentException") {
            // error
        }
    }

    this.data = this.url;
};

com.bugs.app.BugsLink.prototype.isEmptyString = function(str) {
    if (str.replace(/^\s*/, "").replace(/\s*$/, "").length == 0) {
        return true;
    } else {
        return false;
    }
};

com.bugs.app.BugsLink.prototype.execute = function(callback) {

    //	李몄“
    //	var isIPHONE = (navigator.userAgent.match('iPhone') != null || navigator.userAgent.match('iPod') != null);
    //	var isIPAD = (navigator.userAgent.match('iPad') != null);
    //	var isANDROID = (navigator.userAgent.match('Android') != null);
    //	alert("iPhone : " + isIPHONE + ", iPad : " + isIPAD + ", Android : " + isANDROID);
    var marketParamStr = "";
    if (typeof this.marketParam != "undefined" && this.marketParam != "") {
        marketParamStr = "&" + this.marketParam;
    }
    var clickedAt = new Date;
    setTimeout(
        function() {
            if (new Date - clickedAt < 2000) {
                var uagent = navigator.userAgent.toLocaleLowerCase();
                /*
                if (fb == 'Y')
                	alert('踰낆뒪 �깆쓣 �ㅼ튂 ��,\n�ｊ린 7�� �댁슜沅뚯쓣 臾대즺 吏�湲됲빀�덈떎.\n(�좉퇋 �ㅼ튂��)');
                else alert('踰낆뒪 �깆쓣 �ㅼ튂 ��,\n�ｊ린 1�� �댁슜沅뚯쓣 臾대즺 吏�湲됲빀�덈떎.\n(�좉퇋 �ㅼ튂��)');
                */
                //					alert(uagent);

                if (typeof callback == 'function') {
                    callback.call(this);
                } else if (uagent.search("android") > -1) {
                    //alert('踰낆뒪 �깆쓣 �ㅼ튂 ��,\n�ｊ린 �댁슜沅뚯쓣 臾대즺 吏�湲됲빀�덈떎.\n(�좉퇋 �ㅼ튂��)');
                    if (uagent.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) {
                        return;
                    } else {
                        var srcStr = "market://details?id=com.neowiz.android.bugs" + marketParamStr;
                        $("#____bugslink____").attr("src", srcStr);
                    }

                } else if (uagent.search("iphone") > -1 || uagent.search("ipad") > -1 || uagent.search("ipod") > -1) {

                    if (uagent.search("safari") > -1 || uagent.search("applewebkit") > -1) { // 20140317_PYW_IPHONEPLAY - safari : 湲곕낯 釉뚮씪�곗�, applewebkit : �좏뵆�뱁궥�� �듯븳 �ㅽ뻾(移댁뭅�ㅽ넚, 移댁뭅�ㅼ뒪�좊━ ��)
                        //alert('踰낆뒪 �깆쓣 �ㅼ튂 ��,\n�ｊ린 �댁슜沅뚯쓣 臾대즺 吏�湲됲빀�덈떎.\n(�좉퇋 �ㅼ튂��)');
                        $("#____bugslink____")
                            .attr("src",
                                "http://itunes.apple.com/kr/app//id348555322?mt=8");
                    }
                } else {
                    var msg = "�덈뱶濡쒖씠��, �꾩씠�� �댁쇅 湲곗쥌�먯꽌�� 吏��먮릺吏� �딅뒗 湲곕뒫�낅땲��.";
                    try {
                        alert1(msg);
                    } catch (e) {
                        alert(msg);
                    }
                }
            }
        }, 1000);
    /*
    setTimeout(
    		function() {
    			if (+new Date - clickedAt < 6000) {
    				var uagent = navigator.userAgent.toLocaleLowerCase();
    				if (uagent.search("iphone") > -1) {
    					
    					if (uagent.search("safari")<= -1){
    						setInstallButton();
    					}
    				}
    			}
    		}, 3000);	
    */
    //alert(this.data);
    var uagent = navigator.userAgent.toLocaleLowerCase();
    if (uagent.search("android") > -1) {
        // 20140402_CUSTOMSCHEME_FIX - �꾨옒 �щ＼怨� 愿��⑤맂 遺꾧린 泥섎━�� �꾩옱 �ъ슜 �덊븿.
        if (uagent.search("chrome") > -1) {
            //�щ＼ 理쒖떊 踰꾩쟾 臾몄젣濡� �명빐�� �곸슜
            if (navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25) { // �щ＼ 踰꾩쟾 25�댁긽遺��� iframe�� �듯븳 custom scheme �몄텧 遺덇�
                document.location.href = "intent://" + this.data.split("//")[1] + "#Intent;scheme=bugs3;package=com.neowiz.android.bugs;end";
                //				document.location.href = "intent://"+this.data.split("//")[1]+"#Intent;scheme=bugsapp;package=com.neowiz.android.bugs;end";
            } else {
                $("#____bugslink____").attr("src", this.data);
            }

        } else {
            $("#____bugslink____").attr("src", this.data);
        }
        //		$("#____bugslink____").attr("src", this.data);
    } else if (uagent.search("iphone") > -1) { // 20140317_PYW_IPHONEPLAY �꾩씠�곗씤 寃쎌슦, 諛붾줈 �ъ깮�섍린
        if (uagent.search("safari") > -1 || uagent.search("applewebkit") > -1) { // safari : 湲곕낯 釉뚮씪�곗�, applewebkit : �좏뵆�뱁궥�� �듯븳 �ㅽ뻾(移댁뭅�ㅽ넚, 移댁뭅�ㅼ뒪�좊━ ��)
            $("#____bugslink____").attr("src", this.data);
            //			document.getElementById("____bugslink____").src = this.data;
        }
    }

};

// 怨듯넻 踰낆뒪��
function goSmartphoneAppHome() {
    var aUrl = 'bugs3://app'; // 'bugs2://bugsapp';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goSmartphoneAppLogin() {
    var aUrl = 'bugs3://app/login';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

// �μ뒪�몃쾮�� �쇰뵒�� 梨꾨꼸 怨듭쑀
function goSmartphoneAppRadioChannel(channel_id) {
    var aUrl = "bugs3://app/radio/channel?channel_id=" + channel_id;
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goSmartphoneAppWebView(web_page) {
    var aUrl = "bugs3://webview?target=" + web_page;
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

// �꾩씠�� 踰낆뒪�� ��
function goIphoneHome() {
    var aUrl = 'bugs3://app'; // 'bugs2://bugsapp';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}
// �꾩씠�� 踰낆뒪�� �ㅼ젙
function goIphoneSetting() {
    var aUrl = 'bugs3://app/setting'; // bugs2://bugsapp';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}
// �덈뱶濡쒖씠�� 踰낆뒪�� ��
function goAndroidHome() {
    var aUrl = 'bugsapp://home';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}
// �덈뱶濡쒖씠�� 踰낆뒪�� �ㅼ젙
function goAndroidSetting() {
    var aUrl = 'bugsapp://setting';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goIphoneListenAlbum(album_id) {
    var aUrl = 'bugs3://app/albums/' + album_id + '?autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
    //	var aUrl='bugs2://albums/'+album_id+'?P=Y';
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goIphoneListen(track_id) {

    var aUrl = 'bugs3://app/tracks/' + track_id + '?autoplay=Y'; // 20140317_PYW_IPHONEPLAY 而ㅼ뒪��URL 蹂�寃�
    //	var aUrl='bugs2://tracks/'+track_id+'?P=Y';

    if (typeof fb != "undefined" && fb == "Y" && g_recommendTracks.indexOf("|") != -1)
        aUrl = 'bugs3://app/tracks/lists?title=&track_ids=' + g_recommendTracks + '&autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
    //		aUrl='bugs3://app/tracks/'+g_recommendTracks+'?autoplay=Y'; // 20140317_PYW_IPHONEPLAY 而ㅼ뒪��URL 蹂�寃�
    //		aUrl='bugs2://tracks/'+g_recommendTracks+'?P=Y';

    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goAndroidListen(track_id) {
    var trackArr = track_id.split("|");
    var aUrl = '';
    if (trackArr.length > 1) {
        aUrl = 'bugs3://app/tracks/lists?title=&track_ids=' + track_id + '&autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
        //		var aUrl='bugsapp://listen/tracks/lists?title=&track_ids=' + track_id;
    } else {
        aUrl = 'bugs3://app/tracks/' + track_id + '?autoplay=Y'; // 20140317_PYW_IPHONEPLAY 而ㅼ뒪��URL 蹂�寃�
        //		var aUrl='bugsapp://listen/tracks/'+track_id;
    }
    if (typeof fb != "undefined" && fb == "Y" && g_recommendTracks.indexOf("|") != -1)
        aUrl = 'bugs3://app/tracks/lists?title=&track_ids=' + g_recommendTracks + '&autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
    //		aUrl='bugsapp://listen/tracks/lists?title=&track_ids='+g_recommendTracks; 
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goAndroidListenAlbum(album_id) {
    var aUrl = 'bugs3://app/albums/' + album_id + '?autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
    //	var aUrl='bugsapp://listen/albums/'+album_id;
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function goAndroidListenArtist(track_ids, artist_nm) {
    var aUrl = 'bugs3://app/tracks/lists?title=' + artist_nm + '�� �멸린怨�&track_ids=' + track_ids + '&autoplay=Y'; // 20140402_CUSTOMSCHEME_FIX
    //	var aUrl='bugsapp://listen/tracks/lists?title='+artist_nm+'�� �멸린怨�&track_ids='+track_ids; 
    var link = new com.bugs.app.BugsLink(aUrl);
    link.execute();
}

function setInstallButton() {
    $("span.btnListen").html('<a href="http://itunes.apple.com/kr/app//id348555322?mt=8"><img src="http://file.bugsm.co.kr/nbugs/mobile/web/b_playB.png" height="34" width="34" alt="�ㅼ튂" />踰낆뒪 �� �ㅼ튂�섍린</a>');
}


/*異붿쿇怨� 媛��몄삤湲� */
var g_recommendTracks = "";
var getRecommendTracks = function(track_id) {

    $.post(g_urlAjax + "/player/recommend", { played: "", playlist: track_id + "", usage: "web_player" }, function(data) {
        if (data.playlist && data.playlist_id) {
            var playlistStr = data.playlist + "";
            var playlistArr = playlistStr.split(",").slice(0, 6);
            g_recommendTracks = playlistArr.join("|");
        } else {

        }
    });

};

com.bugs.app.isSmartphoneBrowser = function() {
    var uagent = navigator.userAgent.toLocaleLowerCase();

    var pttn = /android|iphon/ig;
    var rtn = pttn.test(uagent);

    return rtn;
};

com.bugs.app.executeBugsLink = function(url, isApp, checkLogin) {
    isApp = isApp || bugs.app.isBugsApp();

    if (!isApp) {
        var link = new com.bugs.app.BugsLink(url);
        link.execute();
    } else {
        if (checkLogin || false) {
            //alert("濡쒓렇�� 泥댄겕�� �ㅽ뻾");
            com.bugs.app.runWithLogin(function() {
                location.href = url;
            });
        } else {
            //alert("諛붾줈�ㅽ뻾");
            location.href = url;
        }
    }
};

com.bugs.app.goSetting = function() {
    this.executeBugsLink('bugs3://app/setting');
};

com.bugs.app.goHome = function() {
    this.executeBugsLink('bugs3://app/home');
};

com.bugs.app.goFullBrowser = function(url) {
    this.executeBugsLink('bugs3://browser/?target=' + url);
};

com.bugs.app.goTrack = function(trackId, autoPlay) {
    var url = 'bugs3://app/tracks/' + trackId +
        (autoPlay ? '?autoplay=Y' : "");
    this.executeBugsLink(url);
};

com.bugs.app.goTracks = function(title, trackIds, autoPlay) {
    var url = 'bugs3://app/tracks/lists?title=' + title + '&track_ids=' + trackIds +
        (autoPlay ? '&autoplay=Y' : "");
    this.executeBugsLink(url);
};

com.bugs.app.goAlbum = function(albumId, autoPlay) {
    var url = 'bugs3://app/albums/' + albumId +
        (autoPlay ? '?autoplay=Y' : "");
    this.executeBugsLink(url);
};

com.bugs.app.goArtist = function(artistId, autoPlay) {
    var url = 'bugs3://app/artists/' + artistId +
        (autoPlay ? '?autoplay=Y' : "");
    this.executeBugsLink(url);
};

com.bugs.app.goMusicVideo = function(musicVideoId) {
    var url = 'bugs3://app/musicvideos/' + musicVideoId;
    this.executeBugsLink(url);
};

com.bugs.app.goDownload = function(trackIds) {
    var url = 'bugs3://app/download?track_ids=' + trackIds;
    this.executeBugsLink(url);
};

com.bugs.app.goEsAlbum = function(esAlbumId, autoPlay) {
    var url = 'bugs3://app/esalbums/' + esAlbumId +
        (autoPlay ? '?autoplay=Y' : "");
    this.executeBugsLink(url);
};

com.bugs.app.getBugsAppInfo = function() {
    var bugsAppPttn = /Mobile\|Bugs\|([^\|]+)\|([^\|]+)\|([^\|]+)\|([^\|]+)\|/i;

    var regRtn = bugsAppPttn.exec(navigator.userAgent);
    if (regRtn) {

        var bugsAppInfo = {
            appName: "Bugs",
            appVersion: regRtn[1],
            platformName: regRtn[2],
            platformVer: regRtn[3],
            deviceName: regRtn[4]
        };

        return bugsAppInfo;
    }

    return null;
};

com.bugs.app.isBugsApp4 = function() {
    var bugsAppInfo = com.bugs.app.getBugsAppInfo();
    if (bugsAppInfo) {
        if (bugsAppInfo.appName == "Bugs" && bugsAppInfo.appVersion.indexOf("4") == 0)
            return true;
    }

    return false;
};

com.bugs.app.runWithLogin = function(runFunc) {
    var checkLoginUrl = g_urlM + "/special/getLoginUser";
    $.post(checkLoginUrl, {},
        function(ret) {
            if (ret) {
                //alert("濡쒓렇�� �섏뿀��");
                if (runFunc) runFunc();
            } else {
                //alert("濡쒓렇�� 李쎌쑝濡� �대룞");
                com.bugs.app.goSetting();
            }
        });
};