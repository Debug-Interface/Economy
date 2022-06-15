const { TOKEN, PREFIX } = process.env;

Discord = require('discord.js');
FileSync = require('fs');
Client = new Discord.Client({ intents: new Intents(32767) });

Client.commands = new Discord.Collection();

Folder = FileSync.readdirSync('./Commands/');
Folder.filter(file => file.endsWith('.js'));

for (file of Folder ) {
  Command = require(`./Commands/${file}`);
  Client.commands.set(Command.name, Command);
}

Client.once('ready', () => {
  console.log(`Name: ${Client.user.username}`);
});

Client.on('messageCreate', (message) => {
  if (message.content.indexOf(PREFIX) !== 0) return;

  var Arguments = message.content.slice(PREFIX.length).split(/ +/);
  var Command = Arguments.shift();
  
  if (Command === 'help') {
    Client.commands.get('Help').execute(message);
  }
  
});

Client.login(TOKEN);
