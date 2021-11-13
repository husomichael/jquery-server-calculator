const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

let history = {data: [1,3,4,5,6]};

app.post('/inputs', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.get('/inputs', (req, res) =>{
    res.send(history);
})



app.listen(PORT, () => {
    console.log('Server is runnong on port', PORT);
})