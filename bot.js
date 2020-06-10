require('dotenv').config();
const { Client, Collection } = require("discord.js");
const bot = new Client();
const db = require('./utils/database/database');

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

db.then(() => console.log('Connected to Database!')).catch(err => console.log(err));

bot.login(process.env.TOKEN);