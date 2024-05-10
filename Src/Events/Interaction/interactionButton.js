//=====================================| Import the Module |=====================================\\
const { Client, ChatInputCommandInteraction } = require("discord.js");

//===============< FUNCTIONS >===============\\
const { errorCmdLogs } = require("../../Functions/errorCmdLogs");

//===============< SETTINGS >===============\\
const settings = require("../../Settings/settings.json");
//===============< OTHERS >===============\\
const color = require("colors");

//=====================================| Code |=====================================\\
module.exports = {
    name: "interactionButton",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.user.bot) return;
            const command = client.buttonCommands.get(interaction.customId);
            if (!command) {
                interaction.reply({
                    ephemeral: true,
                    content: "Failed to execute button!"
                });
            };


            //===============< DEVELOPER ONLY >===============\\
            if (command.authorOnly && !interaction.user.id) {
                interaction.reply({
                    ephemeral: true,
                    content: "This action can only be used by Author!"
                });
            };

            //===============< EXECUTE CMD >===============\\
            try {
                command.execute(client, interaction);
            } catch (error) {
                errorCmdLogs(client, interaction, error)
                console.log(`${color.bold.red(`[INTERACTION > BUTTON: ERROR]`)} ` + `${error}`.bgRed);
            };
        };
    }
};
