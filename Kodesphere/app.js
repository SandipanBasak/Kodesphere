import express from 'express'
import fetch from 'node-fetch'

const app = express();
const port = 3000;

app.use(express.json());
const id='YpTtc0b';
// Function to add a device
async function addDevice(teamid, device, value) {
    try {
        const response = await fetch('https://kodessphere-api.vercel.app/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teamid,
                device,
                value
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Endpoint to add devices
app.post('/devices', async (req, res) => {
    const { teamid, device, value } = req.body;
    try {
        const response = await addDevice(teamid, device, value);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch all device data
app.get(`/devices/${id}`, async (req, res) => {
    try {
        const response = await fetch('https://kodessphere-api.vercel.app/devices');
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
