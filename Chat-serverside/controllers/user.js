
const { db } = require('../connection');
const jwt = require('jsonwebtoken');


const getUser = (req, res) => {

    const userid = req.params.userid;
    const q = "SELECT * FROM users WHERE id =?";

    db.query(q, [userid], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0];
        return res.json(info)
    })


}


const updateUser = (req, res) => {


    //token need for update
    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "UPDATE users SET `name`=?,`coverpic`=?,`profilepic`=?,`city`=?,`website`=? WHERE id=?";
        db.query(q,
            [
                req.body.name,
                req.body.coverpic,
                req.body.profilepic,
                req.body.city,
                req.body.website,
                userInfo.id
            ], (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated")
                return res.status(403).json("you can update only your profile")
            })
    })




}

module.exports = {
    getUser,
    updateUser
}