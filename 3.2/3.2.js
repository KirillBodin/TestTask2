/*Для цих змагань менеджер замовив певну кількість футболок різних розмірів. Усього надруковано футболки шести розмірів: S, M, L, XL, XXL, XXXL.
Для кожного розміру відома кількість футболок.Під час реєстрації організатори попросили кожного із n учасників вказати розмір футболки.
Учасник міг обрати 2 розміри, наприклад, M і L - це означає, що йому може підійти будь-яка з цих футболок.
Якщо учасник обирає 2 розміри, вони обов'язково повинні бути сусідніми. Це не може бути S та XXL.
Напишіть програму, яка визначить, чи можливо з футболок, які ми маємо, зробити подарунок усім спортсменам.
 */

const fileWrRead = require("../fileWrRead.js");

const tShirts = ['S', 'M', 'L', 'XL', 'XXL'];


function avaiableReplacements(tshirts) {
    const replacements = {};
    for (let i = 0; i < tshirts.length; i++) {
        const currentSize = tshirts[i];
        const prevShirt = i > 0 ? tshirts[i - 1] : null;
        const nextShirt = i < tshirts.length - 1 ? tshirts[i + 1] : null;

        replacements[currentSize] = [];

        if (prevShirt && prevShirt !== currentSize) {
            replacements[currentSize].push(prevShirt);
        }
        if (nextShirt && nextShirt !== currentSize) {
            replacements[currentSize].push(nextShirt);
        }
    }

    return replacements;
}

function checkRelatedSizes(athleteChoise) {
    for (let i = 0; i < athleteChoise.length - 1; i++) {
        const currentSize = tShirts.indexOf(athleteChoise[i]);
        const nextSize = tShirts.indexOf(athleteChoise[i + 1]);
        if (Math.abs(currentSize - nextSize) !== 1) {
            return false;
        }
    }

    return true;
}

console.log(avaiableReplacements(tShirts))

function checkQuantity(storageTshirts, athleteChoise) {
    const replacements = avaiableReplacements(tShirts);
    let isEnough = true;
    let currentReplacements = 0;
    let size = 0;
    for (let i = 0; i < athleteChoise.length; i++) {
        const athlete = athleteChoise[i];
        let selectedSize = null;
        for (let j = 0; j < athlete.sizes.length; j++) {
            size = athlete.sizes[j];
            currentReplacements = replacements[size];
            if (storageTshirts[size] > 0) {
                selectedSize = size;
                storageTshirts[selectedSize]--;
                break;
            } else if (storageTshirts[currentReplacements[0]] > 0) {
                if (checkRelatedSizes(size) === false) {
                    isEnough = "selected not the correct size of the T-shirt";
                    console.log("selected not the correct size of the T-shirt")
                    break;
                }
                selectedSize = currentReplacements[0];
                storageTshirts[selectedSize]--;
                break;
            } else if (storageTshirts[currentReplacements[1]] > 0) {
                selectedSize = currentReplacements[1];
                storageTshirts[selectedSize]--;
                break;
            }
        }
        if (!selectedSize) {
            isEnough = false;
            break;
        }

    }

    return {isEnough};
}


const data = "3.2/data.json";
const result = "3.2/result.json";
fileWrRead(data, result, checkQuantity);


