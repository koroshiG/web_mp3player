var http = require("http");
var fs = require("fs");
var qs = require("querystring");

dirs = {};
playlist = [];

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            req.url = req.url.split("%20").join(" ");

            if (req.url == "/") {
                fs.readFile("static/index.html", function (err, data) {
                    if (err) {
                        console.log("err index");
                        res.writeHead(404, {
                            "content-type": "text/html;charset=utf-8"
                        });
                        res.end("<h1> błąd 404 - nie odnaleziono strony</h1>");
                    } else {
                        res.writeHead(200, {
                            "content-type": "text/html;charset=utf-8"
                        });

                        dirTab = [];
                        fs.readdir(__dirname + "/static/mp3", function (err, dir) {
                            if (err) {
                                return console.log(err);
                            }
                            dir.forEach(function (dirName) {
                                dirTab.push(dirName);
                            })
                            dirs.dirs = dirTab;
                            listDir(dirs.dirs[0]);
                        })


                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/style.css") {
                fs.readFile("static/css/style.css", function (err, data) {
                    if (err) {
                        console.log("err css");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "text/css;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/net.js") {
                fs.readFile("static/js/net.js", function (err, data) {
                    if (err) {
                        console.log("err net");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/visual.js") {
                fs.readFile("static/js/visual.js", function (err, data) {
                    if (err) {
                        console.log("err net");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/music.js") {
                fs.readFile("static/js/music.js", function (err, data) {
                    if (err) {
                        console.log("err music");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/ui.js") {
                fs.readFile("static/js/ui.js", function (err, data) {
                    if (err) {
                        console.log("err ui");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/main.js") {
                fs.readFile("static/js/main.js", function (err, data) {
                    if (err) {
                        console.log("err main");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/jq331.js") {
                fs.readFile("libs/jq331.js", function (err, data) {
                    if (err) {
                        console.log("err jquery");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "application/javascript;charset=utf-8"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url == "/favicon.ico") {
                fs.readFile("static/favicon.ico", function (err, data) {
                    if (err) {
                        console.log("err ico");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "image/gif"
                        });
                        res.write(data);
                        res.end();
                    }
                })
            } else if (req.url.includes(".jpg")) {
                fs.readFile("static/" + req.url, function (err, data) {
                    if (err) {
                        console.log("err jpg");

                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "content-type": "image/jpg"
                        });
                        res.end(data);
                    }
                })
            } else if (req.url.includes(".mp3")) {
                fs.readFile("static/mp3" + req.url, function (err, data) {
                    if (err) {
                        console.log("err mp3");
                        console.log(err);

                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "Content-type": "audio/mpeg"
                        });
                        res.end(data);
                    }
                })
            } else if (req.url.includes(".png")) {
                fs.readFile("static" + req.url, function (err, data) {
                    if (err) {
                        console.log("err png");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "Content-type": "application/font-woff"
                        });
                        res.end(data);
                    }
                })
            } else if (req.url.includes(".otf") || req.url.includes(".ttf")) {
                fs.readFile("static" + req.url, function (err, data) {
                    if (err) {
                        console.log("err font");
                        res.writeHead(404, {
                            "content-type": "text/html"
                        });
                    } else {
                        res.writeHead(200, {
                            "Content-type": "image/png"
                        });
                        res.end(data);
                    }
                })
            }
            break;
        case "POST":

            servResponse(req, res);
            break;
    }
})

function servResponse(req, res) {
    var allData = "";
    var send = {};
    var rep = false;


    // w poniższej funkcji nic nie modyfikujemy
    req.on("data", function (data) {
        allData += data;
    })


    //odsyłane
    req.on("end", function (data) {
        var fromAjax = qs.parse(allData);
        if (fromAjax.header == "playlist") {
            var objPlaylist = JSON.parse(fromAjax.playlist);
            objPlaylist["id"] = playlist.length;
            playlist.push(objPlaylist);
        } else if (fromAjax.header == "remove") {
            playlist = [];
        } else if (fromAjax.header == "single") {
            playlist.splice(fromAjax.id, 1);
            playlist.forEach((play, index)=>{
                play.id = index;
            })
        }
        console.log(playlist);

        send["playlist"] = playlist;
        if (fromAjax.clicked != undefined) {
            listDir(fromAjax.clicked);
        }
        send["dirs"] = dirs;
        res.writeHead(200, {
            "content-type": "text/json:charset=utf-8"
        })
        setTimeout(() => res.end(JSON.stringify(send, null, 4), 500));
    })
}

function listDir(selectedDir) {

    fileTab = [];

    fs.readdir(__dirname + "/static/mp3/" + selectedDir, function (err, file) {
        if (err) {
            return console.log(err);
        }
        file.forEach(function (fileName) {
            fileObj = {};
            fileObj.file = fileName;
            var stats = fs.statSync(__dirname + "/static/mp3/" + selectedDir + "/" + fileName);
            fileObj.size = stats.size;
            fileObj.album = selectedDir;
            fileTab.push(fileObj);
        })
        dirs.files = fileTab;
        console.log("1: ", dirs);
    })
}

server.listen(8080, "0.0.0.0");
console.log("port 8080");