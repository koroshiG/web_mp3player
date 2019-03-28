class Music {
    constructor() {
        console.log("Music is ready");
        this.playingID = '';
        this.playingPlaylistID = '';
        this.currentAlbum = '';
        this.currentIndex = '';
        this.currentTab = [];
        this.playlist = [];

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        this.audioElement = document.getElementById("audio");
        this.source = this.audioContext.createMediaElementSource(this.audioElement);
        this.analyser = this.audioContext.createAnalyser();
        this.gain = this.audioContext.createGain();
        this.gain.gain.value = 0.7;
        this.source.connect(this.gain);
        this.gain.connect(this.analyser);
        this.gain.connect(this.audioContext.destination);
        this.analyser.fftSize = 128;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(this.dataArray);
    }

    changeTab(newTab) {
        this.currentTab = newTab;
    }

    changeVolume(volume) {
        console.log(volume);
        
        this.gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        console.log(this.gain.gain);
        
    }

    getData() {
        this.analyser.getByteFrequencyData(this.dataArray);
        return this.dataArray.toString();
    }

    bassUp() {
        this.biQuadLP = this.audioContext.createBiquadFilter();
        this.biQuadLS = this.audioContext.createBiquadFilter();
        this.biQuadLP.type = "lowpass";
        this.biQuadLS.type = "lowshelf";
        this.biQuadLP.frequency.value = 140;
        this.biQuadLS.frequency.value = 450;
        this.biQuadLS.gain.value = 1;
        this.biQuadLS.Q.value = 100;
        this.gain.connect(this.biQuadLP);
        this.biQuadLP.connect(this.biQuadLS);
        this.biQuadLS.connect(this.analyser)
        this.gain.disconnect(this.audioContext.destination);
        this.analyser.connect(this.audioContext.destination);
    }

    loadPlaylistSong(button, album, key, newTab) {
        this.currentTab = newTab;
        if (this.currentAlbum == album) {
            if (this.playingPlaylistID != button.id) {
                if (this.playingPlaylistID != '') {
                    $("#audio").trigger("pause");
                    $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
                    $("#" + this.playingPlaylistID).parent().parent().removeClass("colorPlaying");
                }
                this.playingPlaylistID = button.id;
                $("#audio").attr("src", album + "/" + key.file);
                for (var i = 0; i < this.currentTab.length; i++) {
                    if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file) {
                        this.currentIndex = i;
                        break;
                    }
                }
                $("#audio").trigger('load');
                $("#audio").on("loadeddata", function () {
                    $("#audio").trigger("play");
                })
                $("#" + button.id).parent().parent().addClass("colorPlaying");
                ui.renderInfo();
                button.src = "pics/pause.png";
                $("#play")[0].src = "pics/pause.png";
                if (this.playingID != '') {
                    $('#' + this.playingID)[0].src = "pics/play.png";
                    $("#" + this.playingID).parent().parent().removeClass("colorPlaying");
                    this.playingID = '';
                }
                return;
            }
        } else {
            if (this.playingPlaylistID != '') {
                $("#audio").trigger("pause");
                $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
                $("#" + this.playingPlaylistID).parent().parent().removeClass("colorPlaying");
            }
            this.currentAlbum = album;
            this.playingPlaylistID = button.id;
            $("#audio").attr("src", album + "/" + key.file);
            for (var i = 0; i < this.currentTab.length; i++) {
                if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file) {
                    this.currentIndex = i;
                    break;
                }
            }
            $("#audio").trigger('load');
            $("#audio").on("loadeddata", function () {
                $("#audio").trigger("play");
            })
            $("#" + button.id).parent().parent().addClass("colorPlaying");
            ui.renderInfo();
            button.src = "pics/pause.png";
            $("#play")[0].src = "pics/pause.png";
            if (this.playingID != '') {
                $('#' + this.playingID)[0].src = "pics/play.png";
                $("#" + this.playingID).parent().parent().removeClass("colorPlaying");
                this.playingID = '';
            }
            return;
        }

        if (button.src.indexOf("pics/pause.png") > -1) {
            $("#audio").trigger("pause");
            button.src = "pics/play.png";
            $("#play")[0].src = "pics/play.png";
        } else if (button.src.indexOf("pics/play.png") > -1) {
            $("#audio").trigger("play");
            button.src = "pics/pause.png";
            $("#play")[0].src = "pics/pause.png";
        }
    }

    loadSong(button, album, key, newTab) {
        this.currentTab = newTab;
        if (this.currentAlbum == album) {
            if (this.playingID != button.id) {
                if (this.playingID != '') {
                    $("#audio").trigger("pause");
                    $('#' + this.playingID)[0].src = "pics/play.png";
                    $("#" + this.playingID).parent().parent().removeClass("colorPlaying");
                }
                this.playingID = button.id;
                $("#audio").attr("src", album + "/" + key.file);
                for (var i = 0; i < this.currentTab.length; i++) {
                    if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file) {
                        this.currentIndex = i;
                        break;
                    }
                }
                $("#audio").trigger('load');
                $("#audio").on("loadeddata", function () {
                    $("#audio").trigger("play");
                })
                $("#" + button.id).parent().parent().addClass("colorPlaying");
                ui.renderInfo();
                button.src = "pics/pause.png";
                $("#play")[0].src = "pics/pause.png";
                if (this.playingPlaylistID != '') {
                    $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
                    $("#" + this.playingPlaylistID).parent().parent().removeClass("colorPlaying");
                    this.playingPlaylistID = '';
                }
                return;
            }
        } else {
            this.currentAlbum = album;
            this.playingID = button.id;
            $("#audio").attr("src", album + "/" + key.file);
            for (var i = 0; i < this.currentTab.length; i++) {
                if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file) {
                    this.currentIndex = i;
                    break;
                }
            }
            $("#audio").trigger("load");
            $("#audio").on("loadeddata", function () {
                $("#audio").trigger("play");
            })
            $("#" + button.id).parent().parent().addClass("colorPlaying");
            ui.renderInfo();
            button.src = "pics/pause.png";
            $("#play")[0].src = "pics/pause.png";
            if (this.playingPlaylistID != '') {
                $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
                $("#" + this.playingPlaylistID).parent().parent().removeClass("colorPlaying");
                this.playingPlaylistID = '';
            }
            return;
        }

        if (button.src.indexOf("pics/pause.png") > -1) {
            $("#audio").trigger("pause");
            button.src = "pics/play.png";
            $("#play")[0].src = "pics/play.png";
        } else if (button.src.indexOf("pics/play.png") > -1) {
            $("#audio").trigger("play");
            button.src = "pics/pause.png";
            $("#play")[0].src = "pics/pause.png";
        }
    }

    stopSong(button) {
        if (button.id == this.playingID) {
            $("#audio").trigger('pause');
            document.getElementById("audio").currentTime = 0;
            $("#play")[0].src = "pics/play.png";
            $('#' + this.playingID)[0].src = "pics/play.png";
        }
    }

    stopPlaylistSong(button) {
        console.log(button.id == this.playingPlaylistID);

        if (button.id == this.playingPlaylistID) {
            $("#audio").trigger('pause');
            document.getElementById("audio").currentTime = 0;
            $("#play")[0].src = "pics/play.png";
            $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
            this.playingPlaylistID = '';
        }
        if ((this.currentTab.length - 1 < 1) && this.playingID == '') {
            this.restartAudio();
        }
    }

    mainPlay(album) {
        if (this.playingPlaylistID == '') {
            if ($("#play")[0].src.indexOf("pics/pause.png") > -1) {
                $("#audio").trigger("pause");
                if (this.currentAlbum == album) {
                    $('#' + this.playingID)[0].src = "pics/play.png";
                }
                $("#play")[0].src = "pics/play.png";
            } else if ($("#play")[0].src.indexOf("pics/play.png") > -1) {
                $("#audio").trigger("play");
                if (this.currentAlbum == album) {
                    $('#' + this.playingID)[0].src = "pics/pause.png";
                }
                $("#play")[0].src = "pics/pause.png";
            }
        } else {
            if ($("#play")[0].src.indexOf("pics/pause.png") > -1) {
                $("#audio").trigger("pause");
                $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
                $("#play")[0].src = "pics/play.png";
            } else if ($("#play")[0].src.indexOf("pics/play.png") > -1) {
                $("#audio").trigger("play");
                $('#' + this.playingPlaylistID)[0].src = "pics/pause.png";
                $("#play")[0].src = "pics/pause.png";
            }
        }
    }

    mainStop(album) {
        if (this.playingPlaylistID == '') {
            $("#audio").trigger('pause');
            document.getElementById("audio").currentTime = 0;
            $("#play")[0].src = "pics/play.png";

            if (this.currentAlbum == album) {
                $('#' + this.playingID)[0].src = "pics/play.png";
            }
        } else {
            $("#audio").trigger('pause');
            document.getElementById("audio").currentTime = 0;
            $("#play")[0].src = "pics/play.png";
            $('#' + this.playingPlaylistID)[0].src = "pics/play.png";
        }
    }

    progressBar() {
        var duration = document.getElementById("audio").duration;
        $("#audio").on("timeupdate", () => {
            var currentTime = document.getElementById("audio").currentTime;
            duration = document.getElementById("audio").duration;
            var barProgress = (currentTime / duration) * 100;
            $("#progress").css("width", barProgress.toString() + "%");
            var minutyStringd = (Math.floor((duration % (60 * 60)) / (60))).toString();
            var sekundyStringd = ((Math.floor((duration % (60)))) / 100).toFixed(2).replace("0.", "");
            $("#duration").text(minutyStringd + ":" + sekundyStringd);
            var minutyString = (Math.floor((currentTime % (60 * 60)) / (60))).toString();
            var sekundyString = ((Math.floor((currentTime % (60)))) / 100).toFixed(2).replace("0.", "");
            $("#currentTime").text(minutyString + ":" + sekundyString);
        })

        $("#audio").on("ended", () => {
            this.nextSong(this.currentAlbum);
        })

        $("#bar").on("click", (e) => {
            var offsetLeft = $("#bar").offset().left;
            var length = $("#bar").width();
            var changeTime = (e.pageX - offsetLeft) / length;
            document.getElementById("audio").currentTime = (duration * changeTime).toString();
            
            
        })

        $("#progress").on("click", (e) => {
            var offsetLeft = $("#progress").offset().left;
            var length = $("#bar").width();
            var changeTime = (e.pageX - offsetLeft) / length;
            document.getElementById("audio").currentTime = (duration * changeTime).toString();
        })

    }

    nextSong(album) {
        var play = '';
        if (this.playingPlaylistID == '') {
            play = this.playingID;
        } else {
            var id = this.currentTab[this.currentIndex].id;
            var playlistNow = true;
            play = this.playingPlaylistID;
        }
        for (var i = 0; i < this.currentTab.length; i++) {
            if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file && this.currentTab[i].id == id) {
                this.currentIndex = i;
                break;
            }
        }
        if (this.currentIndex < this.currentTab.length - 1) {
            this.currentIndex += 1;
            $("#audio").trigger("pause");
            if (album == this.currentAlbum) {
                $("#" + play)[0].src = "pics/play.png";
            } else if (playlistNow) {
                $("#" + play)[0].src = "pics/play.png";
            }
            $("#" + play).parent().parent().removeClass("colorPlaying");
            play = this.currentTab[this.currentIndex].file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");
            if (playlistNow) {
                play = "playlist" + (id + 1) + play;
                this.currentAlbum = this.currentTab[i + 1].album;
            }
            $("#audio").attr("src", this.currentTab[this.currentIndex].album + "/" + this.currentTab[this.currentIndex].file);
            $("#" + play).parent().parent().addClass("colorPlaying");
            ui.renderInfo();
            if ($("#play")[0].src == "http://localhost:3000/pics/pause.png") {
                if (album == this.currentAlbum) {
                    $("#" + play)[0].src = "pics/pause.png";
                } else if (playlistNow) {
                    $("#" + play)[0].src = "pics/pause.png";
                }
                $("#audio").trigger("load");
                $("#audio").on("loadeddata", function () {
                    $("#audio").trigger("play");
                })
            }
        }

        if (this.playingPlaylistID == '') {
            this.playingID = play;
        } else {
            this.playingPlaylistID = play;
        }
    }

    prevSong(album) {
        var play = '';
        if (this.playingPlaylistID == '') {
            play = this.playingID;
        } else {
            var playlistNow = true;
            var id = this.currentTab[this.currentIndex].id;
            play = this.playingPlaylistID;
        }
        for (var i = 0; i < this.currentTab.length; i++) {
            if ($("#audio")[0].src.split("/")[4].replace(/%20/g, " ") == this.currentTab[i].file && this.currentTab[i].id == id) {
                this.currentIndex = i;
                break;
            }
        }
        if (this.currentIndex > 0) {
            this.currentIndex -= 1;
            $("#audio").trigger("pause");
            if (album == this.currentAlbum) {
                $("#" + play)[0].src = "pics/play.png";
            } else if (playlistNow) {
                $("#" + play)[0].src = "pics/play.png";
            }
            $("#" + play).parent().parent().removeClass("colorPlaying");
            play = this.currentTab[this.currentIndex].file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");
            if (playlistNow) {
                play = "playlist" + (id - 1) + play;
                this.currentAlbum = this.currentTab[i - 1].album;
            }
            $("#audio").attr("src", this.currentAlbum + "/" + this.currentTab[this.currentIndex].file);
            $("#" + play).parent().parent().addClass("colorPlaying");
            ui.renderInfo();
            if ($("#play")[0].src == "http://localhost:3000/pics/pause.png") {
                if (album == this.currentAlbum) {
                    $("#" + play)[0].src = "pics/pause.png";
                } else if (playlistNow) {
                    $("#" + play)[0].src = "pics/pause.png";
                }
                $("#audio").trigger("load");
                $("#audio").on("loadeddata", function () {
                    $("#audio").trigger("play");
                })
            }
        }

        if (this.playingPlaylistID == '') {
            this.playingID = play;
        } else {
            this.playingPlaylistID = play;
        }
    }

    restartAudio() {
        if (this.playingID == '') {
            console.log("del");
            $("#albumImg").attr("src", "#")
            $("#albumTitle").text("");
            $("#songTitle").text("");
            $("#albumImg").css("display", "none");
            $("#time").css("display", "none");
            $("#audio")[0].src = "#";
            this.playingPlaylistID = '';
        }
    }

    reClass() {
        if (this.playingPlaylistID != '') {
            $("#" + this.playingPlaylistID).parent().parent().addClass("colorPlaying");
            $("#" + this.playingPlaylistID).src = "pics/pause.png";

        }
    }

    playFromList() {
        console.log(this.playlist);
    }
}