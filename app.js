function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function mulitiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return mulitiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

// Global Variables
let clickedValue = 0;
let leftOperand = 0;
let result = 0;
let selectedOperator = null;

function digitBtnHandler(e) {
    if (clickedValue === 0 && e.target.textContent !== ".") {
        clickedValue += parseInt(e.target.textContent);
    } else if (e.target.textContent === "." && clickedValue.includes(".")) {
        clickedValue += "";
    } else {
        clickedValue += e.target.textContent;
    }
    screenSelected.textContent = clickedValue;
}

function clearScreen() {
    clickedValue = 0;
    leftOperand = 0;
    result = 0;
    selectedOperator = null;
    screenSelected.textContent = clickedValue;
    screenHistory.textContent = "";
}

function operatorHandler(e) {
    const operator = e.target.textContent;
    
    if (leftOperand === 0) {
        leftOperand = clickedValue;
    } else if (clickedValue !== 0 && result === 0) {
        leftOperand = operate(selectedOperator, parseFloat(leftOperand), parseFloat(clickedValue));
    }

    const operatorASCII = operator.charCodeAt(0);
    selectedOperator = operatorASCII === 247
                        ? "/"
                        : operatorASCII === 43
                        ? "+"
                        : operatorASCII === 215
                        ? "*"
                        : "-";

    // Update screen values
    screenHistory.textContent = leftOperand;
    screenHistory.textContent = screenHistory.textContent + " " + operator;
    clickedValue = 0;
    screenSelected.textContent = clickedValue;
    
    result = 0;
}

function equalHandler(e) {
    if (selectedOperator !== null) {
        if (selectedOperator === "/" && clickedValue === 0) {
            screenSelected.textContent = "Error";
        } else {
            result = operate(selectedOperator, parseFloat(leftOperand), parseFloat(clickedValue));
            screenHistory.textContent += " " + clickedValue + " =";
            screenSelected.textContent = result;
            leftOperand = result;
            selectedOperator = null;
        }
    }
}

function negateHandler(e) {
    if (screenSelected.textContent !== "0" && result === 0) {
        screenSelected.textContent = "-" + screenSelected.textContent;
    }
    clickedValue = -clickedValue;
}

function deleteHandler(e) {
    const len = screenSelected.textContent.length;
    if (screenSelected.textContent !== "0" && result === 0) {
        if (len === 1) {
            screenSelected.textContent = "0";
            clickedValue = 0;
        } else {
            screenSelected.textContent = screenSelected.textContent.substring(0, len - 1);
            clickedValue = Math.trunc(clickedValue / 10);
        }
    }
}

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(btn => btn.addEventListener("click", digitBtnHandler));

const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", clearScreen);

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(btn => btn.addEventListener("click", operatorHandler));

const equalButton = document.getElementById("equal-btn");
equalButton.addEventListener("click", equalHandler);

const negateBtn = document.querySelector(".negate");
negateBtn.addEventListener("click", negateHandler);

const deleteBtn = document.querySelector(".delete");
deleteBtn.addEventListener("click", deleteHandler);

const screenSelected = document.querySelector(".value-input");
const screenHistory = document.querySelector(".value-history");