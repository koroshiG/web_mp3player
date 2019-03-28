class Net {
    constructor() {
        console.log("Net is ready");
        this.firstData();
    }

    firstData() {
        $.ajax({
            url: "/",
            data: {},
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {   
                ui.renderAlbums(data.dirs);
                ui.renderMenu(data.dirs);
                ui.renderPlaylist(data,  data.playlist);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    sendData() {
        $.ajax({
            url: "/",
            data: {
                clicked: ui.clicked,
            },
            type: "POST",
            //async: false,
            dataType: "json",
            success: function (data) {                
                ui.renderMenu(data.dirs);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    playlistUpdate(){
        $.ajax({
            url: "/",
            data: {
                header: "playlist",
                playlist: JSON.stringify(ui.playlist)
            },
            type: "POST",
            //async: false,
            dataType: "json",
            success: function (data) {         
                music.playlist = data.playlist;
                ui.renderPlaylist(data, data.playlist);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    removeSingleSong(index){
        $.ajax({
            url: "/",
            data: {
                header: "single",
                id: index
            },
            type: "POST",
            //async: false,
            dataType: "json",
            success: function (data) {
                music.playlist = data.playlist;
                ui.renderPlaylist(data, data.playlist);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }

    removePlaylist(){
        $.ajax({
            url: "/",
            data: {
                header: "remove",
            },
            type: "POST",
            //async: false,
            dataType: "json",
            success: function (data) {                
                console.log("remove");
                music.playlist = data.playlist;
                ui.renderPlaylist(data, data.playlist);
                music.restartAudio();
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        })
    }
}