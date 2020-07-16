const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
    guildId: String,
    prefix: { type: String, default: 'stock' },
    annChannel: { type: String, default: String },
    rolePing: { type: String, default: String }
});

const Guild = module.exports = mongoose.model('Guild', GuildSchema, 'guilds');