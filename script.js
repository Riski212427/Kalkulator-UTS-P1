let currentInput = "";
let previousInput = "";
let op = null;

const resDisplay = document.getElementById("result");
const expDisplay = document.getElementById("expression");

function appendNumber(num) {
    // Validasi: hanya angka dan satu titik desimal
    if (num === "." && currentInput.includes(".")) return;
    currentInput += num;
    updateDisplay();
}

function appendOperator(selectedOp) {
    if (currentInput === "") return; // Validasi: tidak boleh kosong
    if (previousInput !== "") calculate();
    
    op = selectedOp;
    previousInput = currentInput;
    currentInput = "";
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (op) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = curr === 0 ? "Eror" : prev / curr; break;
        case "%": result = prev % curr; break;
        default: return;
    }

    currentInput = result.toString();
    op = null;
    previousInput = "";
    updateDisplay();
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    op = null;
    updateDisplay();
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function updateDisplay() {
    resDisplay.innerText = currentInput || "0";
    expDisplay.innerText = op ? `${previousInput} ${op}` : "";
}

// Toggle Dark Mode
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    document.getElementById("theme-toggle").innerText = isDark ? "Mode Terang" : "Mode Gelap";
});
