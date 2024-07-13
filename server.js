const express = require('express');
const mysql = require("mysql2");
const session = require('express-session');
const app = express();
const port = 5000
const cors = require('cors')

const routerMHS = require('./routers/mahasiswa')
const routerMK = require('./routers/matakuliah')
const routerNilai = require('./routers/nilai')
const routerUser = require('./routers/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true
}))
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));

app.use(routerMHS)
app.use(routerMK)
app.use(routerNilai)
app.use(routerUser)

app.listen(port, () => {
    console.log(`server berjalan dengan localhost:${port}`);
})