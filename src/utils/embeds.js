const { EmbedBuilder } = require('discord.js');

/**
 * Create a success embed
 * @param {string} title - Embed title
 * @param {string} description - Embed description
 * @param {Array} fields - Additional fields (optional)
 * @returns {EmbedBuilder} Success embed
 */
function createSuccessEmbed(title, description, fields = []) {
    const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle(`✅ ${title}`)
        .setDescription(description)
        .setTimestamp();
    
    if (fields.length > 0) {
        embed.addFields(fields);
    }
    
    return embed;
}

/**
 * Create an error embed
 * @param {string} title - Embed title
 * @param {string} description - Embed description
 * @param {Array} fields - Additional fields (optional)
 * @returns {EmbedBuilder} Error embed
 */
function createErrorEmbed(title, description, fields = []) {
    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle(`❌ ${title}`)
        .setDescription(description)
        .setTimestamp();
    
    if (fields.length > 0) {
        embed.addFields(fields);
    }
    
    return embed;
}

/**
 * Create an info embed
 * @param {string} title - Embed title
 * @param {string} description - Embed description
 * @param {Array} fields - Additional fields (optional)
 * @returns {EmbedBuilder} Info embed
 */
function createInfoEmbed(title, description, fields = []) {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`📋 ${title}`)
        .setDescription(description)
        .setTimestamp();
    
    if (fields.length > 0) {
        embed.addFields(fields);
    }
    
    return embed;
}

/**
 * Create a warning embed
 * @param {string} title - Embed title
 * @param {string} description - Embed description
 * @param {Array} fields - Additional fields (optional)
 * @returns {EmbedBuilder} Warning embed
 */
function createWarningEmbed(title, description, fields = []) {
    const embed = new EmbedBuilder()
        .setColor(0xFFFF00)
        .setTitle(`ℹ️ ${title}`)
        .setDescription(description)
        .setTimestamp();
    
    if (fields.length > 0) {
        embed.addFields(fields);
    }
    
    return embed;
}

/**
 * Create a generic error embed for command errors
 * @returns {EmbedBuilder} Generic error embed
 */
function createGenericErrorEmbed() {
    return createErrorEmbed(
        'Error',
        'An error occurred while processing your command.'
    );
}

module.exports = {
    createSuccessEmbed,
    createErrorEmbed,
    createInfoEmbed,
    createWarningEmbed,
    createGenericErrorEmbed
};
