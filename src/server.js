const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const OPENHAB_URL = "http://openhab.cb7.com:8080/rest/";

function updateOpenHabItem(item, state) {
    axios.post(
        OPENHAB_URL + "items/" + item,
        state,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    )
}

app.get('/', function (req, res) {
    return res.send('Hello world');
});

app.put('/rest/items/:item', (req, res) => {
    const item = req.params.item;
    const body = req.query.state;

    console.log("item", item);
    console.log("body", body);

    updateOpenHabItem(item, body);
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});