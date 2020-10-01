// Load the MySQL pool connection
const pool = require('../data/config');
const express = require('express');
const router = express.Router();

// Display welcome message on the root
router.get('/', (request, response) => {
    pool.query('SELECT * FROM notes', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

router.get('/:note', (request, response) => {
    pool.query(`SELECT * FROM notes WHERE id = ${request.params.note}`, (error, result) => {
        if (error) throw error;

        response.send(result[0]);
    });
});

module.exports = router;
