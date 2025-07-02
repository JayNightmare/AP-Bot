const { createSuccessEmbed, createWarningEmbed } = require('../utils/embeds');
const { hasJoinRole, removeJoinRole, saveJoinRoles } = require('../utils/joinRoles');

/**
 * Handle the remove-join-role command
 * @param {CommandInteraction} interaction - The command interaction
 */
async function handleRemoveJoinRole(interaction) {
    try {
        const guildId = interaction.guildId;
        
        if (!hasJoinRole(guildId)) {
            const infoEmbed = createWarningEmbed(
                'No Join Role Set',
                'There is no join role configured to remove.'
            );
            
            return await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
        }
        
        removeJoinRole(guildId);
        saveJoinRoles();
        
        const successEmbed = createSuccessEmbed(
            'Join Role Removed',
            'The join role configuration has been removed. New members will no longer automatically receive a role.'
        );
        
        await interaction.reply({ embeds: [successEmbed] });
        
    } catch (error) {
        console.error('❌ Error in handleRemoveJoinRole:', error);
        throw error;
    }
}

module.exports = { handleRemoveJoinRole };
