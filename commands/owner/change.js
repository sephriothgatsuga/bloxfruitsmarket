const datab = require('../../utils/database/database');

module.exports = { 
    config: {
        name: "change",
        description: "Changes the fruit stock",
        usage: "[option: multiple] <fruit name> <true/false>",
        category: "miscellaneous",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {

        const db = (await datab).db('heroku_vf3mq7pv').collection('fruits');
        let option = args[args.length - 1];
        let fruit;

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
            
            fruit.forEach(f => {
              let update = db.updateMany({ name: f }, { $set: { instock: option } });
                update.then(() => message.channel.send('Fruits stock changed!'));
            });
            
          } else{
            //working with args
            fruit = args[0];
            if(fruit.startsWith('Human') || fruit.startsWith('Bird')){
              fruit = args.splice(0, 2).join(' ');
            }
            // option true/false
            if(option === 'true'){
              option = true;
            } else if(option === 'false'){
              option = false;
            } else {
              return message.channel.send('Option Invalid!')
            }
            //db update
            let update = db.findOneAndUpdate({ name: fruit }, { $set: { instock: option } });
              update.then(() => message.channel.send('Fruit stock changed!'));
            }
        } else{
          return message.channel.send('You\'re not authorized to do this!');
        }
  }
}