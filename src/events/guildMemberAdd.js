const { Events } = require('discord.js');
const { getJoinRole } = require('../utils/joinRoles');
const { validateRoleAssignment } = require('../utils/permissions');

/**
 * Handle guild member add events (new members joining)
 * @param {GuildMember} member - The new guild member
 */
async function handleGuildMemberAdd(member) {
    const guildId = member.guild.id;
    const joinRoleId = getJoinRole(guildId);
    
    if (!joinRoleId) {
        console.log(`ℹ️ No join role set for guild ${member.guild.name}`);
        return;
    }
    
    try {
        const role = member.guild.roles.cache.get(joinRoleId);
        
        if (!role) {
            console.error(`❌ Join role not found in guild ${member.guild.name}. Role ID: ${joinRoleId}`);
            return;
        }
        
        // Validate the role assignment
        const validation = validateRoleAssignment(role, member.guild);
        
        if (!validation.success) {
            console.error(`❌ Cannot assign join role in ${member.guild.name}: ${validation.error}`);
            return;
        }
        
        await member.roles.add(role);
        console.log(`✅ Assigned role ${role.name} to ${member.user.tag} in ${member.guild.name}`);
        
    } catch (error) {
        console.error(`❌ Error assigning join role to ${member.user.tag}:`, error);
    }
}

/**
 * Register the guild member add event
 * @param {Client} client - Discord client
 */
function registerGuildMemberAddEvent(client) {
    client.on(Events.GuildMemberAdd, handleGuildMemberAdd);
}

module.exports = { registerGuildMemberAddEvent };
