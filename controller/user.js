const connection = require("../db/db");
const bcrypt = require ('bcrypt')

module.exports = {
    register : (req, res) => {
        const {username, password} = req.body
        const hashedPassword = bcrypt.hashSync(password, 10)
    
        const query = 'INSERT INTO user (username, password) VALUES(?, ?)'
        connection.query(query, [username, hashedPassword], (err) => {
            if (err) {
                console.log("error : ", err)
                res.status(500).send({
                    message : err.message || "register gagal"
                })
            }
            else 
            res.send({username, hashedPassword})
        })
    }, 

    login : (req, res) => {
        const username = req.body.username;
        const password = req.body.password

        const qstring = `SELECT * FROM user WHERE username = '${username}'`
        console.log(qstring)
        connection.query(qstring, (err, data) =>{
            console.log(data)
            if (err) {
                console.log("error:" , err)
                res.status(500).send({
                    message : err.message || "terjadi error"
                })
            }
            else if (data.length > 0 &&
                bcrypt.compareSync(password, data[0].password))
            {
                req.session.isAuthenticated = true
                res.send({login:true, message:"Login Sukses"})
            }
            else{
                res.send("anda belum terdaftar")
            }
        })
    },

    logout :(req, res) => {
        req.session.destroy((err) => {
            if(err){
                console.log(err)
            } else {
                res.send('logout')
            }
        })
    },

    authenticate : (req, res, next) => {
        if (req?.session.isAuthenticated) {
            next()
        } else {
            res.status(401).send("tidak ter autentikasi")
        }
    },

}