const { version, Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const { author } = require("../../../package.json");
const moment = require("moment");
const color = require("colors");

module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        console.log("=======================================< LIMIT >=======================================".gray);
        console.log(`${color.bold.bgBlue(`[${moment().format("dddd - DD/MM/YYYY - hh:mm:ss", true)}]`)} ` + `${color.bold.green(`[READY]`)} ` + `Logging into Discord...`.yellow);
        console.table({
            "Name": client.user.tag,
            "Author": `${author}`,
            "Discord.js": `v${version}`,
            "Node.js": `${process.version}`,
            "Guilds": client.guilds.cache.size,
            "Users": client.users.cache.size,
            "Channels": client.channels.cache.size,
            "Slash Commands": client.slashCommands.size,
            "Events": client.events.size
        });
        console.log(`${color.bold.bgBlue(`[${moment().format("dddd - DD/MM/YYYY - hh:mm:ss", true)}]`)} ` + `${color.bold.green(`[READY]`)} ` + `${client.user.tag} is online!`.yellow);

        let acts = [
            {
                name: "/commands",
                type: 5,
                status: "dnd",
            },
            {
                name: `listening ${client.users.cache.size} user(s)`,
                type: 3,
                status: "idle",
            },
            {
                name: `over ${client.guilds.cache.size} guild(s)`,
                type: 3,
                status: "idle",
            },
        ];
        setInterval(async () => {
            const currentAct = acts.shift();
            client.user.setPresence({
                activities: [
                    {
                        name: currentAct.name.toString(),
                        type: currentAct.type,
                    },
                ],
                status: currentAct.status,
                /**
                 * Don't want a changing status? Just change the line above to `status: "status"`. Different statuses include "online", "idle", "dnd", and "invisible"
                 */
            });
            acts.push(currentAct);
        }, 15000);
    }
};