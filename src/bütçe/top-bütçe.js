const db = require('croxydb');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'top-bütçe',
  description: 'Belirli takımların bütçelerini listeler.',
  çalıştırılıyor(message, args) {
    const rollerVerisi = fs.readFileSync('roller.json', 'utf8');

    const rollerJSON = JSON.parse(rollerVerisi);

    const watchedRoleIds = rollerJSON.roller;

    const guildId = message.guild.id;
    const budgetList = [];

    watchedRoleIds.forEach(roleId => {
      const normalBudget = db.get(`budgets_${guildId}_${roleId}`) || 0;
      const transferBudget = db.get(`transfer-bütçe_${guildId}_${roleId}`) || 0;
      const role = message.guild.roles.cache.get(roleId);

      const formattedNormalBudget = new Intl.NumberFormat().format(normalBudget);
      const formattedTransferBudget = new Intl.NumberFormat().format(transferBudget);

      const budgetText = `**${role ? role.name : 'Bilinmeyen Rol'} Takım Bütçesi:** ${formattedNormalBudget} €` +
        (transferBudget > 0 ? ` (Transfer: ${formattedTransferBudget} €)` : '');
      budgetList.push({ role, budget: normalBudget + transferBudget, text: budgetText });
    });

    budgetList.sort((a, b) => b.budget - a.budget);

    if (budgetList.length === 0) {
      budgetList.push({ text: 'Hiç bütçe kaydı bulunmuyor.' });
    }

    const embed = new MessageEmbed()
      .setTitle('Tüm Bütçeler')
      .setDescription(budgetList.map(item => item.text).join('\n'))
      .setColor('RANDOM') 
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
