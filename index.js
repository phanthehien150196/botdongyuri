const Discord = require("discord.js");	
const axios = require("axios");		
var bot = new Discord.Client();		
bot.on('ready', function(){		  
	console.log("bot is now online");		
})		
bot.on("message", async message => {
	if(!message.author.bot){
	if(message.content.toLowerCase().indexOf("avatar")!=-1&&getUserFromMention(message.content)!=false){
		let user = message.mentions.users.first();
		message.channel.send(user.username+" có avatar là "+ user.displayAvatarURL({ dynamic:true,format:"png",size:4096 }))
	}
	else if(message.content.toLowerCase().indexOf("game") >= 0&&member.roles.cache.some(r => r.name === "Mod")==false){
		message.delete(1000);
	}
	else if(message.content.indexOf(".") === 0){ console.log(message.content.slice(1).trim())
	axios.get('https://simsumi.herokuapp.com/api?text='+encodeURI(message.content.slice(1).trim())+'&lang=vi')
      .then( response =>{
      	if(response.data.success=="") {
      		message.channel.send("<@"+message.author +"> Không hiểu");
      	}
      	else{
      		message.channel.send("<@"+message.author +"> "+response.data.success);
      	}
      } )

	//	message.channel.send("pong");		  
	}		
	}
})
function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/<@!?(\d+)>/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return id;
}		

bot.login(process.env.token);