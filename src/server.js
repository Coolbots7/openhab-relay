const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');

const PORT = process.env.PORT || 3000;
const OPENHAB_URL = process.env.OPENHAB_URL || "http://openhab.cb7.com";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

function updateOpenHabItem(item, state) {
    axios.post(
        OPENHAB_URL + "/rest/items/" + item,
        state,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    )
};

function updateOpenHabItemRequest(req, res) {
    const item = req.params.item;
    const body = req.query.state;

    updateOpenHabItem(item, body);
};

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.put('/rest/items/:item', updateOpenHabItemRequest);

app.post('/rest/items/:item', updateOpenHabItemRequest);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});