# AP Discord Bot - Development Guide

## Project Structure

This Discord bot is organized using a modular architecture with clear separation of concerns. Each module has a specific responsibility, making the codebase easier to maintain, test, and extend.

## Architecture Overview

### Entry Point (`index.js`)
The main entry point is minimal and focused on orchestration:
- Loads environment configuration
- Initializes the Discord client
- Loads persistent data
- Registers all event handlers
- Handles bot login

### Configuration (`src/config/`)

#### `client.js`
- Creates and configures the Discord client
- Sets up required intents (Guilds, GuildMembers, GuildMessages)
- Exports a factory function for client creation

#### `commands.js`
- Defines all slash commands using SlashCommandBuilder
- Sets command permissions and options
- Centralized command definitions for easy modification

### Events (`src/events/`)

#### `index.js`
- Registers all event handlers with the Discord client
- Provides a single function to set up all events

#### `ready.js`
- Handles the ClientReady event
- Registers slash commands (guild-specific or global)
- Provides startup logging

#### `interactionCreate.js`
- Handles all slash command interactions
- Routes commands to appropriate handlers
- Provides error handling and user feedback

#### `guildMemberAdd.js`
- Handles new member joining events
- Automatically assigns configured join roles
- Validates permissions before role assignment

#### `error.js`
- Handles Discord client errors
- Sets up process-level error handlers
- Provides centralized error logging

### Commands (`src/commands/`)

#### `index.js`
- Command router that maps command names to handlers
- Provides centralized command execution
- Handles unknown commands

#### Individual Command Files
Each command has its own file with a single responsibility:
- **`setJoinRole.js`**: Configure which role to assign to new members
- **`getJoinRole.js`**: Display current join role configuration
- **`removeJoinRole.js`**: Remove join role assignment

### Utilities (`src/utils/`)

#### `embeds.js`
- Helper functions for creating Discord embeds
- Consistent styling across all bot responses
- Functions for success, error, info, and warning embeds

#### `joinRoles.js`
- Manages join role configuration in memory and persistence
- Provides CRUD operations for join roles
- Handles file I/O for configuration storage

#### `permissions.js`
- Permission validation utilities
- Role hierarchy checking
- Bot capability validation

## Adding New Features

### Adding a New Command

1. **Create command definition** in `src/config/commands.js`:
```javascript
new SlashCommandBuilder()
    .setName('your-command')
    .setDescription('Your command description')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
```

2. **Create command handler** in `src/commands/yourCommand.js`:
```javascript
async function handleYourCommand(interaction) {
    // Command logic here
}

module.exports = { handleYourCommand };
```

3. **Register command handler** in `src/commands/index.js`:
```javascript
const { handleYourCommand } = require('./yourCommand');

const commandHandlers = {
    // ...existing commands
    'your-command': handleYourCommand
};
```

### Adding a New Event

1. **Create event handler** in `src/events/yourEvent.js`:
```javascript
const { Events } = require('discord.js');

function handleYourEvent(eventData) {
    // Event handling logic
}

function registerYourEvent(client) {
    client.on(Events.YourEvent, handleYourEvent);
}

module.exports = { registerYourEvent };
```

2. **Register event** in `src/events/index.js`:
```javascript
const { registerYourEvent } = require('./yourEvent');

function registerAllEvents(client) {
    // ...existing events
    registerYourEvent(client);
}
```

### Adding Utilities

Create utility files in `src/utils/` for reusable functions:
- Database operations
- API integrations
- Data validation
- Formatting helpers

## Benefits of This Structure

1. **Maintainability**: Each file has a single responsibility
2. **Testability**: Individual modules can be tested in isolation
3. **Scalability**: Easy to add new commands, events, and features
4. **Readability**: Clear organization makes code easier to understand
5. **Reusability**: Utilities can be shared across multiple commands
6. **Debugging**: Issues are isolated to specific modules

## Development Workflow

1. **Environment Setup**: Copy `.env.example` to `.env` and configure
2. **Validation**: Run `npm run validate` to check setup
3. **Development**: Start with `npm run dev` for development
4. **Testing**: Test individual modules and features
5. **Production**: Deploy with `npm start`

## Code Standards

- Use descriptive function and variable names
- Add JSDoc comments for all exported functions
- Handle errors gracefully with proper logging
- Use consistent formatting and indentation
- Follow Discord.js best practices for interactions

## Troubleshooting

- **Import Errors**: Check file paths and module exports
- **Command Not Working**: Verify command registration and handler mapping
- **Permission Issues**: Check bot permissions and role hierarchy
- **Event Not Firing**: Ensure event is registered in `src/events/index.js`
