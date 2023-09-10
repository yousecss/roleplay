const db = require('croxydb');
const { MessageEmbed } = require('discord.js');
const fs = require('fs')

module.exports = {
  name: 'top-maaş',
  description: 'Tüm takımların maaşlarını listeler.',
  çalıştırılıyor(message, args) {
    const rollerVerisi = fs.readFileSync('roller.json', 'utf8');

    const rollerJSON = JSON.parse(rollerVerisi);

    const watchedRoleIds = rollerJSON.roller;

    const guildId = message.guild.id;
    const salaryList = [];

    const numberFormatter = new Intl.NumberFormat('tr-TR', {
      style: 'decimal',
      maximumFractionDigits: 0, 
    });

    watchedRoleIds.forEach(roleId => {
      const salary = db.get(`salaries_${guildId}_${roleId}`);
      const role = message.guild.roles.cache.get(roleId);

      const formattedSalary = numberFormatter.format(salary || 0);
      const salaryText = `**${role ? role.name : 'Bilinmeyen Rol'} Takım Maaşı:** ${formattedSalary} €`;
      salaryList.push({ text: salaryText, value: salary || 0 });
    });

    salaryList.sort((a, b) => b.value - a.value);

    const formattedSalaryList = salaryList.map(item => item.text);

    const embed = new MessageEmbed()
      .setTitle('Tüm Maaşlar')
      .setDescription(formattedSalaryList.join('\n'))
      .setColor('RANDOM')
      .setTimestamp(); 
    message.channel.send({ embeds: [embed] });
  },
};
