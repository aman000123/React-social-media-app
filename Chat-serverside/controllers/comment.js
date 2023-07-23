const { db } = require('../connection');
const jwt = require('jsonwebtoken');
const moment = require('moment')


const getComments = (req, res) => {

    const q = `SELECT c.*, u.id AS userid, name, profilepic FROM comments AS c JOIN users AS u ON(u.id= c.userid) WHERE c.postid=? ORDER BY c.createdAt DESC `;
    // console.log("q is==", q)

    //we use cookie inside token and user id

    db.query(q, [req.query.postid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data)
    })





}




const addComments = ((req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    //if token is not valid then
    //secret key should be math from login
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO comments(`desc`,`createdat`,`userid`,`postid`) VALUES (?)"

        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postid


        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("comments has been created")
        })

        console.log("userInfo.id", userInfo.id)

    })


})













module.exports = {
    getComments,
    addComments
}