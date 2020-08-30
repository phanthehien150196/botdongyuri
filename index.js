const fs = require('fs');
const api = require("mangadex-full-api");
const axios = require('axios');
var archiver = require('archiver');
var rimraf = require('rimraf');
var ms = require('ms');
const { google } = require('googleapis');
const async = require("async");
const Discord = require("discord.js");	
var xpath = require('xpath')
  , dom = require('xmldom').DOMParser
require('events').EventEmitter.prototype._maxListeners = 1000;
	
var bot = new Discord.Client();	
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';	
const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
    headers : {
      'Referer': 'https://mangakakalot.com'
    }
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );

api.agent.domainOverride = "mangadex.org";

const embed = new Discord.MessageEmbed()
	.setTitle('Some Title')
	.setColor('#0099ff');

const exampleEmbed = {
	color: 0x0099ff,
	title: 'Những điều cần biết',
	//url: 'https://discord.js.org',
	
	fields: [
		{
			name: 'PHOTOSHOP CS6 FULL CRACK',
			value: "[Link tải](https://drive.google.com/open?id=1wF3G1pXiNvREJyiE1K2ru0Sa99kz3n2l ) | [Hướng dẫn cài đặt](https://hocthietkenoithat.org/huong-dan-cai-dat-download-photoshop-cs6-full-crack-mien-phi/ )",
		},
		{
			name: 'FONT DÀNH CHO EDIT TRUYỆN TRANH',
			value: "[FONT MTO](https://drive.google.com/open?id=1bj45GimReNulRjNWLnxERWUgTxuXC3RV ) | [FONT TEDDY](https://drive.google.com/open?id=1mQFBxD2yFvwi7lzRsw4Hr13T_bsdls2B )",
		},
		{
			name: 'ACTION XOÁ THOẠI',
			value: "[Link tải](https://drive.google.com/open?id=1b5GzfECDro7Xvq7onK_C0A1TiH3wSO8W )",
		},
		{
			name: 'TOOL HỖ TRỢ TYPE NHANH',
			value: "[Link xem](https://www.youtube.com/watch?v=GwCdTkd1qdo )",
		},
		{
			name: 'VIDEO HƯỚNG DẪN EDIT',
			value: "[Link xem](https://www.youtube.com/watch?v=TYhXS6Xw1W8 )",
		},
		{
			name: 'CÁCH TRÌNH BÀY BẢN DỊCH',
			value: "[Link xem](https://docs.google.com/document/d/1DyrdAYrK296BoJqgZsSQs6OsS3PpSB8AIEO5WnZj770/edit )",
		},
		{
			name: 'HƯỚNG DẪN TÔ MÀU',
			value: "[Link xem](https://forum.blogtruyen.vn/huong-dan/mod-huong-dan-to-mau-manga-48596 )",
		},
	],
	//timestamp: new Date(),
	
};
// Initialize the invite cache
const invites = {};
bot.on('ready', function(){		  
	console.log("bot is now online");		
})		
// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

bot.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  bot.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

bot.on('guildMemberAdd', async member => {
  // To compare, we need to load the current invite list.
  member.guild.fetchInvites().then(guildInvites => {
    // This is the *existing* invites for the guild.
    const ei = invites[member.guild.id];
    // Update the cached invites for the guild.
    invites[member.guild.id] = guildInvites;
    // Look through the invites, find the one for which the uses went up.
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    // This is just to simplify the message being sent below (inviter doesn't have a tag property)
    const inviter = bot.users.cache.get(invite.inviter.id);
    // Get the log channel (change to your liking)
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "log");
    // A real basic message with the information we need. 
    //const mem = member.user;
	
    logChannel.send(`Thành viên ${member.user} gia nhập qua lời mời ${invite.code} của ${inviter.tag}. thành viên thứ ${invite.uses} vào từ lời mời đó.`);
    
  });
});


