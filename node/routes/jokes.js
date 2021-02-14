
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






//SEME VALIDACIJA
const sema = Joi.object().keys({
    //user: Joi.string().trim().min(4).max(45).required(),
    naslov: Joi.string().trim().min(4).max(45).required(),
    tekst: Joi.string().trim().min(1).max(185).required(),
    tip: Joi.string().trim().min(4).max(45).required()
});
const sema2 = Joi.object().keys({
    idvic: Joi.number().required()
});
const sema3 = Joi.object().keys({
    //user: Joi.string().trim().min(4).max(45).required(),
    idvic: Joi.number().required(),
    naslov: Joi.string().trim().min(4).max(45).required(),
    tekst: Joi.string().trim().min(1).max(185).required(),
    tip: Joi.string().trim().min(4).max(45).required()
});







//READ ALL
rtr.get('/vicevi', (req, res)=>{
    pool.query('select * from vic', (err, rows) => {
        if(err)
            res.status(500).send(err.sqlMessage);
        else
            res.send(rows);
    });
});

//CREATE
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


//READ 1
rtr.get('/vicevi/:idvic', ((req, res) => {
    let { error } = sema2.validate(req.params);

    if(error)
        res.status(400).send(error.details[0].message);
    else {
        let query = 'select * from vic where idvic=?';
        let formated = mysql.format(query, [req.params.id]);

        pool.query(formated, (err, rows) => {
            if(err)
                res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
            else
                res.send(rows[0]);
        });
    }

}));


//UPDATE
rtr.post('/vicevi/edit', ((req, res) => {
    let { error } = sema3.validate(req.body)

    if(error)
        res.status(400).send(error.details[0].message); //400 je invalid request
    else {
        //upit bazi
        let query = 'update vic set naslov=?, tekst=?, tip=? where idvic=?';
        let formated = mysql.format(query, [req.body.naslov, req.body.tekst, req.body.tip, req.body.idvic]) //ovaj niz su podaci koje prosledjujemo bazi

        pool.query(formated, (err, response) => {
            if(err)
                res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
            else {
                //REST API protokol je da vratimo objekat koj smo kreirali/ izmenili/ obrisali.
                query = 'select * from vic';
                //formated = mysql.format(query, [response.insertId]);
                formated = mysql.format(query)

                pool.query(formated, (err, rows) => {
                    if(err)
                        res.status(500).send(err.sqlMessage); //500 ako je nesto puklo u bazi
                    else
                        res.send(rows);
                });
            }
        });
    }

}));


// DELETE
rtr.post('/vicevi/delete', (req, res) => {

    let { error } = sema2.validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    else {

        let query = 'delete from vic where idvic=?';
        let formated = mysql.format(query, [req.body.idvic]);

        pool.query(formated, (err, response) => {
            if (err)
                res.status(500).send(err.sqlMessage);
            else {

                let query = 'select * from vic';
                pool.query(query, (err, rows) => {
                    if (err)
                        res.status(500).send(err.sqlMessage);
                    else
                        res.send(rows);
                });
            }
        });
    }
});

module.exports = rtr;