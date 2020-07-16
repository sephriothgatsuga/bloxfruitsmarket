const date = require('date-and-time');
const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');

module.exports = {
    config: {
        name: "status",
        description: "Displays the bot's current status!",
        usage: "",
        category: "owner",
        accessableby: "Members",
        aliases: ["ut"]
    },
    run: async (bot, message, args) => {

    if(message.author.id !== '173977882765426688') return console.log('not owner');

    var status = new MessageEmbed()
        .setTitle('Bot Status')
        .setColor(await getColorFromURL(bot.user.displayAvatarURL({ format: 'png' })))
        .setThumbnail(bot.user.displayAvatarURL())
        .addField('Channels', bot.channels.cache.size, true)
        .addField('Emojis', bot.emojis.cache.size, true)
        .addField('Guilds', bot.guilds.cache.size, true)
        .addField('Users', bot.users.cache.size, true)
        .addField('Ping', bot.ws.ping, true)
        .addField('Uptime', `I have been online for: ${duration(bot.uptime)},\nand since ${date.format(bot.readyAt, 'hh:mm A [GMT]Z')}`)

    message.channel.send(status);
    }
}

function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString()
    const min = Math.floor((ms / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
    return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
}