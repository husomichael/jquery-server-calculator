$(document).ready(readyNow);

let numString = '';
let userInputs = {inputs:[], arithmetic: ''};
let arithmetic;
let lastTotal = 0;

function readyNow(){
    $('#equals-button').on('click', takeUserInputs);
    $('#clear-button').on('click', handleClearButton);
    $('#calculator-table').on('click', handleCalculatorButtons);
    $('#delete').on('click', handleDeleteButton);
    handleRenderHistory();
;}

//Takes user inputs, sends inputs to server, clears inputs.
function takeUserInputs(){
    userInputs.inputs.push($('#input-number-1').val());
    userInputs.arithmetic = arithmetic;
    userInputs.inputs.push($('#input-number-2').val());
    // console.log(userInputs.inputs);
    sendUserInputs();
    handleClearButton();
}

//Sends user inputs to the server. 
//Receives total as a response, appends it to the DOM. 
//Renders history to DOM.
function sendUserInputs(){
    $.ajax ({
        method: 'POST',
        url: '/inputs',
        data: userInputs
    }).then ((response) => {
        // console.log('response:', response);
        $('#total').empty();
        $('#total').append(`Total: ${response.data}`);
        lastTotal = response.data;
        handleRenderHistory();
    }).catch ((error) => {
        console.log('error:', error);
    });
}

//Sends a get request to server.
//Recieves history object as response
//Loops through response.data and appends to DOM.
function handleRenderHistory(){
    $.ajax ({
        method: 'GET',
        url: '/inputs',
    }).then ((response) => {
        // console.log('response:', response);
        $('#history').empty();
        for(let i of response.data){
            $('#history').append(`
            <li>${i}</li>
            `);
        }
    }).catch ((error) => {
        console.log('error', error);
    });
}

//Clears input fields, input object values, and arithmetic value.
function handleClearButton(){
    $('#input-number-1').val('');
    $('#input-number-2').val('');
    arithmetic = '';
    userInputs.inputs = [];
    numString = '';
}

//Delete request to wipe history array server side.
//Call handleRenderHistory on successful call to update DOM.
function handleDeleteButton(){
    $.ajax ({
        method: 'DELETE',
        url: '/inputs',
    }).then((response) =>{
        // console.log('delete response:', response);
        handleRenderHistory();
        $('#total').empty();
        $('#total').append(`Total:`);
    })
}

//Function to handle client calculator table buttons.
//Buttons tied to 1 click handler, each button has unique id.
//Different actions taken in conditionals based on event.target.id passed through button click.
//Buttons will push numbers to numString and pushes to array when arithmetic is selected. 
//Append value to input DOM.

/* TO DO: Take lastTotal and use conditional to run numbers if user clicks
an operator after 1 value is pushed and numString.length > 1. 
Total can be pushed to array and operator appended and be back at square 1 of
having to add another number and hit another operator or equals.
The logic running this way will force order of operations and make simple
calculator work.  */
function handleCalculatorButtons(event){ 
    // console.log(event.target.id);
    if(event.target.id == 0){
        numString += '0';
    }else if(event.target.id == 1){
        numString += '1';
    }else if(event.target.id == 2){
        numString += '2';
    }else if(event.target.id == 3){
        numString += '3';
    }else if(event.target.id == 4){
        numString += '4';
    }else if(event.target.id == 5){
        numString += '5';
    }else if(event.target.id == 6){
        numString += '6';
    }else if(event.target.id == 7){
        numString += '7';
    }else if(event.target.id == 8){
        numString += '8';
    }else if(event.target.id == 9){
        numString += '9';
    }else if(event.target.id == '+' && numString.length > 0 && userInputs.inputs.length < 1){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = '+';
    }else if(event.target.id == '-' && numString.length > 0 && userInputs.inputs.length < 1){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = '-'
    }else if(event.target.id == '*' && numString.length > 0 && userInputs.inputs.length < 1){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = '*'
    }else if(event.target.id == '/' && numString.length > 0 && userInputs.inputs.length < 1){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = '/';
    }
    
    if(userInputs.inputs.length == 0){
        $("#input-number-1").val(`${numString}`);
    }else if(userInputs.inputs.length == 1){
        $("#input-number-1").val(`${userInputs.inputs[0]} ${userInputs.arithmetic} ${numString}`);
    }

    if(event.target.id == '=' && numString.length > 0){
        if(userInputs.inputs.length > 0){
            userInputs.inputs.push(numString);
            numString = '';
            sendUserInputs();
            userInputs.inputs = [];
            $("#input-number-1").val('');
        }
    }
    // console.log(numString);
    // console.log(userInputs.inputs);
}
