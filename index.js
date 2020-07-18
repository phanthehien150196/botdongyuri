const Discord = require("discord.js");	
const axios = require("axios");		
var bot = new Discord.Client();		
bot.on('ready', function(){		  
	console.log("bot is now online");		
})		
bot.on("message", async message => {
	if(!message.author.bot){
	if(message.content.toLowerCase().indexOf(".th")!=-1&&getUserFromMention(message.content)!=false)
	{
		let user = message.mentions.users.first();
		message.channel.send(getTime(user.createdAt));
	}
	else if(message.content.toLowerCase().indexOf("avatar")!=-1&&getUserFromMention(message.content)!=false){
		let user = message.mentions.users.first();
		message.channel.send(user.username+" có avatar là "+ user.displayAvatarURL({ dynamic:true,format:"png",size:4096 }))
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
function getTime (date)
{
	 thu = date.getDay().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	if(thu=="0") thu= "Chủ Nhật"
	else if(thu=="1") thu= "Thứ Hai"
	else if(thu=="2") thu= "Thứ Ba"
	else if(thu=="3") thu= "Thứ Tư"
	else if(thu=="4") thu= "Thứ Năm"
	else if(thu=="5") thu= "Thứ Sáu"
	else thu= "Thứ Bảy"
	ngay=date.getDate().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	thang=date.getMonth().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	nam=date.getFullYear().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	gio=date.getHours().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	phut=date.getMinutes().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	giay=date.getSeconds().toLocaleString('vi', { timeZone: 'Asia/Ho_Chi_Minh' })
	return "Thành viên này lập tài khoản vào "+thu+", "+ngay+"/"+thang+"/"+nam+" "+ gio+":"+phut+":"+giay
}
bot.login(process.env.token);