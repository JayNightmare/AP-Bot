const { Events } = require('discord.js');

/**
 * Handle Discord client errors
 * @param {Error} error - The error
 */
function handleClientError(error) {
    console.error('❌ Discord client error:', error);
}

/**
 * Register error handling events
 * @param {Client} client - Discord client
 */
function registerErrorEvents(client) {
    client.on(Events.Error, handleClientError);
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', error => {
        console.error('❌ Unhandled promise rejection:', error);
    });
    
    // Handle uncaught exceptions
    process.on('uncaughtException', error => {
        console.error('❌ Uncaught exception:', error);
        process.exit(1);
    });
}

module.exports = { registerErrorEvents };
