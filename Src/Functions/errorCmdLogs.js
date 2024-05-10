function errorCmdLogs(client, interaction, error) {
    console.log(String(error.stack).bgRed)
    client.channels.cache.get("1105491853186453538").send({
        embeds: [
            new EmbedBuilder()
                .setColor("Red")
                .setAuthor(`${interaction.guild.name}\n[${interaction.guild.id}]`, interaction.guild.iconURL({ dynamic: true }))
                .setTitle(`Error System`)
                .setDescription(`_An error has occured_.\n\n**Error Code:** \`${error.name}\`\n**Error Message:** \`${error.message}\`\n**Stack:** \`\`\`yml\n${error.stack}\`\`\``)
                .setFooter(`Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB | CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% | Ping: ${Date.now() - interaction.createdTimestamp}ms`)
        ]
    });
}

module.exports = { errorCmdLogs };