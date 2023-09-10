const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'başarı-ekle',
  description: 'Kullanıcıya başarı ekler.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send('Bu komutu kullanma izniniz yok.');
      }
    const kullanıcı = message.mentions.users.first();
    const başarı = args.slice(1).join(' ');

    if (!kullanıcı) {
      return message.channel.send('Kullanıcıyı etiketlemelisiniz. Örnek: `!başarı-ekle @kullanıcı <başarı>`');
    }

    if (!başarı) {
      return message.channel.send('Başarı açıklaması belirtilmelidir.');
    }

    let kullanıcıBaşarılar = db.get(`başarılar_${kullanıcı.id}`);

    if (!kullanıcıBaşarılar) {
      kullanıcıBaşarılar = [];
    }

    const yeniBaşarı = {
      sıra: kullanıcıBaşarılar.length + 1,
      açıklama: başarı,
    };

    kullanıcıBaşarılar.push(yeniBaşarı);

    db.set(`başarılar_${kullanıcı.id}`, kullanıcıBaşarılar);

    message.channel.send(`**${kullanıcı.tag}** kullanıcısının "${başarı}" başarısı sıra numarası **${yeniBaşarı.sıra}** olarak eklenmiştir.`);
  },
};
