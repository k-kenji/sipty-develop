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


curl -X GET "https://graph.facebook.com/v2.6/1320267861435475?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAAHFsX2ZAN5kBALyBQjDuW7WEYaZBYnr9ImZCn8m6Gf9hCPqMoTENQ6ZA3ujiLeX6gzu7sAGKXdcKhzqYZCUwX4QKVpyRBZA32KYxWnChWhAB0t0oAbicA0gjV0bG9UDZAWS30hPuPc86cZCWdjl5G89lWsrtktXXkUctUV6cT8lVhOvLHWxlNxC"

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