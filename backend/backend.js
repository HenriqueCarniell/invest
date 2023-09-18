const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user:   "root",
    password: "guga2004",
    database: "invest",
})

app.use(cors());
app.use(express.json())

app.post("/add", (req,res) => {
    const {Nome} = req.body
    const {Price} = req.body
    const {Option} = req.body

    const sqldata = "INSERT INTO investapp(nome, price, opcao) VALUES (?,?,?)";

    db.query(sqldata, [Nome, Price, Option], (err, result) => {
    if(err) {
        console.log(err) 
    } else {
        console.log(result)
    }
    })
})

app.get("/dados", (req,res) => {
    const sqldata = "SELECT * FROM investapp";

    db.query(sqldata,(err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})


app.listen(porta, () => {
    console.log(`rodando na porta ${porta}`);
})