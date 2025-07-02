const { createInfoEmbed, createErrorEmbed, createWarningEmbed } = require('../utils/embeds');
const { getJoinRole } = require('../utils/joinRoles');

/**
 * Handle the get-join-role command
 * @param {CommandInteraction} interaction - The command interaction
 */
async function handleGetJoinRole(interaction) {
    try {
        const guildId = interaction.guildId;
        const joinRoleId = getJoinRole(guildId);
        
        if (!joinRoleId) {
            const infoEmbed = createWarningEmbed(
                'No Join Role Set',
                'No join role has been configured for this server.',
                [{
                    name: '💡 How to set one',
                    value: 'Use `/set-join-role` to configure a role for new members.'
                }]
            );
            
            return await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
        }
        
        const role = interaction.guild.roles.cache.get(joinRoleId);
        
        if (!role) {
            const errorEmbed = createErrorEmbed(
                'Role Not Found',
                'The configured join role no longer exists in this server.',
                [{
                    name: '💡 Solution',
                    value: 'Use `/set-join-role` to configure a new role or `/remove-join-role` to clear the configuration.'
                }]
            );
            
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
        
        const infoEmbed = createInfoEmbed(
            'Current Join Role',
            `New members currently receive the **${role.name}** role when they join.`,
            [{
                name: '🔧 Role Details',
                value: `**Name:** ${role.name}\n**ID:** ${role.id}\n**Members:** ${role.members.size}\n**Color:** ${role.hexColor}`,
                inline: true
            }]
        );
        
        await interaction.reply({ embeds: [infoEmbed], ephemeral: true });
        
    } catch (error) {
        console.error('❌ Error in handleGetJoinRole:', error);
        throw error;
    }
}

module.exports = { handleGetJoinRole };
