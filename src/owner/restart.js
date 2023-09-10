const { spawn } = require('child_process');

module.exports = {
  name: 'restart',
  description: 'restart atar',
  çalıştırılıyor(message, args) {
    if (message.author.id === '624906011622506518') {
        message.channel.send('Bot yeniden başlatılıyor...').then(() => {
          const restartProcess = spawn('node', ['sametovic.js']); 
          restartProcess.on('exit', (code, signal) => {
            console.log(`Bot yeniden başlatıldı. Kod: ${code}, Sinyal: ${signal}`);
            process.exit();
          });
        });
      } else {
        message.channel.send('Bu işlemi yapma yetkiniz yok.');
      }
    }
};
