const { TOKEN, PREFIX } = process.env;

const { Client, Intents, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const client = new Client({ intents: new Intents(32767) });

client.commands = new Collection();

Folder = readdirSync('./Commands/');
Folder.filter(file => file.endsWith('.js'));

for (file of Folder ) {
  Command = require(`./Commands/${file}`);
  client.commands.set(Command.name, Command);
}

client.once('ready', () => {
  console.log(`Name: ${client.user.username}`);
});

client.on('messageCreate', (message) => {
  if (message.content.indexOf(PREFIX) !== 0) return;

  var Arguments = message.content.slice(PREFIX.length).split(/ +/);
  var Command = Arguments.shift();
  
  if (Command === 'help') {
    client.commands.get('Help').execute(message);
  }
  
});

client.login(TOKEN);
