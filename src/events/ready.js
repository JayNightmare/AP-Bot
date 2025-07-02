const { Events } = require('discord.js');
const { commands } = require('../config/commands');

/**
 * Handle the client ready event
 * @param {Client} client - Discord client
 */
async function handleReady(client) {
    console.log(`🤖 Ready! Logged in as ${client.user.tag}`);
    
    // Register slash commands
    try {
        console.log('🔄 Started refreshing application (/) commands.');
        
        // Register commands globally or for specific guild
        if (process.env.GUILD_ID) {
            // Register for specific guild (faster for development)
            const guild = client.guilds.cache.get(process.env.GUILD_ID);
            if (guild) {
                await guild.commands.set(commands);
                console.log('✅ Successfully registered guild-specific commands.');
            } else {
                console.log('⚠️ Guild not found, registering global commands instead.');
                await client.application.commands.set(commands);
                console.log('✅ Successfully registered global commands.');
            }

            // ! Leave any guilds that don't match the GUILD_ID
            client.guilds.cache.forEach(async (g) => {
                if (g.id !== process.env.GUILD_ID) {
                    console.log(`🚪 Leaving guild: ${g.name} (${g.id})`);
                    await g.leave();
                }
            });
        } else {
            // Register globally (takes up to 1 hour to sync)
            await client.application.commands.set(commands);
            console.log('✅ Successfully registered global commands.');
        }
    } catch (error) {
        console.error('❌ Error registering commands:', error);
    }
}

/**
 * Register the ready event
 * @param {Client} client - Discord client
 */
function registerReadyEvent(client) {
    client.once(Events.ClientReady, () => handleReady(client));
}

module.exports = { registerReadyEvent };
