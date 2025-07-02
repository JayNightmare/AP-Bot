/**
 * Simple test to verify the modular structure works correctly
 * Run with: node test-structure.js
 */

console.log('🧪 Testing modular structure...\n');

try {
    // Test config modules
    console.log('📁 Testing config modules...');
    const { createClient } = require('./src/config/client');
    const { commands } = require('./src/config/commands');
    
    const client = createClient();
    console.log('✅ Client created successfully');
    console.log(`✅ ${commands.length} commands loaded`);
    
    // Test utility modules
    console.log('\n🔧 Testing utility modules...');
    const joinRoles = require('./src/utils/joinRoles');
    const embeds = require('./src/utils/embeds');
    const permissions = require('./src/utils/permissions');
    
    console.log('✅ Join roles utility loaded');
    console.log('✅ Embeds utility loaded');
    console.log('✅ Permissions utility loaded');
    
    // Test command modules
    console.log('\n💬 Testing command modules...');
    const { executeCommand } = require('./src/commands');
    console.log('✅ Command router loaded');
    
    // Test event modules
    console.log('\n⚡ Testing event modules...');
    const { registerAllEvents } = require('./src/events');
    console.log('✅ Event registration loaded');
    
    // Test embed creation
    console.log('\n🎨 Testing embed creation...');
    const testEmbed = embeds.createSuccessEmbed('Test', 'This is a test embed');
    console.log('✅ Embed created successfully');
    
    console.log('\n🎉 All tests passed! Modular structure is working correctly.');
    console.log('\nReady to run the bot with: npm start');
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nStack trace:', error.stack);
    process.exit(1);
}
