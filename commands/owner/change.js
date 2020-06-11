const datab = require('../../utils/database/database');

module.exports = { 
    config: {
        name: "change",
        description: "Changes the fruit stock",
        usage: "<fruit name> <true/false>",
        category: "miscellaneous",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {

        if(message.member.roles.cache.has('720243516734832711')){
          
          var fruit = args[0];
          var option = args[1];
          if(fruit.startsWith('Human') || fruit.startsWith('Bird')){
            option = args[2];
            fruit = args.splice(0, 2).join(' ');
          }
          
          
          if(option === 'true'){
            option = true;
          } else if(option === 'false'){
            option = false;
          } else {
            return message.channel.send('Option Invalid!')
          }

          let update = (await datab).db('heroku_vf3mq7pv').collection('fruits').findOneAndUpdate({ name: fruit }, { $set: { instock: option } });
            update.then(() => message.channel.send('Fruit stock changed!'))
        } else{
          return message.channel.send('You\'re not authorized to do this!');
        }
  }
}