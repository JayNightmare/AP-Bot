const { handleSetJoinRole } = require('./setJoinRole');
const { handleGetJoinRole } = require('./getJoinRole');
const { handleRemoveJoinRole } = require('./removeJoinRole');

/**
 * Command handler mapping
 */
const commandHandlers = {
    'set-join-role': handleSetJoinRole,
    'get-join-role': handleGetJoinRole,
    'remove-join-role': handleRemoveJoinRole
};

/**
 * Execute a command handler
 * @param {string} commandName - Name of the command
 * @param {CommandInteraction} interaction - The command interaction
 */
async function executeCommand(commandName, interaction) {
    const handler = commandHandlers[commandName];
    
    if (!handler) {
        await interaction.reply({ 
            content: '❌ Unknown command!', 
            ephemeral: true 
        });
        return;
    }
    
    await handler(interaction);
}

module.exports = {
    commandHandlers,
    executeCommand
};
