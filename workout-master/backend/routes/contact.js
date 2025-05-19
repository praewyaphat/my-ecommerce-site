const { error } = require('console');
const express = require('express');
const router = express.Router();
const path = require('path');
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, '..', 'data', 'contact.db');
const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS contact(
        id INTEGER PRIMARY KEY,
        fname TEXT,
        lname TEXT,
        email TEXT,
        subject TEXT,
        message TEXT)`);

router.post('/', (req, res) => {
    const { fname, lname, email, subject, message } = req.body;
    var sql = `INSERT INTO contact( 
                fname, 
                lname, 
                email, 
                subject, 
                message) 
                VALUES("`+ fname + `","` + lname + `","` + email + `","` + subject + `","` + message + `")`;

    db.run('INSERT INTO contact( fname, lname, email, subject, message) VALUES(?,?,?,?,?)',
        [fname, lname, email, subject, message]);

    console.log('Content from sumited', { fname, lname, email, subject, message });
    res.status(200).json({ status: 'Contact saved in database!!' });
});

router.get('/:action', (req, res) => {
    const { action } = req.params;

    if (action === 'all') {
        
    }
    
    switch (action) {
        case 'all':
            var sql = "SELECT * FROM contact ORDER BY id DESC";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                } else {
                    return res.json(rows);
                }
            });
            break;

        case 'last':
            var sql = "SELECT * FROM contact WHERE id = (SELECT max(id) FROM contact)";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                }
                res.json(rows);

            });
            break;

        case 'beforelast':
            var sql = "SELECT * FROM contact WHERE id = (SELECT max(id-1) FROM contact)";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                }
                res.json(rows);

            });
            break;

        case 'lastthree':
            var sql = "SELECT * FROM contact ORDER BY id DESC LIMIT 3";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                }
                res.json(rows);

            });
            break;
        case 'first':
            var sql = "SELECT * FROM contact ORDER BY id ASC";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                } else {
                    return res.json(rows);
                }
            });
            break;

        case 'three':
            var sql = "SELECT * FROM contact WHERE id = (SELECT min(id+2) FROM contact)";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'FAil to read Goodbye!!!!' })
                } else {
                    return res.json(rows);
                }
            });
            break;   

        default:
            return res.status(400).json({ error: 'Unknown action ohno' });
    }
});

module.exports = router;

