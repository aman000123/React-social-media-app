

const { db } = require('../connection');
const jwt = require('jsonwebtoken');



const getRelationShip = (req, res) => {

    const q = "SELECT followeruserid FROM relationship WHERE foolloweduserid = ?";

    db.query(q, [req.query.foolloweduserid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship => relationship.followeruserid));
    });

}



const addNewRelationShip = (req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        //if token is not valid then
        if (err) return res.status(403).json("Token is not valid");


        const q = "INSERT INTO relationship (`followeruserid`,`foolloweduserid`) VALUES (?)";

        const values = [
            //we are follwer so
            userInfo.id,
            req.body.userid
        ];
        console.log('values====', values)
        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following")
        })
    })
}






const deleteRelationShip = (req, res) => {

    const token = req.cookies.accesstoken;
    if (!token) return res.status(401).json("Not Logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "DELETE FROM relationship  WHERE `followeruserid`= ? AND `foolloweduserid`= ? "
        //followeruserid== user
        db.query(q, [userInfo.id, req.query.userid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollow")
        })



    })


}



module.exports = {

    getRelationShip,
    addNewRelationShip,
    deleteRelationShip




}