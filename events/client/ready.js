module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
   // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

   let statuses = [
       "Devil Fruit Stocks",
       `${bot.guilds.cache.size} crews`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000)

}