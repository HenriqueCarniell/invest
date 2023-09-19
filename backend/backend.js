const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 4000
const cors = require('cors');

const db = mysql.createPool({
    host: "containers-us-west-149.railway.app",
    user: "root",
    password: "yWCnh4MIyid7i3Q66PeU",
    database: "railway",
    port: 7028
});



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

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM investapp WHERE id = ?";

    db.query(sqlDelete, id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});



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