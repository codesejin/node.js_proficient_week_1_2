# node.js_proficient_week_1_2
node.js 숙련주차 - cookie, session

## 1. backend api 코드 : 서버 -> 클라이언트
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


## 2. backend api 코드 : 클라이언트 -> 서버 
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


