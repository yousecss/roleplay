const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bütçe',
  description: 'Belirli bir takımın bütçesini gösterir.',
  çalıştırılıyor(message, args) {
    
    
    if (args.length !== 1) {
      return message.channel.send('Kullanım: !bütçe @TakımRolü');
    }

   
    const mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) {
      return message.channel.send('Belirtilen rol bulunamadı.');
    }

  
    const roleId = mentionedRole.id;
    const budget = db.get(`budgets_${message.guild.id}_${roleId}`) || 0;

    
    const formattedBudget = new Intl.NumberFormat().format(budget);

    
    const embed = new MessageEmbed()
      .setTitle(`${mentionedRole.name} Takım Bütçesi`)
      .setDescription(`Bütçe: ${formattedBudget} €`)
      .setColor('#0099ff');

    
    message.channel.send({ embeds: [embed] });
  },
};
