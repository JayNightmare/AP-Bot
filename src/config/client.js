const { Client, GatewayIntentBits } = require('discord.js');

/**
 * Create and configure the Discord client with necessary intents
 * @returns {Client} Configured Discord client
 */
function createClient() {
    return new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages
        ]
    });
}

module.exports = { createClient };
