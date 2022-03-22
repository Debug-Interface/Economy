const { TOKEN, PREFIX } = process.env;

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: new Intents(32767) });

client.once('ready', () => {
  console.log(`Name: ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(Prefix) || message.author.bot) return;
  Arguments = message.content.slice(Prefix.length).split(/ +/);
  Command = Arguments.shift();
  
  if (Command == `${PREFIX}help`) { /* ACTION */ }
});

client.login(TOKEN).catch(err => console.log('Start-Up Failed'));
