

let currentInput = ''; 

function appendNumber(number) {
    if (currentInput === '0') currentInput = '';
    currentInput += number; 
    updateDisplay(); 
}

function appendOperator(op) {
    if (currentInput === '') return; 
    currentInput += ` ${op} `; 
    updateDisplay(); 
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentInput || '0'; 
}

function clearDisplay() {
    currentInput = '';
    updateDisplay(); 
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(); 
}

function calculate() {
    try {
        const result = eval(currentInput.replace(/%/g, '/100')); 
        currentInput = result.toString(); 
        updateDisplay();
    } catch (error) {
        currentInput = 'Error'; 
        updateDisplay();
    }
}
