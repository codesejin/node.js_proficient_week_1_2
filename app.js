const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

// 서버 -> 클라이언트 쿠키 할당
app.get("/set-cookie", (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    res.cookie('name', 'sparta', {
    expires: expires
});
 return res.status(200).end();
});

// 클라이언트 -> 서버 쿠키 정보 전달
app.get("/get-cookie", (req, res) => {
    // const cookie = req.headers.cookie;
    const cookies = req.cookies; // cookieparser 미들웨어를 적용했기 때문에 사용할 수 있다.
    console.log(cookies); // name=sparta
    return res.status(200).json({ cookies });
});

// 사용자의 정보를 저장할 만한 자물쇠(데이터를 저장하는 뿐)
let session = {}; // session 객체 생성 : Key - value()
app.get("/set-session", (req,res) => {
    const name = "sparta"; // 세선에 저장 데이터
    const uniqueInt = Date.now(); // 클라이언트에게 할당한 열쇠가 uniqueInt로 되어있음
    // 열쇠가 들어왔을때 서버에 저장된 데이터를 전달해줘야 하기 때문에 uniqueInt를 세션의 키로 사용
    session[uniqueInt] = name; // 세선에 데이터 저장

    res.cookie("sessionKey", uniqueInt);
    res.status(200).end();

});

app.get("/get-session", (req, res) => {
    // 사용자의 쿠키안에 있는 sessionKey라는 쿠키를 가져와야 한다.
    const {sessionKey} = req.cookies;
    // sessionKey라는 쿠키를 바탕으로 session[]이라는 자물쇠를 열고, 결과값을 sessionItem라는 변수에 할당한다
    const sessionItem = session[sessionKey]

    console.log(sessionItem);
    return res.status(200).json({sessionItem: sessionItem});
});

// 퀴즈 요구 사항 1 : GET Method로 http://localhost:5001/set을 호출했을 때, name이라는 이름을 가진 “nodejs” 문자열을 저장한 쿠키를 할당해주세요!

app.get("/set", (req,res) => {
    res.cookie('name', 'nodejs');
return res.status(200).end();
});

// 퀴즈 요구 사항 2 : GET Method로 http://localhost:5001/get을 호출했을 때, 클라이언트에게 전달받은 모든 쿠키 정보들이 반환되는 API를 만들어주세요!
app.get("/get", (req, res) => {
    const cookies = req.cookies; // cookieparser 미들웨어를 적용했기 때문에 사용할 수 있다.
    return res.status(200).json({ cookies });
});

app.listen(5001, () => {
    console.log(5001, "포트로 서버가 실행되었습니다.")
})