module.exports = {
    name: 'interactionCreate',

    async execute(interaction, disclient,client) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.isChatInputCommand()) {
            const { commands } = disclient;
            const { commandName } = interaction;
            const command = commands.get(commandName);
            if (!command) return;

            try {
                if(command == 'rats')
                {
                    await command.execute(interaction, disclient,client);
                }
                else{await command.execute(interaction, disclient, client);}
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wront while executing this command...`,
                    ephemeral: false,
                });
            }
        }
    }
}