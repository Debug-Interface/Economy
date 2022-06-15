const { TOKEN, PREFIX } = process.env;

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: new Intents(32767) });

const { AsciiTable3, AlignmentEnum } = require('ascii-table3');
const FileSync = require('fs');

client.commands = new Collection();
var Commands = new AsciiTable3();

Commands.setAlign(1, AlignmentEnum.CENTER);
Commands.setAlign(2, AlignmentEnum.CENTER);
Commands.setStyle('ascii-rounded');
Commands.getTitleAlign() 

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
    client.commands.get('Help').execute(message);
  }

});

client.login(TOKEN);
