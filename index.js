const express = require('express');

const server = express();

server.use(express.json());

server.listen(4000, () => {
    console.log('\n*** Server listening on port 4000 ***')
});