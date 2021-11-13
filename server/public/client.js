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
    $('#clear-button').on('click', takeUserInputs);
    handleRenderHistory();
;}

// Take user inputs and when submit button is clicked bundle them into an object
// and send the object to the server via a POST. 

// C button should clear user inputs.

function takeUserInputs(){
    userInputs.inputs.push($('#input-number-1').val());
    userInputs.arithmetic = arithmetic;
    userInputs.inputs.push($('#input-number-2').val());
    console.log(userInputs.inputs);
    sendUserInputs();
    userInputs.inputs = [];
    $('#input-number-1').val('');
    $('#input-number-2').val('');
}

function setArithmetic(event){
    console.log(event.data.arithmetic);
    arithmetic = event.data.arithmetic;
}

function sendUserInputs(){
    $.ajax ({
        method: 'POST',
        url: '/inputs',
        data: userInputs
    }).then ((response) => {
        console.log('response:', response);
        //Make response return the total and append here?
        $('#total').empty();
        $('#total').append(`Total: ${response.data}`);
        handleRenderHistory();
    }).catch ((error) => {
        console.log('error:', error);
    });
}

function handleRenderHistory(history){
    $.ajax ({
        method: 'GET',
        url: '/inputs',
    }).then ((response) =>{
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