const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
app.use(express.json());

app.post('/devices', async (req, res) => {
    const { teamid, device, value } = req.body;

    // Construct the request payload
    const payload = {
        teamid: teamid,
        device: device,
        value: value
    };

    try {
        // Send POST request to the external API
        const response = await fetch('https://kodessphere-api.vercel.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check if the request was successful
        if (response.ok) {
            const data = await response.json();
            res.send(data);
        } else {
            throw new Error('Failed to send data to the external API');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

// Endpoint to fetch data from the external API
app.get('/external-api', async (req, res) => {
    try {
        const response = await fetch('https://kodessphere-api.vercel.app');
        if (response.ok) {
            const data = await response.json();
            res.send(data);
        } else {
            throw new Error('Failed to fetch data from the external API');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
