const Discord = require("discord.js");	
const axios = require("axios");		
var bot = new Discord.Client();		
bot.on('ready', function(){		  
	console.log("bot is now online");		
})		
bot.on("message", async message => {
	if(message.content.indexOf(".") === 0){ console.log(message.content.slice(1).trim())
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
})		
bot.login(process.env.token);