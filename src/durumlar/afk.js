const { MessageEmbed } = require('discord.js');
const db = require('croxydb'); 

const afkKullanıcılar = new Map();

module.exports = {
  name: 'afk',
  description: 'Afk moduna geçer veya sebep belirler.',
  usage: '!afk <sebep>',
  çalıştırılıyor(message, args) {
    const kullanıcı = message.author;

    if (args.length === 0) {
      afkKullanıcılar.set(kullanıcı.id, { sebep: 'Belirtilmedi', süre: Date.now() });
      message.reply('Afk moduna geçtin. Sebep: Belirtilmedi.');
    } else {
      const sebep = args.join(' ');

      afkKullanıcılar.set(kullanıcı.id, { sebep, süre: Date.now() });
      message.reply(`Afk moduna geçtin. Sebep: ${sebep}`);
    }

    afkKullanıcılar.delete(kullanıcı.id);

    db.set(`afk_${kullanıcı.id}`, { sebep: args.join(' '), süre: Date.now() });

    if (message.mentions.members) {
      message.mentions.members.forEach((member) => {
        const afkBilgi = db.get(`afk_${member.id}`);
        if (afkBilgi) {
          const embed = new MessageEmbed()
            .setTitle(`${member.user.tag} AFK`)
            .setDescription(`Sebep: ${afkBilgi.sebep}\nAfk Süresi: ${afkSüresiHesapla(afkBilgi.süre)}`)
            .setColor('#0099ff')
            .setTimestamp();
      
          message.channel.send({ embeds: [embed] });
        }
      });
    }
  },
};

function afkSüresiHesapla(afkSüre) {
  const şuAn = Date.now();
  const süreFarkı = şuAn - afkSüre;
  const dakika = Math.floor((süreFarkı % (1000 * 60 * 60)) / (1000 * 60));
  const saniye = Math.floor((süreFarkı % (1000 * 60)) / 1000);
  return `${dakika} dakika ${saniye} saniye`;
}
