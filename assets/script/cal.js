class Calculator {
    constructor(prevText, currText) {
        this.prevText = prevText;
        this.currText = currText;
        this.clear();
    }

    // SQUARE-ROOT FUNCTION
    sqrt() {
        this.currOperand = Math.sqrt(this.currOperand)
    }

    // CLEAR ALL INPUT DATA ON DISPLAY
    clear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    // DELETE NUMBERS WRONGLY TYPED IN
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
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
    // CONVERT INPUT FROM STRING TO FLOAT AND USE SWITCH TO CHECK THE INPUT
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
            case '%':
                cipher = (parseFloat(prev) * parseFloat(curr)) / 100
                break
            case '^':
                cipher = Math.pow(prev, curr)
                break
            default:
                return
        }

        // SETTING THE RESULT OF THE COMPUTATION TO CURROPERAND
        this.currOperand = cipher
        this.operation = undefined
        this.prevOperand = ''
    }

    // HELPER FUNCTION TO DISPLAY NUMBRS IN COMMA DELIMITED FORMAT
    getDisplayNum(num) {
        const strNum = num.toString()
        const intDigits = parseFloat(strNum.split('.')[0])
        const decimalDigits = strNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        }
        else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        }
        else {
            return intDisplay
        }
    }

    // UPDATE THE DISPLAY ON THE DISPLAY BANE
    updateDisplay() {
        this.currText.innerText = this.getDisplayNum(this.currOperand)

        // DISPLAYING THE INPUT + THE OPERAND
        if (this.operation != null) {
            this.prevText.innerText = 
            `${this.getDisplayNum(this.prevOperand)} ${this.operation}`
        }
        else {
            this.prevText.innerText = ''
        }
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
const sqrtBtn = document.querySelector('[data-sqrt]');

const calculator = new Calculator(prevText, currText)

// ITERATING OVER EACXH NUMBER CLICKED AND DISPLYING IT 
// ON THE DISPLAY PANE
numBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

// ADD EVENTLISTENER TO THE OPERATOR BTNS 
opBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// ADD EVENTLISTENER TO THE EQUALS BTN
equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

// ADD EVENTLISTENER TO THE EQUALS BTN
clearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

// ADD EVENTLISTENER TO THE DELETE BTN
delBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// ADD EVENTLISTENER TO THE SQRT BTN
sqrtBtn.addEventListener('click', button => {
    calculator.sqrt()
    calculator.updateDisplay()
})