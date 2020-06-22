const datab = require('../../utils/database/database');
const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');
const date = require('date-and-time');
const cd = require('countdown');

module.exports = { 
    config: {
        name: "announce",
        description: "Announces the fruit stock",
        usage: "<fruit name> <true/false>",
        category: "miscellaneous",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {

        if(message.member.permissions.has('ADMINISTRATOR')){
            
            const fruits = (await datab).db('heroku_ddsf2qgt').collection('fruits').find({ instock: true }).toArray()

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

            var stocky = new MessageEmbed()
                .setTitle(`Current Stock as of ${datee}`)
                .setDescription(`Verified Fruit Stock\n\nNext Stock is in: ${cdown.hours} Hour(s), ${cdown.minutes} Minute(s)`)
                .setColor(color)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter('Stocker is life', bot.user.displayAvatarURL())

            ;(await fruits).map(fruit => {
                stocky.addField(`${fruit.type}`, `${fruit.name}`, true)
                stocky.addField('Prices', `${fruit.bprice} Beli\nR$${fruit.rprice}`, true)
                stocky.addField('Ability Levels', `${fruit.abilevels}`, true)
            });
            //send
            if(message.guild.id === '720801303885905931'){
                var mentions = []
                if(stocky.fields.find(f => f.value === 'Bomb')){
                    console.log('bomb fruit found');
                    mentions.push('<@&720813739926093826>');
                } if(stocky.fields.find(f => f.value === 'Magma')){
                    console.log('spike fruit');
                    mentions.push('<@&720812895621087322>');
                } else {
                    mentions.push('@everyone')
                    console.log('fruits not found');
                }
                message.guild.channels.cache.find(ch => ch.name === 'fruit-stock').send(`${mentions.map(m => m).join(' ')}`, stocky);
            } else{
                message.guild.channels.cache.find(ch => ch.name === 'fruit-stock').send('@everyone', stocky);
            }
            
        } else{
            return message.channel.send('You\'re not authorized to do this!');
        }
    }
}