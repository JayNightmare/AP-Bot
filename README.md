# AP Discord Bot - Role Assignment Bot

A Discord bot that automatically assigns roles to new users who join your server using slash commands.

## Features

- **Slash Commands**: Modern Discord slash command interface
- **Automatic Role Assignment**: Assigns a specified role to new members when they join
- **Admin Controls**: Commands to set, view, and remove join roles
- **Permission Checks**: Ensures proper permissions before role assignment
- **Error Handling**: Comprehensive error handling and user feedback
- **Persistent Storage**: Saves role configurations across bot restarts
- **Guild Restriction**: If GUILD_ID is set in .env, bot will only stay in that specific server

## Commands

- `/set-join-role <role>` - Set the role to assign to new members (Admin only)
- `/get-join-role` - View the current join role configuration (Admin only)
- `/remove-join-role` - Remove the join role assignment (Admin only)

## Setup Instructions

### 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Copy the Bot Token (you'll need this later)
5. Enable the following Privileged Gateway Intents:
   - Server Members Intent
6. Go to the "OAuth2" section and copy the Client ID

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit the `.env` file with your bot's information:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here  # Optional: restricts bot to specific server + faster command registration
   ```

### 4. Invite the Bot to Your Server

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application and go to "OAuth2" > "URL Generator"
3. Select the following scopes:
   - `bot`
   - `applications.commands`
4. Select the following bot permissions:
   - Manage Roles
   - Use Slash Commands
5. Copy the generated URL and open it in your browser
6. Select your server and authorize the bot

### 5. Run the Bot

```bash
npm start
```

## Important Setup Notes

### Bot Permissions

The bot needs the following permissions:
- **Manage Roles**: To assign roles to new members
- **Use Slash Commands**: To register and respond to slash commands

### Role Hierarchy

Discord's role hierarchy is important:
- The bot can only assign roles that are **below** its highest role
- Make sure to move the bot's role above any roles you want it to assign
- The bot cannot assign the @everyone role

### Command Permissions

All commands require the "Manage Roles" permission by default. Only users with this permission can:
- Set join roles
- View current join role configuration
- Remove join role assignments

### Guild Restriction (Optional)

If you want to restrict the bot to only work in a specific server:

1. **Set GUILD_ID**: Add your server's ID to the `.env` file
2. **Automatic Restriction**: The bot will:
   - Leave any existing servers that don't match the GUILD_ID on startup
   - Immediately leave any new servers it's invited to that don't match
   - Only register commands in the specified server (faster than global registration)

To find your server's ID:
1. Enable Developer Mode in Discord (User Settings > Advanced > Developer Mode)
2. Right-click your server name and select "Copy Server ID"

**Note**: If GUILD_ID is not set, the bot will work in all servers it's invited to.

## Usage

1. **Set a Join Role**: Use `/set-join-role` and select the role you want new members to receive
2. **Verify Configuration**: Use `/get-join-role` to see the current setup
3. **Test**: Have someone join your server (or use a test account) to verify the role is assigned
4. **Remove if Needed**: Use `/remove-join-role` to stop automatic role assignment

## File Structure

```
AP Bot/
├── src/
│   ├── commands/                       # Command handlers
│   │   ├── index.js                    # Command router
│   │   ├── setJoinRole.js              # Set join role command
│   │   ├── getJoinRole.js              # Get join role command
│   │   └── removeJoinRole.js           # Remove join role command
│   ├── config/                         # Configuration files
│   │   ├── client.js                   # Discord client configuration
│   │   └── commands.js                 # Command definitions
│   ├── events/                         # Event handlers
│   │   ├── index.js                    # Event registration
│   │   ├── ready.js                    # Bot ready event
│   │   ├── interactionCreate.js        # Command interaction handling
│   │   ├── guildMemberAdd.js           # New member join handling
│   │   └── error.js                    # Error handling
│   ├── roles/                          # Role Management
│   │   └── join-roles.json             # Persistent storage for role configurations
│   └── utils/                          # Utility functions
│       ├── embeds.js                   # Discord embed helpers
│       ├── joinRoles.js                # Role management utilities
│       └── permissions.js              # Permission validation
├── index.js                            # Main entry point (run with pm2 start)
├── package.json                        # Node.js dependencies
├── .env.example                        # Environment variable template
├── .env                                # Your bot configuration (not in git)
├── .gitignore                          # Git ignore file
├── validate-setup.js                   # Setup validation script
└── README.md                           # This file
```

## Project Architecture

The bot is organized into separate concerns for better maintainability:

### **Commands** (`src/commands/`)
- Individual command handlers for each slash command
- Command router that maps command names to handlers
- Separated logic for easy testing and modification

### **Events** (`src/events/`)
- Event handlers for Discord.js events
- Modular event registration system
- Handles bot ready, interactions, member joins, and errors

### **Configuration** (`src/config/`)
- Discord client configuration and setup
- Slash command definitions and permissions
- Centralized configuration management

### **Utilities** (`src/utils/`)
- **Embeds**: Helper functions for creating Discord embeds
- **Join Roles**: Role management and persistence utilities
- **Permissions**: Permission validation and role hierarchy checks

### **Roles** (`src/roles/`)
- Persistent storage for role configurations

## Troubleshooting

### Bot Not Responding to Commands
- Check if the bot is online in your server
- Verify the bot token is correct in `.env`
- Make sure slash commands are registered (check console output)

### Role Not Being Assigned
- Check if the bot has "Manage Roles" permission
- Verify the join role is below the bot's highest role
- Check console output for error messages

### Commands Not Appearing
- Wait a few minutes for global commands to sync
- Try using `GUILD_ID` in `.env` for faster development testing
- Restart the bot after making changes

## Support

If you encounter issues:
1. Check the console output for error messages
2. Verify all permissions are set correctly
3. Ensure the bot's role is positioned correctly in the role hierarchy
4. Make sure the bot has the required Discord intents enabled

## License

MIT License - See LICENSE file for details
