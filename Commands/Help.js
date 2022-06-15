const FileSync = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = ({
  name: 'Help',
  description: 'Sends All Command',
  execute(message, client) {
    const Folder = FileSync.readdirSync('./Commands/');
    Folder.filter(file => file.endsWith('.js'));
    
    const Embed1 = new MessageEmbed();
    Embed1.setTitle('Commands');
    Embed1.setColor('#00ff00');

    for (file of Folder) {
      
      var file = file.replace('.js', '');
      var command = client.commands.get(file);
      
      Embed1.addField(command.name, command.description);
    }
    
    Embed1.setFooter({
      text: message.member.displayName,
      iconURL: message.author.displayAvatarURL()
    });
    
    Embed1.setTimestamp();

    message.channel.send({ embeds: [ Embed1 ] });
  }
});
