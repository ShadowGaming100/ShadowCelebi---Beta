//=====================================| Import the Module |=====================================\\
const { SlashCommandBuilder, PermissionFlagsBits, Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");

//==========< SETTINGS >==========\\
const embed = require("../../../Settings/embed.json");

//==========< FUNCTIONS >==========\\
const { errorCmdLogs } = require("../../../Functions/errorCmdLogs");

//=====================================| Code |=====================================\\

module.exports = {
    category: "Info",
    cooldown: 15,
    devOnly: false,
    guildOnly: false,
    voiceOnly: false,
    nsfwOnly: false,
    toggleOffCmd: false,
    maintenanceCmd: false,

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Show discord bot latency.")
        .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),

    /**
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(client, interaction) {
        try {
            // Function Uptime
            let days = Math.floor(client.uptime / 86400000)
            let hours = Math.floor(client.uptime / 3600000) % 24
            let minutes = Math.floor(client.uptime / 60000) % 60
            let seconds = Math.floor(client.uptime / 1000) % 60

            // Latency Check
            let webLatency = new Date() - interaction.createdAt
            let apiLatency = client.ws.ping
            let totalLatency = webLatency + apiLatency

            // Emoji
            let emLatency = {
                Green: '🟢',
                Yellow: '🟡',
                Red: '🔴'
            }

            interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor(totalLatency < 200 ? embed.Colors.successcolor : totalLatency < 500 ? embed.Colors.stanbycolor : embed.Colors.wrongcolor)
                        .setTitle(`Returns Latency And API Ping`)
                        .addFields(
                            {
                                name: `📡 Websocket Latency`,
                                value: `\`${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${webLatency}\`ms`,
                                inline: true
                            },
                            {
                                name: `🛰 API Latency`,
                                value: `\`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${apiLatency}\`ms`,
                                inline: true
                            },
                            {
                                name: `⏲ Uptime`,
                                value: `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``,
                                inline: true
                            }
                        )
                ],
            });

        } catch (error) {
            errorCmdLogs(client, interaction, error);
        }
    }
};