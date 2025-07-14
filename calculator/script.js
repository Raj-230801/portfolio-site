const resultInput = document.getElementById('result');
const historyList = document.getElementById('history-list');

let currentInput = '';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;
let calculationHistory = []; // Array to store history

function appendToResult(value) {
    if (waitingForSecondOperand) {
        currentInput = value;
        waitingForSecondOperand = false;
    } else {
        currentInput += value;
    }
    resultInput.value = currentInput;
}

function clearResult() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    resultInput.value = '';
}

function calculateResult() {
    if (currentInput === '' || firstOperand === null) {
        return;
    }

    const expression = `${firstOperand} ${operator} ${currentInput}`; // Store expression
    const secondOperand = parseFloat(currentInput);

    let result;
    try {
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    alert("Cannot divide by zero!");
                    clearResult();
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        // Add to history
        addHistoryEntry(expression, result);

        resultInput.value = result;
        currentInput = result.toString();
        firstOperand = result;
        operator = '';
        waitingForSecondOperand = true;
    } catch (error) {
        resultInput.value = 'Error';
        clearResult(); // Clear state on error
        console.error("Calculation error:", error);
    }
}

// Function to add an entry to history
function addHistoryEntry(expression, result) {
    calculationHistory.push({ expression: expression, result: result });
    renderHistory();
}

// Function to render (display) the history
function renderHistory() {
    historyList.innerHTML = ''; // Clear existing history
    calculationHistory.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `<span>${entry.expression} = </span><strong>${entry.result}</strong>`;
        historyList.appendChild(historyItem);
    });
    // Scroll to the bottom to show latest entry
    historyList.scrollTop = historyList.scrollHeight;
}

// Function to clear all history
function clearHistory() {
    calculationHistory = [];
    renderHistory(); // Update the display
}


// Event listeners for operator buttons (to handle calculation stages)
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '') return;

        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (!waitingForSecondOperand) {
            calculateResult();
            firstOperand = parseFloat(resultInput.value);
        }

        operator = button.textContent;
        waitingForSecondOperand = true;
        currentInput = '';
    });
});

// Initial display clear on load
clearResult();
renderHistory(); // Render empty history on load

document.addEventListener("mousemove", function(event) {
    const x = event.clientX;
    const y = event.clientY;
    // console.log(`Mouse position: X=${x}, Y=${y}`);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const r = Math.round((x / width) * 255);
    const g = Math.round((y / height) * 255);
    const b = Math.round(((x + y) / (width + height)) * 255);

    const calculatorElement = document.querySelector(".calculator");
    const historyPanel = document.querySelector(".history-panel");
    calculatorElement.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    historyPanel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    
})