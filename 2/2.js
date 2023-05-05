/*Масив "arr" довжиною n+1 містить натуральні числа від 1 до n.
 Знайдіть будь-який елемент, що повторюється в масиві за оптимальний час (O(n)) не змінюючи вихідний масив і не використовуючи додаткову пам'ять.*/
const fs = require("fs");


function findDuplicates(arr) {
    return arr.filter((val, idx) => arr.indexOf(val) === idx && arr.lastIndexOf(val) !== idx);
}

function calculateRunningTime(func, ...args) {
    const startTime = performance.now();
    const result = func(...args);
    const endTime = performance.now();
    const time = endTime - startTime;

    return {
        time: time,
        result: result
    };
}

fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading input file:", err);
        return;
    }
    try {
        const {array} = JSON.parse(data)
        const result = calculateRunningTime(findDuplicates, array);
        fs.writeFile("result.json", JSON.stringify(result), err => {
            if (err) {
                console.error("Error writing output file:", err);
                return;
            }
            console.log("Output file has been written successfully!");
        });
    } catch (error) {
        console.error("Error parsing input data:", error);
    }
});

