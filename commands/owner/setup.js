module.exports = { 
    config: {
        name: "setup",
        description: "Set-ups the announcement channel",
        usage: "",
        category: "miscellaneous",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let msg;

        var count = 10;
        let counter = setInterval(() => {
            msg = message.author.lastMessage.content;
            count--;
            if(count === 0) {
                clearInterval(counter);
                console.log('timeout')
            } 
        }, 1000);

        setTimeout(() => {
            console.log(msg);
        }, 5000);
    }
}

function getChannel(mention) {
	if (!mention) return;

	if (mention.startsWith('<#') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		return mention;
	}
}