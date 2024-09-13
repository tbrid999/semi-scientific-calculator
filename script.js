const calcDisplay = document.getElementById("display");
const calcNumber = document.querySelectorAll(".number");
const calcOperator = document.querySelectorAll(".operator");
const calcEqual = document.querySelector(".equal");
const calcAC = document.querySelector(".ac");

// Event listeners for number buttons
calcNumber.forEach(button => {
    button.addEventListener('click', () => {
        calcDisplay.value += button.textContent; 
    });
});

// Event listeners for operator buttons (including ^ and √ for power and square root)
calcOperator.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        const lastChar = calcDisplay.value.slice(-1);

        // Prevent multiple operators in a row, except for power and square root
        if (!['+', '-', '*', '/', '^'].includes(lastChar) || operator === '^' || operator === '√') {
            calcDisplay.value += operator;
        }
    });
});

// Event listener for equals button
calcEqual.addEventListener('click', () => {
    try {
        let expression = calcDisplay.value;

        // Handle power operator (^)
        expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
            return Math.pow(base, exponent);
        });

        // Handle square root (√)
        expression = expression.replace(/√(\d+)/g, (match, number) => {
            return Math.sqrt(number);
        });

        // Evaluate the modified expression
        calcDisplay.value = eval(expression);

    } catch (e) {
        calcDisplay.value = 'Error'; // Show error if something goes wrong
    }
});

// Event listener for AC button
calcAC.addEventListener('click', () => {
    calcDisplay.value = '';  // Clear the display
});
