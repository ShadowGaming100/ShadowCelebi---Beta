//=====================================| Import the Module |=====================================\

const {GatewayIntentBits, Partials} = require("discord.js");

//=====================================| Code |=====================================\

//=====================================| Create Function |=====================================\

function clientSettingsObject() {
    return {
        shards: 'auto',
        allowedMentions: {
            parse: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'],
        },

        
    //=====================================| Intents |=====================================\

        intents: [
            GatewayIntentBits.AutoModerationConfiguration,
            GatewayIntentBits.AutoModerationExecution,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildScheduledEvents,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent
        ],
    //=====================================| Partials |=====================================\

        partials: [
            Partials.Channel,
            Partials.GuildMember,
            Partials.GuildScheduledEvent,
            Partials.Message,
            Partials.Reaction,
            Partials.ThreadMember,
            Partials.User
        ],
        fetchAllMembers: true,
    };
};

module.exports = clientSettingsObject;
