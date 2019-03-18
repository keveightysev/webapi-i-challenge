const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

server.listen(4000, () => {
    console.log('\n*** Server listening on port 4000 ***')
});