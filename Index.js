const { TOKEN, PREFIX } = process.env;

const Discord = require('discord.js');
const client = new Discord.Client({ intents: new Discord.Intents(32767) });
const Ascii = require('ascii-table3');
const FileSync = require('fs');

client.commands = new Discord.Collection();
var Commands = new Ascii.AsciiTable3();

Commands.setAlign(1, Ascii.AlignmentEnum.CENTER);
Commands.setAlign(2, Ascii.AlignmentEnum.CENTER);
Commands.setStyle('ascii-rounded'); 

Commands.setHeading('COMMANDS', 'STATUS');

var Folder = FileSync.readdirSync('./Commands/');
Folder.filter(file => file.endsWith('.js'));

for (var file of Folder ) {
  
  var Command = require(`./Commands/${file}`);
  client.commands.set(Command.name, Command);
  
  if (Command.name && Command.description) {
    Commands.addRow(file.replace('.js', ''), '✓');
  }
  
  if (!Command.name && !Command.description) {
    Commands.addRow(file.replace('.js', ''), '✕');
  }
  
}

client.once('ready', () => {
  console.log(`Name: ${client.user.username}`);
  console.log( Commands.toString() );
});

client.on('messageCreate', (message) => {
  if (message.content.indexOf(PREFIX) !== 0) return;
  
  var Arguments = message.content.slice(PREFIX.length).split(/ +/);
  var Command = Arguments.shift();
  
  if (Command === 'help') {
    client.commands.get('Help').execute(message, client);
  }

});

client.login(TOKEN);
