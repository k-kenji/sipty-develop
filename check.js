1320267861435475

curl -X GET "https://graph.facebook.com/v2.6/1320267861435475?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=EAABieixdZB14BAA0QWyTSntQQb9NUPUZBgOSqZAA73FdMVrldV3zCnUmKZAVVZBfdfJLfP1ZBp3zJISrHXnboCifrB864tQ4ZCNmapVU6dioFUawtp0RjmbbgbY56DBdGgSmOb5Bx73nUTvPCEGmt7Fu2HG8unOsVNtNfrbtKbsuRmS6yCPAbeD"


curl -X POST -H "Content-Type: application/json" -d '{
  "get_started":{
    "payload":"GET_STARTED_PAYLOAD"
  }
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAABieixdZB14BAA0QWyTSntQQb9NUPUZBgOSqZAA73FdMVrldV3zCnUmKZAVVZBfdfJLfP1ZBp3zJISrHXnboCifrB864tQ4ZCNmapVU6dioFUawtp0RjmbbgbY56DBdGgSmOb5Bx73nUTvPCEGmt7Fu2HG8unOsVNtNfrbtKbsuRmS6yCPAbeD"
