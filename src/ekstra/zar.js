const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'zar',
  description: 'Belirli bir takımın borcunu düşürür.',
  çalıştırılıyor(message, args) {
    const timeoutDuration = 3000;
    const rolledNumber = Math.floor(Math.random() * 10) + 1;

    const initialDiceEmbed = {
      title: 'Zar Atma Oyunu',
      description: `🎲 ${message.author.username}, zar atıyor...`,
      color: '#3498db',
    };

    message.channel.send({ embeds: [initialDiceEmbed] }).then(sentMessage => {
      setTimeout(() => {
        const diceEmbed = {
          title: 'Zar Atma Oyunu',
          description: `🎲 ${message.author.username}, zar attı ve ${rolledNumber} geldi!`,
          color: '#3498db',
        };

        if (rolledNumber === 10) {
          diceEmbed.description += '\n🚨 Tebrikler, 10 geldi! Büyük bir şanslısınız!';
          diceEmbed.color = '#e74c3c'; 
        }

        sentMessage.edit({ embeds: [diceEmbed] });
      }, timeoutDuration);
    });
  }
};
