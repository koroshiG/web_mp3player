class Visual {

    constructor() {
        this.init();
        this.render()
    }

    init() {
        // this.ctx = $("#canvas")[0].getContext("2d");
        for (var i = 0; i < 32; i++) {
            var div = document.createElement("div");
            div.style.width = "2.8%";
            div.style.height = "255px";
            div.style.position = "absolute";
            div.style.bottom = "0px";
            div.style.left = ((i * 3.5)) + "%";            
            div.style.background = "white";
            $("#spectrum").append(div);
        }
        // for (var i = 0; i < 16; i++) {
        //     var div = document.createElement("div");
        //     div.style.width = "2.8%";
        //     div.style.height = "255px";
        //     div.style.position = "absolute";
        //     div.style.bottom = "0px";
        //     div.style.right = (i * 40) + 40 + "px";
        //     div.style.background = "white";
        //     $("#spectrum").append(div);
        // }
        for (var i = 0; i < 36; i++) {
            var div = document.createElement("div");
            div.style.width = "12.5px";
            div.style.height = "80%";
            div.style.position = "absolute";
            div.style.bottom = "0px";
            div.style.left = (i * 12.5) + "px";
            div.style.background = "white";
            $("#graph").append(div);
        }

    }

    render() {

        requestAnimationFrame(this.render.bind(this)); // bind(this) przekazuje this do metody render
        //$("#visual").html(music.getData()) // wyświetlenie danych audio w div-ie
        var spectrumTab = music.getData().split(",");
        
        if ($("#darkmode")[0].style.display != "none") {
            for (var i = 0; i < 16; i++) {
                $("#spectrum").children("div")[i].style.background = "rgb(255, 60, " +(255 - spectrumTab[i]) + ")";
                $("#spectrum").children("div")[i].style.height = ~~spectrumTab[i]*2 + "px";
                $("#spectrum").children("div")[i + 16].style.background = "rgb(125, 180, " + spectrumTab[16 - i] + ")";
                $("#spectrum").children("div")[i + 16].style.height = spectrumTab[16 - i]*2 + "px";
            }
        }

        if ($("#darkmode")[0].style.display == "none") {
            for (var i = 0; i < 36; i++) {
                $("#graph").children("div")[i].style.background = "rgb(" + (spectrumTab[i]) + "," + spectrumTab[i]/3 + ", " + spectrumTab[i]/2 + ")";
                $("#graph").children("div")[i].style.height = ((~~(spectrumTab[i])/255) * $("#graph").height())+ "px";                
            }
        }
        // for (var i = 0; i < 16; i++) {
        //     this.ctx.beginPath();
        //     this.ctx.lineWidth = "1";
        //     this.ctx.strokeStyle = "red";
        //     this.ctx.rect(50*i, 350, 50, -music.getData().split(",")[i*2]);
        //     this.ctx.stroke();
        // }
        // this.ctx.clearRect(0, 0, 800, 350);
    }

}