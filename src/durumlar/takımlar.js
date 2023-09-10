const fs = require('fs');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'takımlar',
  description: 'Sunucudaki 20 rolün kaç kullanıcıda olduğunu listeler.',
  çalıştırılıyor(message, args) {
    const guild = message.guild;
    if (!guild) return message.channel.send('Sunucu bulunamadı.');
    const rollerVerisi = fs.readFileSync('roller.json', 'utf8');

    const rollerJSON = JSON.parse(rollerVerisi);

    const ROLE_IDS = rollerJSON.roller;

    const roleCounts = {};

    for (const roleId of ROLE_IDS) {
      const role = guild.roles.cache.get(roleId);
      if (!role) {
        message.channel.send(`Rol bulunamadı: ${roleId}`);
        continue;
      }

      const membersWithRole = role.members.size;
      roleCounts[role.name] = membersWithRole;
    }

    const embed = new MessageEmbed()
      .setTitle('Takımlar')
      .setThumbnail('https://cdn.discordapp.com/attachments/1143969137543094282/1145352777560752138/galatasaray-s-k-logo-symbol-brand-png-favpng-qHGrg51FEfg4wphWUHSTVEfci.png')
      .setColor(0x00ff00);

    for (const roleName in roleCounts) {
      const memberCount = roleCounts[roleName];
      embed.addField(roleName, `${memberCount} kişi`);
    }

    message.channel.send({ embeds: [embed] });
  },
};
