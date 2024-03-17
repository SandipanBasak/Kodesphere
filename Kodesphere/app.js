const express=require('express');
 const mongoose=require('mongoose');
const app=express();
const port=3000;
app.use(express.json());

mongoose.connect('mongodb+srv://rssmp120:rohan3046@cluster0.nsofrmr.mongodb.net/Kodespehere');

const Device=mongoose.model('devices',{
    teamid:String,
    device:String,
    value:Number
});


app.post('/devices', async (req, res) => {
    const teamid = req.body.teamid;
    const device = req.body.device;
    const value = req.body.value;
     
    
    switch (device) {
        case 'fan':
            if (value >= 0 && value <= 5) {
                const newdevice=new Device({
                    teamid:teamid,
                    device:device,
                    value:value
                }) 
                await newdevice.save();
                // Control the speed of the fan
                // Implementation logic for controlling fan speed
                res.json({ msg: `Fan speed set to ${value}` });
            } else {
                res.status(400).send({ msg: "Invalid value for fan speed" });
            }
            break;
        
        case 'bulb':
            if (value === 0 || value === 1) {
                // Turn on or off the bulb
                // Implementation logic for turning on/off the bulb
                res.send({ msg: `Bulb turned ${value === 1 ? 'on' : 'off'}` });
            } else {
                res.status(400).send({ msg: "Invalid value for bulb (0 for off, 1 for on)" });
            }
            break;
        
        case 'led':
            // Control the color of the LED
            // Implementation logic for controlling LED color
            // Note: You need to parse the color value from string format "#RRGGBB"
            res.send({ msg: `LED color set to ${value}` });
            break;
        
        case 'ac':
            // Control the AC temperature and state
            if (typeof value === 'object' && 'temp' in value && 'state' in value) {
                // Implementation logic for controlling AC temperature and state
                res.send({ msg: `AC temperature set to ${value.temp}°C, state ${value.state === 1 ? 'on' : 'off'}` });
            } else {
                res.status(400).send({ msg: "Invalid value for AC" });
            }
            break;
        
        default:
            res.status(400).send({ msg: "Invalid device type" });
            break;
    }
})

app.get(`/devices/teamid`, async (req, res) => {
    const teamid = req.params.id;

    try {
        const device = await devices.findOne({ teamid });
        if (!device) {
            res.status(404).send({ msg: "Device not found" });
        } else {
            res.send(device);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: 'Internal server error' });
    }
});



app.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
})