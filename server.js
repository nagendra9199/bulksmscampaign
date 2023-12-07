const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const exceljs = require('exceljs');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(express.json());

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'bulksms'
});

app.use(cors());

app.post('/bulksmsdata', (req, res) => {
    const data = req.body;

    const sql = `INSERT INTO mobileData (name, mobile, email) VALUES (?, ?, ?)`;

    pool.query(sql, [data.name, data.mobile, data.email], (err, result) => {
        if (err) {
            console.error('Query error', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Inserted');
        res.status(200).send('Inserted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
