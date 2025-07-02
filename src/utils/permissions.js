const { PermissionFlagsBits } = require('discord.js');

/**
 * Check if a role can be managed by the bot
 * @param {Role} role - The role to check
 * @param {GuildMember} botMember - The bot's guild member
 * @returns {boolean} True if the role can be managed
 */
function canManageRole(role, botMember) {
    return role.position < botMember.roles.highest.position;
}

/**
 * Check if the bot has permission to manage roles
 * @param {GuildMember} botMember - The bot's guild member
 * @returns {boolean} True if bot can manage roles
 */
function canBotManageRoles(botMember) {
    return botMember.permissions.has(PermissionFlagsBits.ManageRoles);
}

/**
 * Check if a role is the @everyone role
 * @param {Role} role - The role to check
 * @param {string} guildId - The guild ID
 * @returns {boolean} True if it's the @everyone role
 */
function isEveryoneRole(role, guildId) {
    return role.id === guildId;
}

/**
 * Validate if a role can be assigned by the bot
 * @param {Role} role - The role to validate
 * @param {Guild} guild - The guild
 * @returns {Object} Validation result with success boolean and error message
 */
function validateRoleAssignment(role, guild) {
    const botMember = guild.members.me;
    
    // Check if role is @everyone
    if (isEveryoneRole(role, guild.id)) {
        return {
            success: false,
            error: 'You cannot set @everyone as the join role.'
        };
    }
    
    // Check if bot has manage roles permission
    if (!canBotManageRoles(botMember)) {
        return {
            success: false,
            error: "I don't have permission to manage roles in this server."
        };
    }
    
    // Check if role can be managed by bot
    if (!canManageRole(role, botMember)) {
        return {
            success: false,
            error: `I cannot assign the role **${role.name}** because it's higher than my highest role.`,
            solution: 'Move my role above the join role in Server Settings > Roles.'
        };
    }
    
    return { success: true };
}

module.exports = {
    canManageRole,
    canBotManageRoles,
    isEveryoneRole,
    validateRoleAssignment
};
