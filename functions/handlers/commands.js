const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
module.exports = (disclient) => {
    disclient.handleCommands = async () => {
        const commandFolders = fs.readdirSync(`./commands/`);
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
            const { commands, commandArray } = disclient;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);

                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has been passed through the handler.`)
            }
        }
        const token = 'MTAzNDQ3MjEzMDEzOTY2MDM1OQ.GNqNpS.24xVwe9k2d4u1zfoixl3670KK7GFeu7CikRWWw'
        const CLIENT_ID = '1034472130139660359'
        const GUILD_ID = '978300023072763934'
        const rest = new REST({ version: '10' }).setToken(process.env.token);
        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(Routes.applicationCommands(CLIENT_ID), { body: disclient.commandArray });

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();


    }
}