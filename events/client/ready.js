const { scheduleJob } = require('node-schedule');

module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
       {
        name: "Devil Fruit Stocks",
        type: 'WATCHING'
       },
       {
        name: `for ${bot.guilds.cache.size} crews`,
        type: 'PLAYING' 
       },
       {
        name: `with ${bot.users.cache.size} users`,
        type: 'PLAYING'
       }
    ]
    setInterval(() => {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status.name, {type: status.type});
    }, 10000);
}