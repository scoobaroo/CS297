console.log("inside index.js");
var request = require('request');
var rp = require('request-promise');
var prettyjson = require('prettyjson');
var fs = require('fs');
var url = "https://api.bitfinex.com/v1";

var symbols =
["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","rrtusd","rrtbtc","zecusd","zecbtc","xmrusd",
"xmrbtc","dshusd","dshbtc","btceur","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth",
"sanusd","sanbtc","saneth","omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth",
"etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth",
"btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd",
"gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth",
"funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh",
"trxusd","trxbtc","trxeth","rcnusd","rcnbtc","rcneth","rlcusd","rlcbtc","rlceth","aidusd","aidbtc","aideth",
"sngusd","sngbtc","sngeth","repusd","repbtc","repeth","elfusd","elfbtc","elfeth"]

function getSymbols(){
    request.get(url+"/symbols",
        function(error,response,body){
            if(response.statusCode == 200){
                console.log(body);
                symbols = body;
            }
        }
    )
}



function getTickers(){
    var tickers = [];
    symbols.forEach(function(s){
        request.get(url+"/pubticker/"+s,
        function(error,response,body){
            if(response.statusCode == 200){
                console.log("cryptocurrency pair: " +s);
                jsonObject = {}
                console.log(prettyjson.render(JSON.parse(body)))
                jsonObject[s] = body;
                tickers.push(jsonObject);
            }
        })
    })
    return tickers;
}

function getAllTickers(){
    tickers = getTickers();
    setTimeout(function(){
        jsonObject = {};
        var time = (new Date()).getTime();
        jsonObject[time] = tickers;
        console.log(jsonObject);
        var jsonToWrite = JSON.stringify(jsonObject);
        fs.appendFile('data.json', jsonToWrite, (err) => {  
            if (err) throw err;
            console.log('tickers at ' +time+ ' saved!');
        });
        fs.appendFile('data.json',',',(err) =>{
            if (err) throw err;
        });
    },15000);
}

getAllTickers();
// getSymbols();
setInterval(getAllTickers,120000);
// while(true){
//     setTimeout(getAllTickers,60000)
// }