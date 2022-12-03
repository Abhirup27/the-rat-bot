require('dotenv').config();
const { token } = process.env;

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const disclient = new Client({ intents: GatewayIntentBits.Guilds });

  
disclient.commands = new Collection();
disclient.commandArray = [];
const functionFolders = fs.readdirSync('./functions')
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(disclient);

}

disclient.handleEvents();
disclient.handleCommands();
disclient.login(token);
