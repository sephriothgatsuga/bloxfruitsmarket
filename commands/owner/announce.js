const Guild = require('../../utils/models/Guild');

module.exports = { 
    config: {
        name: "announce",
        description: "Announces the fruit-stock on your guild",
        usage: "",
        category: "owner",
        accessableby: "Stockers"
    },
    run: async (bot, message) => {
        if(message.member.roles.cache.has('720243516734832711')) {
            let gSettings = await Guild.findOne({ guildId: message.guild.id });
            if(!gSettings) return message.channel.send('Run \`settings\` command first!');
            let pingyrole = gSettings.rolePing;
            if(!pingyrole) return message.channel.send('Set your Stock-Ping role first at \`settings\` command!');

            bot.commands.get('view').run(bot, message, pingyrole, this.config.name); 
        } else {
            return message.channel.send('This command has been deprecated and is replaced by the <#719838790860144741> channel! Kindly follow that channel and set it up to your server.').then(() => {
                bot.commands.get('invite').run(bot, message);
                message.channel.send('Join our server too to get notified of changes from the bot!');
            });
        }     
    }
}