const fs = require('fs');
const { Client } = require('pg');
let Parser = require('rss-parser');
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
	

let parser = new Parser({
  customFields: {
    item: ['mangaLink']
  }
});
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

var bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });	
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
const download_nhentai = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
    headers : {
      'Referer': 'https://nhentai.net'
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
const download_blt = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
    headers : {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
      'Referer': 'https://blogtruyen.vn',
      'sec-fetch-dest': 'image',
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-site': 'cross-site'
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
const download_dis = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
    headers : {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
      'Referer': 'https://discord.com',
      
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-site': 'cross-site'
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

const download_dex = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
    headers : {
      'Referer': 'https://mangadex.org'
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
bot.on('ready', async function(){		  
	console.log("bot is now online");	
  //var sql = await client.query('SELECT * FROM public."time"')

  //console.log(sql.rows[0])
setInterval(async function () { 
   msg = await bot.channels.cache.get(`533170013129932801`).send("Trải nghiệm tính năng theo dõi tuyện, download truyện của Mami. Xem hướng dẫn tại https://forum.blogtruyen.vn/tool/bot-discord-ho-tro-tai-truyen-va-theo-doi-truyen-54703")
   await msg.delete({ timeout: 30000 });
},ms('60m'))


 setInterval(async function () { 
  sql = await client.query("SELECT time_manga FROM time where name='mangadex'")
  console.log(sql.rows[0])
  feed = await parser.parseURL('https://mangadex.org/rss/hsqn9pkCxfSNX57YTHvEZdBec8DWR2gt?h=0');
  sqlupdate = await client.query("UPDATE public.time SET time_manga='"+feed.items[0].pubDate+"' where name='mangadex'")
  date1=new Date(sql.rows[0].time_manga.trim())
  feed.items.forEach(async item => {
    if(new Date(item.pubDate)>date1){
      bot.channels.cache.get("787612323091185725").send("Chap truyện mới "+item.link+"\n Bấm 👌 để tải chap truyện này xuống");
      feednew=await parser.parseURL('https://mangadex.org/rss/hsqn9pkCxfSNX57YTHvEZdBec8DWR2gt/manga_id/'+getIdMd(item.mangaLink)+'?h=1');
      if(feednew.items.length==1) bot.channels.cache.get("788037199433039873").send("truyện mới ra "+item.mangaLink);

      sqlno=await client.query("SELECT id_dis FROM public.manga where id_manga='"+getIdMd(item.mangaLink)+"'")
      if(sqlno.rows.length>0){
        tagno=""
        sqlno.rows.forEach(r =>{
          tagno=tagno+"<@"+r.id_dis+"> "
        })
        bot.channels.cache.get("787616644272357406").send(tagno+"Chap truyện mới "+item.link+"\n Bấm 👌 để tải chap truyện này xuống");
      }
    }
  });




},ms('5m'))
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
    const logChannel = member.guild.channels.cache.find(channel => channel.name === "testsv");
    // A real basic message with the information we need. 
    //const mem = member.user;
	 console.log("gia nhập qua lời mời https://discord.gg/${invite.code}")
    logChannel.send(`Thành viên ${member.user} gia nhập qua lời mời https://discord.gg/${invite.code} của <@${inviter.tag}>. thành viên thứ ${invite.uses} vào từ lời mời đó.`);
    
  });
});

bot.on('messageReactionAdd', async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      
      return;
    }
  }
  // Now the message has been cached and is fully available
  //console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
  if(reaction.message.author.id=='578560798205673482'&&reaction.message.content!=""&&reaction.emoji.name=='👌'&&(reaction.message.channel.id=='787616644272357406'||reaction.message.channel.id=='787612323091185725'))
  {
  console.log(user.id);
  if(user.id!='578560798205673482'){
    //
    var str=reaction.message.content.toLowerCase();
    console.log(str)
    str=getLink(str);

    (async function() {
    
    msg = await bot.channels.cache.get(`769575209518104636`).send("<@"+user.id +"> Đang lấy thông tin chap truyện")

    var dir="Chapter"
    //var arr
    var title="_"
    var chap=""
    //mangadex
    if(str.indexOf("mangadex.org")>=0){
      await axios.get('https://mangadex.org/api/v2/chapter/'+getId(str))
      .then(async response =>{
        console.log(response.data.data.pages);
        var arr=response.data.data.pages
        var sv=response.data.data.server+response.data.data.hash+"/"
        title =response.data.data.mangaTitle
        chap=response.data.data.chapter+"_"+response.data.data.title
        dir = './'+title+"_chap_"+chap;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }

        msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ")
    //console.log(arr)    
        for(let i = 0; i < arr.length; i++) {
        await download_dex(sv+arr[i], dir+'/'+i+getPage(sv+arr[i]));
        if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
            }
          }

     })

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
        msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ")
        for(let i = 0; i < arr.length; i++) {
        await download_image(arr[i].value, dir+'/'+i+getPage(arr[i].value));
        if(i%5==0) {
            
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  }
  //manganelo.com
  else if(str.indexOf("manganelo.com")>=0){
    await axios.get(str)
    .then(async res => {
        const data = res.data
        var arr=getArrManganelo(data)
        var name=getNameChapterMangakakalot(str)
        console.log("tên chapter là: "+name)
        console.log("Chapter có số trang là: "+arr[0].value)
        dir = './'+name;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
        msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ")
        for(let i = 0; i < arr.length; i++) {
        await download_image(arr[i].value, dir+'/'+i+getPage(arr[i].value));
        if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  }
  //nhentai.net
  else if(str.indexOf("nhentai.net")>=0){
    await axios.get(str)
    .then(async res => {
        const data = res.data
        var arr=getArrNhentai(data)
        var name=getNameNhentai(str)
        console.log("tên chapter là: "+name)
        console.log("Chapter có số trang là: "+arr[0].value)
        dir = './nhentai_'+name;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
        msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ")
        for(let i = 0; i < arr.length; i++) {
        var v=arr[i].value.replace("t.nhentai","i.nhentai")
        v=v.replace("t.",".")
        
        await download_nhentai(v, dir+'/'+i+getPage(arr[i].value));
          if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+user.id +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  } else {return false}
    

    msg.edit("<@"+user.id +"> Đang nén ảnh\n"+progressBar(1, 1))
      await zipDirectory(dir, dir+".zip")
      await fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), function(token) {
      //console.log("Got Token"); 
      msg.edit("<@"+user.id +"> Đang upload lên google drive\n"+progressBar(1, 1))
        uploadFile(msg,dir.replace("./","")+".zip",'769575209518104636',"> "+str+"\n<@"+user.id +"> ",token)
        
      });
      });

  })();


  }
}
});
bot.on("message", async message => {

	//if (message.webhookID) {message.delete({ timeout: 3000 })};
  if(message.author.id=="578560798205673482"&&(message.channel.id=="787616644272357406"||message.channel.id=='787612323091185725')){
    message.react('👌');

    

  }
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
  else if(message.content.toLowerCase().indexOf(".add")==0) 
  {
    var str=message.content.toLowerCase();
    str=str.replace(".add",'').trim();
    if(str.indexOf("mangadex.org")==-1||str.indexOf("title/")==-1) message.channel.send("<@"+message.author +"> Phải là link truyện từ Mangadex.org")
      else {
        var id_manga=getIdMd(str)
        var id_dis=message.author.id 
        sqlcheck=await client.query("SELECT id_dis FROM public.manga where id_manga='"+id_manga+"' and id_dis='"+id_dis+"'")
        if(sqlcheck.rows.length>0) message.channel.send("<@"+message.author +"> Truyện này đã có trong danh sách")
        else {
          axios.get('https://mangadex.org/api/v2/manga/'+id_manga)
              .then(async response =>{
              sqladd=await client
              .query("INSERT INTO public.manga(id_dis, id_manga, name_manga) VALUES ('"+id_dis+"', '"+id_manga+"', '"+response.data.data.title.replace(/[^a-z0-9\s]/gi, '')+"')")
              .then(res => {
              message.channel.send("<@"+message.author +"> Thêm truyện thành công vào danh sách theo dõi")
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
              })
              //console.log(response.data.data.title);
              })  
          
        }
      
      }

  }
  else if(message.content.toLowerCase().indexOf(".remove")==0) 
  {
    var str=message.content.toLowerCase();
    str=str.replace(".remove",'').trim();
    if(str.indexOf("mangadex.org")==-1||str.indexOf("title/")==-1) message.channel.send("<@"+message.author +"> Phải là link truyện từ Mangadex.org")
      else {
        var id_manga=getIdMd(str)
        var id_dis=message.author.id 
        sqlcheck=await client.query("SELECT id_dis FROM public.manga where id_manga='"+id_manga+"' and id_dis='"+id_dis+"'")
        if(sqlcheck.rows.length<=0) message.channel.send("<@"+message.author +"> Truyện không tồn tại trong danh sách")
        else {
          sqladd=await client
              .query("DELETE FROM public.manga WHERE id_manga='"+id_manga+"' and id_dis='"+id_dis+"'")
              .then(res => {
              message.channel.send("<@"+message.author +"> Xoá thành công")
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
              })  
          
        }
      
      }

  }
  else if(message.content.toLowerCase().trim()==".list"){
    sqladd=await client
          .query("SELECT id_manga, name_manga FROM public.manga where id_dis='"+message.author.id+"'")
          .then(res => {
            var embedlist = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('DANH SÁCH TRUYỆN CỦA '+message.guild.members.cache.get(message.author.id).displayName)

            res.rows.forEach(r =>{
              embedlist.addField(r.name_manga,"[Link](https://mangadex.org/title/"+r.id_manga+")")
              
            })
            message.channel.send(embedlist)
    
           })
  }
  else if(message.content.toLowerCase().indexOf(".list")==0){
    let user=""
    user = message.mentions.users.first();
    if(user!=""){
       sqladd=await client
          .query("SELECT id_manga, name_manga FROM public.manga where id_dis='"+user.id+"'")
          .then(res => {
            var embedlist = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('DANH SÁCH TRUYỆN CỦA '+message.guild.members.cache.get(user.id).displayName)

            res.rows.forEach(r =>{
              embedlist.addField(r.name_manga,"[Link](https://mangadex.org/title/"+r.id_manga+")")
              
            })
            message.channel.send(embedlist)
    
           })
    }
  }
	else if(message.content.toLowerCase().indexOf(".download")==0&&message.channel.id=="769575209518104636") 
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
      await axios.get('https://mangadex.org/api/v2/chapter/'+getId(str))
      .then(async response =>{
        console.log(response.data.data.pages);
        var arr=response.data.data.pages
        var sv=response.data.data.server+response.data.data.hash+"/"
        title =response.data.data.mangaTitle
        chap=response.data.data.chapter+"_"+response.data.data.title
        dir = './'+title+"_chap_"+chap;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }

        msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ")
    //console.log(arr)    
        for(let i = 0; i < arr.length; i++) {
        await download_dex(sv+arr[i], dir+'/'+i+getPage(sv+arr[i]));
        if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
            }
          }

     })

    	/*const chapter = await new api.Chapter(getId(str), true);
    	var arr=chapter.pages
    	
      title=chapter.title
    
		if(!chapter.chapter) {chap=""} else {chap="Chap "+chapter.chapter}
    	dir = './'+chap+"_"+title;

		if (!fs.existsSync(dir)){
    	fs.mkdirSync(dir);
		}
    msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ")
    //console.log(arr)
      for(let i = 0; i < arr.length; i++) {

        await download_dex(arr[i], dir+'/'+i+getPage(arr[i]));
        if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
    }*/
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
        if(i%5==0) {
            
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  }
  //manganelo.com
  else if(str.indexOf("manganelo.com")>=0){
    await axios.get(str)
    .then(async res => {
        const data = res.data
        var arr=getArrManganelo(data)
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
        if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  }
  //nhentai.net
  else if(str.indexOf("nhentai.net")>=0){
    await axios.get(str)
    .then(async res => {
        const data = res.data
        var arr=getArrNhentai(data)
        var name=getNameNhentai(str)
        console.log("tên chapter là: "+name)
        console.log("Chapter có số trang là: "+arr[0].value)
        dir = './nhentai_'+name;

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
        msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ")
        for(let i = 0; i < arr.length; i++) {
        var v=arr[i].value.replace("t.nhentai","i.nhentai")
        v=v.replace("t.",".")
        
        await download_nhentai(v, dir+'/'+i+getPage(arr[i].value));
          if(i%5==0) {
            //var tientrinh=i/arr.length*100
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))

          }else if(i==(arr.length-1)){
            msg.edit("<@"+message.author +"> Đang tải ảnh về máy chủ\n"+progressBar(i, arr.length))
          }
        }
    })

  } else {msg.edit("<@"+message.author +"> Sai link truyện. Nhập đúng đường dẫn chapter của 1 trong những web truyện sau\nMangadex.org\nMangakakalot.com\nManganelo.com\nNhentai.net");return false}
    

		msg.edit("<@"+message.author +"> Đang nén ảnh\n"+progressBar(1, 1))
    	await zipDirectory(dir, dir+".zip")
    	await fs.readFile('credentials.json', (err, content) => {
  		if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
   		authorize(JSON.parse(content), function(token) {
      //console.log("Got Token"); 
      msg.edit("<@"+message.author +"> Đang upload lên google drive\n"+progressBar(1, 1))
      	uploadFile(msg,dir.replace("./","")+".zip",message.channel.id,"> "+message.content+"\n<@"+message.author +">",token)
      	
    	});
    	});

	})();



	}
  else if(message.content.toLowerCase().indexOf(".download")==0&&message.channel.id!="769575209518104636") {
    message.channel.send("<@"+message.author +"> Vui lòng thực hiện lệnh download manga ở kênh <#769575209518104636>")
  }
  /*else if(message.content.toLowerCase()==".avatars"){
    message.channel.send("avatars", {files: ['https://cdn.discordapp.com/attachments/533170013129932801/795312941409763328/unknown.png']});
  }*/
  else if(message.channel.id=="769575209518104636"&&message.author.id!="578560798205673482")
  {
    await message.delete({ timeout: 4000 });
  }
  //  if(message.author.id=="617249554537906178")
  // {
  //   await message.delete({ timeout: 1 });
  // }
	else if(message.content.toLowerCase().indexOf("avatar")!=-1&&getUserFromMention(message.content)!=false){
		let user = message.mentions.users.first();
		message.channel.send(message.guild.members.cache.get(user.id).displayName+" có avatar là ", {files: [user.displayAvatarURL({ dynamic:true,format:"png",size:4096 })]})
	}
	else if(message.content.toLowerCase().indexOf(".test")==0){
    message.channel.send(message.url)
		 //console.log(change_alias(message.content))
		// message.delete({ timeout: 1 });
		//await bot.channels.cache.get(`543459440691642408`).send("<@"+message.author +"> Nếu bạn đang nói về game thì xin hãy thảo luận ở phòng này")

	}
	else if(message.content.indexOf("$") === 0&&message.content.toLowerCase().indexOf("$xp") === -1&&message.content.toLowerCase().indexOf("$mute") === -1&&message.channel.id =="533170013129932801"){
		await message.delete({ timeout: 1 });
		await bot.channels.cache.get(`533212850919964683`).send("<@"+message.author +"> Các lệnh liên quan đến waifu xin mời thực hiện ở đây")
	}
  else if(message.member.roles.cache.has("772476168791130142")){
    if(message.content.toLowerCase().indexOf("http") >= 0||message.attachments.size !== 0)
    await message.delete({ timeout: 1 });
    //await bot.channels.cache.get(`533212850919964683`).send("<@"+message.author +"> Các lệnh liên quan đến waifu xin mời thực hiện ở đây")
  }
  else if(message.attachments.size !== 0){
    let dir="./dis"
    let filed=getFilediscord(message.attachments.first().url)
    let user = message.author;
    console.log(filed)

        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }

    await download_dis(message.attachments.first().url,dir+"/"+filed);
        msgimg=bot.channels.cache.get("786302361542852649").send(message.guild.members.cache.get(user.id).displayName+" đã tải lên ở <#"+message.channel.id+">\nLink tin nhắn "+message.url, {files: [dir+"/"+filed]});
        console.log(msgimg.attachments.first().url)
        await fs.unlinkSync(dir+"/"+filed)

  }
    
  else if(message.member.roles.cache.has("681019402279583744")){
    
    await message.delete({ timeout: 1 });
    //await bot.channels.cache.get(`533212850919964683`).send("<@"+message.author +"> Các lệnh liên quan đến waifu xin mời thực hiện ở đây")
  }
  else if(message.content.toLowerCase().indexOf("/xoa") === 0){
    await message.delete({ timeout: 1 });
  }
  else if(message.content.indexOf(".trans") === 0){
    let cau=message.content.slice(6).trim()
    axios.get('https://api.mymemory.translated.net/get?q='+encodeURI(cau)+'&langpair=en|vi')
      .then( response =>{
        message.channel.send("<@"+message.author +"> "+response.data.responseData.translatedText)
      } )
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
	else if(message.content.toLowerCase().indexOf("blogtruyen.vn/")>=0){
		console.log(".re")
		if(checkLinkBlt(message.content)==false) return false
    const link="https://m."+checkLinkBlt(message.content)
    const linkgoc="https://"+checkLinkBlt(message.content)
    const id=checkLinkBlt(message.content).replace("blogtruyen.vn/","")
		
    /*const re=message.content.slice(3).trim()
		await bot.channels.cache.get(`694785358952660998`).setName(re)
  		.catch(console.error);*/
      //link="https://m.blogtruyen.vn/24443"

       await axios.get(link, {
      headers: {
    
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
      'Referer': 'https://blogtruyen.vn'
      }
      })
    .then(async res => {
        const data = res.data
        console.log(link)
        var name=getNameBlogtruyen(data)
        //var name=getNameChapterMangakakalot(data)
        //console.log("tên chapter là: "+name)
        var cover=getCoverBlogtruyen(data)
        console.log("Tên truyện: "+name)
        console.log("Ảnh bìa: "+cover.replace("thumb/400/",""))
        var dir="./blt_"+id
        if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        }
        await download_blt(cover,dir+"/"+id+getPage(cover));
        msgimg=bot.channels.cache.get("694785359166308389").send("", {files: [dir+"/"+id+getPage(cover)]});
        console.log(msgimg.attachments.first().url)
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(name)
        .setURL(linkgoc)
        
        .setImage(msgimg.attachments.first().url)
        .addField('Thể loại', getTheloaiBlt(data)+"\n", false)
        .addField('Sơ lược', getDesBlogtruyen(data)+"\n", false);
        await message.channel.send(exampleEmbed)
        rimraf(dir, function () { console.log('done'); });
    })
  	
	}
	else if(message.content.indexOf(".") === 0){ 
	
	axios.get('https://simsumi.herokuapp.com/api?text='+encodeURI(message.content.slice(1).trim())+'&lang=vi')
      .then(async response =>{
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
          strarr=str.split(/[.,!?;]/)
          filarr=strarr.filter(function(e){ return e === 0 || e });
          if(filarr.length>0){
            for(let i = 0; i < filarr.length; i++){
              // message.channel.startTyping();
              // setTimeout(()=>{
              //   message.channel.send("<@"+message.author +"> "+filarr[i]);  
              
              //   message.channel.stopTyping();
              // },500)
              if(filarr[i].trim()!="") await message.channel.send("<@"+message.author +"> "+filarr[i]);  
            } 
          } else message.channel.send("<@"+message.author +"> "+str);
          
      		console.log(filarr.length)
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
		
  if(message.channel.id!="787612323091185725"&&message.channel.id!="787616644272357406"&&message.channel.id!="788037199433039873"&&message.channel.id!="769575209518104636"&&message.attachments.size == 0&&message.content.indexOf("có avatar là") === -1) await message.delete({ timeout: 60000 });
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
function getLink(a){
  const matches = a.match(/(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g);
  return matches[0]
}

function getPage(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/.(jpg|png|jpeg|gif)/g);
	return matches[0]
}	
function getFilediscord(mention) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/g);
  return Date.now()+"_"+matches[0]
} 

function getId(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/chapter\/!?([0-9]\d+)/g);
	return matches[0].replace("chapter/",'')
}	
function getIdMd(mention) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.match(/title\/!?([0-9]\d+)/g);
  return matches[0].replace("title/",'')
} 
function getNameChapterMangakakalot(link){
  const matches = link.match(/chapter_([0-9]*)/gi);
  return matches[0]
}
function checkLinkBlt(link){
  const matches = link.match(/blogtruyen\.vn\/([0-9])\w+/g);
  if (!matches) {return false;}

  // However the first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  else {const id = matches[0];

  return id;}
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
function getArrManganelo(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`/html/body/div[1]/div[3]/img/@src`, doc)
        return nodes
}
function getNameNhentai(link){
  const matches = link.match(/g\/([0-9])*/gi);
  return matches[0].replace("g/","")
}
function getArrNhentai(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`//*[@id="thumbnail-container"]/div[1]/div/a/img/@data-src`, doc)
        return nodes
}
function getNameBlogtruyen(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`/html/body/div[2]/section/h1`, doc)
        return nodes[0].firstChild.data
}
function getCoverBlogtruyen(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`/html/body/div[2]/section/article[1]/img/@src`, doc)
        return nodes[0].value
}
function getDesBlogtruyen(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);

        var nodes = xpath.select(`string(/html/body/div[2]/section/article[2])`, doc)
        if (nodes.trim()=="") return "Không có"
        else return nodes.trim()
}
function getTheloaiBlt(data){
  var doc = new dom({
        locator: {},
        errorHandler: { warning: function (w) { }, 
        error: function (e) { }, 
        fatalError: function (e) { console.error(e) } }
        }).parseFromString(data);
        var str=""
        var nodes = xpath.select(`/html/body/div[2]/section/article[4]/ul/li/a`, doc)
        for(let i = 0; i < nodes.length; i++){
            if(i==nodes.length-1){
                str=str+nodes[i].firstChild.data    
            }
            else str=str+nodes[i].firstChild.data+", "

        }
        return str
}
global.progressBar = (value, maxValue) => {
  size=15
  const percentage = value / maxValue; // Calculate the percentage of the bar
  const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
  const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.
//▇
  const progressText = '▇'.repeat(progress); // Repeat is creating a string with progress * caracters in it
  const emptyProgressText = '--'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
  const percentageText = Math.round10(percentage * 100,-1) + '%'; // Displaying the percentage of the bar
  if(percentage==1) return '```css\n[' + progressText + emptyProgressText + '] ' + '100%\n```';
  else return '```ini\n[' + progressText + emptyProgressText + '] ' + percentageText + '\n```'; // Creating the bar
  //return bar;
};
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
  var folderId = '1xk9ySRbR7aRp-Zd7oPlFiOgyHuqPz9P3';
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
    fields: 'id, size'
  }, (err, file) => {
    if (err) {
      // Handle error
      msg.edit("<@"+message.author +"> Lỗi! Xin hãy thử lại")
    } else {
      var fileId = file.data.id;  
      var fileSize=file.data.size;
      console.log(fileSize)
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
      console.log(file.size)
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
    
    bot.channels.cache.get(messid).send(author);
    driveEmbed = new Discord.MessageEmbed().addField("Link tải","["+name+"](https://drive.google.com/uc?export=download&id="+fileId+" )")
    bot.channels.cache.get(messid).send(driveEmbed)
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

(function() {
  /**
   * Tinh chỉ số thập phân của một con số.
   *
   * @param {String}  type  Loại điều chỉnh.
   * @param {Number}  value Số liệu.
   * @param {Integer} exp   Số mũ (the 10 logarithm of the adjustment base).
   * @returns {Number} Giá trị đã chỉnh sửa.
   */
  function decimalAdjust(type, value, exp) {
    // Nếu exp có giá trị undefined hoặc bằng không thì...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Nếu value không phải là ố hoặc exp không phải là số nguyên thì...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Làm tròn số thập phân (theo mốc số 5)
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Làm tròn số thập phân (về gần giá trị 0)
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Làm tròn số thập phân (ra xa giá trị 0)
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();



bot.login(process.env.token);//