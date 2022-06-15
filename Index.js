const { TOKEN } = process.env;

const Discord = require('discord.js');
const Client = new Discord.Client({ intents: new Discord.Intents(32767) });
const Ascii = require('ascii-table3');
const FileSync = require('fs');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

var Account = require('./AccountKey.json');

initializeApp({
  credential: cert(Account)
});

var Database = getFirestore();

var Collection = Database.collection('GUILDS');

Client.commands = new Discord.Collection();
var Commands = new Ascii.AsciiTable3();

Commands.setAlign(1, Ascii.AlignmentEnum.CENTER);
Commands.setAlign(2, Ascii.AlignmentEnum.CENTER);
Commands.setStyle('ascii-rounded'); 

Commands.setHeading('COMMANDS', 'STATUS');

var Folder = FileSync.readdirSync('./Commands/');
Folder.filter(file => file.endsWith('.js'));

for (var file of Folder ) {
  
  var Command = require(`./Commands/${file}`);
  Client.commands.set(Command.name, Command);
  
  if (Command.name && Command.description) { Commands.addRow(file.replace('.js', ''), '✓') }
  if (!Command.name && !Command.description) { Commands.addRow(file.replace('.js', ''), '✕') }
}

Client.once('ready', () => {
  console.log(`Name: ${Client.user.username}`);
  console.log( Commands.toString() );
  // console.log(`https://discord.com/oauth2/authorize?client_id=${Client.user.id}&permissions=8&scope=bot%20applications.commands`);
});

Client.on('guildCreate', (guild) => {
  Collection.doc(guild.id).set({
    NAME: guild.name,
    PREFIX: '!'
  });
});

Client.on('messageCreate', (message) => {
  Collection.get().then(Snapshot => {
    Snapshot.forEach(document => {
      var Prefix = document.data().PREFIX;
      
      if (message.content.indexOf(Prefix) !== 0) return;
      
      var Arguments = message.content.slice(Prefix.length).split(/ +/);
      var Command = Arguments.shift();
      
      if (Command === 'help') {
        Client.commands.get('Help').execute(message, Client)
      }
      
    })
  });
});

Client.login(TOKEN);
