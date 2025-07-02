const fs = require('fs');
const path = require('path');

// Store join role configuration in memory
const joinRoles = new Map();
const joinRolesFile = path.join(__dirname, '../roles/join-roles.json');

/**
 * Load join roles configuration from file
 */
function loadJoinRoles() {
    if (fs.existsSync(joinRolesFile)) {
        try {
            const data = fs.readFileSync(joinRolesFile, 'utf8');
            const parsed = JSON.parse(data);
            Object.entries(parsed).forEach(([guildId, roleId]) => {
                joinRoles.set(guildId, roleId);
            });
            console.log('✅ Loaded join roles configuration');
        } catch (error) {
            console.error('❌ Error loading join roles:', error);
        }
    } else {
        console.log('ℹ️ No join roles configuration file found, starting with empty configuration');
    }
}

/**
 * Save join roles configuration to file
 */
function saveJoinRoles() {
    try {
        if (!fs.existsSync(path.dirname(joinRolesFile))) {
            fs.mkdirSync(path.dirname(joinRolesFile), { recursive: true });
            console.log('ℹ️ Created roles directory for join roles configuration');
        }
        const data = Object.fromEntries(joinRoles);
        fs.writeFileSync(joinRolesFile, JSON.stringify(data, null, 2));
        console.log('✅ Saved join roles configuration');
    } catch (error) {
        console.error('❌ Error saving join roles:', error);
    }
}

/**
 * Get join role ID for a guild
 * @param {string} guildId - Guild ID
 * @returns {string|undefined} Role ID or undefined if not set
 */
function getJoinRole(guildId) {
    return joinRoles.get(guildId);
}

/**
 * Set join role for a guild
 * @param {string} guildId - Guild ID
 * @param {string} roleId - Role ID
 */
function setJoinRole(guildId, roleId) {
    joinRoles.set(guildId, roleId);
}

/**
 * Remove join role for a guild
 * @param {string} guildId - Guild ID
 * @returns {boolean} True if role was removed, false if not set
 */
function removeJoinRole(guildId) {
    return joinRoles.delete(guildId);
}

/**
 * Check if join role is set for a guild
 * @param {string} guildId - Guild ID
 * @returns {boolean} True if join role is set
 */
function hasJoinRole(guildId) {
    return joinRoles.has(guildId);
}

module.exports = {
    loadJoinRoles,
    saveJoinRoles,
    getJoinRole,
    setJoinRole,
    removeJoinRole,
    hasJoinRole
};
