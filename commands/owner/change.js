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

        if(message.author.id === '173977882765426688'){
          let fruit = args[0];
          if(!fruit){
            return message.channel.send('You need to specify a fruit!');
          } 
          
          let option = args[1];
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