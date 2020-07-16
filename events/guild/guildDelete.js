const Guild = require('../../utils/models/Guild');

module.exports = async (bot, guild) => {
    await Guild.deleteOne({ guildId: guild.id });
}