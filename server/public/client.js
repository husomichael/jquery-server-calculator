console.log('js');

$(document).ready(readyNow);

//Stretch
let numString = '';
//

let userInputs = {inputs:[], arithmetic: ''};
let arithmetic;

function readyNow(){
    console.log('jq');
    $('#plus-button').on('click', {arithmetic: 'plus'}, setArithmetic);
    $('#minus-button').on('click', {arithmetic: 'minus'}, setArithmetic);
    $('#multiply-button').on('click', {arithmetic: 'multiply'}, setArithmetic);
    $('#divide-button').on('click', {arithmetic: 'divide'}, setArithmetic);
    $('#equals-button').on('click', takeUserInputs);
    $('#clear-button').on('click', handleClearButton);
    $('#calculator-table').on('click', handleCalculatorButtons);
    handleRenderHistory();
;}

//Takes user inputs, sends inputs to server, clears inputs.
function takeUserInputs(){
    userInputs.inputs.push($('#input-number-1').val());
    userInputs.arithmetic = arithmetic;
    userInputs.inputs.push($('#input-number-2').val());
    console.log(userInputs.inputs);
    sendUserInputs();
    handleClearButton();
}

//Sets arithmetic variable based on which button is clicked.
function setArithmetic(event){
    console.log(event.data.arithmetic);
    arithmetic = event.data.arithmetic;
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
        console.log('response:', response);
        $('#total').empty();
        $('#total').append(`Total: ${response.data}`);
        handleRenderHistory();
    }).catch ((error) => {
        console.log('error:', error);
    });
}

//Sends a get request to server.
//Recieves history object as response
//Loops through response.data and appends to DOM.
function handleRenderHistory(history){
    $.ajax ({
        method: 'GET',
        url: '/inputs',
    }).then ((response) => {
        console.log('response:', response);
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
}

//Function to handle client calculator table buttons
//Buttons tied to 1 click handler, each button has unique id.
//Different actions taken in conditionals based on event.target.id passed through button click.
//Buttons will push numbers to a string? String could push to array when arithmetic is selected. *** NOT DONE: Append value to input DOM. *****

//This is hard. Do it later.
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
    }else if(event.target.id == '+' && numString.length > 0){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = 'plus';
    }else if(event.target.id == '-' && numString.length > 0){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = 'minus'
    }else if(event.target.id == '*' && numString.length > 0){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = 'multiply'
    }else if(event.target.id == '/' && numString.length > 0){
        userInputs.inputs.push(numString);
        numString = '';
        userInputs.arithmetic = 'divide';
    }else if(event.target.id == '=' && numString.length > 0){
        if(userInputs.inputs.length > 0){
            userInputs.inputs.push(numString);
            numString = '';
            sendUserInputs();
            userInputs.inputs = [];
        }
    }
    console.log(numString);
    console.log(userInputs.inputs);
}
