const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');
const date = require('date-and-time');
const cd = require('countdown');
const Fruits = require('../../utils/models/Fruits');
const randomMsgs = require('../../utils/models/randomMessages');

module.exports = { 
    config: {
        name: "view",
        description: "Displays the fruits on stock",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, pingyrole, type) => {
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

        let cdown = cd(start, end, cd.HOURS|cd.MINUTES);
        let randomMsg = await randomMsgs.find({});
        
        var stocky = new MessageEmbed()
            .setTitle(`Current Stock as of ${datee}`)
            .setDescription(`Verified Fruit Stock <:blurple_check:730595553242644640>\n\nNext Stock is in: ${cdown.hours} Hour(s), ${cdown.minutes} Minute(s)`)
            .setColor(color)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter(randomMsg[Math.floor(Math.random() * Object.keys(randomMsg).length)].msg, bot.user.displayAvatarURL())
        
        let fruits = await Fruits.find({ instock: true });
        fruits.sort();
        fruits.map(frut => {
            let f = frut.toJSON();
            stocky.addField(`${f.type}`, `${f.emoji} ${f.name}`, true)
            stocky.addField('Prices', `${f.bprice} Beli\nR$${f.rprice}`, true)
            stocky.addField('Ability Levels', `${f.abilevels}`, true)
        });
        
        if(type === 'referenced') {
            if(message.embeds.length === 0){
                message.channel.send(`${pingyrole == '@here' ? pingyrole : `<@&${pingyrole}>`}`, stocky);
            } else {
                message.channel.send(`${pingyrole == '@here' ? pingyrole : `<@&${pingyrole}>`}`); 
            }
        } else {
            //perms first
            if(!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.author.send(`Please tell the owner/administrator to let me speak on <#${message.channel.id}>!`);
            if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return message.channel.send('I lack the permission \`EMBED_LINKS\`, please allow me to send Embed Links!');
            
            message.channel.send(stocky); 
        }
  }
}