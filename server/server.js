const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('server/public'));

let history = {data: []};
let total = {data: 0};

//Recieves post from user when equals button is selected.
//Conditional checks arithmetic option
//Logic is ran, total is returned.
//Submission is pushed to history array.
app.post('/inputs', (req, res) => {
    console.log(req.body);
    // res.sendStatus(200);
    //Addition
    if(req.body.arithmetic == 'plus'){
        total.data = Number(req.body.inputs[0]) + Number(req.body.inputs[1]);
        history.data.push(`${req.body.inputs[0]} + ${req.body.inputs[1]} = ${total.data}`);
        res.send(total);
    }
    //Subtraction
    if(req.body.arithmetic == 'minus'){
        total.data = Number(req.body.inputs[0]) - Number(req.body.inputs[1]);
        history.data.push(`${req.body.inputs[0]} - ${req.body.inputs[1]} = ${total.data}`);
        res.send(total);
    }
    //Multiplication
    if(req.body.arithmetic == 'multiply'){
        total.data = Number(req.body.inputs[0]) * Number(req.body.inputs[1]);
        history.data.push(`${req.body.inputs[0]} * ${req.body.inputs[1]} = ${total.data}`);
        res.send(total);
    }
    //Division
    if(req.body.arithmetic == 'divide'){
        total.data = Number(req.body.inputs[0]) / Number(req.body.inputs[1]);
        history.data.push(`${req.body.inputs[0]} / ${req.body.inputs[1]} = ${total.data}`);
        res.send(total);
    }
})

//On get request, history object with history array is returned.
app.get('/inputs', (req, res) =>{
    res.send(history);
})



app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})