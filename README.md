# Server Side Calculator

## Description
Duration: 3 days

A server side calculator that will take user calculator inputs, send them to the server, run the logic server side and then return the total value.

The total is rendered on the DOM on successful return of the total from the server.

A history of user inputs is stored in an array server side. On successful inputs, the client requests the history array from the server. On successful get request of the history the client side loops through the array and appends the history to the DOM below the calculator.

A clear button on the calculator will clear the user's inputs and reset the operator client side.

A delete button for the history will send a delete request to the server to wipe the history array. On successful delete request the client side will reappend the history array to the DOM to show it has been cleared.

If the user would like to use multiple operators, instead of one operator and the equals button, the two values and first operator are sent to the server to run through the logic. On success the total will be returned and appended to the first value of the input in the calculator with the operator selected, for the third number to be put in. This can repeat until the equals button is selected. This forces order of operation to be determined by the user.

## Screen Shot
Screenshot goes here.

### Prerequisites

## Installation

## Usage

1. Click on numbers for the first number.
2. Click an operator to perform on the first number.
3. Click on numbers for a second number.
4. Click '=' or another operator to get the current total.
5. If another operator, click numbers for a third number to perform that operator on the previous total and the third number.
6. Repeat until finished. Finish by pressing '='.
7. To clear inputs hit the 'C' button.
8. To clear the history hit the 'Clear History' button.

## Built With
HTML, CSS, Javascript, jQuery, Node.js, Express.js, Ajax

## Acknowledgement
Thank you to Prime Digital Academy for equipping me with the skills and determination to overcome daunting obstacles and produce a project to be proud of.

## Support
If you have suggestions or issues, please email me at husomichael@gmail.com

