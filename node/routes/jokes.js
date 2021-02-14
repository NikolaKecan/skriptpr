
const express = require('express')
const mysql = require('mysql');
const Joi = require('joi');


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '*****',
    database: 'skriptjezici4',
    port: '3306'
});

const rtr = express.Router();
rtr.use(express.json());




const sema = Joi.object().keys({
    //user: Joi.string().trim().min(4).max(45).required(),
    naslov: Joi.string().trim().min(4).max(45).required(),
    tekst: Joi.string().trim().min(1).max(185).required(),
    tip: Joi.string().trim().min(4).max(45).required()
});


rtr.get('/vicevi', (req, res)=>{
    pool.query('select * from vic', (err, rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});


rtr.post('/vicevi', ((req, res) => {
    let { error } = sema.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message); //400 je invalid request
    else {
        //upit bazi
        let query = 'insert into vic (naslov, tekst, tip) values (?, ?, ?)';
        let formated = mysql.format(query, [req.body.naslov, req.body.tekst, req.body.tip]) //ovaj niz su podaci koje prosledjujemo bazi

        pool.query(formated, (err, response) => {
            if(err)
                res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
            else {
                //REST API protokol je da vratimo objekat koj smo kreirali/ izmenili/ obrisali.
                query = 'select * from vic where idvic=?';
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
                    else
                        res.send(rows[0]);
                });
            }
        });
    }

}));



rtr.get('/vicevi/:id', ((req, res) => {
    //REST API protokol je da vratimo objekat koj smo kreirali/ izmenili/ obrisali.
    let query = 'select * from vic where idvic=?';
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if(err)
            res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
        else
            res.send(rows[0]);
    });
}));



module.exports = rtr;