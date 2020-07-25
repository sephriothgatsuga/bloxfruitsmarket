const Fruits = require('../../utils/models/Fruits');
const Guild = require('../../utils/models/Guild');

module.exports = { 
    config: {
        name: "change",
        description: "Changes the fruit stock",
        usage: "[option: multiple] <fruit name> <true/false>",
        category: "owner",
        accessableby: "Stockers"
    },
    run: async (bot, message, args) => {

      let db = Fruits;
      let option = args[args.length - 1];
      let fruit;
      let guild = await Guild.findOne({ guildId: message.guild.id })
      let prefix = guild ? guild.prefix : process.env.PREFIX;

      if(message.member.roles.cache.has('720243516734832711')){
        if(args[0] === 'multiple'){
          fruit = args.slice(1, -1);
          // option true/false
          if(option === 'true'){
            option = true;
          } else if(option === 'false'){
            option = false;
          } else {
            return message.channel.send('Option Invalid!');
          }
          if(fruit.includes('Buddha')){
            fruit.indexOf("Buddha") > -1 ? fruit.splice(fruit.indexOf("Buddha"), 1) : false;
            fruit.push('Human: Buddha');
          } if(fruit.includes('Phoenix')){
            fruit.indexOf("Phoenix") > -1 ? fruit.splice(fruit.indexOf("Phoenix"), 1) : false;
            fruit.push('Bird: Phoenix');
          }
          if(fruit.length == 1) return message.channel.send(`Use ${prefix == 'stock' ? `\`${prefix} change ${fruit} ${option}\`` : `\`${prefix}change ${fruit} ${option}\``} instead!`);
          fruit.map(async f => {
            await db.findOneAndUpdate({ name: f }, { $set: { instock: option } }, (err, doc) => {
              if(doc){ 
                message.channel.send(`\`${doc.name}\` stock change to \`${option}\``);
              } else {
                message.channel.send('Stock not changed!');
              }
            });
          });
        } else{
          //working with args
          fruit = args[0];
          if(fruit == 'Buddha'){
            fruit = 'Human: Buddha';
          } else if(fruit == 'Phoenix'){
            fruit = 'Bird: Phoenix';
          }
          // option true/false
          if(option === 'true'){
            option = true;
          } else if(option === 'false'){
            option = false;
          } else {
            return message.channel.send('Option Invalid!')
          }
          if(args.length > 2) return message.channel.send(`Use ${prefix == 'stock' ? `\`${prefix} change multiple ${args.slice(0, -1).join(' ')} ${option}\`` : `\`${prefix}change multiple ${args.slice(0, -1).join(' ')} ${option}\``} instead!`)
          //db update
          await db.findOneAndUpdate({ name: fruit }, { $set: { instock: option } }, (err, doc) => {
            if(doc){ 
              message.channel.send(`\`${doc.name}\` stock change to \`${option}\``);
            } else {
              message.channel.send('Stock not changed!');
            }
          });
        }
      } else{
        return message.channel.send('You\'re not authorized to do this!');
      }
  }
}