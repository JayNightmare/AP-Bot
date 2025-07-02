const { createSuccessEmbed, createErrorEmbed } = require('../utils/embeds');
const { validateRoleAssignment } = require('../utils/permissions');
const { setJoinRole, saveJoinRoles } = require('../utils/joinRoles');

/**
 * Handle the set-join-role command
 * @param {CommandInteraction} interaction - The command interaction
 */
async function handleSetJoinRole(interaction) {
    try {
        const role = interaction.options.getRole('role');
        const guildId = interaction.guildId;
        
        // Validate the role assignment
        const validation = validateRoleAssignment(role, interaction.guild);
        
        if (!validation.success) {
            const fields = validation.solution ? [{
                name: '💡 Solution',
                value: validation.solution
            }] : [];
            
            const errorEmbed = createErrorEmbed(
                'Permission Error',
                validation.error,
                fields
            );
            
            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
        
        // Set the join role
        setJoinRole(guildId, role.id);
        saveJoinRoles();
        
        const successEmbed = createSuccessEmbed(
            'Join Role Set',
            `New members will now receive the **${role.name}** role when they join the server.`,
            [{
                name: '🔧 Role Details',
                value: `**Name:** ${role.name}\n**ID:** ${role.id}\n**Members:** ${role.members.size}`,
                inline: true
            }]
        );
        
        await interaction.reply({ embeds: [successEmbed] });
        
    } catch (error) {
        console.error('❌ Error in handleSetJoinRole:', error);
        throw error;
    }
}

module.exports = { handleSetJoinRole };
