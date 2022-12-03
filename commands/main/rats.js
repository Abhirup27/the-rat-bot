const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../../events/client/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rats')
        .setDescription('eventually everyone becomes a rat!'),
    async execute(interaction, disclient, mess) {
        const message = await interaction.deferReply({
            fetchReply: true,
            ephemeral:false

        });
            await interaction.editReply({
                content: mess
            });
        //const newMessage = `API Latency: ${disclient.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
    }
}