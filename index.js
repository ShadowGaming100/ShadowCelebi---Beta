//=====================================| Import the Module |=====================================\

const { Collection, Client } = require("discord.js");
const color = require("colors");
require("dotenv").config();

//=====================================| Import the Settings |=====================================\\

const slashCommands = require("./Src/Settings/slashCommands.json");


//=====================================| Create Client |=====================================\\

  const clientSettingsObject = require("./Src/Functions/clientSettingsObject");
  const client = new Client(clientSettingsObject());

//======================< Collection >======================\\

  client.slashCommands = new Collection();
  client.events = new Collection();

//=====================================| Deploy Slash Commands |=====================================\\

//=====================================| All Functions |=====================================\\

  //===============< Function >===============\\
  const { errorCmdLogs } = require("./Src/Functions/errorCmdLogs.js");

  //===============< Load Function >===============\\
  const { loadSlashCommands } = require("./Src/Handlers/Load/slashCommand");
  const { loadMessageCommands } = require("./Src/Handlers/Load/messageCommand")
  const { loadEvents } = require("./Src/Handlers/Load/event.js");
  const { loadAntiCrash} = require("./Src/Handlers/antiCrash.js")

//=====================================| Login |=====================================\\
try {
  client.login(process.env.TOKEN).then(() => {
    //===============< Main >===============\\
    loadAntiCrash(client, color)
    loadEvents(client, color);
    loadSlashCommands(client, color);
    loadMessageCommands(client, color);
  });
} catch (error) {
  errorCmdLogs(client, interaction, error);
}
