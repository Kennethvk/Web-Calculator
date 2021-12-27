let input = "0"
let num1 = 0
let num2 = 0
let storeOperator = ""
let storeNum = ""
num1 = null
num2 = null

// START update screen
const calculatorScreenText = document.querySelector("#calculator-screen-text")
const updateScreen = () => {
    calculatorScreenText.value = input
    // console.log(`input: ${input}`) //console.log untuk mengecek
    // console.log(`storeNum: ${storeNum}`)
    // console.log(`storeOperator: ${storeOperator}`)
    // console.log(`num1: ${num1}`)
    // console.log(`num2: ${num2}`)
    // console.log("-----------------------")
}
// END update screen

// START check operator
const isOperator = (x) => {
    if(
    x === '+' ||
    x === '-' ||
    x === '×' ||
    x === '/'
    ){
        return true
    }else{
        return false
    }
}
// END check operator

// START ubah ke number
const moveNumber = () => {
    if (num1 === null && storeNum !== "") {
        if (storeNum.indexOf(".") === -1) {
            num1 = parseInt(storeNum)
        }else{
            num1 = parseFloat(storeNum)
        }
    } else if(num2 === null && storeNum !== "") {
        if (storeNum.indexOf(".") === -1) {
            num2 = parseInt(storeNum)
        }else{
            num2 = parseFloat(storeNum)
        }
    }
    storeNum = ""
}
// END ubah ke number

//START menghitung
const calculate = () => {
    if (storeOperator === "+") {
        input = num1+num2
        input = input.toString()
    }else if (storeOperator === "-") {
        input = num1-num2
        input = input.toString()
    }else if (storeOperator === "×") {
        input = num1*num2
        input = input.toString()
    }else if (storeOperator === "/") {
        input = num1/num2
        input = input.toString()
    }
    storeOperator = ""
}
// END menghitung

// START angka saat diclick
const numbers = document.querySelectorAll(".number")

numbers.forEach((number) => {
    updateScreen()
    number.addEventListener("click", () => {
        if (input[0] === '0' && input[1] === undefined){
            input = number.value
            storeNum = number.value
        }else{
            if(isOperator(input[input.length-1]) === false || number.value !== "0"){
                if(storeNum !== "0"){
                    input += number.value
                    storeNum += number.value
                }
            }else if (number.value === "0" && isOperator(input[input.length-1]) === true) {
                input += number.value
                storeNum += number.value
            }
        }
        updateScreen()
    })
})
// END angka saat diclick

// START operator saat diclick
const operators = document.querySelectorAll(".operator")

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        if (input[0] === '0' && input[1] === undefined){// misalnya ketika memencet operator saat masih kosong
            storeNum = "0"
        }
        if ((num1 === null || num2 === null) && storeNum[storeNum.length-1] !== ".") {
            if (isOperator(input[input.length-1]) === false && input[input.length-1] !== '.'){
                input += operator.value
                moveNumber()
            }
        }
        if(num1 !== null && num2 !== null){ // hitung kalau num1 dan num2 tidak kosong
            calculate()
            if (input.indexOf(".") === -1) { // convert dari string dan pindahkan input ke num1 untuk perhitungan selanjutnya
                num1 = parseInt(input)
            }else{
                num1 = parseFloat(input)
            }
            num2 = null
            if(operator.value === '+'){
                input += "+"
            }else if(operator.value === '-'){
                input += "-"
            }else if(operator.value === '×'){
                input += "×"
            }else if(operator.value === '/'){
                input += "/"
            }
        }
        if(storeOperator === ""  && storeNum[storeNum.length-1] !== ".")storeOperator = operator.value
        updateScreen()
    })
})
// END operator saat diclick

// START event equal
const equals = document.querySelector("#equal")
equals.addEventListener("click", () => {
    if(isOperator(input[input.length-1]) === false && storeOperator !== "" && storeNum[storeNum.length-1] !== "."){
        moveNumber()
        if(num1 !== null && num2 !== null){
            calculate()
            num1 = null
            num2 = null
            storeOperator = ""
            storeNum = input.toString()
            updateScreen()
        }
    }
})
// END event equal

// START event del
const deleted = document.querySelector("#delete")
deleted.addEventListener("click", () => {
    if(isOperator(input[input.length-1]) === true){
        storeOperator = ""
        storeNum = num1.toString()
        num1 = null
    }else{
        storeNum = storeNum.substr(0,storeNum.length-1)
    }
    input = input.substr(0,input.length-1) // delete 1x
    if (storeNum[storeNum.length-1] === "-"){// kalau yang didelete angka negatif dan masih ada sisa tandanya
        storeNum = storeNum.substr(0,storeNum.length-1)
        input = input.substr(0,input.length-1)
    }
    if (input === '') { //kalau tidak ada yang di delete tampilkan 0
        input = "0"
    }
    updateScreen()
})
// END event del

// START event AC
const clear = document.querySelector("#AC")
clear.addEventListener("click", () => {
    input = "0"
    storeOperator = ""
    storeNum = ""
    num1 = null
    num2 = null
    updateScreen()
})
// END event AC

// START decimal saat diclick
const decimal = document.querySelector("#decimal")
decimal.addEventListener("click", () => {
    if(input === "0" && storeNum === "" && storeOperator===""){
        storeNum = "0"
    }
    if (isOperator(input[input.length-1]) === false && storeNum !== "" && storeNum.indexOf(".") === -1){
        input += decimal.value
        storeNum += decimal.value
    }
    updateScreen()
})
// END decimal saat diclick

// START percentage saat diclick
const percent = document.querySelector("#percentage")
percent.addEventListener("click", () => {
    if (num1 === null) { // jika angka sebelumnya tidak ada maka anggap angka sebelumnya 0
        input = "0"
        storeNum = ""
    }else if(isOperator(input[input.length-1]) === false){
        if (storeOperator === "+" || storeOperator === "-") { // bentuk persen dikalikan dengan angka sebelumnya kemudian ditambah atau dikurangi
            if (storeNum.indexOf(".") === -1) {
                storeNum = (num1 * (parseInt(storeNum) / 100))
            }else{
                storeNum = (num1 * (parseFloat(storeNum) / 100))
            }
        } else if(storeOperator === "×" || storeOperator === "/"){ // bentuk persen langsung ubah ke dsimal
            if (storeNum.indexOf(".") === -1) {
                storeNum = parseInt(storeNum) / 100
            }else{
                storeNum = parseFloat(storeNum) / 100
            }
        }
        num2 = storeNum
        toString(storeNum)
    }
    if(storeOperator !== "" && storeNum !== ""){// hitung persen
        calculate()
        storeOperator = ""
        storeNum = input
        num1 = null
        num2 = null
    }
    updateScreen()
})
// END percentage saat diclick