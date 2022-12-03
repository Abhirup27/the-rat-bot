const fs = require('fs');
const tmi = require('tmi.js');
const { exec } = require("child_process");
var mess
module.exports = (disclient) => {

    var opts = {
        identity: {
            username: 'theratbot',
            password: ''
        },
        channels: [
            'siennamaria'
        ],
    };
   // console.log(opts.identity.password)
  gettoken();

   async function gettoken() { await exec("curl -X POST https://id.twitch.tv/oauth2/token \ -H 'Content-Type: application/x-www-form-urlencoded' \ -d 'grant_type=refresh_token&refresh_token=v5kzvty0to8fcpys3zepb3yqyymihpbmfh8pby3fcgvmy1fqbs&client_id=skxju2p7efdguxprll43lvspzhycr3&client_secret=w8k2be9tdbw1guj0onghmwllpfso27'", async(error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        //return;
    }
    const key= JSON.parse(stdout);
    const keystring = await String(key.access_token)
    
    //console.log(keystring); 
    opts.identity.password= key.access_token 
    console.log(opts.identity.password)
    
     client = new tmi.client(opts);
    // Connect to Twitch:
    client.connect();
    client.on('connected', onConnectedHandler);
    function onConnectedHandler(addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
        client.say('siennamaria', '!trackrat');
    }
    //Called every time a message comes in
    client.on('message', async (channel, tags, message, self) => {
        var checkmsg = message.replace(/[0-9]/g, '');

        if (checkmsg === 'rat counter ') {
            console.log(message);
            const tempmesg = message.replace(/\D/g, '');

            mess = "Micah has been mentioned " + tempmesg + " times on the streams by Sienna."

        }
    }
    )
})
   }
//   setInterval  (exec("curl -X POST https://id.twitch.tv/oauth2/token \ -H 'Content-Type: application/x-www-form-urlencoded' \ -d 'grant_type=refresh_token&refresh_token=v5kzvty0to8fcpys3zepb3yqyymihpbmfh8pby3fcgvmy1fqbs&client_id=skxju2p7efdguxprll43lvspzhycr3&client_secret=w8k2be9tdbw1guj0onghmwllpfso27'", (error, stdout, stderr) => {
// if (error) {
//     console.log(`error: ${error.message}`);
//     return;
// }
// if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     //return;
// }
// const key= JSON.parse(stdout);

// console.log(`stdout: ${key.access_token}`); }),1800000); // every 30 minutes. 1800 seconds


    // Create a client with our options
    var client = new tmi.client(opts);
    // Register our event handlers (defined below)

    //client.on('message', onMessageHandler);
  // client.on('connected', onConnectedHandler);

    
    


    disclient.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./events`);
        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./events/${folder}`).filter((file) => file.endsWith(".js"));
            switch (folder) {
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) disclient.once(event.name, (...args) => event.execute(...args, disclient));
                        else disclient.on(event.name, (...args) => event.execute(...args, disclient, mess));
                    }
                    break;

            }
        }
    }
}

//
// const { curly } = require('node-libcurl')
// const { data , statuscode, headers} = curly.post('https://id.twitch.tv/oauth2/token', {
//   postFields: JSON.stringify(
//     { grant_type: 'refresh_token',
//     refresh_token: 'v5kzvty0to8fcpys3zepb3yqyymihpbmfh8pby3fcgvmy1fqbs',
//     client_id:'skxju2p7efdguxprll43lvspzhycr3',
//     client_secret:'w8k2be9tdbw1guj0onghmwllpfso27'
//  }
    
//     ),
//   httpHeader: [
//     'Content-Type: application/x-www-form-urlencoded',
//     'Accept: application/json'
//   ],
// })

//  console.log(data)
//  console.log(statuscode)

// const querystring = require('querystring');
// const { Curl } = require('node-libcurl');

// const curl = new Curl();
// const close = curl.close.bind(curl);
// curl.setOpt(Curl.option.URL, 'https://id.twitch.tv/oauth2/token');
// curl.setOpt(Curl.option.POST, true)
// curl.setOpt(Curl.option.HTTPHEADER,
//     ['Content-Type: application/x-www-form-urlencoded'])
// curl.setOpt(Curl.option.POSTFIELDS, querystring.stringify({
//     grant_type: 'refresh_token',
//     refresh_token: 'v5kzvty0to8fcpys3zepb3yqyymihpbmfh8pby3fcgvmy1fqbs',
//     client_id:'skxju2p7efdguxprll43lvspzhycr3',
//     client_secret:'w8k2be9tdbw1guj0onghmwllpfso27'
// }));
// curl.perform();
// curl.on('end', function (statusCode, data, headers) {
//     console.info(statusCode);
//     console.info('---');
//     console.info(data.length);
//     console.info('---');
//     console.info(this.getInfo( 'TOTAL_TIME'));
    
//     this.close();
//   });

// curl.on('end', close);
// curl.on('error', close);
