/*
У театрі є прямокутна сцена розміром n* m. Для розміщення акторів на сцені директор театру надав вам план, де вказано, де мають стояти актори, а де ні.
    На сцені встановлений прожектор, який може освітлювати в одному з чотирьох напрямків: ліворуч, вгору, вправо або донизу,
    якщо дивитися на сцену зверху. Таким чином, позиція прожектора визначається клітиною, в якій він встановлений, та напрямком, в якому він світить.
    Вам необхідно обрати “хорошу позицію” для встановлення прожектора на сцені, за якої будуть виконуватися дві умови:
    у вибраній клітці не повинно бути актора, а в напрямку, куди світитиме прожектор, повинен бути хоча б один актор.
    Вам потрібно визначити кількість можливих “хороших позицій”, де можна встановити прожектор на сцені.
    Дві позиції вважаються різними, якщо вони відрізняються клітиною, де встановлений прожектор, або напрямком, в якому він світить.
*/
const fileWrRead = require("../fileWrRead.js");

function findActor(stage, i, j, di, dj) {
    const n = stage.length;
    const m = stage[0].length;

    while (i >= 0 && i < n && j >= 0 && j < m) {
        if (stage[i][j] === "A") {
            return true;
        }
        i += di;
        j += dj;
    }
    return false;
}


function positions(stage) {
    let counter = 0;
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[0].length; j++) {
            if (stage[i][j] === ".") {
                let left = findActor(stage, i, j - 1, 0, -1);
                let right = findActor(stage, i, j + 1, 0, 1);
                let up = findActor(stage, i - 1, j, -1, 0);
                let down = findActor(stage, i + 1, j, 1, 0);
                if (left || up || right || down) {
                    counter++;
                }
            }
        }
    }

    return counter;
}


const data = "data.json";
const result = "result.json";
fileWrRead(data, result, positions);
