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
    name: "interactionCreate",

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        //==================< CHAT INPUT >==================\\
        if (interaction.isChatInputCommand()) {
            if (interaction.user.bot) return;
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command is outdated!"
                });
            };

            //===============< DEVELOPER ONLY >===============\\
            if (command.devOnly && !settings.developer.id.includes(interaction.user.id)) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command can only be used by Developer!"
                });
            };

            //===============< GUILD ONLY >===============\\
            if (command.guildOnly && !Guilds.includes(interaction.guild.id)) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command can only be used by Official Server!"
                });
            };

            //===============< VOICE ONLY >===============\\
            if (command.voiceOnly) {
                const GME = interaction.guild.members.cache.get(client.user.id);
                if (!interaction.member.voice.channelId) {
                    interaction.reply({
                        ephemeral: true,
                        content: "This command can only be used in voice channel, and you are not connected to an audio channel!"
                    });
                } else if (GME.voice.channelId !== interaction.member.voice.channelId) {
                    interaction.reply({
                        ephemeral: true,
                        content: "This command can only be used in voice channel, and you are not on the same audio channel as me!"
                    });
                };
            };

            //===============< NSFW ONLY >===============\\
            if (command.nsfwOnly && !interaction.channel.nsfw) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command can only be used in NSFW channel!"
                });
            };

            //===============< DISABLED CMD >===============\\
            if (command.toggleOffCmd && !settings.developer.id.includes(interaction.user.id)) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command has been disabled by developer!"
                });
            };

            //===============< MAINTENANCE CMD >===============\\
            if (command.maintenanceCmd && !settings.developer.id.includes(interaction.user.id)) {
                interaction.reply({
                    ephemeral: true,
                    content: "This command has been maintenance by developer!"
                });
            };


            //===============< EXECUTE CMD >===============\\
            try {
                command.execute(client, interaction);
            } catch (error) {
                errorCmdLogs(client, interaction, error)
                console.log(`${color.bold.red(`[INTERACTION > SLASH: ERROR]`)} ` + `${error}`.bgRed);
            };
        };

        //==================< AUTO COMPLETE >==================\\
        if (interaction.isAutocomplete()) {
            const command = client.slashCommands.get(interaction.commandName);
            command.autocomplete(client, interaction);
        };
    }
};
