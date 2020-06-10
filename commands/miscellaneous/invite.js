const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');

module.exports = { 
    config: {
        name: "invite",
        description: "Displays the invites for the bot!",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

        let color = await getColorFromURL(bot.user.displayAvatarURL({ format: 'png' }))

        var inv = new MessageEmbed()
            .setColor(color)
            .setTitle('Invite Links')
            .addField('Support Server', 'To know more about the bot: [Click Here](https://discord.gg/WMrVDUR)')
            .addField('Bot Invite Link', 'To invite the bot into your server: [Click Here](https://discord.com/api/oauth2/authorize?client_id=719836513629765752&permissions=26624&scope=bot)')

        message.channel.send(inv);
    }
}