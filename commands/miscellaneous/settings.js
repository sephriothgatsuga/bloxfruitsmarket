const { MessageEmbed } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');
const Guild = require('../../utils/models/Guild');

module.exports = { 
    config: {
        name: "settings",
        description: "Displays the current settings of your guild",
        usage: "[prefix/role] [changeTo]",
        category: "miscellaneous",
        accessableby: "Owners/Administrators"
    },
    run: async (bot, message, args) => {
        let changeTo = args[1];
        let gSettings = await Guild.findOne({ guildId: message.guild.id });
        let changEmbed = new MessageEmbed()
            .setColor('#7289da')

        try {
            if(gSettings){
                console.log('Guild has settings!');
                if(!args[0]) {
                    let prefix = gSettings.prefix;
                    let role = gSettings.rolePing;
                    let color = await getColorFromURL(message.guild.iconURL({ format: 'png' }) || bot.user.displayAvatarURL({ format: 'png' }))
                    let thumbnail = message.guild.iconURL() || bot.user.displayAvatarURL();
    
                    var settings = new MessageEmbed()
                        .setTitle(`Settings for ${message.guild.name}`)
                        .setThumbnail(thumbnail)
                        .setColor(color)
                        .addField('Guild ID', message.guild.id)
                        .addField('Guild Prefix', `\`${prefix}\``)
                        .addField('Fruit-Stock Ping Role', role ? `<@&${role}>` : 'Role not set!')
                    message.channel.send(settings);
                } else if(args[0] === 'prefix'){
                    if(!message.member.hasPermission('ADMINISTRATOR')) return
                    if(!changeTo) return message.channel.send('Please put your desired Prefix!');
                    await gSettings.updateOne({ prefix: changeTo });
                    //sending new prefix
                    changEmbed.setDescription(`<:blurple_check:730595553242644640> Your guild's prefix has been changed to \`${changeTo}\`!`)
                    message.channel.send(changEmbed);
                } else if(args[0] === 'role'){
                    if(!message.member.hasPermission('ADMINISTRATOR')) return
                    if(!changeTo) return message.channel.send('Please put your desired Role to be pinged!');
                        changeTo = getId(changeTo);
                    //validating and updating
                    if(!message.guild.members.cache.find(m => m == message.guild.me).hasPermission('MENTION_EVERYONE')) return message.channel.send('Please allow me to mention everyone and other roles!');
                    if(!message.guild.roles.cache.find(r => r.id === changeTo).managed){
                        await gSettings.updateOne({ rolePing: changeTo });
                        changEmbed.setDescription(`<:blurple_check:730595553242644640> Your guild's fruit-stock role ping has been changed to <@&${changeTo}>!`)
                        message.channel.send(changEmbed);
                    } else {
                        message.author.send("I can't use that role as the Stock Role Ping!")
                    }
                }
            } else {
                console.log('Guild has no settings!');
                const guild = await Guild.create({
                    guildId: message.guild.id
                });
                await guild.save();
                bot.commands.get('settings').run(bot, message, args);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getId(mention) {
	if (!mention) return;

	if (mention.startsWith('<#') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);
    } else if(mention.startsWith('<@&') && mention.endsWith('>')) {
		mention = mention.slice(3, -1);
    }
    return mention;
}