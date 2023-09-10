const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'yardım',
  description: 'Tüm komutları ve açıklamalarını listeler.',
  çalıştırılıyor(message, args, commands) {
    const emoji = 'https://cdn.discordapp.com/emojis/1011737509706879088.gif?size=128&quality=lossless'; 

    const embed1 = new MessageEmbed()
      .setAuthor(`İşte Komutlarım ${message.author.username}`, emoji)
      .setDescription(`
**\`━\`** !bakiye [@kullanıcı]
**\`━\`** !borç-ekle @takım <para>
**\`━\`** !bütçe-ekle @takım <para>
**\`━\`** !yıllık-maaş-ekle @takım <para>
**\`━\`** !transfer-bütçe-ekle @takım <para>
**\`━\`** !top-maaş @takım
**\`━\`** !top-bütçe @takım
**\`━\`** !takım-bilgi @takım
**\`━\`** !transfer-bütçe-düşür @takım <para>
**\`━\`** !yıllık-maaş-düşür @takım <para>
**\`━\`** !bütçe-düşür @takım <para>
**\`━\`** !başarı-ekle @kullanıcı <başarı>
**\`━\`** !başarı-sil @kullanıcı <sıra_no>
**\`━\`** !başarı [@kullanıcı]
`)
.setThumbnail('https://cdn.discordapp.com/attachments/1143969137543094282/1149048253594210444/IMG_4460.png')
      .setColor('GREEN')

    const embed2 = new MessageEmbed()
    .setAuthor(`Sayfa 2`, emoji)
      .setDescription(`
***\`━━━━━\`*** **EKSTRA** ***\`━━━━━\`***
**\`━\`** !takımlar
**\`━\`** !maç-oyna
**\`━\`** !zar
**\`━\`** !sil
**\`━\`** !tf-liste @takım <oyuncu_ismi> <para>
**\`━\`** !senaryo
**\`━\`** !afk [sebep]
**\`━\`** !duyuru <Duyuru_Metni>
**\`━\`** !kap @takım <oyuncu_ismi> <para>
**\`━\`** !sponsor @takım <sponsor_ismi> <para>
***\`━━━━━\`*** **MAAŞ** ***\`━━━━━\`***
**\`━\`** !maaş-ver @rol/@kullanıcı <para>
**\`━\`** !maaş-al @kullanıcı <para>
**\`━\`** !para-gönder @kullanıcı <para>
      `)
      .setFooter('Developed By Yousecs')
      .setThumbnail('https://cdn.discordapp.com/attachments/1143969137543094282/1149048253594210444/IMG_4460.png')

      .setColor('GREEN')
      .setTimestamp();

    message.channel.send({ embeds: [embed1, embed2] });
  },
};
