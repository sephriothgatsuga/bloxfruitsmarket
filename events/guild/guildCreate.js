const Guild = require('../../utils/models/Guild');

module.exports = async (bot, guild) => {
    const g = await Guild.create({
        guildId: guild.id
    });
    await g.save();
}