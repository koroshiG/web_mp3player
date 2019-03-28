class Ui {
    constructor() {
        console.log("UI is ready");
        this.clicked = '';
        this.files = [];
        this.playlist = {};
        this.clicks();
    }

    clicks() {
        $("#volumeDiv")[0].childNodes[1].value = 70;

        $("#darkmode")[0].style.display = "none";

        $("#icodiv").click((e) => {
            this.clicked = e.target.attributes.id.value;
            net.sendData();
        })

        $("#play").click((e) => {
            music.mainPlay(this.clicked);
        })

        $("#stop").click((e) => {
            music.mainStop(this.clicked);
        })

        $("#next").click((e) => {
            music.nextSong(this.clicked);
        })

        $("#prev").click((e) => {
            music.prevSong(this.clicked);
        })

        $("#playPlaylist").click((e) => {
            music.playFromList()
        })

        $("#removePlaylist").click((e) => {
            net.removePlaylist();
        })

        $("#volume").change(function(){
            music.changeVolume(this.value/100);
        })

        $("#dmOn").click((e) => {
            $("#darkmode").css("display", "block");
            $("#info").css("background", "black");
            $("#info").css("color", "gray");
            var hide = document.createElement("div");
            hide.style.position = "absolute";
            hide.style.left = "33vw";
            hide.style.top = "0px";
            hide.style.width = "67vw";
            hide.style.height = "20vh";
            hide.style.background = "black"
            hide.id = "hide";
            hide.style.zIndex = 1;
            $("#info").append(hide);
            $("#volumeDiv").css("background","black")
        })

        $("#dmOff").click((e) => {
            $("#darkmode").css("display", "none");
            $("#info").css("background", "#263233");
            $("#info").css("color", "aliceblue");
            $("#hide").remove()
            $("#volumeDiv").css("background","none")
        })
    }

    renderAlbums(data) {
        this.clicked = data.dirs[0];
        data.dirs.forEach((dir) => {
            var cover = document.createElement("img");
            cover.width = 250;
            cover.height = 250;
            cover.id = dir;
            cover.classList.add("covers")
            cover.src = "/mp3/" + dir + "/album.jpg";
            $("#icodiv").append(cover);
        })
    }

    renderInfo() {
        $("#albumImg").css("display", "block");
        $("#albumImg").attr("src", "/mp3/" + music.currentAlbum + "/album.jpg")
        $("#albumTitle").text(music.currentAlbum);
        $("#songTitle").text(($("#audio")[0].getAttribute("src").split("/"))[1].replace(".mp3", ""));
        $("#time").css("display", "block");
    }

    renderMenu(data) {
        this.files = data.files;

        function removeNonAudio(files) {
            files.forEach((file, index) => {
                if (file.file.indexOf(".mp3") < 0) {
                    files.splice(index, 1);
                    removeNonAudio(files);
                }
            })
        }
        removeNonAudio(this.files);

        $("#tabdiv").empty();
        var table = document.createElement("table");
        table.id = "songTab"
        var color = true;
        data.files.forEach((key) => {
            if (key.file.indexOf(".mp3") > -1) {
                color = !color;
                var row = document.createElement("tr");
                if (color) {
                    row.className = "colorOne";
                } else {
                    row.className = "colorTwo";
                }
                row.classList.add("tabSong");
                var albumTitle = document.createElement("td");
                albumTitle.textContent = this.clicked;
                albumTitle.classList.add = "tabData";
                row.append(albumTitle);
                var mp3Title = document.createElement("td");
                mp3Title.textContent = key.file.replace(".mp3", "");
                mp3Title.classList.add = "tabData";
                row.append(mp3Title);
                var size = document.createElement("td");
                size.textContent = (key.size / 1000000).toFixed(2) + " MB";
                size.classList.add = "tabData";
                row.append(size);
                var controls = document.createElement("td");
                controls.classList.add = "tabData";
                var play = document.createElement("img");
                play.src = "pics/play.png";
                play.className = "songAdd";
                play.id = key.file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");
                play.addEventListener("click", (e) => {
                    //music.changeTab(data.files);
                    music.loadSong(e.target, this.clicked, key, data.files);
                    music.progressBar();
                })
                controls.append(play);
                var stop = document.createElement("img");
                stop.src = "pics/stop.png";
                stop.className = "songDel";
                stop.id = key.file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");
                stop.addEventListener("click", (e) => {
                    music.stopSong(e.target);
                })
                controls.append(stop);
                var playlistAdd = document.createElement("img");
                playlistAdd.src = "pics/add.png";
                playlistAdd.className = "songPlaylist";
                playlistAdd.id = key.file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");
                playlistAdd.addEventListener("click", (e) => {
                    this.playlist = {
                        album: this.clicked,
                        file: key.file
                    };
                    net.playlistUpdate();
                })
                controls.append(playlistAdd);
                row.append(controls);
                table.append(row);
                $("#tabdiv").append(table);
            }
        })
    }

    renderPlaylist(data, playlist) {
        if (music.playingID == '') {
            //music.changeTab(playlist);
        }
        $("#playlistTab").empty();
        var color = true;
        playlist.forEach((key, index) => {
            color = !color;
            var row = document.createElement("tr");
            if (color) {
                row.className = "colorOne";
            } else {
                row.className = "colorTwo";
            }
            var albumTitle = document.createElement("td");
            albumTitle.textContent = (key.album.split(" "))[0];
            row.append(albumTitle);
            var mp3Title = document.createElement("td");
            mp3Title.textContent = key.file.replace(".mp3", "");
            row.append(mp3Title);
            var controls = document.createElement("td");
            controls.classList.add = "tabData";
            var play = document.createElement("img");
            play.src = "pics/play.png";
            play.id = "playlist" + key.id + key.file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");;
            play.addEventListener("click", (e) => {
                music.loadPlaylistSong(e.target, key.album, key, playlist);
                //music.changeTab(playlist);
                music.progressBar();
            })
            controls.append(play);
            var stop = document.createElement("img");
            stop.src = "pics/stop.png";
            stop.id = "playlist" + key.id + key.file.replace(/[^A-Za-z0-9]+/g, "").replace(".mp3", "");;
            stop.addEventListener("click", (e) => {
                music.stopPlaylistSong(e.target);
            })
            controls.append(stop);
            var playlistRemove = document.createElement("img");
            playlistRemove.src = "pics/sub.png";
            playlistRemove.addEventListener("click", (e) => {
                music.stopPlaylistSong(e.target.previousSibling, true);
                net.removeSingleSong(index);
            })
            controls.append(playlistRemove);
            row.append(controls);
            $("#playlistTab").append(row);
        })
        music.reClass()
    }
}