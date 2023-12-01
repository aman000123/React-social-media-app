
const { db } = require('../connection');
const jwt = require('jsonwebtoken');
const moment = require('moment')

const getPosts = (req, res) => {
    const userid = req.query.userid;
    //only user belong post show in profile pages

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    //if token is not valid then
    //secret key should be math from login
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");
        console.log(userid ? "user id exist" : "not user id fined")
        console.log('userid', userid)


        //user josko folllow kiya hai usi ka post time line pr dikhe

        //profile pr uski hi dikhe post bs
        const q = userid !== "undefined"
            ? `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON(u.id = p.userid) WHERE p.userid =?  ORDER BY p.createdAt DESC`
            : `SELECT p.*, u.id AS userid, name, profilepic FROM posts AS p JOIN users AS u ON(u.id= p.userid)
            LEFT  JOIN relationship AS r ON (p.userid = r.foolloweduserid) WHERE  r.followeruserid=? OR p.userid=?
             ORDER BY p.createdAt DESC `

        //we use cookie inside token and user id
        const values = userid !== "undefined" ? [userid] : [userInfo.id, userInfo.id];
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data)
        })
    })
}




const addPost = ((req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    //if token is not valid then
    //secret key should be math from login
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO posts(`postdesc`,`img`,`userid`,`createdat`) VALUES (?)"

        const values = [
            req.body.desc,
            req.body.img,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created")
        })

        console.log("userInfo.id", userInfo.id)

    })


})







const deletePost = ((req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    //if token is not valid then
    //secret key should be math from login
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "DELETE FROM posts WHERE `id`=? AND `userid`=?"
        //only we can delete only our post

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            //we update our user
            if (data.affectedRows > 0) return res.status(200).json("Post has been deleted")
            //if not update then its not our post
            return res.status(403).json("You can delete only your post")
        })

        console.log("userInfo.id", userInfo.id)

    })


})



module.exports = {
    getPosts,
    addPost,
    deletePost
}