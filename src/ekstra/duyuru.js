const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'duyuru',
  description: 'Belirtilen kanala açıklama içeren bir duyuru yapar.',
  args: true,
  usage: '<duyurumesaj>',
  async çalıştırılıyor(message, args) {
    const yetkiliRoleId = '1143492843109875793';
    if (!message.member.roles.cache.has(yetkiliRoleId) && !message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }

    const duyuruMesaji = args.join(' ');
message.reply('Duyuru gönderildi')
    const embed = new MessageEmbed()
      .setColor(0x0099ff)
      .setDescription(`### ${duyuruMesaji}`) 
      .setTimestamp()
      .setFooter('Premier League Duyuru')
.setImage('https://cdn.discordapp.com/attachments/1143969137543094282/1150176969087004672/premier-league-soccer-banner-1600x900.webp')  
    .setAuthor('📢 Duyuru!'); 

    const targetChannel = message.guild.channels.cache.find(
      (channel) => channel.id === '1143212869698195456'
    );

    if (targetChannel) {
      targetChannel.send({ content: '@everyone', embeds: [embed] });
    } else {
      message.reply('Duyuru kanalı bulunamadı.');
    }
  },
};
