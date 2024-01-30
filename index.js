const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.use(express.static('./'))

app.get('/', (req, res) =>
{
    res.sendFile(path.join(__dirname, '1_motion_capture.html'));
});

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});
