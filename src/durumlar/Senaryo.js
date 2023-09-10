const { MessageEmbed } = require('discord.js');

const senaryolar = [
"Dakika 51 rakibiniz 1-0 önde ve defansa yatıyorlar onları nasıl oyundan soğutursunuz?",
  "Şampiyonlar Ligi final maçındasınız rakibiniz Liverpool pasa dayalı oyunda çok iyiler onları nasıl etkisiz hale getirirsiniz?  ",
  "Konferans Ligi final maçındasınız rakibiniz Fiorentina Uzun paslı oyunda çok iyiler onları nasıl etkisiz hale getirirsiniz?",
  "Lig maçındasınız rakibiniz Arsenal kontra atak yaparak gol atmaya çalışıyorlar onları nasıl durdurusunuz?",
  "Şampiyonlar Ligi gruplarındasınız son maçınızdasınız ve kazanan gruptan çıkacak rakibiniz Juventus maçtan önce ani kontra ataklara ve pasa dayalı oyuna çok çalışmışlar onları nasıl etkisiz hale getirirsiniz?",
  "Ülkenizin süper kupa maçındasınız ve taraftar grubunuz maça gelecek parayı bulamadı karşı rakibin taraftar psikolojini nasıl etkisiz hale getirebilirsiniz?",
  "2011'de Şampiyonlar ligi finalindesiniz Rakibiniz Barcelona teknik direktörü Pep Guardiola Messi'yi çok iyi kullanıyor Messiyi Nasıl Etkisiz Hale getirebilirsin?",
  "2008'de Şampiyonlar ligi finalindesiniz Rakibiniz Manchester United teknik direktörü Ronaldo'yu çok iyi kullanıyor Ronaldo'yu Nasıl Etkisiz Hale getirebilirsin?",
  "Lig maçınızın son haftası ve rakibiniz ile son haftadasınız ve kazanan şampiyon olcak rakibinizi taraftar/oyuncuları nasıl maçtan soğutup galip gelebilirsiniz? (Maçtanönceki twitlerde geçerli)",
  "Şampiyonlar ligin finaline çıkmışsınız ve rakipiniz Kontra atak şansı yaratmatı çok iyi beceren bir takım. onları nasıl etkisiz hale getirirsiniz?",
  "Avrupa Ligi Gruplarındaki Son Maça Çıkmışsınız. Gruptan Çıkmak İçin Tek Çareniz Galibiyet Almak. Rakipiniz defansif yönde oyun oynuyorlar . Bu Rakipi Nasıl Yenersiniz.?",
  "Konferans Ligi Finaline Çıkmışsınız Rakipiniz Hızlı Kontra Atak Oyunu Oynuyor. Ayrıca Bek Ve Kanatları Hızlı Olduğundan Kolayca Rakip Ceza Sahasına Girebiliyolar. Bu Rakipi Nasıl Eleyip Kupayı Alırsınız?",
  "Dünya Kupası Finalindesiniz Rakipiniz Defansa kapanan bir strateji uyguluyor Bu  Takımı Nasıl Açarsınız?",
  "Lig Maçı Oynicaksınız Şampiyonluk Maçı Rakipiniz 5 li Orta Saha İle Press Yaparak Oyunu Sizin Sahanıza Yıkıp Sizi Boğmak İstiyor. Stoperleride Uzun Boylu Olduğu İçin Uzun Toplarda Etkisiz Kalıyorsunuz. Bu Rakibin taktiklerini etkisiz hâle getirip maçtan nasıl soğutursunuz?",
  "Dakika '55 Rakibiniz 1-0 önde onları yenerseniz Şampiyon olursunuz rakip defansa yatıyor hucuma kalktımı kontraatak başlatıyor onları nasıl yenersiniz?",
  "Dakika '55 Rakibiniz 1-0 önde onları yenerseniz Şampiyon olursunuz rakip defansa yatıyor hucuma kalktımı kontraatak başlatıyor onları nasıl yenersiniz?",
  "",
];

const kullanilanSenaryolar = [];

module.exports = {
  name: 'senaryo',
  description: 'Rastgele bir senaryo gösterir.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (senaryolar.length === 0) {
      senaryolar.push(...kullanilanSenaryolar);
      kullanilanSenaryolar.length = 0;
    }

    const randomIndex = Math.floor(Math.random() * senaryolar.length);
    const secilenSenaryo = senaryolar.splice(randomIndex, 1)[0];

    kullanilanSenaryolar.push(secilenSenaryo);

    const embed = new MessageEmbed()
      .setDescription(secilenSenaryo)
      .setColor('RANDOM');

    message.channel.send({ embeds: [embed] });
  },
};
