const Guild = require('../../utils/models/Guild');

module.exports = { 
    config: {
        name: "announce",
        description: "Announces the fruit-stock on your guild",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return
        let gSettings = await Guild.findOne({ guildId: message.guild.id });
        if(!gSettings) return message.channel.send('Run \`settings\` command first!');
        let broadcastChan = gSettings.annChannel;
        let pingyrole = gSettings.rolePing;
        if(!broadcastChan) return message.channel.send('Set your Announcement Channel first at \`settings\` command!');
        if(!pingyrole) return message.channel.send('Set your Stock-Ping role first at \`settings\` command!');

        bot.commands.get('view').run(bot, message, broadcastChan, pingyrole);
    }
}