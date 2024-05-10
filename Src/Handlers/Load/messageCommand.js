async function loadMessageCommands(client, color) {
  const { readdirSync } = require("fs");

  // ========================================| Code |======================================= \\

  const commandFolders = readdirSync(`${process.cwd()}/Src/Commands/Message`);
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`${process.cwd()}/Src/Commands/Message/${folder}/`).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`${process.cwd()}/Src/Commands/Message/${folder}/${file}`);
      client.messageCommands.set(command.name, command);
    }
    console.log(`${color.bold.green(`[MESSAGE COMMAND]`)} ` + `[${commandFiles.length}] `.cyan + `in `.yellow + `${folder} `.magenta + `was loaded!`.yellow);
  }
}
module.exports= { loadMessageCommands };