const calcDisplay = document.getElementById("display");
const clacNumber = document.querySelectorAll(".number");
const clacOperator = document.querySelectorAll(".operator");
const clacEqual = document.querySelector(".equal");
const calcAC = document.querySelector(".ac");

// Event listeners for number buttons
clacNumber.forEach(button => {
    button.addEventListener('click', () => {
        calcDisplay.value += button.textContent; 
    });
});

// Event listeners for operator buttons (including ^ and √ for power and square root)
clacOperator.forEach(button => {
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
clacEqual.addEventListener('click', () => {
    try {
        let expression = calcDisplay.value;

        // Handle power operator (^)
        expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
            return Math.pow(${base}, ${exponent});
        });

        // Handle square root (√)
        expression = expression.replace(/√(\d+)/g, (match, number) => {
            return Math.sqrt(${number});
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