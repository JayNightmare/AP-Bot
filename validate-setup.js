const fs = require('fs');
const path = require('path');

console.log('🔍 AP Discord Bot - Setup Validation\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found');
    console.log('   Please copy .env.example to .env and configure your settings\n');
    process.exit(1);
}

// Load environment variables
require('dotenv').config();

// Validate required environment variables
const requiredVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
const missingVars = [];

requiredVars.forEach(varName => {
    if (!process.env[varName] || process.env[varName] === 'your_' + varName.toLowerCase() + '_here') {
        missingVars.push(varName);
    }
});

if (missingVars.length > 0) {
    console.log('❌ Missing or invalid environment variables:');
    missingVars.forEach(varName => {
        console.log(`   - ${varName}`);
    });
    console.log('\n   Please update your .env file with valid values\n');
    process.exit(1);
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('❌ node_modules not found');
    console.log('   Please run: npm install\n');
    process.exit(1);
}

// Check if discord.js is installed
try {
    require('discord.js');
    console.log('✅ discord.js is installed');
} catch (error) {
    console.log('❌ discord.js not found');
    console.log('   Please run: npm install\n');
    process.exit(1);
}

console.log('✅ Environment variables configured');
console.log('✅ Dependencies installed');
console.log('\n🎉 Setup validation complete! Your bot is ready to run.');
console.log('\nNext steps:');
console.log('1. Make sure your bot is invited to your Discord server');
console.log('2. Ensure the bot has "Manage Roles" permission');
console.log('3. Position the bot\'s role above roles you want it to assign');
console.log('4. Run: npm start (or double-click start.bat)\n');