bot.on("message", async message => {
	//if (message.webhookID) {message.delete({ timeout: 3000 })};
	if(!message.author.bot){

		bot.on('messageUpdate', (oldMessage, newMessage) => {
    
		if(getGame(change_alias(newMessage.content)) !=false&&newMessage.author.id!="574602677929902080"&&newMessage.channel.id =="533170013129932801"&&newMessage.member.roles.cache.some(r => r.name === "Mod")==false){
		 //console.log(change_alias(newMessage.content))
		 //newMessage.delete({ timeout: 1 });
		//await bot.channels.cache.get(`543459440691642408`).send("<@"+message.author +"> Nếu bạn đang nói về game thì xin hãy thảo luận ở phòng này")

			}

		});
	if(message.content.toLowerCase().indexOf(".edit")==0) 
	{

		message.channel.send({ embed: exampleEmbed });

	}
	else if(message.content.toLowerCase().indexOf(".download")==0) 
	{
		var str=message.content.toLowerCase()
		str=str.replace(".download",'').trim();
		(async function() {
		
    msg = await message.channel.send("<@"+message.author +"> Đang lấy thông tin chap truyện")
    var dir="Chapter"
    //var arr
    var title="_"
    var chap=""
    //mangadex
    if(str.indexOf("mangadex.org")>=0){
    	const chapter = await new api.Chapter(getId(str), true);
    	var arr=chapter.pages
    	console.log(arr)
      title=chapter.title
    
		if(!chapter.chapter) {chap=""} else {chap="Chap "+chapter.chapter}
    	dir = './'+chap+"_"+title;

		if (!fs.existsSync(dir)){
    	fs.mkdirSync(dir);
		}
    msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ")
    //console.log(arr)
      for(let i = 0; i < arr.length; i++) {

        await download_image(arr[i], dir+'/'+i+getPage(arr[i]));
    }
  } 
  //mangakakalot
  else if(str.indexOf("mangakakalot.com")>=0){
    await axios.get(str)
    .then(async res => {
        const data = res.data
        var arr=getArrMangakakalot(data)
        var name=getNameChapterMangakakalot(str)
        console.log("tên chapter là: "+name)
        console.log("Chapter có số trang là: "+arr[0].value)
        dir = './'+name;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
        msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ")
        for(let i = 0; i < arr.length; i++) {
        await download_image(arr[i].value, dir+'/'+i+getPage(arr[i].value));
        }
    })

  }
    

		msg.edit("<@"+message.author +"> Đang nén ảnh tại máy chủ")
    	await zipDirectory(dir, dir+".zip")
    	await fs.readFile('credentials.json', (err, content) => {
  		if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
   		authorize(JSON.parse(content), function(token) {
      //console.log("Got Token"); 
      msg.edit("<@"+message.author +"> Đang upload lên google drive")
      	uploadFile(msg,dir.replace("./","")+".zip",message.channel.id,"<@"+message.author +">",token)
      	
    	});
    	});

	})();



	}
	else if(message.content.toLowerCase().indexOf("avatar")!=-1&&getUserFromMention(message.content)!=false){
		let user = message.mentions.users.first();
		message.channel.send(message.guild.members.cache.get(user.id).displayName+" có avatar là "+ user.displayAvatarURL({ dynamic:true,format:"png",size:4096 }))
	}
	else if(getGame(change_alias(message.content)) !=false&&message.author.id!="574602677929902080"&&message.channel.id =="533170013129932801"&&message.member.roles.cache.some(r => r.name === "Mod")==false){
		 //console.log(change_alias(message.content))
		// message.delete({ timeout: 1 });
		//await bot.channels.cache.get(`543459440691642408`).send("<@"+message.author +"> Nếu bạn đang nói về game thì xin hãy thảo luận ở phòng này")

	}
	else if(message.content.indexOf("$") === 0&&message.content.toLowerCase().indexOf("$xp") === -1&&message.content.toLowerCase().indexOf("$mute") === -1&&message.channel.id =="533170013129932801"){
		await message.delete({ timeout: 1 });
		await bot.channels.cache.get(`533212850919964683`).send("<@"+message.author +"> Các lệnh liên quan đến waifu xin mời thực hiện ở đây")
	}
	else if(message.content.indexOf("/") === 0){
		await message.delete({ timeout: 60000 });
		await bot.channels.cache.get(`533212850919964683`).send("<@"+message.author +"> Đã xoá tin nhắn tạm thời")
	}
  else if(message.content.toLowerCase().indexOf(".diem") ===0){
    let diem=""
    msgdiem=await message.channel.send("<@"+message.author +"> Đang xử lý dữ liệu...")
    maSo=message.content.slice(5).trim()
let link=`https://diemthi.tuoitre.vn/kythi2020.html?FiledValue=`+maSo+`&MaTruong=diemthi`
const regSubject = /<td class="red">([^\/]*)<\/td>/gm
const regScore = /<td class="color-red">([^\/]*)<\/td>/gm
const headers = ['SBD', 'Toán', 'Văn', 'Ngoại Ngữ', 'Lí', 'Hoá', 'Sinh', 'Sử', 'Địa', 'GDCD']

axios.get(link)
    .then(res => {
        const data = res.data
        const subjects = []
        const scores = []
        let result = Array(9).fill(0)
        data.replace(regSubject, (match, group) => subjects.push(group))
        data.replace(regScore, (match, group) => {
            if(group === '-') scores.push(0)
            else scores.push(parseFloat(group))
        })
        subjects.forEach((each, i) => {
            if (each === 'Toán') {
                diem="Toán: "+scores[i]+"\n"
            }
            else if (each === 'Văn') {
                diem=diem+"Văn: "+scores[i]+"\n"
            }
            else if (each === 'Ngoại_ngữ') {
               if(scores[i]!="0") diem=diem+"Ngoại ngữ: "+scores[i]+"\n"
            }
            else if (each === 'Lí') {
                if(scores[i]!="0") diem=diem+"Lí: "+scores[i]+"\n"
            }
            else if (each === 'Hóa')  {
                if(scores[i]!="0") diem=diem+"Hoá: "+scores[i]+"\n"
            }
            else if (each === 'Sinh')  {
                if(scores[i]!="0") diem=diem+"Sinh: "+scores[i]+"\n"
            }
            else if (each === 'Sử')  {
                if(scores[i]!="0") diem=diem+"Sử: "+scores[i]+"\n"
            }
            else if (each === 'Địa')  {
                if(scores[i]!="0") diem=diem+"Địa: "+scores[i]+"\n"
            }
            else if (each === 'GDCD')  {
                if(scores[i]!="0") diem=diem+"GDCD: "+scores[i]+"\n"
            }
        })
        //console.log(diem)
        if(diem!="") msgdiem.edit("<@"+message.author +"> ĐIỂM THI TỐT NGHIỆP THPT 2020\n"+diem);
        else msgdiem.edit("<@"+message.author +"> Số báo danh không hợp lệ")
    })
    
  }
	else if(message.content.indexOf(".re")===0){
		console.log(".re")
		
		/*const re=message.content.slice(3).trim()
		await bot.channels.cache.get(`694785358952660998`).setName(re)
  		.catch(console.error);*/
  	
	}
	else if(message.content.indexOf(".") === 0){ 
	
	axios.get('https://simsumi.herokuapp.com/api?text='+encodeURI(message.content.slice(1).trim())+'&lang=vi')
      .then( response =>{
      	if(response.data.success=="") {
      		message.channel.send("<@"+message.author +"> Không hiểu");
      	}
      	else{
      		var str=response.data.success
      		str=str.replace("simsimi","Mami")
      		str=str.replace("Simsimi","Mami")
      		str=str.replace("SimSimi","Mami")
      		str=str.replace("Sim","Mami")
      		str=str.replace("sim","Mami")

      		message.channel.send("<@"+message.author +"> "+str);
      	}
      } )

	//	message.channel.send("pong");		  
	}		
	/*else if(getUserFromMention(message.content)!=false) {
		let user = message.mentions.users.first();
		let nick=message.guild.members.cache.get(user.id).displayName
		let avatar = user.displayAvatarURL({ dynamic:true,format:"png",size:4096 })
		//message.channel.send(message.guild.members.cache.get(user.id).displayName+" có avatar là "+ user.displayAvatarURL({ dynamic:true,format:"png",size:4096 }))
		const channel = bot.channels.cache.get(message.channel.id);
		
	stro =message.content.replace(/<@!?(\d+)>/gi, '');
	axios.get('https://simsumi.herokuapp.com/api?text='+encodeURI(stro.trim())+'&lang=vi')
      .then( async response =>{
      	if(response.data.success=="") {
      		channel.createWebhook('Mami', {
 			avatar: 'https://i.imgur.com/mI8XcpG.jpg',
  			reason: 'Webhook of Afang'
			})
  			.then(console.log)
  			.catch(console.error)
			try {
			const webhooks = await channel.fetchWebhooks();
			const webhook = webhooks.first();

			await webhook.send("I'm Gei", {
			username: nick,
			avatarURL: avatar,
			
			});
		} catch (error) {
		console.log('Error trying to send: ', error);
		}	
      	}
      	else{
      		var str=response.data.success
      		str=str.replace("simsimi",nick)
      		str=str.replace("Simsimi",nick)
      		str=str.replace("SimSimi",nick)
      		str=str.replace("Sim",nick)
      		str=str.replace("sim",nick)

      			channel.createWebhook('Mami', {
 			avatar: 'https://i.imgur.com/mI8XcpG.jpg',
  			reason: 'Webhook of Afang'
			})
  			.then(console.log)
  			.catch(console.error)
			try {
			const webhooks = await channel.fetchWebhooks();
			const webhook = webhooks.first();

			await webhook.send(str, {
			username: nick,
			avatarURL: avatar,
			
			});
			} catch (error) {
			console.log('Error trying to send: ', error);
			}
      	}//
      	} )
		

	}*/
	} else if(message.author=="578560798205673482"){
		console.log("add role");

		//rau cải đắng
		if(message.content.indexOf("cKhwHV3") > -1)
		{
		let role = message.guild.roles.cache.find(role => role.name === 'Rau Cải Đắng');
    	const mem = message.mentions.members.first();
    	mem.roles.add(role);
    	//let guild = await message.guild.members.fetch();
    	let memberCount = message.guild.roles.cache.get("745158403399221278").members.size+1;
    	//message.channel.send(memberCount + " members have this role!");
		await bot.channels.cache.get(`745158887551795291`).setName(`Rau Cải Đắng (`+memberCount+` thành viên)`)
    	}
    	else if(message.content.toLowerCase().indexOf("discord.gg") > -1)
		{
			message.delete({ timeout: 1 });
		}
    	
    	else if(message.content.indexOf("hS3RXkR") > -1)
		{
		let role = message.guild.roles.cache.find(role => role.name === 'Trap');
    	const mem = message.mentions.members.first();
    	mem.roles.add(role);
    	message.guild.members.fetch().then(async fetchedMembers => {
    	let memberCount = message.guild.roles.cache.get("694785358742945816").members.size;
    	//message.channel.send(memberCount + " members have this role!");
		await bot.channels.cache.get(`694785358952660998`).setName(`Rau Cải Đắng (`+memberCount+` thành viên)`)
    	})
    	}
    	else if(message.content.indexOf("drive.google") === -1&&message.content.indexOf("Toán") === -1&&message.content.indexOf("Đang") === -1&&message.content.indexOf("có avatar là") === -1) await message.delete({ timeout: 20000 });
	}
})
function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/<@!?(\d+)>/gi);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return false;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	//const id = matches[1];

	else return matches[1];
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
    str = str.replace("rpg","game")
    str = str.replace("pubg","game")
    str = str.replace("gta","game")
    str = str.replace("fgo","game")

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"");
    str = str.replace(/ + /g," ");
    str = str.replace(/\s+/g, ' ');
    
    str =str.replace(/\:!?(\S+)\:/gi, '0');  
    str = str.replace("google","")
    str = str.replace("gem","game")
    str = str.replace("give","")
    str = str.replace("ghe","")
    str = str.replace("ghet","")
    //str = str.replace(":g","")
    str = str.replace("gw","")
    str = str.replace("gilgame","")
    str = str.replace("g a","ga")
    str = str.replace("m e","me")
    str = str.replace("g ame","game")
    str = str.replace("gam e","game")
    str = str.replace("ga me","game")
    str = str.replace("gie","")
    str = str.trim();
    

    return str;
}
function diemThi(maSo){
let diem=""
let link=`https://diemthi.tuoitre.vn/kythi2020.html?FiledValue=`+maSo+`&MaTruong=diemthi`
const regSubject = /<td class="red">([^\/]*)<\/td>/gm
const regScore = /<td class="color-red">([^\/]*)<\/td>/gm
const headers = ['SBD', 'Toán', 'Văn', 'Ngoại Ngữ', 'Lí', 'Hoá', 'Sinh', 'Sử', 'Địa', 'GDCD']

axios.get(link)
    .then(res => {
        const data = res.data
        const subjects = []
        const scores = []
        let result = Array(9).fill(0)
        data.replace(regSubject, (match, group) => subjects.push(group))
        data.replace(regScore, (match, group) => {
            if(group === '-') scores.push(0)
            else scores.push(parseFloat(group))
        })
        subjects.forEach((each, i) => {
            if (each === 'Toán') {
                diem="Toán: "+scores[i]+"\n"
            }
            else if (each === 'Văn') {
                diem=diem+"Văn: "+scores[i]+"\n"
            }
            else if (each === 'Ngoại_ngữ') {
                diem=diem+"Ngoại ngữ: "+scores[i]+"\n"
            }
            else if (each === 'Lí') {
                if(scores[i]!="0") diem=diem+"Lí: "+scores[i]+"\n"
            }
            else if (each === 'Hóa')  {
                if(scores[i]!="0") diem=diem+"Hoá: "+scores[i]+"\n"
            }
            else if (each === 'Sinh')  {
                if(scores[i]!="0") diem=diem+"Sinh: "+scores[i]+"\n"
            }
            else if (each === 'Sử')  {
                if(scores[i]!="0") diem=diem+"Sử: "+scores[i]+"\n"
            }
            else if (each === 'Địa')  {
                if(scores[i]!="0") diem=diem+"Địa: "+scores[i]+"\n"
            }
            else if (each === 'GDCD')  {
                if(scores[i]!="0") diem=diem+"GDCD: "+scores[i]+"\n"
            }
        })
        console.log(diem)
        return diem
    })
}
function getPage(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/.(jpg|png|jpeg|gif)/g);
	return matches[0]
}	

