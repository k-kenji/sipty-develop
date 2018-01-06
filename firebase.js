var firebase = require("firebase"); // firebaseモジュール読み込み
// firebaseAPIkeyを変数に格納
const FIREBASE_API_KEY = process.env.FIREBASE_API;

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "sipty-f9d06.firebaseapp.com",
    databaseURL: "https://sipty-f9d06.firebaseio.com",
    storageBucket: "gs://sipty-f9d06.appspot.com",
  };
firebase.initializeApp(config);

// firebaseデータベースに接続 ここまででDB使う準備完了
// Get a reference to the database service
var database = firebase.database();

// firebaseユーザーid作成の作成の一例
// users配下に1というユーザーを作成して1に紐づくデータはsetValueで挿入
// self.ref.child("users").child(1).setValue(["username": "wakaka", "email" : "abx@xyz.com"])

// モジュール化
exports.database = database;
