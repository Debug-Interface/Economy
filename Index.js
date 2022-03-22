const { TOKEN, PREFIX } = process.env;

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: new Intents(32767) });

client.once('ready', () => {
  console.log(`Name: ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  if (message.content == `${PREFIX}help`) { /* ACTION */ }
  if (message.content == `${PREFIX}command`) { /* ACTION */ }
});

client.login(TOKEN).catch(err => console.log('Start-Up Failed'));