function getId(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/chapter\/!?([0-9]\d+)/g);
	return matches[0].replace("chapter/",'')
}	
function getNameChapterMangakakalot(link){
  const matches = link.match(/chapter_([0-9]*)/gi);
  return matches[0]
}
function getArrMangakakalot(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`//*[@id="vungdoc"]/img/@src`, doc)
        return nodes
}


function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(out);
 
  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;
 
    stream.on('close', () => resolve());
    archive.finalize();
  });
}

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}
/**
* Describe with given media and metaData and upload it using google.drive.create method()
*/ 
function uploadFile(msg,name,messid,author,auth) {
  const drive = google.drive({version: 'v3', auth});
  var folderId = '1vWv1_tpO1O6dHmZ5ynRtn35iQAWitZ5U';
  const fileMetadata = {
    'name': name,
    parents: [folderId]
  };
  const media = {
    mimeType: 'application/zip',
    body: fs.createReadStream('./'+name)
  };
  drive.files.create({
  	supportsAllDrives: true,
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      // Handle error
      msg.edit("<@"+message.author +"> Lỗi! Xin hãy thử lại")
    } else {
      var fileId = file.data.id;  
      console.log(fileId)
        var permissions = [
  {
    'type': 'anyone',
    'role': 'reader'
    
  }
];
// Using the NPM module 'async'
async.eachSeries(permissions, function (permission, permissionCallback) {
  drive.permissions.create({
  	supportsAllDrives: true,
    resource: permission,
    fileId: fileId,
    fields: 'id',
  }, function (err, res) {
    if (err) {
      // Handle error...
      msg.edit("<@"+message.author +"> Lỗi! Xin hãy thử lại")
      permissionCallback(err);
    } else {
      //console.log('Permission ID: ', res.id)
      permissionCallback();
    }
  });
}, function (err) {
  if (err) {
    // Handle error
    msg.edit("<@"+message.author +"> Lỗi! Xin hãy thử lại")
  } else {
  	rimraf('./'+name.replace(".zip",''), function () { console.log('done'); });
  	fs.unlinkSync('./'+name)
    //console.error("thành công")
    
    bot.channels.cache.get(messid).send(author+" Link tải truyện https://drive.google.com/file/d/"+fileId+"/view");
   	msg.delete({ timeout: 1 });
   /* setTimeout(function(){
    drive.files.delete({
    	supportsAllDrives: true,
    	fileId: fileId
    }, function (err, res) {
    if (err) {
      // Handle error...
      console.error(err);
      //permissionCallback(err);
    } else {
      console.log("thành công")
    }
  })
	}, ms("1d"));*/

  }
});



    }
  });
}




bot.login(process.env.token);