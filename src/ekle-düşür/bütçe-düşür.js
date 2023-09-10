const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bütçe-düşür',
  description: 'Belirli bir takımın bütçesinden € düşer.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !bütçe-düşür @TakımRolü <Miktar>');
    }

    const mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) {
      return message.channel.send('Belirtilen rol bulunamadı.');
    }

    const rawAmount = args[1].replace(/,/g, '');
    const amount = parseInt(rawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      return message.channel.send('Geçerli bir miktar belirtmelisiniz.');
    }

    const roleId = mentionedRole.id;
    const currentBudget = db.get(`budgets_${message.guild.id}_${roleId}`) || 0;

    if (currentBudget < amount) {
      return message.channel.send('Belirtilen miktar, takımın bütçesinden daha fazla.');
    }

    const updatedBudget = currentBudget - amount;
    if (updatedBudget <= 0) {
      db.delete(`budgets_${message.guild.id}_${roleId}`);
    } else {
      db.set(`budgets_${message.guild.id}_${roleId}`, updatedBudget);
    }

    const formattedAmount = new Intl.NumberFormat().format(amount); 
    const formattedBudget = new Intl.NumberFormat().format(updatedBudget); 

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${mentionedRole.name} Takımının Bütçesi`)
      .setDescription(`${mentionedRole.name} takımının bütçesinden ${formattedAmount} € düşürüldü.\n Yeni bütçe: ${formattedBudget || 0} €`)
      .setTimestamp(); 

    message.channel.send({ embeds: [embed] });
  },
};
