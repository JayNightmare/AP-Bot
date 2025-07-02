const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * Array of slash commands for the bot
 */
const commands = [
    new SlashCommandBuilder()
        .setName('set-join-role')
        .setDescription('Set the role to assign to new members')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to assign to new members')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    
    new SlashCommandBuilder()
        .setName('get-join-role')
        .setDescription('Get the current join role')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    
    new SlashCommandBuilder()
        .setName('remove-join-role')
        .setDescription('Remove the join role assignment')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
];

module.exports = { commands };
