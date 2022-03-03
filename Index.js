const { Client, Intents } = require('discord.js');
const client = new Client({ intents: new Intents(32767) });

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content == '!help') { /* ACTION */ }
  if (message.content == '!command') { /* ACTION */ }
});

client.login('TOKEN');
