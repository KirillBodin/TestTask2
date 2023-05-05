/*Завдання 1.  Два друга грають у гру, вони обидва загадують число.
    Перший повинен перетворити одне число на інше за допомогою множення цього числа на 2 (10 * 2 = 20) або додаванням одиниці праворуч (10 + 1 = 101).

    Потрібно написати програму, яка буде знаходити, чи можливо одне число перетворити на інше, використовуючи лише перераховані вище операції.*/

const fileWrRead = require("../fileWrRead.js");


function convertNum(num1, num2) {
    if (num1 === num2) {
        return true;
    }

    if (num2 < num1) {
        return false;
    }

    while (num2 > num1) {
        if (num2 % 2 === 0) {
            num2 /= 2;
        } else {
            if (num2.toString().charAt(num2.length - 1) === "1") {
                num2 = (num2 - 1) / 10;
            } else {
                return false;
            }
        }
    }

    return num2 === num1;
}

const data = "data.json";
const result = "result.json";
fileWrRead(data, result, convertNum);


