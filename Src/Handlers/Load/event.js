//====================< Create Function >====================\\
async function loadEvents(client, color) {

    //====================< Import Module >====================\\
    const { readdirSync } = require("fs")

    //====================< Code >====================\\
    client.removeAllListeners();

    console.log(`${color.bold.green(`[EVENTS]`)} ` + `Started refreshing application events...`.yellow);

    const eventsFolders = readdirSync(`${process.cwd()}/Src/Events`);
    let count = 0;
    for (const folder of eventsFolders) {
        const eventsFiles = readdirSync(`${process.cwd()}/Src/Events/${folder}`).filter(file => file.endsWith(".js"));
        for (const file of eventsFiles) {
            const events = require(`${process.cwd()}/Src/Events/${folder}/${file}`);
            client.events.set(events.name, events);
            count++;

            if (events.rest) {
                if (events.once) {
                    client.rest.once(events.name, (...args) => events.execute(...args, client, color));
                } else {
                    client.rest.on(events.name, (...args) => events.execute(...args, client, color));
                };
            } else {
                if (events.once) {
                    client.once(events.name, (...args) => events.execute(...args, client, color));
                } else {
                    client.on(events.name, (...args) => events.execute(...args, client, color));
                };
            };
            continue;
        };
        console.log(`${color.bold.green(`[EVENTS]`)} ` + `[${eventsFiles.length}] `.cyan + `in `.yellow + `${folder} `.magenta + `Successfully loaded!`.yellow);
    }
};

//====================< Exporting  Module >====================\\
module.exports = { loadEvents };