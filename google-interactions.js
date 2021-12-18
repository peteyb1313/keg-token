var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
const googleTTS = require('google-tts-api');

var App = {
    playin: false,
    DeviceIp: "",
    Player: null,
    GoogleHome: function (host, url) {
        console.log("Starting home call: " +this.DeviceIp);
        var client = new Client();
        client.connect(host, function () {
            console.log("Connected");
            client.launch(DefaultMediaReceiver, function (err, player) {
                console.log(err);
                console.log("Launhcned setting vaolume");
                //client.setVolume({ level: 0.5 }, function(err, newvol){ console.log( newvol) });
                console.log(volume);
                var media = {
                    contentId: url,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                };
                App.Player = player;
                App.Player.load(media, { autoplay: true }, function (err, status) {
                    App.Player.on('status', function (status) {
                        if (status.playerState === "IDLE" && App.playin === false) {
                            client.close();
                        }
                    });
                });
            });
        });
        client.on('error', function (err) {
            console.log('Error: %s', err.message);
            client.close();
        });
    },
    run: function (ip, text) {
        console.log("Initiating text to speech")
        App.DeviceIp = ip;
        const url = googleTTS.getAudioUrl(text, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
        });
        console.log("Calling home");
        App.GoogleHome(App.DeviceIp, url, function (res) {
            console.log(res);
        })
    },
    broadcast: function(text){
        const ips = process.env.GOOGLEHOME_IPS.split(","); //From config, 192.168.68.105,192.168.68.107,192.168.68.124
        for (var s of ips){
            App.run(s, text);
        }
    }
};
console.log("Running app");
App.run("192.168.0.156", "Sorry");
//App.broadcast("Broadcasted to all of the devices"); //Only works if you did step 4.5
