const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { urlencoded, json } = require('body-parser');
const { v4 } = require('uuid');
const axios = require('axios');
const app = express();

app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/api/user/:id', (req, res) => {
    if (!req.headers['token']) {
        return res.status(403).send({
            status: 'Error',
        });
    }

    axios
        .get('https://randomuser.me/api')
        .then(result => {
            const [userProfile] = result.data.results;
            const { name, picture, phone, email, country } = userProfile;

            res.status(200).send({
                status: 'ok',
                result: {
                    name,
                    picture,
                    phone,
                    email,
                    country,
                },
            });
        })
        .catch(e => {
            res.status(400).send({
                status: 'Error',
            });
        });
});
