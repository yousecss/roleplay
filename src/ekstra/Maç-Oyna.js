const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
let macDevamEdiyor = false;
let msg; 

module.exports = {
  name: 'maç-oyna',
  description: 'Rastgele iki takım arasında maç yapar ve sonucu gösterir.',
  async çalıştırılıyor(message, args) {
    const rollerVerisi = fs.readFileSync('roller.json', 'utf8');

   
    const rollerJSON = JSON.parse(rollerVerisi);

    const takimRolIDleri = rollerJSON.roller;

    if (macDevamEdiyor) {
      return message.reply('Maç devam ediyor. Lütfen maçın bitmesini bekleyin.');
    }

    macDevamEdiyor = true;

    const takimRolIsimleri = takimRolIDleri.map(rolID => {
      const rol = message.guild.roles.cache.get(rolID);
      return rol ? rol.name : 'Bulunamadı';
    });

    const [takim1, takim2] = randomTeams(takimRolIsimleri);

    const macSuresi = 60; 

    const geriSayimEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`${takim1} ile ${takim2} arasındaki maç başlıyor...`)
      .setDescription(`Maç başlamasına ${macSuresi} saniye kaldı.\nBaşlaması için bekleyin...`);

    msg = await message.channel.send({ embeds: [geriSayimEmbed] }); 

    let kalanSure = macSuresi;
    const geriSayimInterval = setInterval(async () => {
      if (kalanSure <= 0) {
        clearInterval(geriSayimInterval);
        await msg.delete(); 
        baslatMac(message, takim1, takim2);
      } else {
        const yeniGeriSayimEmbed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${takim1} ile ${takim2} arasındaki maç başlıyor...`)
          .setDescription(`Maç başlamasına ${kalanSure} saniye kaldı.\nBaşlaması için bekleyin...`);
        msg.edit({ embeds: [yeniGeriSayimEmbed] });

        kalanSure--; 
      }
    }, 1000);
  },
};

function randomTeams(teams) {
  const takim1 = teams[Math.floor(Math.random() * teams.length)];
  let takim2;
  do {
    takim2 = teams[Math.floor(Math.random() * teams.length)];
  } while (takim2 === takim1); 
  return [takim1, takim2];
}


async function baslatMac(message, takim1, takim2) {
  let anlatim = '';
  let skorTakim1 = 0; 
  let skorTakim2 = 0; 

  const sonucEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${takim1} ile ${takim2} arasındaki maç başladı!`)
    .setDescription(anlatim)
    .setFooter('Kısa süre içinde başlıyacak')

  const msg = await message.channel.send({ embeds: [sonucEmbed] });

  const macSuresi = 60;

  const interval = setInterval(() => {
    const golTakim1 = Math.random() < 0.1;
    const golTakim2 = Math.random() < 0.1;

    if (golTakim1) {
      skorTakim1++;
      anlatim += `**${takim1}** takımı gol attı! <:gol:1144175630032830474> Durum: __${skorTakim1}__ - __${skorTakim2}__\n`;

      const updatedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${takim1} ile ${takim2} Maç Devam Ediyor`)
        .setDescription(anlatim);

      msg.edit({ embeds: [updatedEmbed] });
    }
    if (golTakim2) {
      skorTakim2++;
      anlatim += `**${takim2}** takımı gol attı! <:gol:1144175630032830474> Durum: __${skorTakim1}__ - __${skorTakim2}__\n`;

      const updatedEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${takim1} ile ${takim2} Maç Devam Ediyor`)
        .setDescription(anlatim);

      msg.edit({ embeds: [updatedEmbed] });
    }
    const bitisGolSayisi = 5; 

    if (skorTakim1 >= bitisGolSayisi || skorTakim2 >= bitisGolSayisi) {
      clearInterval(interval);
      let sonuc = 'Berabere';
      if (skorTakim1 > skorTakim2) {
        sonuc = `*__${takim1}__* takımı kazandı!`;
      } else if (skorTakim2 > skorTakim1) {
        sonuc = `*__${takim2}__* takımı kazandı!`;
      }

      const sonucEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Maç Sonucu')
        .setDescription(`**${takim1}** ile **${takim2}** arasındaki maç sonucu:\nSonuç: **${skorTakim1} - ${skorTakim2}**\n${sonuc}`);

      msg.edit({ embeds: [sonucEmbed], components: [] });

      macDevamEdiyor = false;
    }
  }, 3000)
}