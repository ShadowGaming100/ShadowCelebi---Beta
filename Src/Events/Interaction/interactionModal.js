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
    name: "interactionModal",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        if (interaction.isModalSubmit()) {
            if (interaction.user.bot) return;
            const command = client.modalForms.get(interaction.customId);
            if (!command) {
                interaction.reply({
                    ephemeral: true,
                    content: "Failed to show modal!"
                });
            };

            //===============< EXECUTE CMD >===============\\
            try {
                command.execute(client, interaction);
            } catch (error) {
                errorCmdLogs(client, interaction, error)
                console.log(`${color.bold.red(`[INTERACTION > MODAL: ERROR]`)} ` + `${error}`.bgRed);
            };
        };
    }
};