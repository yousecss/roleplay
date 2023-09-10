const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'takım-bilgi',
  description: 'Belirtilen takımın bilgilerini ve üyelerini gösterir.',
  async çalıştırılıyor(message, args) {
    if (args.length !== 1) {
      return message.channel.send('Kullanım: !takım-bilgi @TakımRolü');
    }

    const mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) {
      return message.channel.send('Belirtilen rol bulunamadı.');
    }

    const roleId = mentionedRole.id;
    const guildId = message.guild.id;
    const budget = db.get(`budgets_${guildId}_${roleId}`) || 0;
    const salary = db.get(`salaries_${guildId}_${roleId}`) || 0;
    const transferBudget = db.get(`transfer-bütçe_${guildId}_${roleId}`) || 0;
    const debt = db.get(`borc_${guildId}_${roleId}`) || 0;

    const formattedBudget = new Intl.NumberFormat().format(budget);
    const formattedSalary = new Intl.NumberFormat().format(salary);
    const formattedTransferBudget = new Intl.NumberFormat().format(transferBudget);
    const formattedDebt = new Intl.NumberFormat().format(debt);

    const teamMembers = mentionedRole.members.map(member => member).join('\n');

    const embed = new MessageEmbed()
      .setTitle(`${mentionedRole.name} Takım Bilgileri`)
      .addField('Bütçe', `${formattedBudget} €`, false)
      .addField('Yıllık Maaş', `${formattedSalary} €`, false)
      .addField('Transfer Bütçesi', `${formattedTransferBudget} €`, false)
      .addField('Borç', `${formattedDebt} €`, false)
      .addField('Takım Üyeleri', teamMembers, false)
      .setColor('RANDOM') 
      .setTimestamp(); 

    message.channel.send({ embeds: [embed] });
  },
};
