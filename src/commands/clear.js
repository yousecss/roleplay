
module.exports = {
    name: 'sil',
    description: 'Belirli bir kanaldaki mesajları siler.',
    çalıştırılıyor(message, args) {
      if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.some(role => role.id === '1143211023281684510')) {
        return message.channel.send('Bu komutu kullanma izniniz yok.');
      }
      const amount = parseInt(args[0]) || 10;
  
      message.channel.bulkDelete(amount + 1) 
        .then(() => {
          message.channel.send(`${amount} mesaj silindi.`)
            .then((sentMessage) => {
             
              setTimeout(() => sentMessage.delete(), 2000);
            });
        })
        .catch((error) => {
          console.error(error);
          message.channel.send('Mesajları silerken bir hata oluştu.');
        });
    },
  };
  