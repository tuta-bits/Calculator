class Calculator {
    constructor(prevText, currText) {
        this.prevText = prevText;
        this.currText = currText;
        this.clear();
    }

    // CLEAR ALL INPUT DATA ON DISPLAY
    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    // DELETE NUMERS WRONGLY TYPED IN
    delete() {

    }

    /* ADD NUMBERS TO BE DISPLAYED FOR COMPUTATION
     CONVERTING TO STRING SO NUMBERS CAN BE ADDED NEXT TO EACH OTHER
     CHECK THAT '.' IS ONLY ADDED ONCE */
    appendNum(num) {
        if (num === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + num.toString();
    }

    // SELECT AN OPERAND TO BE PERFORMED IN A GIVEN OPERATION
    // AND CHECK IF ANY PREVIOUS OPERAND WAS SELECTED AND PERFORM THAT
    selectOperation(operation) {
        if (this.currOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }

        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    // CALCULATE THE VALUE GIVEN
    compute() {
        let cipher
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                cipher = prev + curr
                break
            case '-':
                cipher = prev - curr
                break
            case '*':
                cipher = prev * curr
                break
            case '÷':
                cipher = prev / curr
                break
        }
    }

    // UPDATE THE DISPLAY ON THE DISPLAY BANE
    updateDisplay() {
        this.currText.innerText = this.currOperand
        this.prevText.innerText = this.prevOperand
    }
}


// INITIATING VARIABLES
const numBtn = document.querySelectorAll('[data-num]');
const opBtn = document.querySelectorAll('[data-op]');
const equalsBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-del]');
const clearBtn = document.querySelector('[data-clear]');
const prevText = document.querySelector('[data-prev-op]');
const currText = document.querySelector('[data-curr-op]');

const calculator = new Calculator(prevText, currText)

// ITERATING OVER EACXH NUMBER CLICKED AND DISPLYING IT 
// ON THE DISPLAY PANE
numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})