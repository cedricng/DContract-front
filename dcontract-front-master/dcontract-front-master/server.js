const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/dcontract-front'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/dcontract-front/index.html'));
});

ngApp.listen(process.env.PORT || 3000);