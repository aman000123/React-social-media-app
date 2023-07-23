

const { db } = require('../connection');
const jwt = require('jsonwebtoken');



const getLikes = (req, res) => {


    const q = "SELECT userid FROM  likes  WHERE postid = ?"

    db.query(q, [req.query.postid], (err, data) => {
        if (err) return res.status(500).json(err);

        // console.log('like.userid', data)
        // console.log("data=", data.length)
        return res.status(200).json(data.map(like => like.userid))
        //like ki kewal id leni h so map
    })

}



const addLikes = ((req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO likes(`userid`,`postid`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.postid
        ]
        console.log('values', values)
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked")
        })
    })
})






const deleteLikes = ((req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q = "DELETE FROM likes  WHERE `userid`= ? AND `postid`= ? "

        db.query(q, [userInfo.id, req.query.postid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has beeen disliked")
        })



    })


})









module.exports = {
    getLikes,
    addLikes,
    deleteLikes
}