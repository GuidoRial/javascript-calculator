class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;

    }

    delete() {

    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "/":
                computation = prev / current;
                break;
            case "X":
                computation = prev * current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }


}

document.getElementById("githubLogo").onclick = function () {
    location.href = "https://github.com/GuidoRial"
}

document.getElementById("rick-roll").onclick = function () {
    location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete");
const allClearButton = document.querySelector("[data-all=clear");
const previousOperandTextElement = document.querySelector("[data-previous-operand");
const currentOperandTextElement = document.querySelector("[data-current-operand");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});


equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})
