const Guild = require('../../utils/models/Guild');
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = async (bot, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;
    //custom prefix
    let guild = await Guild.findOne({ guildId: message.guild.id })
    let prefixx = guild ? guild.prefix : process.env.PREFIX;
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefixx)})\\s*`);
	if (!prefixRegex.test(message.content)) return;

	const [, prefix] = message.content.match(prefixRegex);

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}