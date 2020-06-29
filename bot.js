require('dotenv').config();
const { Client, Collection } = require("discord.js");
const bot = new Client();
const db = require('./utils/database/database');
const token = process.env.TOKEN;

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

db.then(() => console.log('Connected to Database!')).catch(err => console.log(err));

bot.login(token);