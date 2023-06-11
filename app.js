const express = require("express");
const app = express();

app.get("/set-cookie", (req, res) => {
    let expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    res.cookie('name', 'sparta', {
    expires: expires
});
 return res.status(200).end();
});



app.listen(5002, () => {
    console.log(5002, "포트로 서버가 실행되었습니다.")
})