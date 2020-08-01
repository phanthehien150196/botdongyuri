const fs = require('fs');
const api = require("mangadex-full-api");
const axios = require('axios');
var archiver = require('archiver');
var rimraf = require('rimraf');
const { google } = require('googleapis');
const async = require("async");
const Discord = require("discord.js");	
	
var bot = new Discord.Client();	
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';	
const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
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

bot.on('ready', function(){		  
	console.log("bot is now online");		
})		
bot.on("message", async message => {
	if(!message.author.bot){

		bot.on('messageUpdate', (oldMessage, newMessage) => {
    
		if(getGame(change_alias(newMessage.content)) !=false&&newMessage.author.id!="574602677929902080"&&newMessage.channel.id =="533170013129932801"&&newMessage.member.roles.cache.some(r => r.name === "Mod")==false){
		 //console.log(change_alias(newMessage.content))
		 newMessage.delete({ timeout: 1 });
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
    	const chapter = await new api.Chapter(getId(str), true);
    	var arr=chapter.pages
    	var title=chapter.title
    //const mangatitle=""
    
		if(!chapter.chapter) {chap=""} else {chap=chapter.chapter}
    	var dir = './'+chap+"_"+title;

		if (!fs.existsSync(dir)){
    	fs.mkdirSync(dir);
		}
    //console.log(getPage(arr[0]))
    	for(let i = 0; i < arr.length; i++) {
  			await download_image(arr[i], dir+'/'+getPage(arr[i]));
		}
    	await zipDirectory(dir, dir+".zip")
    	await fs.readFile('credentials.json', (err, content) => {
  		if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
   		authorize(JSON.parse(content), function(token) {
      //console.log("Got Token"); 
      //console.log(token);
      	uploadFile(chap+"_"+title+".zip",token)
      
    	});
    	});

	})();



	}
	else if(message.content.toLowerCase().indexOf("avatar")!=-1&&getUserFromMention(message.content)!=false){
		let user = message.mentions.users.first();
		message.channel.send(user.username+" có avatar là "+ user.displayAvatarURL({ dynamic:true,format:"png",size:4096 }))
	}
	else if(getGame(change_alias(message.content)) !=false&&message.author.id!="574602677929902080"&&message.channel.id =="533170013129932801"&&message.member.roles.cache.some(r => r.name === "Mod")==false){
		 //console.log(change_alias(message.content))
		 message.delete({ timeout: 1 });
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
    
    str =str.replace(/\:!?(\S+)\:/gi, '0');  
    str = str.replace("google","")
    str = str.replace("gem","game")
    str = str.replace("give","")
    str = str.replace("ghe","")
    str = str.replace("ghet","")
    //str = str.replace(":g","")
    str = str.replace("gw","")
    str = str.replace("gilgame","")
    str = str.replace("ga me","game")
    str = str.replace("gie","")
    str = str.trim();
    str = str.replace(/\s+/g, ' ');
    return str;
}
function getPage(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/[\w-]+\.(jpg|png)/g);
	return matches[0]
}	

function getId(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/chapter\/!?([0-9]\d+)/g);
	return matches[0].replace("chapter/",'')
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
function uploadFile(name,auth) {
  const drive = google.drive({version: 'v3', auth});
  const fileMetadata = {
    'name': name
  };
  const media = {
    mimeType: 'application/zip',
    body: fs.createReadStream('./'+name)
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      // Handle error
      console.error(err);
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
    resource: permission,
    fileId: fileId,
    fields: 'id',
  }, function (err, res) {
    if (err) {
      // Handle error...
      console.error(err);
      permissionCallback(err);
    } else {
      //console.log('Permission ID: ', res.id)
      permissionCallback();
    }
  });
}, function (err) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
  	rimraf('./'+name.replace(".zip",''), function () { console.log('done'); });
  	fs.unlinkSync('./'+name)
    console.error("thành công")
    message.channel.send(fileId);
  }
});



    }
  });
}




bot.login(process.env.token);