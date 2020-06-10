const datab = require('../../utils/database/database');
const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');

module.exports = { 
    config: {
        name: "announce",
        description: "Announces the fruit stock",
        usage: "<fruit name> <true/false>",
        category: "miscellaneous",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {

        if(message.member.roles.cache.has('720243516734832711')){
            
            const fruits = (await datab).db('heroku_vf3mq7pv').collection('fruits').find({ instock: true }).toArray()

            let color = await getColorFromURL(bot.user.displayAvatarURL({ format: 'png' }))

            var stocky = new MessageEmbed()
                .setTitle(`Current Stock as of ${message.createdAt.toLocaleTimeString()}`)
                .setColor(color)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter('Stocker is life', bot.user.displayAvatarURL())

            ;(await fruits).map(fruit => {
                stocky.addField(`${fruit.type}`, `${fruit.name}`, true)
                stocky.addField('Prices', `${fruit.bprice} Beli\nR$${fruit.rprice}`, true)
                stocky.addField('Ability Levels', `${fruit.abilevels}`, true)
            });

            bot.channels.cache.find(c => c.name === 'fruit-stock').send(stocky)
        } else{
            return message.channel.send('You\'re not authorized to do this!');
        }
    }
}