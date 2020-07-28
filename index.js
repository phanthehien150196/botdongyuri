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
	else if(getGame(change_alias(message.content)) !=false&&message.author.id!="574602677929902080"&&message.channel.id =="533170013129932801"&&message.member.roles.cache.some(r => r.name === "Mod")==false){
		message.delete({ timeout: 1 });
	}
	else if(message.content.indexOf("/") === 0){
		await message.delete({ timeout: 10000 });
		await bot.channels.cache.get(`694785358746877970`).send("<@"+message.author +"> Đã xoá")
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

function getGame(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/\bg!?(\S+)e/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) {return false;}

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	else {const id = matches[1];

	return id;}
}		

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace("gảm","game")
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    
    str = str.replace("google","")
    str = str.replace("gem","game")
    str = str.replace("give","")
    str = str.replace("ghe","")
    str = str.replace(":g","")
    str = str.replace("gw","")
    str = str.replace("gilgame","")
    str = str.replace("ga me","game")
    
    str = str.trim(); 
    return str;
}
bot.login(process.env.token);