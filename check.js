1320267861435475

curl -X GET "https://graph.facebook.com/v2.6/1320267861435475?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAABieixdZB14BAA0QWyTSntQQb9NUPUZBgOSqZAA73FdMVrldV3zCnUmKZAVVZBfdfJLfP1ZBp3zJISrHXnboCifrB864tQ4ZCNmapVU6dioFUawtp0RjmbbgbY56DBdGgSmOb5Bx73nUTvPCEGmt7Fu2HG8unOsVNtNfrbtKbsuRmS6yCPAbeD"


curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"GET_STARTED_PAYLOAD"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAABieixdZB14BAA0QWyTSntQQb9NUPUZBgOSqZAA73FdMVrldV3zCnUmKZAVVZBfdfJLfP1ZBp3zJISrHXnboCifrB864tQ4ZCNmapVU6dioFUawtp0RjmbbgbY56DBdGgSmOb5Bx73nUTvPCEGmt7Fu2HG8unOsVNtNfrbtKbsuRmS6yCPAbeD"


curl -X DELETE -H "Content-Type: application/json" -d '{
  "fields":[
    "get_started"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAABieixdZB14BAA0QWyTSntQQb9NUPUZBgOSqZAA73FdMVrldV3zCnUmKZAVVZBfdfJLfP1ZBp3zJISrHXnboCifrB864tQ4ZCNmapVU6dioFUawtp0RjmbbgbY56DBdGgSmOb5Bx73nUTvPCEGmt7Fu2HG8unOsVNtNfrbtKbsuRmS6yCPAbeD"


curl -X GET "https://graph.facebook.com/v2.6/me/messenger_profile?fields=get_started&access_token=EAAHFsX2ZAN5kBALyBQjDuW7WEYaZBYnr9ImZCn8m6Gf9hCPqMoTENQ6ZA3ujiLeX6gzu7sAGKXdcKhzqYZCUwX4QKVpyRBZA32KYxWnChWhAB0t0oAbicA0gjV0bG9UDZAWS30hPuPc86cZCWdjl5G89lWsrtktXXkUctUV6cT8lVhOvLHWxlNxC"


curl -X GET "https://graph.facebook.com/v2.6/1320267861435475?fields=email,first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAHFsX2ZAN5kBALyBQjDuW7WEYaZBYnr9ImZCn8m6Gf9hCPqMoTENQ6ZA3ujiLeX6gzu7sAGKXdcKhzqYZCUwX4QKVpyRBZA32KYxWnChWhAB0t0oAbicA0gjV0bG9UDZAWS30hPuPc86cZCWdjl5G89lWsrtktXXkUctUV6cT8lVhOvLHWxlNxC"

/{user-id}/permissions/{permission-name}

curl -X GET "https://graph.facebook.com/v2.6/2052306201665083?fields=email,first_name,last_name,locale,timezone,gender&access_token=EAAHFsX2ZAN5kBALyBQjDuW7WEYaZBYnr9ImZCn8m6Gf9hCPqMoTENQ6ZA3ujiLeX6gzu7sAGKXdcKhzqYZCUwX4QKVpyRBZA32KYxWnChWhAB0t0oAbicA0gjV0bG9UDZAWS30hPuPc86cZCWdjl5G89lWsrtktXXkUctUV6cT8lVhOvLHWxlNxC"
// あいさつボタン
curl -X POST -H "Content-Type: application/json" -d '{
  "greeting":[
    {
      "text":"Hello, {{user_full_name}}!"
    }, {
      "text":"こ以降にpromiseで関数を追加するよ"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAHFsX2ZAN5kBADYhfaxYiGQA2nSzJviZBOXfRlCgI3SsmU8N36ZALJ4hZA78jioYjJvtq0C8QGHNyrPcpnsEl8grrCEseZCQQsOFuPbLmhzG7NyZCQTRsaLGQHTNN1PMGHWLalzJpNMxDlpufL57tZAJ0b3n81xS2yMwoFt0bX3MOuJY4IEkPZA"



curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Timeless apparel for the masses."
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"


curl -X POST -H "Content-Type: application/json" -d '{
  "whitelisted_domains":[
    "https://sipty-develop.herokuapp.com/"
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAHFsX2ZAN5kBADYhfaxYiGQA2nSzJviZBOXfRlCgI3SsmU8N36ZALJ4hZA78jioYjJvtq0C8QGHNyrPcpnsEl8grrCEseZCQQsOFuPbLmhzG7NyZCQTRsaLGQHTNN1PMGHWLalzJpNMxDlpufL57tZAJ0b3n81xS2yMwoFt0bX3MOuJY4IEkPZA"


curl -X GET "https://graph.facebook.com/v2.6/1320267861435475?fields=id,first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAHFsX2ZAN5kBADYhfaxYiGQA2nSzJviZBOXfRlCgI3SsmU8N36ZALJ4hZA78jioYjJvtq0C8QGHNyrPcpnsEl8grrCEseZCQQsOFuPbLmhzG7NyZCQTRsaLGQHTNN1PMGHWLalzJpNMxDlpufL57tZAJ0b3n81xS2yMwoFt0bX3MOuJY4IEkPZA"


curl -X POST -H "Content-Type: application/json" -d '{
  "recipient": {
    "id": "USER_ID"
  },
  "message": {
    "text": "hello, world!"
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=PAGE_ACCESS_TOKEN"


siptyはあなたの代わりにFacebookの友達を自動で誘ってくれます。すでにつながっている友達だからこそ、誘う必要もないし、チャットをする必要もない。あなたがやることは、予定をチェックするだけ。
// GIF welcomeメッセージ
https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif

curl -X POST -H "Content-Type: application/json" -d '{
  "recipient":{
    "id":"USER_ID"
  },
  "message":{
    "attachment":{
      "type":"image",
      "payload":{
        "url":"https://petersapparel.com/img/shirt.png"
      }
    }
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=PAGE_ACCESS_TOKEN"


function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}

var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain中にエラーが発生した場合に呼ばれる
        console.error(error);
    });




    function taskA() {
        console.log("Task A");
    }
    function taskB() {
        console.log("Task B");
    }
    function onRejected(error) {
        console.log("Catch Error: A or B", error);
    }
    function finalTask() {
        console.log("Final Task");
    }

    var promise = Promise.resolve();
    promise
        .then(taskA)
        .then(taskB)
        .catch(onRejected)
        .then(finalTask);








        "quick_replies":[
             {
               "content_type":"text",
               "title":"Red",
               "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
             }
           ]

           "quick_replies":[
                {
                  "content_type":"location"
                }
              ]

              {
                "object": "page",
                "entry": [
                  {
                    "id": "682498171943165",
                    "time": 1502905976963,
                    "messaging": [
                      {
                        "sender": {
                          "id": "1254459154682919"
                        },
                        "recipient": {
                          "id": "682498171943165"
                        },
                        "timestamp": 1502905976377,
                        "message": {
                          "quick_reply": {
                            "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
                          },
                          "mid": "mid.$cAAJsujCd2ORkHXKOOVd7C1F97Zto",
                          "seq": 9767,
                          "text": "Green"
                        }
                      }
                    ]
                  }
                ]
              }



  function  welcomeGif(sender) {
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
  setTimeout(sendWelcomeMessage(sender) => {
    // Bの処理
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
  }, 3000)
}
