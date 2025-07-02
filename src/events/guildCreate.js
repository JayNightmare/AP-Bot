const { Events } = require('discord.js');

/**
 * Handle guild create events (bot joins a new server)
 * @param {Guild} guild - The guild the bot joined
 */
async function handleGuildCreate(guild) {
    console.log(`🆕 Joined new guild: ${guild.name} (${guild.id})`);
    
    // If GUILD_ID is set and this guild doesn't match, leave immediately
    if (process.env.GUILD_ID && guild.id !== process.env.GUILD_ID) {
        try {
            console.log(`🚪 Guild ${guild.name} (${guild.id}) doesn't match configured GUILD_ID. Leaving immediately...`);
            await guild.leave();
            console.log(`✅ Successfully left guild: ${guild.name}`);
        } catch (error) {
            console.error(`❌ Error leaving guild ${guild.name}:`, error);
        }
    } else if (process.env.GUILD_ID) {
        console.log(`✅ Guild ${guild.name} matches configured GUILD_ID. Staying in guild.`);
    } else {
        console.log(`ℹ️ No GUILD_ID configured. Staying in guild: ${guild.name}`);
    }
}

/**
 * Register the guild create event
 * @param {Client} client - Discord client
 */
function registerGuildCreateEvent(client) {
    client.on(Events.GuildCreate, handleGuildCreate);
}

module.exports = { registerGuildCreateEvent };
