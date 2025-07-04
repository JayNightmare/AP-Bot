const { registerReadyEvent } = require('./ready');
const { registerInteractionCreateEvent } = require('./interactionCreate');
const { registerGuildMemberAddEvent } = require('./guildMemberAdd');
const { registerGuildCreateEvent } = require('./guildCreate');
const { registerErrorEvents } = require('./error');

/**
 * Register all events for the Discord client
 * @param {Client} client - Discord client
 */
function registerAllEvents(client) {
    registerReadyEvent(client);
    registerInteractionCreateEvent(client);
    registerGuildMemberAddEvent(client);
    registerGuildCreateEvent(client);
    registerErrorEvents(client);
    
    console.log('✅ All events registered');
}

module.exports = { registerAllEvents };
