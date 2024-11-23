let currentInput = '';
let memory = 0; 

function appendNumber(number) {
    if (currentInput === '0') currentInput = ''; 
    currentInput += number; 
    updateDisplay(); 
}

function appendOperator(op) {
    if (currentInput === '' && !isNaN(op)) return; 
    currentInput += ` ${op} `; 
    updateDisplay(); 
}

function calculate() {
    try {
        
        let expression = currentInput.replace(/%/g, '/100').replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(')
            .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(').replace(/asin\(/g, 'Math.asin(')
            .replace(/acos\(/g, 'Math.acos(').replace(/atan\(/g, 'Math.atan(')
            .replace(/exp\(/g, 'Math.exp(').replace(/cbrt\(/g, 'Math.cbrt(')
            .replace(/(\d)!/g, 'factorial($1)'); 

        if (currentInput.includes('m+')) {
            memory += eval(expression.replace(/ m\+/g, ''));
            clearDisplay();
            return;
        } else if (currentInput.includes('m-')) {
            memory -= eval(expression.replace(/ m\-/g, ''));
            clearDisplay();
            return;
        }

        const result = eval(expression);
        currentInput = result.toString(); 
        updateDisplay(); 
    } catch (error) {
        currentInput = 'Error';
        updateDisplay(); 
    }
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
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
