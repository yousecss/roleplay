const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('./src/config.json');
const db = require('croxydb')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES,Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();

const loadCommands = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const commandFile = require(`${dir}/${file}`);
    client.commands.set(commandFile.name, commandFile);
  });
};

const loadEvents = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const eventFile = require(`${dir}/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, eventFile.bind(null, client));
  });
};
client.on('message', (message) => {
  const prefix = config.prefix;

  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.çalıştırılıyor(message, args, client);
  } catch (error) {
    console.error(error);
  }
});

loadCommands('./src/commands');
loadCommands('./src/owner');
loadCommands('./src/durumlar');
loadCommands('./src/ekle-düşür');
loadCommands('./src/bütçe');
loadCommands('./src/ekstra');

client.once('ready', () => {
 
  const ping = Math.round(client.ws.ping);

  
  console.log(`
  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  
  ┃🟢 ${client.user.username} Bot Hazır           ┃   
  ┃🔊 Bot Sese Girdi                     ┃   
  ┃🏓 Bot Pingi: ${ping}ms                    ┃    
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`);
  client.user.setPresence({
    activities: [{ name: '\💎 Premier League', type: 'STREAMING', url: 'https://www.twitch.tv/yousecs' }],
    status: 'STREAMING', 
  });
});

const { joinVoiceChannel } = require('@discordjs/voice');
 client.on('ready', () => { 
  joinVoiceChannel({
channelId: "1143980921448570980",
guildId: "1143210135238484101",       
adapterCreator: client.guilds.cache.get("1143210135238484101").voiceAdapterCreator
    });

});
client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === 'form') {
    const formEmbed = new MessageEmbed()
      .setTitle('TEKNİK DİREKTÖR BAŞVURU FORMU')
      .setDescription(`
Adınız 
Soy Adınız
Yaşınız

Gerçek isimler, Türk karakterler, Ünlü isimleri birleştirmek yasaktır! 

Pep Guardiola ❌
Graham Klopp ❌
Fernado Kloutinho ☑️`)

.setColor('#0099ff')
.setTimestamp();
message.reply({ embeds: [formEmbed] });
  }
});
/*client.on('messageCreate', (message) => {
  if (message.content.toLowerCase() === '<@624906011622506518>') {
message.reply('Gereksiz Yere Etiketleme Lütfen.');
  }
});
*/ //EK

client.on('messageCreate', (message) => {
  if (message.author.bot) return; 
  const content = message.content;

  const afkBilgi = db.get(`afk_${message.author.id}`);
  if (afkBilgi) {
    if (message.mentions.members && message.mentions.members.size > 0) {
      message.mentions.members.forEach((member) => {
        if (member.id === message.author.id) return; 
        const embed = new MessageEmbed()
        .setAuthor('Etiketlediğin kullanıcı AFK')
          .setTitle(`${member.user.tag} AFK`)
          .setDescription(`Sebep: ${afkBilgi.sebep}\nAfk Süresi: ${afkSüresiHesapla(afkBilgi.süre)}`)
          .setColor('#0099ff')
          .setTimestamp();

          message.reply({ embeds: [embed] });
        });
    }
    else {
      db.delete(`afk_${message.author.id}`);
      message.channel.send('Afk modundan çıktın.');
    }
  }
});

function afkSüresiHesapla(afkSüre) {
  const şuAn = Date.now();
  const süreFarkı = şuAn - afkSüre;
  const dakika = Math.floor((süreFarkı % (1000 * 60 * 60)) / (1000 * 60));
  const saniye = Math.floor((süreFarkı % (1000 * 60)) / 1000);
  return `${dakika} dakika ${saniye} saniye`;
}

client.on('messageCreate', (message) => {
  if (message.author.bot) return; 
  const content = message.content;

  if (message.mentions.members && message.mentions.members.size > 0) {
    message.mentions.members.forEach((member) => {
      const etiketlenenAFKBilgi = db.get(`afk_${member.id}`);
      if (etiketlenenAFKBilgi) {
        const embed = new MessageEmbed()
        .setAuthor('Etiketlediğin kullanıcı AFK')
          .setTitle(`${member.user.tag} AFK`)
          .setDescription(`Sebep: ${etiketlenenAFKBilgi.sebep}\nAfk Süresi: ${afkSüresiHesapla(etiketlenenAFKBilgi.süre)}`)
          .setColor('#0099ff')
          .setTimestamp();

        message.reply({ embeds: [embed] });
      }
    });
  }
});

client.login(config.token); 
