const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const OPENHAB_URL = "http://openhab.cb7.com:8080/rest/";
const JPL_IMAP_UNREAD_ITEM = "JPLIMAP_InboxUnread";
const JPL_IMAP_ALL_ITEM = "JPLIMAP_InboxTotal";

function updateOpenHab(item, count) {
    axios.put(
        OPENHAB_URL + 'items/' + item + '/state',
        count,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    );
}

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

app.post('/jpl_imap', (req, res) => {
    console.table(req.body);

    const folder = req.body.folder;
    const type = req.body.type;
    const count = req.body.count;

    switch (folder.toLowerCase()) {
        case 'inbox':
            if (type === 'unseen') {
                updateOpenHab(JPL_IMAP_UNREAD_ITEM, count);
            }
            else if (type === 'all') {
                updateOpenHab(JPL_IMAP_ALL_ITEM, count);
            }
            break;
    }

    return res.sendStatus(200);
});

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
});