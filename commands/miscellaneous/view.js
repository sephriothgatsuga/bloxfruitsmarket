const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');
const datab = require('../../utils/database/database');

module.exports = { 
    config: {
        name: "view",
        description: "Displays the fruits on stock",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const fruits = (await datab).db('heroku_vf3mq7pv').collection('fruits').find({ instock: true }).toArray();
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
        
        return message.channel.send(stocky)
  }
}