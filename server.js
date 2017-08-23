'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))
app.set('views', './views'); // テンプレートエンジンをEJSに設定
app.set('view engine', 'ejs'); // テンプレートエンジンをEJSに設定

app.use(express.static(__dirname + '/public')); // 静的ファイルを公開

app.use('/', require('./routes/index.js')); // ルーティング設定

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('テスト')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'MY_VERIFY_TOKEN') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        console.log("event: ", event); // eventにはwebhookで受け取ったJSONデータ
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if (text === 'Generic'){
                console.log("welcome to chatbot")
                sendGenericMessage(sender)
                continue
            }
            // console.log();
            sendTextMessage(sender, text.substring(0, 200))
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)
            // sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token);
            if(event.postback.payload === "GET_STARTED_PAYLOAD") {
              firstLoginMessage(sender); // この関数のあとでpromiseを実行
              console.log("psotbackまで到達");
              continue
            }
            continue
        }
    }
    res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
const token = "EAAHFsX2ZAN5kBADYhfaxYiGQA2nSzJviZBOXfRlCgI3SsmU8N36ZALJ4hZA78jioYjJvtq0C8QGHNyrPcpnsEl8grrCEseZCQQsOFuPbLmhzG7NyZCQTRsaLGQHTNN1PMGHWLalzJpNMxDlpufL57tZAJ0b3n81xS2yMwoFt0bX3MOuJY4IEkPZA"

function sendTextMessage(sender, text) {
    let messageData = { text:text }

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function firstLoginMessage(sender) {
  let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to sipty",
            "image_url":"http://www.sipty.jp/img/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202017-08-23%2016.34.48.png",
            "subtitle":"Facebookでログイン、もしくは使い方を見てみましょう！",
            "default_action": {
              "type": "web_url",
              "url": "http://www.sipty.jp/",
              "messenger_extensions": false,
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"http://www.sipty.jp/",
                "title":"View Website"
              },{
                "type":"postback",
                "title":"Start Chatting",
                "payload":"help"
              }
            ]
          }
        ]
      }
    }
  }
  request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
          recipient: {id:sender},
          message: messageData,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending messages: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}

function TohelpPage(postback) {

}
































// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
