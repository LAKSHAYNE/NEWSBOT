//const telegraf =require('telegraf');
const { Composer } = require('micro-bot');
const bot = new Composer;
const axios = require('axios').default;
//const bot= new telegraf("1489562418:AAETCP44MyUOmPIsWcPZdTvinu7iT1ww9Fo");
const date=new Date();
const year=date.getFullYear().toString();
//const express=require('express');
//const app=express();
const month=(date.getMonth()).toString();
const d=date.getDate().toString();
const current=year+"-"+month+"-"+d
bot.start((ctx)=>{
    console.log(current);
    ctx.reply("ready to serve");
});

bot.on("inline_query",async (ctx)=>{
    //console.log();
    let q=ctx.inlineQuery.query;
    //console.log(await quer(q));
    let a=[];
    console.log(q);
    if (q!==" " && q!==""){
        a=await quer(q);
    }
    
    if (a!==[]){let result=await a.map((ele,index)=>{
        return ({
            type:"article",
            title:ele.title,
            id:index,
            input_message_content:{
                message_text:ele.title+"\n"+ele.url+"\n"+ele.description
            },
            url:ele.url
        });
    });
    ctx.answerInlineQuery(result);
}
});

async function quer(que='apple'){
   let res= await axios.get('http://newsapi.org/v2/everything?from='+current+'&sortBy=publishedAt&apiKey=eb5dbd33fa6f40cab72e237c524070df&q='+que)
//   .then(function (response) {
//     // handle success
//     //articles=response.data.articles;
//   })
//   .catch(function (error) {
//     // handle error
//     //console.log(error);
//   });
   // console.log(res.data.articles);
    //console.log(res);
   return res.data.articles;
}
//bot.launch();
module.exports = bot
//app.get('/',(req,res)=>res.send('newsbot up and running'))

//app.listen(process.env.PORT||3000,(req,res)=>console.log("newsbot running"))
//heroku -----radiant-island-89459
//https://radiant-island-89459.herokuapp.com/