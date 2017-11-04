<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>ティザーページテスト</title>
    <!-- bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    <!-- main CSS -->
    <link rel="stylesheet" href="./css/main.css" type="text/css">
    <!-- reset css -->
    <link rel="stylesheet" href="./css/reset.css" type="text/css">
    <!-- font-family -->
    <!-- <link rel="stylesheet" href="font/donau"> -->
  </head>
  <body>
    <header class="header">
      <div id="mobile-head">
        <a class="menu-trigger" href="#">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>
      <nav id="TopMenuList" class="global-nav">
        <ul>
          <li>
            <a href="#">TOP</a>
          </li>
          <li>
            <a href="#">VIDEO</a>
          </li>
          <li>
            <a href="https://sipty-develop.herokuapp.com/privacy">PRIVACY</a>
          </li>
          <li>
            <a href="#">CONTACT US</a>
          </li>
        </ul>
      </nav> <!-- TopMenuList -->
</header>
<div id="container" class="container">
  <div id="left-container" class="left-container">
    <h1 id="logo" class="logo">sipty</h1>
    <div id="description">
      siptyはあなたの代わりにFacebookの友達を自動で誘ってくれます。すでにつながっている友達だからこそ、誘う必要もないし、チャットをする必要もない。あなたがやることは、予定をチェックするだけ。
    </div>
    <div class="fb-messengermessageus"
        messenger_app_id="498841083787161"
        page_id="1063773873726112"
        color="white"
        size="xlarge">
    </div>
  </div> <!-- left-container -->
  <div id="right-container" class="right-container">
    <div id="device" class="device">
      <img src="./img/sipty_iphone7jetblack_portrait.png" alt="" class="first-device">
    </div>
  </div> <!-- right-container -->
</div> <!-- container -->




   <!-- third-partyのライブラリ読み込み -->
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
   <script type="text/javascript" src="./js/main.js"></script>
  </body>
</html>



function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      User.upsert({
        userId: profile.id,
        username: profile.username
      }).then(() => {
        done(null, profile);
      });
    });
  }




  var express = require('express');
var router = express.Router();

router.get('/login', function(request, response) {
  response.render('login');

  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      console.log("すでにログイン済");
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '498841083787161',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.10' // use graph api version 2.8
  });
  FB.AppEvents.logPageView();

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };



  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

  // facebookログイン時に実行する処理
  // 登録
  // DBにユーザー情報をset（名前、メールアドレス、誕生日、性別、地域、ID）


})

module.exports = router;










----------------------------------------------a


<script>

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

  // firebaseリアルタイムDBを接続
  // var database = firebase.database();
  // var ref = new Firebase('https://sipty-f9d06.firebaseio.com/');


  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      // set_DB_user_info();
      console.log("すでにログイン済");
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '498841083787161',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.10' // use graph api version 2.8
  });
  FB.AppEvents.logPageView();

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };


    // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.10&appId=498841083787161";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me',{ locale: 'ja_JP', fields: 'name, email, id, picture' }, function(response) {
      console.log('Successful login for: ' + response.name);
      var userid = response.id;
      console.log("ユーザーID： " + userid); // 成功
      if(userid) {
        console.log("firebaseDB書き込み処理に到達");
        // FBユーザー情報をDBに格納
        writeUserData(response.id, response.name, response.email, response.picture.data.url, response.id)
      }
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        console.log(response);
    });
  }

  /* make the API call */
function set_DB_user_info() {
  console.log("SPIDの確認");
}

// firebaserDBへ書き込み
function writeUserData(userId, name, email, imageUrl, spid) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl,
    spid: spid,
  });
}

</script>

<!--
  Below we include the Login Button social plugin. This button uses
  the JavaScript SDK to present a graphical Login button that triggers
  the FB.login() function when clicked.
-->

<fb:login-button scope="public_profile,email,user_friends" onlogin="checkLoginState();">
</fb:login-button>

<div id="status">
</div>

<div id="fb-root"></div>

<div class="fb-login-button" onlogin="checkLoginState();" scope="public_profile,email,user_friends" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false">
</div>

