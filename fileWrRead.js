const fs = require("fs");

function fileWrRead(inputFile, outputFile, conversionFunc) {
    fs.readFile(inputFile, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading input file:", err);
            return;
        }

        try {
            const inputData = JSON.parse(data);
            const conversionParams = Object.values(inputData); // Extract values from the input data
            const result = conversionFunc(...conversionParams);
            const responseData = {
                result
            };

            fs.writeFile(outputFile, JSON.stringify(responseData), (err) => {
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
}


module.exports = fileWrRead;


