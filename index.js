const { Client, Events, GatewayIntentBits } = require ("discord.js");
const { token } = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setPresence({activities:[{name:"channeling my inner Colath"}]})

});


client.on('messageCreate', async message => {

    const now = new Date();
    const time = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0') + ":" + String(now.getSeconds()).padStart(2, '0');


    //Don't respond to self, or other bots (they wouldn't get it anyway)
    if(message.author.bot){
        console.log(time + " | Bot message, ignoring...")
        return;
    }

    
    console.log(`${time} | An actual person said something in ${message.channel.name}.`)

    //Our array/lists for next set of checks
    let prefix = null;
    const targetPhrases = ["i'm ", "im ",  "i am "]
    const denyChannels = ["info", "backups", "raid-guidelines", "event-archives", "raid-diplomacy"];
    const messageLimit = 144;
   

    for (let trigger of targetPhrases){


        if(message.content.toLowerCase().trim().startsWith(trigger)){
            prefix = trigger;
            break;
        }

    }


    // If they didn't start the message right, give up now...
    if (prefix === null){
        console.log("False Alarm, they didn't say it :(")
        return;
    }
        
    // Are we allowed to acknowlege this in the channel it was posted
    if (denyChannels.includes(message.channel.name)){
        console.log("But I'm not allowed to response in " + message.channel.name)
        return;
    }
        
        // We're good to try
        console.log("SAY THE THING BART!")

        //Catch the error just in case there's a permission issue
        //If uncaught will crash the whole bot
        try{

    if (message.content.length > messageLimit)
            await message.reply("Hi" + message.content.substring(prefix.length - 1, prefix.length + messageLimit ) + "...")

    else
            await message.reply("Hi" + message.content.substring(prefix.length - 1))

        }catch(e){
            //Sad times, but at least we can try again next time
            console.log("Reply failed")

            //TODO: Add a log file to output the error details to for later debugging
        }

})

client.login(token);

 