//====================< Create Function >====================\\
async function loadSlashCommands(client, color) {
  //====================< Import Module >====================\\
  const { readdirSync } = require("fs");

  //====================< Code >====================\\
  await client.slashCommands.clear();
  let publicCommandsArray = [];

  console.log(`${color.bold.green(`[GLOBAL COMMANDS]`)} ` + `Started refreshing application commands...`.yellow);

  const commandFolders = readdirSync(`${process.cwd()}/Src/Commands/Slash`);
  let publicCommands = 0;
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`${process.cwd()}/Src/Commands/Slash/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`${process.cwd()}/Src/Commands/Slash/${folder}/${file}`);
      client.slashCommands.set(command.data.name, command);
      publicCommandsArray.push(command.data.toJSON());
      publicCommands++;
    }
  }
  client.application.commands.set(publicCommandsArray).then(console.log(`${color.bold.green(`[GLOBAL COMMANDS]`)} ` + `[${publicCommandsArray.length}] `.cyan + `Successfully loaded!`.yellow));
}
module.exports = { loadSlashCommands };
