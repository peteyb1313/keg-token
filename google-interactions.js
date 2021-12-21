var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
const googleTTS = require('google-tts-api');

class GoogleFuncs { 

    constructor (ip) {
        this.ip = ip;
    }

    sendMessage(text) {

        const url = googleTTS.getAudioUrl(text, {
            lang: 'en-US',
            slow: false,
            host: 'https://translate.google.com',
        });

        console.log("Starting home call: " +this.ip);

        var client = new Client();

        client.connect(this.ip, function () {

            console.log("Connected");

            client.launch(DefaultMediaReceiver, function (err, player) {
                if(err) { throw new Error(err);}

                console.log("Setting volume");

                client.setVolume({ level: 0.75 }, function(err, newvol){ console.log( newvol) });

                var media = {
                    contentId: url,
                    contentType: 'audio/mp3',
                    streamType: 'BUFFERED'
                };

                console.log("Playing message");
                player.load(media, { autoplay: true }, function (err, status) {
                    player.on('status', function (status) {
                        if (status.playerState === "IDLE") {
                            console.log("Closing connection");
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
    }
}
//console.log("Running app");
//App.run("192.168.0.156", "I'm alive, please help me");
//App.broadcast("Broadcasted to all of the devices"); //Only works if you did step 4.5

module.exports = GoogleFuncs;