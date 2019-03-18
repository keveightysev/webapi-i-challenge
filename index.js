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
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be retrieved." });
        });
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return
    }
    db.insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updateUser = req.body
    if (!updateUser.name || !updateUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        return
    }
    db.update(id, updateUser)
        .then(updated => {
             if (updated === 0) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(updated)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
})

server.listen(4000, () => {
    console.log('\n*** Server listening on port 4000 ***')
});