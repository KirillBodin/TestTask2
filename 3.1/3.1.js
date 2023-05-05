/*
На змаганнях з паверліфтингу використовуються дискові навантажувачі вагою 0.5, 1, 2.5, 5, 10, 15, 20 та 25 кг.
    Також ми маємо американські дискові навантажувачі вагу яких визначено у lbs. Такі  дискові навантажувачі є тільки в 10, 25, 35, 45 фунтів.
    Гриф на штанзі завжди один і дорівнює 20кг.

    Потрібно знайти таку комбінацію дисковихі навантажувачів, щоб вага на штанзі була мінімальною, але перевищувала максимальний рекорд. Наприклад, Спортсмен номер 1 підняв 101 кг використовуючи гриф 20кг, 4 дискових навантажувачі по 20 кг та два по 0.5.
    Для того щоб перевершити вагу попереднього спортсмена, Спортсмену номер 2 буде оптимально підняти 101.44 які можна отримати з грифу 20 кг і двох дискових навантажувачів наступних найменувань  1, 2.5, 10, кг та 25, 35 lbs.

    Треба написати програму, яка за заданою вагою буде знаходити мінімальний наступний.

! Важливо, що  дискові навантажувачі будь-якої ваги вішаються на штангу попарно. Так само на штанзі може бути не більше 24 дискових  навантажувачі, тобто максимум 12 з кожного боку.
*/

const fs = require('fs');

function getWeights(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const {pounds, kilograms} = JSON.parse(data);

    const combinedArray = pounds.map(lbs => lbs * 0.453592).concat(kilograms);
    return combinedArray.sort((a, b) => b - a);
}

const data = "data.json";
const result = "result.json";
console.log(getWeights(data))


function getClosestNumber(target, weights, resultFile) {
    let optimum = 0;
    let optimum_distance = target;
    let sums = [0];

    for (let i = 0; i < weights.length; i++) {
        let weight = weights[i];
        let newSums = [];
        for (let j = 0; j < sums.length; j++) {
            let sum = sums[j];
            if (true) // An optimisation could be added here
            {
                newSums.push(sum)
                let newSum = sum + weight;
                let distance = Math.abs(target - newSum)
                if (newSum <= target) {
                    newSums.push(newSum)
                    if (distance < optimum_distance) {
                        optimum = newSum;
                        optimum_distance = distance;
                    }
                } else if (distance < optimum_distance || (distance == optimum_distance && newSum > optimum)) {
                    optimum = newSum;
                    optimum_distance = distance;
                    newSums.push(newSum)
                }
            }
        }
        sums = newSums;
    }


    const result = {optimum};

    fs.writeFileSync(resultFile, JSON.stringify(result));

    console.log("Output file has been written successfully!");
}


getClosestNumber(200, getWeights(data), result);


//Це завдання не закінчено

