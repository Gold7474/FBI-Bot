const {Client, Attachment} = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();

const cheerio = require('cheerio');

const request = require('request');

const PREFIX = '/';

const Officer = '621836926256807966';

bot.on('ready', () =>{
    console.log('Bot Online');
    bot.user.setActivity('/help', { type: 'LISTENING'})
})

bot.on('guildMemberAdd', member =>{
	
	const channel = member.guild.channels.find(channel => channel.name === "new-fbi-members");
	if(!channel) return;

	channel.send(`Welcome ${member} to the FBI Discord server! To get full access to the server, go to #verification and type **/role**!`)
});

bot.on('message', message=>{

    if(!message.content.startsWith(PREFIX)) return;

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
	case 'googlefunny':
	    message.channel.startTyping();
            image(message);
	    message.channel.stopTyping();
            break;
        case 'cheeseburger':
            const attachment = new Attachment('https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Cheeseburger.jpg')
            message.channel.send(message.author, attachment);
            break;
        case 'localfile':
            const attachment2 = new Attachment('./test.png');
            message.channel.send(message.author, attachment2)
            break;
        case 'randomchimpevent':
            var chance = Math.floor(Math.random() * 1500)
	    if(chance == 0) {
	    message.channel.send("@everyone RANDOM CHIMP EVENT! :monkey_face: :monkey_face: :monkey_face:")
	    } else {
  	    message.channel.send("No random chimp event")
	    }
            break;
        case 'poop':
            message.channel.sendMessage('funny');
            break;
        case 'creeper':
            message.channel.sendMessage('shut up');
            break;
        case 'damndaniel':
            message.channel.sendMessage('back at it again with the white vans');
            break;
        //"role" is only for the FBI discord server
        case 'role':
            message.member.addRole(Officer);
            message.delete(100);
	    message.author.send('Thank you for becoming an officer! Remember: becoming an Officer means that you agree with FBIs (Fortnite Bad Idiot) opinion that **Fortnite is bad**. If you do not agree with this opinion, please leave the server. Thank you!');
            break;
	case 'ROLE':
            message.member.addRole(Officer);
            message.delete(100);
	    message.author.send('Thank you for becoming an officer! Remember: becoming an Officer means that you agree with FBIs (Fortnite Bad Idiot) opinion that **Fortnite is bad**. If you do not agree with this opinion, please leave the server. Thank you!');
            break;
        case 'website':
            message.author.send('FBIs website: https://sites.google.com/view/fortnitebadidiot/home');
            break;
        case 'rules':
            message.author.send(
                "**These rules apply to the FBI Discord Server**" +
                "\n1. Keep the chat semi-appropriate (no NSFW)." +
                "\n2. Please don't spam @everyone (or admins), unless it is important." +
                "\n3. Do not scream, spam, or generally annoy anyone in text/voice chats." +
                "\n4. The #verification channel is for '/role', so don't use it to send other messages." +
                "\n5. Keep Fortnite bad." +
                "\nFor more info, you can check the FBI website at: https://sites.google.com/view/fortnitebadidiot/home."
            )
            break;
        case 'commands':
            message.channel.sendMessage(
                "**Funny Commands**:" +
                "\n/randomchimpevent, /poop, /creeper, /cheeseburger, /googlefunny" +
                "\n**Helpful Commands**:" +
                "\n/help, /website, /role, /rules, /commands"
            )
            break;
        case 'help':
            message.channel.sendMessage(
                "**INFO**: Fortnite Bad is a bot made by Gold_74. Created 9/21/19. For more info, or latest updates, go to https://sites.google.com/view/fortnitebadidiot/home." +
                "\n**COMMANDS**: For a full list of commands, go to https://sites.google.com/view/fortnitebadidiot/fortnite-bad-bot/commands, or do **/commands**." +
                "\n**VERSION**: 1.1.1"
            )
    }
})

function image(message){

        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "okbuddyretard",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };


        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
     
     
            $ = cheerio.load(responseBody);
     
     
            var links = $(".image a.link");
     
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
           
            console.log(urls);
     
            if (!urls.length) {
               
                return;
            }
     
            // Send result
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });

    }

bot.login(process.env.token);
