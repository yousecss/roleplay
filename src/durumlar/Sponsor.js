const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'sponsor',
  description: 'Transfer listesine oyuncu ekler.',
  çalıştırılıyor(message, args) {
    const yetkiliRoleId = '1143210337508786216'; 
    if (!message.member.roles.cache.has(yetkiliRoleId)) {
      return message.channel.send('Bu komutu kullanma yetkiniz yok.');
    }
    if (args.length < 3) {
      return message.channel.send('Kullanım: !sponsor @TakımRolü <spornsor_ismi> <Para>');
    }
    const mentionedRole = message.mentions.roles.first();
    if (!mentionedRole) {
      return message.channel.send('Belirtilen rol bulunamadı.');
    }

    const oyuncuİsmi = args.slice(1, -1).join(' '); 
    const para = parseInt(args[args.length - 1]);

    if (isNaN(para) || para <= 0) {
      return message.channel.send('Geçerli bir maliyet belirtmelisiniz.');
    }

    const formattedPara = para.toLocaleString('tr-TR'); 

 
    const logKanalı = message.guild.channels.cache.find(channel => channel.id === '1143215310074282075'); 
    if (logKanalı) {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${mentionedRole.name} Takımından Sponsorluk`)
        .setDescription(`${mentionedRole.name} takımı **${oyuncuİsmi}** adlı firma ile **€${formattedPara}** ile anlaştı.`)
        .setTimestamp();
      logKanalı.send({ embeds: [embed] });
    }

    message.channel.send('Sponsorluk Başarıyla Eklendi. <#1143215310074282075>');
  },
};
