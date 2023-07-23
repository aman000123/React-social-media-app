
const { db } = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res) => {

    //user exist then throw error

    const q = "SELECT * FROM users WHERE username = ?"  // ?  provide us security

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)   //res.send == = res.json
        //user exist then throw error
        if (data.length) return res.status(409).json("User already esixt")



        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(req.body.password, salt)


        const q = "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)"

        const values = [req.body.username, req.body.email, hashPassword, req.body.name]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            //  console.log(data)

            return res.status(200).json("User has been created")

        })


    })





}




const login = (req, res) => {

    //check if user exist

    const q = "SELECT * FROM users WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err)
        //if user exist then checked 
        if (data.length === 0) return res.status(404).json("User not exist")

        //if user exist then checked password 
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if (!checkPassword) return res.status(400).json("Wrong password or user name");

        //generate token if password is corrects
        const token = jwt.sign({ id: data[0].id }, "secretkey");
        console.log("token is", token)

        const { password, ...others } = data[0];
        console.log(data[0])

        res.cookie("accesstoken", token, {
            httpOnly: true
        }).status(200).json(others)


    })


}







const logout = (req, res) => {

    res.clearCookie("accesstoken", {
        secure: true,
        //frontend backend port name deffrents
        //  sameSite: "none"
    }).status(200).json("User hasbeen logged out")

}

module.exports = {
    login,
    logout,
    register
}