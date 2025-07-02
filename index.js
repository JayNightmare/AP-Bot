require('dotenv').config();

const { createClient } = require('./src/config/client');
const { registerAllEvents } = require('./src/events');
const { loadJoinRoles } = require('./src/utils/joinRoles');

// Initialize the Discord client
const client = createClient();

// Load join roles configuration
loadJoinRoles();

// Register all event handlers
registerAllEvents(client);

// Login to Discord
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('✅ Bot startup sequence completed');
    })
    .catch(error => {
        console.error('❌ Failed to login:', error);
        process.exit(1);
    });
