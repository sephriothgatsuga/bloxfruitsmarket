const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');
const date = require('date-and-time');
const cd = require('countdown');
const Fruits = require('../../utils/models/Fruits');

module.exports = { 
    config: {
        name: "view",
        description: "Displays the fruits on stock",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let color = await getColorFromURL(bot.user.displayAvatarURL({ format: 'png' }))
        let datee = date.format(message.createdAt, 'hh:mm A [GMT]Z', true);

        //countdown
        var start = new Date();
        var end = new Date();
        //conditions
        if(start.getHours() >= 0 && start.getHours() < 4){
            end.setHours(4, 0, 0);
        } else if(start.getHours() >= 4 && start.getHours() < 8){
            end.setHours(8, 0, 0);
        } else if(start.getHours() >= 8 && start.getHours() < 12){
            end.setHours(12, 0, 0);
        } else if(start.getHours() >= 12 && start.getHours() < 16){
            end.setHours(16, 0, 0);
        } else if(start.getHours() >= 16 && start.getHours() < 20){
            end.setHours(20, 0, 0);
        } else if(start.getHours() >= 20 && start.getHours() < 24){
            end.setDate(end.getDate() + 1);
            end.setHours(0, 0, 0);
        }

        let cdown = cd(start,  end,cd.HOURS|cd.MINUTES);
        let msg = [
            'Picking a devil fruit is like an investment',
            'Choose the fruit that interests you the most',
            'Thanks for using me!',
            'Every thing happens for a reason',
            'Just wait to get the right stock',
            'Choosing a fruit is like choosing the perfect girl of yours'
        ]
        var stocky = new MessageEmbed()
            .setTitle(`Current Stock as of ${datee}`)
            .setDescription(`Verified Fruit Stock <:blurple_check:730595553242644640>\n\nNext Stock is in: ${cdown.hours} Hour(s), ${cdown.minutes} Minute(s)`)
            .setColor(color)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter(msg[Math.floor(Math.random() * msg.length)], bot.user.displayAvatarURL())
        
        let fruits = await Fruits.find({ instock: true });
        fruits.map(frut => {
            let f = frut.toJSON();
            stocky.addField(`${f.type}`, `${f.emoji} ${f.name}`, true)
            stocky.addField('Prices', `${f.bprice} Beli\nR$${f.rprice}`, true)
            stocky.addField('Ability Levels', `${f.abilevels}`, true)
        });
        
        message.channel.send(stocky);
  }
}