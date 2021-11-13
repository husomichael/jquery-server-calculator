console.log('js');

$(document).ready(readyNow);

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