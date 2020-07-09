const date = require('date-and-time');

module.exports = {
    config: {
        name: "uptime",
        description: "Displays the bots current uptime!",
        usage: "",
        category: "owner",
        accessableby: "Members",
        aliases: ["ut"]
    },
    run: async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
    }
    if(message.author.id !== '173977882765426688') return console.log('not owner');
    message.channel.send(`I have been online for: ${duration(bot.uptime)},\nand since ${date.format(bot.readyAt, 'hh:mm A [GMT]Z')}`)

    }
}