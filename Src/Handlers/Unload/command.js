//====================< Create Function >====================\\
async function unloadCommands(client, color) {

    //====================< Code >====================\\
    client.application.commands.set([]);
    console.log(`${color.bold.green(`[GLOBAL COMMANDS]`)} ` + `Successfully unloaded application commands!`.yellow);
};

//====================< Exporting  Module >====================\\
module.exports = unloadCommands