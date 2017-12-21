'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const firebase = require("firebase");
const helmet = require('helmet');
const token = process.env.FACEBOOK_TOKEN; // 環境変数からアクセストークンを代入
const session = require('express-session'); // Sessionモジュール
const passport = require('passport'); // passportモジュール
const ig = require('instagram-node').instagram();


// instagram
ig.use({
    client_id: 'bd09e6fcee0441479524be642f909d9b',
    client_secret: 'e3cdb0e651fc48a3b46b7c9745eee966'
});

//the redirect uri we set when registering our application
var redirectUri = 'https://sipty-develop.herokuapp.com/handleAuth';

const FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID; // facebook-app ID
var FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET; // facebook-app SECRET
console.log(FACEBOOK_APP_ID)

passport.serializeUser(function (user, done) {
    done(null, user.id); // user.idでSessionに格納
  });
  
passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

// facebookログイン処理
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://sipty-develop.herokuapp.com/auth/facebook/callback",
    scope: ['id', 'email', 'user_friends', 'user_birthday', 'user_location']
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        //   console.log("テスト3" + profile);
          return done(null, profile);
      });
  }
));

app.use(session({ secret: '101f272efbc55b83', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// 全体の設定
app.set('port', (process.env.PORT || 5000));
app.set('views', './views'); // テンプレートエンジンをEJSに設定
app.set('view engine', 'ejs'); // テンプレートエンジンをEJSに設定
app.use(helmet()); // X-Powered-By ヘッダの除去

app.use(express.static(__dirname)); // 静的ファイルを公開

// ルーティング設定
app.use('/', require('./routes/index.js')); // ルーティング設定 → homeページ
app.get('/login', require('./routes/login.js')); // ルーティング設定 → loginページ
app.get('/privacy', require('./routes/privacy.js')); // ルーティング設定 → privacyページ

// facebook ログイン処理
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
  function (req, res) {
});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
    console.log("facebookログイン終了");
});

// instagramログインの処理
app.get('/authorize', function(req, res){
    // set the scope of our application to be able to access likes and public content
    res.redirect(ig.get_authorization_url(redirectUri, { scope : ['public_content','likes']}) );
});

app.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    ig.authorize_user(req.query.code, redirectUri, function(err, result){
        if(err) res.send( err );
    // store this access_token in a global variable called accessToken
        accessToken = result.access_token;
    // After getting the access_token redirect to the '/' route 
        res.redirect('/', require('./routes/index.js'));
    });
})



// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('テスト')
});

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
        if (event.message && event.message.text && !event.message.quick_reply) { // ここにクイックメッセージが吸い込まれているから絵error
            let text = event.message.text
            if (text === 'Generic'){
                console.log("welcome to chatbot");
                sendGenericMessage(sender);
                // continue
            } else if(text === "スタート") {
              firstLoginMessage(sender);
            //   continue
            } else {
                anymessage(sender);
            }
            continue
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)
            console.log(event);

            if(event.postback.payload === "GET_STARTED_PAYLOAD") {
              firstLoginMessage(sender); // この関数のあとでpromiseを実行
              console.log("psotbackまで到達");
            } else if (event.postback.payload === "help") {
              startSipty(sender);
            } else if (event.postback.payload === "usesipty") {
              firstQuick(sender);

            } else if(event.postback.payload === "more") {
                recommendfirstuser(sender);
            }
            continue
        }
        if(event.message.quick_reply.payload) {
          console.log(event.message);

          if(event.message.quick_reply.payload === "fbutton") {
            findTextMessage(sender);
            recommendfirstuser(sender);
       
          } else if(event.message.quick_reply.payload === "sbutton") {
            findTextMessage(sender);
            recommendfirstuser(sender);
         
          } else if(event.message.quick_reply.payload === "tbutton") {
            findTextMessage(sender);
            recommendfirstuser(sender);
       
          }
          continue
        }
    }
    res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
// APIkeyを環境変数に格納する


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

function anymessage(sender) { 
  let messageData = {
    // startで表示されるメッセージ
    text: "「スタート」を入力すると、TOPに戻れます。"
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
                "title":"ログイン"
              },{
                "type":"postback",
                "title":"使い方",
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

// ユーザーレコメンドカルーセルボタン
function recommendfirstuser(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "諏訪　優太",
                    "image_url":"http://kktrain.sakura.ne.jp/teaser/img/yuta.png",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://www.facebook.com/yuta.suwa.18",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall",
                    },
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/yuta.suwa.18",
                        "title": "プロフィール"
                    }, {
                        "type": "postback",
                        "title": "もっと探す",
                        "payload": "more",
                    }],
                }, {
                    "title": "木村　喜生",
                    "image_url":"http://kktrain.sakura.ne.jp/teaser/img/kimura.png",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://www.facebook.com/yoshio.kimura.14",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall",
                    },
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/yoshio.kimura.14",
                        "title": "プロフィール"
                    }, {
                        "type": "postback",
                        "title": "もっと探す",
                        "payload": "more",
                    }],
                },{
                    "title": "菅原　遼介",
                    "image_url":"http://kktrain.sakura.ne.jp/teaser/img/nobisuke.png",
                    "default_action": {
                      "type": "web_url",
                      "url": "https://www.facebook.com/sugawara.ryousuke",
                      "messenger_extensions": false,
                      "webview_height_ratio": "tall",
                    },
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.facebook.com/sugawara.ryousuke",
                        "title": "プロフィール"
                    }, {
                        "type": "postback",
                        "title": "もっと探す",
                        "payload": "more",
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


























// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
