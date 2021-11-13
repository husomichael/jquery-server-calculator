const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.post('/inputs', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})



app.listen(PORT, () => {
    console.log('Server is runnong on port', PORT);
})