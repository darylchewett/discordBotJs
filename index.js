const { Client, Events, GatewayIntentBits } = require ("discord.js");
const { token } = require('./config.json');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    c.user.setPresence({activities:[{name:"channeling my inner Colath"}]})

});




client.on('messageCreate', async message => {
    

    console.log(`Interaction Detected - `)

    // console.log(message)


    const sayHi = ["I'm ", "i'm ", "Im ", "I am ", "i am "].some((condition) => message.content.startsWith(condition));
    
   
    //Cases we don't want to reply...
    if (sayHi === false)
        return;
        

        console.log("SAY THE THING BART!")
        message.reply("Hi " + message.content.substring( 4))

})

client.login(token);

 