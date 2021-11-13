console.log('js');

$(document).ready(readyNow);

let userInputs = {inputs:[]};
let arithmetic;

function readyNow(){
    console.log('jq');
    $('#plus-button').on('click', {arithmetic: 'plus'}, setArithmetic);
    $('#minus-button').on('click', {arithmetic: 'minus'}, setArithmetic);
    $('#multiply-button').on('click', {arithmetic: 'multiply'}, setArithmetic);
    $('#divide-button').on('click', {arithmetic: 'divide'}, setArithmetic);
    $('#equals-button').on('click', takeUserInputs);
    $('#clear-button').on('click', takeUserInputs);
;}

// Take user inputs and when submit button is clicked bundle them into an object
// and send the object to the server via a POST. 

// C button should clear user inputs.

function takeUserInputs(){
    userInputs.inputs.push($('#input-number-1').val());
    userInputs.inputs.push(arithmetic);
    userInputs.inputs.push($('#input-number-2').val());
    console.log(userInputs.inputs);
}

function setArithmetic(event){
    console.log(event.data.arithmetic);
    arithmetic = event.data.arithmetic;
}