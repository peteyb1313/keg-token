

// http://192.168.0.156/

const http = require('http')

class ShellyFuncs { 

    constructor (ip) {
        console.log(`Initiating shelly wiht IP ${ip}`);
        this.ip = ip;
    }

    switchRelay(on) {
        console.log(`Shelly: Turning IP ${this.ip} ${(on ? "on" : "off")}`);
        
        http.get(`http://${this.ip}/relay/0?turn=${(on ? "on" : "off")}`, (res) => {
            if (res.statusCode !== 200) {
              console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
              res.resume();
              return;
            }
          
            let data = '';
          
            res.on('data', (chunk) => {
              data += chunk;
            });
          
            res.on('close', () => {
              console.log('Retrieved all data');
              console.log(JSON.parse(data));
            });
          });
    }
}

module.exports = ShellyFuncs;

