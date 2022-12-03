const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Latency to the bot server and API'),
    async execute(interaction, disclient) {
        const message = await interaction.deferReply({
            fetchReply: true

        });
        const newMessage = `API Latency: ${disclient.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({
            content: newMessage
        });
    }
}