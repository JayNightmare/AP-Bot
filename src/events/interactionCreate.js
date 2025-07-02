const { Events } = require('discord.js');
const { executeCommand } = require('../commands');
const { createGenericErrorEmbed } = require('../utils/embeds');

/**
 * Handle interaction create events
 * @param {Interaction} interaction - The interaction
 */
async function handleInteractionCreate(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    try {
        await executeCommand(commandName, interaction);
    } catch (error) {
        console.error('❌ Error handling command:', error);
        
        const errorEmbed = createGenericErrorEmbed();

        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        } catch (followUpError) {
            console.error('❌ Error sending error message:', followUpError);
        }
    }
}

/**
 * Register the interaction create event
 * @param {Client} client - Discord client
 */
function registerInteractionCreateEvent(client) {
    client.on(Events.InteractionCreate, handleInteractionCreate);
}

module.exports = { registerInteractionCreateEvent };
