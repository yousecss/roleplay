
module.exports = {
  name: 'eval',
  description: 'JavaScript kodunu çalıştırır.',
  çalıştırılıyor(message, args) {
    const sahip = ["624906011622506518"]
    if (!sahip.includes(message.author.id)) {
      return message.channel.send('huağğ');
    }

    try {
      const kod = eval(args.join(' '));
      message.channel.send(`\`\`\`js\n${kod}\n\`\`\``);
    } catch (error) {
      message.channel.send(`Hata: \`\`\`js\n${error}\n\`\`\``);
    }
  },
};
