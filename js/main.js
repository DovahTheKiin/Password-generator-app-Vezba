const passwordOutput = document.querySelector(".password-output")
const copyButton = document.querySelector(".copy-button")
const passwordLength = document.querySelector(".character-length-number")
const passwordRange = document.querySelector(".password-range")
const generatePasswordButton = document.querySelector(".generate-password-button")
const upperCheckbox = document.querySelector(".upper-checkbox")
const lowerCheckbox = document.querySelector(".lower-checkbox")
const numbersCheckbox = document.querySelector(".number-checkbox")
const symbolsCheckbox = document.querySelector(".symbol-checkbox")
const gauge = document.querySelectorAll(".gauge")
const leftRange = document.querySelector(".left-side")
const passwordStrenght = document.querySelector(".password-strength-gauge-p")
const copied = document.querySelector(".copied-p")


copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordOutput.innerHTML);
    copied.classList.remove("hidden");
})
passwordRange.addEventListener('input', () => {
    passwordLength.innerHTML = Math.ceil(Number(passwordRange.value)/5);

    if(passwordRange.value > 50) {
        leftRange.style.width = (Number(passwordRange.value) - 0.3) + '%';
    } else if(passwordRange.value < 51){
        leftRange.style.width = (Number(passwordRange.value) + 0.3) + '%';
    }
})

// FIRST

const upperCase = arrayFromLowToHigh(65, 90);
const lowerCase = arrayFromLowToHigh(97, 122);
const numbers = arrayFromLowToHigh(48, 57);
const symbols = arrayFromLowToHigh(33, 47).concat(arrayFromLowToHigh(91, 96)).concat(arrayFromLowToHigh(123, 126));


generatePasswordButton.addEventListener('click', (e) => {
    e.preventDefault();
    let passwordLengthNumber = Number(passwordLength.innerHTML);
    let upperChecked = upperCheckbox.checked;
    let lowerChecked = lowerCheckbox.checked;
    let numbersChecked = numbersCheckbox.checked;
    let symbolsChecked = symbolsCheckbox.checked;

    const password = generatePassword(passwordLengthNumber, upperChecked, lowerChecked, numbersChecked, symbolsChecked)

    passwordOutput.innerHTML = password;
    if(passwordLengthNumber === 0) {
        for(let i = 0;i<4;i++) {
            console.log(passwordLengthNumber)
            gauge[i].classList.remove("too-weak-gauge");
            gauge[i].classList.remove("weak-gauge");
            gauge[i].classList.remove("medium-gauge");
            gauge[i].classList.remove("strong-gauge");
            passwordStrenght.textContent = "";
        }
    }
    if(passwordLengthNumber > 0 && passwordLengthNumber < 5) {
        for(let i = 0;i<4;i++) {
            if(i<1) {
                gauge[i].classList.add("too-weak-gauge");
                gauge[i].classList.remove("weak-gauge");
                gauge[i].classList.remove("medium-gauge");
                gauge[i].classList.remove("strong-gauge");
                passwordStrenght.textContent = "TOO WEAK";
            } else {
                gauge[i].classList.remove("weak-gauge");
                gauge[i].classList.remove("medium-gauge");
                gauge[i].classList.remove("strong-gauge");
            }
        }
    }
    if(passwordLengthNumber >4 && passwordLengthNumber < 10) {
        for(let i = 0;i<4;i++) {
            if(i<2) {
                gauge[i].classList.remove("too-weak-gauge");
                gauge[i].classList.add("weak-gauge");
                gauge[i].classList.remove("medium-gauge");
                gauge[i].classList.remove("strong-gauge");
                passwordStrenght.textContent = "WEAK";
            } else {
                gauge[i].classList.remove("weak-gauge");
                gauge[i].classList.remove("medium-gauge");
                gauge[i].classList.remove("strong-gauge");
            }
        }
    }
    if(passwordLengthNumber >9 && passwordLengthNumber < 15) {
        for(let i = 0;i<4;i++) {
            if(i<3) {
                gauge[i].classList.remove("too-weak-gauge");
                gauge[i].classList.remove("weak-gauge");
                gauge[i].classList.remove("strong-gauge");
                gauge[i].classList.add("medium-gauge");
                passwordStrenght.textContent = "MEDIUM";
            } else {
                gauge[i].classList.remove("strong-gauge");
            }
        }
    }
    if(passwordLengthNumber >14 && passwordLengthNumber < 21) {
        for(let i = 0;i<4;i++) {
            gauge[i].classList.remove("too-weak-gauge");
            gauge[i].classList.remove("weak-gauge");
            gauge[i].classList.remove("medium-gauge");
            gauge[i].classList.add("strong-gauge");
            passwordStrenght.textContent = "STRONG";
        }
    }
    copied.classList.add("hidden");
});

function generatePassword(passwordLengthNumber, upperChecked, lowerChecked, numbersChecked, symbolsChecked) {
    let charCodes = [];
    if(upperChecked) charCodes = charCodes.concat(upperCase);
    if(lowerChecked) charCodes = charCodes.concat(lowerCase);
    if(numbersChecked) charCodes = charCodes.concat(numbers);
    if(symbolsChecked) charCodes = charCodes.concat(symbols);

    const passwordCharacters = [];

    for(let i=0;i<passwordLengthNumber;i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}


function arrayFromLowToHigh(low, high) {
    const array = [];
    for(let i = low;i<=high;i++) {
        array.push(i);
    }
    return array;
}

// SECOND

// const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const lowerCase = "abcdefghijklmnopqrstuvwxyz";
// const numbers = "1234567890"
// const symbols = " ~`!@#$%^&*()_-+={[}]|\"\\\':;<,>.?/";

// function createPassword(passwordLengthNumber, upper, lower, number, symbol) {

//     let passwordCharacters = "";

//     if(upper) passwordCharacters = passwordCharacters.concat(upperCase);
//     if(lower) passwordCharacters = passwordCharacters.concat(lowerCase);
//     if(number) passwordCharacters = passwordCharacters.concat(numbers);
//     if(symbol) passwordCharacters = passwordCharacters.concat(symbols);

//     console.log(passwordCharacters)
//     let lul = "";
//     for(let i=0;i<passwordLengthNumber;i++) {
//         lul += passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)];
//         console.log(lul)
//     }
//     return lul;
// }
// generatePasswordButton.addEventListener('click', () => {
//     let upper = upperCheckbox.checked;
//     let lower = lowerCheckbox.checked;
//     let number = numbersCheckbox.checked;
//     let symbol = symbolsCheckbox.checked;

//     let passwordLengthNumber = Number(passwordLength.innerHTML);
//     const password = createPassword(passwordLengthNumber, upper, lower, number, symbol)

//     passwordOutput.innerHTML = password;
// });