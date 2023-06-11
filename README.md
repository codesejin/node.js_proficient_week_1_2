# node.js_proficient_week_1_2
node.js 숙련주차 - cookie, session

## 1. cookie : backend api 코드 : 서버 -> 클라이언트
```
// 서버 -> 클라이언트 쿠키 할당
app.get("/set-cookie", (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    res.cookie('name', 'sparta', {
    expires: expires
});
 return res.status(200).end();
});
```

### 개발자도구 확인 : name = spart라고 response 할당
![image](https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/d5057ec4-72c0-469e-b4a7-592374787d6d)
### 개발자도구 확인 : 5002포트에서 쿠키를 할당 받았음을 인지
![image](https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/c9dfd07b-b6e4-4515-86e0-4ad56a6b728e)


## 2. cookie : backend api 코드 : 클라이언트 -> 서버 
(쿠키에 있는 데이터가 서버에 정상적으로 전달되는지 확인)

**클라이언트**는 **서버**에 **요청(Request)** 를 보낼 때 **자신이 보유하고 있는 쿠키**를 **자동으로 서버**에 전달하게 된다.

여기서 **클라이언트**가 전달하는 쿠키 정보는 **Request header**에 포함되어 서버에 전달되게 된다.

그렇다면 **서버**에서 어떤 방식으로 쿠키를 사용할 수 있을까?

일반적으로 쿠키는 `req.headers.cookie`에 들어있다. `req.headers`는 클라이언트가 요청한 **Request**의 헤더를 의미한다

```
// 클라이언트 -> 서버 쿠키 정보 전달
app.get("/get-cookie", (req, res) => {
    const cookie = req.headers.cookie;
    console.log(cookie); // name=sparta
    return res.status(200).json({ cookie });
});
```

### 프론트 response 확인
![image](https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/8abc9262-002a-446f-b8f8-fcba16836a8a)


## 3. cookie-parse 미들웨어 적용
**cookie-parser 미들웨어**는 요청에 추가된 쿠키를 req.cookies 객체로 만들어 준다.

더이상 `req.headers.cookie`와 같이 번거롭게 사용하지 않아도 된다
```npm install cookie-parser ```


```
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 클라이언트 -> 서버 쿠키 정보 전달
app.get("/get-cookie", (req, res) => {
    // const cookie = req.headers.cookie;
    const cookies = req.cookies; // cookieparser 미들웨어를 적용했기 때문에 사용할 수 있다.
    console.log(cookies); // name=sparta
    return res.status(200).json({ cookies });
});
```

### Thunder client 확인 1
<img width="1392" alt="image" src="https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/7225421c-48f5-4ccb-b4cd-66f17c1a43fe">

### Thunder clinet 확인 2
미들웨어를 사용하지 않았을때는 문자열로 출력이 되는데, 미들웨어 사용하면 객체 형태로 출력된다
<img width="1387" alt="image" src="https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/af5885bd-b12e-4e17-a7a8-29e61540d944">


## 4. session : backend api 코드 1

세션을 저장할때, 해당하는 사용자의 정보가 sparta라는 문자열이 세션에 저장되도록 만듬
```
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
```

### Thunder client 확인 
이름은 sessionKey, value는 데이터를 저장했던 그 시점에 정보가 생성

이 api 다음에는 저장된 열쇠(value)를 바탕으로 서버에 데이터를 조회해야한다

<img width="1397" alt="image" src="https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/48818995-a069-4660-a1c0-90d13f6df2be">

## 5. session : backend api 코드 2

```
app.get("/get-session", (req, res) => {
    // 사용자의 쿠키안에 있는 sessionKey라는 쿠키를 가져와야 한다.
    const {sessionKey} = req.cookies;
    // sessionKey라는 쿠키를 바탕으로 session[]이라는 자물쇠를 열고, 결과값을 sessionItem라는 변수에 할당한다
    const sessionItem = session[sessionKey]

    console.log(sessionItem);
    return res.status(200).json({sessionItem: sessionItem});
});

app.listen(5002, () => {
    console.log(5002, "포트로 서버가 실행되었습니다.")
})
```

### Thunder client 확인 
<img width="1384" alt="image" src="https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/0e668378-8415-48c6-a90c-66c5d2e29df4">

---

> **복습하기**
> 
> 쿠키에 저장되어있는 브라우저의 열쇠를 바탕으로 세션을 조회해보니까 
> 정상적으로 처음 저장되어있던 sparta라는 문자열이 출력됨
> 
>![image](https://github.com/codesejin/node.js_proficient_week_1_2/assets/101460733/dd2c576f-9eab-426f-afc0-f20f97c8a087)


