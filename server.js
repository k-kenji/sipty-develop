'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const firebase = require("firebase");

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyDKV-VX16SgvqVVfn-UBXb5YOhaCc1JnU0",
   authDomain: "sipty-f9d06.firebaseapp.com",
   databaseURL: "https://sipty-f9d06.firebaseio.com",
   projectId: "sipty-f9d06",
   storageBucket: "",
   messagingSenderId: "376113749242"
 };
 firebase.initializeApp(config);

 // Get a reference to the database service
  var database = firebase.database();

app.set('port', (process.env.PORT || 5000))
app.set('views', './views'); // テンプレートエンジンをEJSに設定
app.set('view engine', 'ejs'); // テンプレートエンジンをEJSに設定

app.use(express.static(__dirname)); // 静的ファイルを公開

app.use('/', require('./routes/index.js')); // ルーティング設定 → homeページ
app.get('/login', require('./routes/login.js')); // ルーティング設定 → loginページ
app.get('/privacy', require('./routes/privacy.js')); // ルーティング設定 → privacyページ

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
        // } else if(event.message && event.message.quick_reply) {
        //   findTextMessage(sender);
        //   continue
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)
            console.log(event);
            // sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token);
            if(event.postback.payload === "GET_STARTED_PAYLOAD") {
              firstLoginMessage(sender); // この関数のあとでpromiseを実行
              console.log("psotbackまで到達");
              continue
            } else if (event.postback.payload === "help") {
              startSipty(sender);
              continue
            } else if (event.postback.payload === "usesipty") {
              firstQuick(sender);
              continue
            }
            continue
        }
        if(event.message) {
          console.log(event.message);
          // let text = JSON.stringify(event.message.quick_reply)
          if(event.message.quick_reply.payload === "fbutton") {
            findTextMessage(sender);
            continue
          } else if(event.message.quick_reply.payload === "sbutton") {
            findTextMessage(sender);
            continue
          } else if(event.message.quick_reply.payload === "tbutton") {
            findTextMessage(sender);
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

function howToUse(sender) { // siptyの説明
  let messageData = {
    // startchatで表示されるメッセージ
    text: "siptyはあなたがFacebookの友人に再会するのを手伝ってくれます。最近コンタクトできていない友人を探して教えてくれます！気になった人がいたらメッセージしてみよう！"
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

function welcomeGif(sender) { // welcomeGifの送信
  let messageData = {
    "attachment" : {
      "type": "image",
      "payload": {
        "url": "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
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

// SPidをDBに保存する
//
function firstLoginMessage(sender) {
  let messageData = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
           {
            "title":"Welcome to sipty",
            "image_url":"http://kktrain.sakura.ne.jp/teaser/img/screenshot.png",
            "subtitle":"Facebookでログイン、もしくは使い方を見てみましょう！",
            "default_action": {
              "type": "web_url",
              "url": "https://sipty-develop.herokuapp.com/login",
              "messenger_extensions": false,
              "webview_height_ratio": "tall",
            },
            "buttons":[
              {
                "type":"web_url",
                "url":"https://sipty-develop.herokuapp.com/login",
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

// startのGIF画像
function sendGif(sender) {
  let messageData = {
    "attachment" : {
      "type": "image",
      "payload": {
        "url": "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
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

// あとのクイックメッセージ
function firstQuick(sender) {
  let messageData = {
    // クイックメッセージはtextと一緒でないと動作でないとしない
    text: "ボタンをタップしてね",
    "quick_replies":[
        {
          "content_type":"text",
          "title":"3ヶ月以内にチャットしたに友人を探す",
          "payload":"fbutton"
        },
        {
          "content_type":"text",
          "title":"3~6ヶ月前にチャットした友人を探す",
          "payload":"sbutton"
        },
        {
          "content_type":"text",
          "title":"一度もチャットしたことのない人を探す",
          "payload":"tbutton",
        }
    ]
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

// startchatの返信用のメッセージ
function sendWelcomeMessage(sender) {
  let messageData = {
    text: "siptyはあなたの代わりにFacebookの友達を自動で誘ってくれます。すでにつながっている友達だからこそ、誘う必要もないし、チャットをする必要もない。あなたがやることは、予定をチェックするだけ。"
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

function onRejected(error) {
    console.log("Catch Error: A or B", error);
}
function finalTask() {
    console.log("Final Task");
}

function setTimeoutAsync(delay) {
    // Promiseクラスのインスタンスを関数の戻り値にする
    // Promiseクラスのコンストラクタの引数には関数を渡す
    // その関数は、resolve関数とreject関数を引数に取り、戻り値は無し
    return new Promise(function(resolve, reject) {
        // 非同期処理の完了コールバックとしてresolve関数を渡す
        setTimeout(resolve, delay);

        // または、以下のように完了コールバック内でresolve関数を呼び出してもOK
        // setTimeout(function() {
        //     resolve();
        // }, 1000);
    });
}


// siptyを使ってみるボタン
function startSipty(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "siptyはFacebookの友人との再会を手伝ってくれます。",
                    "image_url": "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
                }, {
                    "title": "昔チャットしていた友人を探してくれます。",
                    "image_url": "https://media.giphy.com/media/l0MYII7ZjLVhZx4ze/giphy.gif",
                }, {
                    "title": "気になった人がいたらメッセージしてみたら？",
                    "image_url": "https://media.giphy.com/media/l0MYyeA8YySwK0G88/giphy.gif",
                }, {
                    "title": "さあ、友人に再会しよう！",
                    "image_url": "https://media.giphy.com/media/3oKGzCvdJbyWsc5Nni/giphy.gif",
                    "buttons": [{
                        "type": "postback",
                        "title": "使ってみる",
                        "payload": "usesipty"
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

function findTextMessage(sender) {
    let messageData = { text: "こんな人が見つかったよ！思い切ってチャットしてみよう！" }

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



























// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
