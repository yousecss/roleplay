const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'başarı-sil',
  description: 'Kullanıcının belirli bir başarısını siler.',
  args: true,
  usage: '<@kullanıcı> <sıra numarası>',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send('Bu komutu kullanma izniniz yok.');
      }
    const sıraNumarası = parseInt(args[args.length - 1], 10);

    if (isNaN(sıraNumarası) || sıraNumarası < 1) {
      return message.channel.send('Geçersiz sıra numarası. Lütfen geçerli bir sıra numarası girin.');
    }

    const kullanıcı = message.mentions.users.first();

    if (!kullanıcı) {
        return message.channel.send('Kullanıcıyı etiketlemelisiniz. Örnek: `!başarı-sil @kullanıcı <sıra>`');
    }

    let başarılar = db.get(`başarılar_${kullanıcı.id}`);
    if (!başarılar || başarılar.length === 0) {
      return message.channel.send(`${kullanıcı} adlı kullanıcının başarıları veritabanınızda bulunmuyor.`);
    }

    const silinecekBaşarı = başarılar.find(b => b.sıra === sıraNumarası);
    if (!silinecekBaşarı) {
      return message.channel.send(`Sıra numarası ${sıraNumarası} ile başarı bulunamadı.`);
    }

    başarılar = başarılar.filter(b => b.sıra !== sıraNumarası);
    db.set(`başarılar_${kullanıcı.id}`, başarılar);

    const embed = new MessageEmbed()
      .setTitle('Başarı Silindi')
      .setDescription(`${kullanıcı} adlı kullanıcının başarısı sıra numarası ${sıraNumarası} olarak silindi: ${silinecekBaşarı.açıklama}`)
      .setColor('#0099ff')
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
