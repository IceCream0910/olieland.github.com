if ("undefined" == typeof(bugs.m)) {
    //====================================
    // Helper functions
    //====================================		
    function addCommas(nStr) {
        nStr = "" + nStr;
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }

    bugs.m = {
        page: 1,
        likes: 0,
        confirmLogin: function(rUrl) {
            if (confirm("濡쒓렇�몄씠 �꾩슂�� �쒕퉬�ㅼ엯�덈떎.\n濡쒓렇�� �섏씠吏�濡� �대룞�섏떆寃좎뒿�덇퉴?")) {
                if (rUrl) {
                    location.href = g_urlM + "/login?rUrl=" + rUrl;
                } else {
                    location.href = g_urlM + "/login?rUrl=" + location.href;
                }
            } else {
                return;
            }
        },
        confirmListen: function(goUrl) {
            /*
            if (alert("紐⑤컮�� 踰낆뒪�먯꽌��\n1遺� �ｊ린留� 媛��ν빀�덈떎.\n\n踰낆뒪 �댄뵆由ъ��댁뀡��\n �ㅼ튂�섏떆硫� 怨� �꾩껜 �ｊ린媛�\n 媛��ν빀�덈떎.")) {
                location.href=goUrl;
                return;
            }
            */

            location.href = goUrl;
            return;
        },
        addLike: function(id, section, callbackTrue, callbackFalse) {
            try {
                $.getJSON(g_urlM + "/ajax/likes/" + section + "/add/" + id, {}, function(data) {
                    if (data.result) {
                        if (typeof(callbackTrue) == "string") eval(callbackTrue);
                        else if (typeof callbackTrue == "function") callbackTrue(data);
                    } else {

                        if (data.error_type == "NOT_LOGGED") {
                            this.confirmLogin();
                        }
                        if (typeof(callbackFalse) == "string") eval(callbackFalse);
                        else if (typeof callbackFalse == "function") callbackFalse;
                    }
                }.bind(this));
            } catch (e) {
                if (typeof(callbackFalse) == "string") eval(callbackFalse);
                else if (typeof(callbackFalse) == "function") callbackFalse();
            }
        },
        delLike: function(id, section, callbackTrue, callbackFalse) {
            try {
                $.getJSON(g_urlM + "/ajax/likes/" + section + "/del/" + id, {}, function(data) {
                    if (data.result) {
                        if (typeof(callbackTrue) == "string") eval(callbackTrue);
                        else if (typeof(callbackTrue) == "function") callbackTrue(data);
                    } else {
                        if (data.error_type == "NOT_LOGGED") {
                            this.confirmLogin();
                        }

                        if (typeof(callbackFalse) == "string") eval(callbackFalse);
                        else if (typeof(callbackFalse) == "function") callbackFalse(data);
                    }
                }.bind(this));
            } catch (e) {
                if (typeof(callbackFalse) == "string") eval(callbackFalse);
                else if (typeof(callbackFalse) == "function") callbackFalse();
            }
        },

        likeTrack: function(track_id, anchorObj, likes) {
            //alert(anchorObj.className);
            this.likes = likes;
            if (anchorObj.className.match("btnLikeCancel") == null) {
                this.addLike(track_id, "track", function() {
                    $(anchorObj).removeClass("btnLike").addClass("btnLikeCancel");
                    $(anchorObj).text("�닿린痍⑥냼" + "(" + addCommas(likes + 1) + ")");
                }, {});
            } else {
                this.delLike(track_id, "track", function() {
                    $(anchorObj).removeClass("btnLikeCancel").addClass("btnLike");
                    $(anchorObj).text("�닿린" + "(" + addCommas(likes - 1) + ")");
                }, {});
            }
            return;
        },
        likeArtist: function(artist_id, anchorObj, likes) {
            //alert(anchorObj.className);
            this.likes = likes;
            if (anchorObj.className.match("btnLikeCancel") == null) {
                this.addLike(artist_id, "artist", function() {
                    $(anchorObj).removeClass("btnLike").addClass("btnLikeCancel");
                    $(anchorObj).text("醫뗭븘痍⑥냼" + "(" + addCommas(likes + 1) + ")");
                }, {});
            } else {
                this.delLike(artist_id, "artist", function() {
                    $(anchorObj).removeClass("btnLikeCancel").addClass("btnLike");
                    $(anchorObj).text("醫뗭븘" + "(" + addCommas(likes - 1) + ")");
                }, {});
            }

        },
        likeAlbum: function(album_id, anchorObj, likes) {
            this.likes = likes;
            if (anchorObj.className.match("btnLikeCancel") == null) {
                this.addLike(album_id, "album", function() {
                    $(anchorObj).removeClass("btnLike").addClass("btnLikeCancel");
                    $(anchorObj).text("�닿린痍⑥냼" + "(" + addCommas(likes + 1) + ")");
                }, {});
            } else {
                this.delLike(album_id, "album", function() {
                    $(anchorObj).removeClass("btnLikeCancel").addClass("btnLike");
                    $(anchorObj).text("�닿린" + "(" + addCommas(likes - 1) + ")");
                }, {});
            }

        },
        likeMV: function(mv_id, anchorObj, likes) {
            this.likes = likes;
            if (anchorObj.className.match("btnLikeCancel") == null) {
                this.addLike(mv_id, "mv", function() {
                    $(anchorObj).removeClass("btnLike").addClass("btnLikeCancel");
                    $(anchorObj).text("�닿린痍⑥냼" + "(" + addCommas(likes + 1) + ")");
                }, {});
            } else {
                this.delLike(mv_id, "mv", function() {
                    $(anchorObj).removeClass("btnLikeCancel").addClass("btnLike");
                    $(anchorObj).text("�닿린" + "(" + addCommas(likes - 1) + ")");
                }, {});
            }
        },

        delTrackAndRemoveDiv: function(track_id, anchorObj) {
            this.delLike(track_id, "track", function() {
                $(anchorObj).closest("li").remove();
            }, {});
        },

        delArtistAndRemoveDiv: function(artist_id, anchorObj) {
            this.delLike(artist_id, "artist", function() {
                $(anchorObj).closest("li").remove();
            }, {});

        },

        delAlbumAndRemoveDiv: function(album_id, anchorObj) {
            this.delLike(album_id, "album", function() {
                $(anchorObj).closest("li").remove();
            }, {});

        },

        delMVAndRemoveDiv: function(mv_id, anchorObj) {
            this.delLike(mv_id, "mv", function() {
                $(anchorObj).closest("li").remove();
            }, {});

        },

        chartMore: function(type, htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/chart/" + type;
            var nextPage = this.page + 1;
            var data = { page: nextPage };

            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
                if (this.page == 2) {
                    $("div.moreView").css("display", "none");
                }
            }.bind(this), "html");
        },

        artistMore: function(htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/artist/";
            var nextPage = this.page + 1;
            var data = { page: nextPage };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
                if (this.page == 5) {
                    $("div.moreView").css("display", "none");
                }
            }.bind(this), "html");
        },

        mvMore: function(htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/mv/";
            var nextPage = this.page + 1;
            var data = { page: nextPage };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
                if (this.page == 5) {
                    $("div.moreView").css("display", "none");
                }
            }.bind(this), "html");
        },

        esalbumMore: function(htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/esalbum/";
            var nextPage = this.page + 1;
            var data = { page: nextPage };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
                if (this.page == 5) {
                    $("div.moreView").css("display", "none");
                }
            }.bind(this), "html");
        },

        //====================================
        // For Artist Page
        //====================================
        artistAlbumMore: function(artistId, htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/artist/" + artistId + "/album";
            var nextPage = this.page + 1;
            var data = { page: nextPage, subSection: "album" };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
            }.bind(this), "html");
        },

        artistTrackMore: function(artistId, htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/artist/" + artistId + "/track";
            var nextPage = this.page + 1;
            var data = { page: nextPage, subSection: "track" };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
            }.bind(this), "html");
        },

        artistMVMore: function(artistId, htmlEntity) {
            if (typeof page == "undefined") page = 1;
            var url = g_urlM + "/ajax/artist/" + artistId + "/artist";
            var nextPage = this.page + 1;
            var data = { page: nextPage, subSection: "mv" };
            $.get(url, data, function(result) {
                htmlEntity.append(result);
                this.page++;
            }.bind(this), "html");
        }
    }
}