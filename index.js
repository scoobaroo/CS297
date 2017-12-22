console.log("inside index.js");
var request = require('request');
var rp = require('request-promise');
var prettyjson = require('prettyjson');
var fs = require('fs');
var url = "https://api.bitfinex.com/v1";

var symbols = 
[   
    'btcusd','ltcusd','ltcbtc','ethusd','ethbtc','etcbtc','etcusd','rrtusd','rrtbtc','zecusd','zecbtc','xmrusd','xmrbtc',
    'dshusd','dshbtc','bccbtc','bcubtc','bccusd','bcuusd','btceur','xrpusd','xrpbtc','iotusd','iotbtc','ioteth','eosusd',
    'eosbtc','eoseth','sanusd','sanbtc','saneth','omgusd','omgbtc','omgeth','bchusd','bchbtc','bcheth','neousd','neobtc',
    'neoeth','etpusd','etpbtc','etpeth','qtmusd','qtmbtc','qtmeth','bt1usd','bt2usd','bt1btc','bt2btc','avtusd','avtbtc',
    'avteth','edousd','edobtc','edoeth','btgusd','btgbtc','datusd','datbtc','dateth','qshusd','qshbtc','qsheth','yywusd',
    'yywbtc','yyweth' 
]

function getTickers(){
    var tickers = [];
    symbols.forEach(function(s){
        request.get(url+"/pubticker/"+s,
        function(error,response,body){
            console.log("cryptocurrency pair: " +s);
            jsonObject = {}
            console.log(prettyjson.render(JSON.parse(body)))
            jsonObject[s] = body;
            tickers.push(jsonObject);
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
        fs.appendFile('data.json',',\n',(err) =>{
            if (err) throw err;
        });
    }, 15000);
}

getAllTickers();

// while(true){
//     setTimeout(getAllTickers,60000)
// }