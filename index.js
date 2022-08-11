const btns = document.querySelectorAll(".btn");
const resultDiv = document.getElementById("js-result");

let result = 0;
let show = [];
let calFunc = [];
let calNum = "";
let isResult = false;

const paintResult = (value) => {
    show.push(value);
    const convertShow = show.join("");
    resultDiv.innerText = convertShow;
};
const checkNumber = (value) => {
    if (value === "0") return true;
    return Boolean(Number(value));
};
const convertNumber = (value) => {
    return Number(value);
};

const handleClick = (e) => {
    const value = e.target.innerText;
    const isNumber = checkNumber(value);

    if (isNumber) {
        if (isResult) {
            show = [];
            calNum = "";
            calFunc = [];
            isResult = false;
        }
        calNum += value;
        paintResult(value);
    }
    if (!isNumber) {
        isResult = false;
        if (value === "=") {
            if (calNum) {
                const item = convertNumber(calNum);
                calFunc.push(item);
                calFunc.forEach((__, index, arr) => {
                    if (index === 0) {
                        if (arr[1] === "+") result = arr[0] + arr[2];
                        if (arr[1] === "-") result = arr[0] - arr[2];
                        if (arr[1] === "*") result = arr[0] * arr[2];
                        if (arr[1] === "/") result = arr[0] / arr[2];
                    }

                    if (index % 2 === 1 && index !== 1) {
                        if (arr[index] === "+") result = result + arr[index + 1];
                        if (arr[index] === "-") result = result - arr[index + 1];
                        if (arr[index] === "*") result = result * arr[index + 1];
                        if (arr[index] === "/") result = result / arr[index + 1];
                    }
                });
            }
            calFunc = [];
            calNum = result;

            show = [];
            paintResult(result);

            isResult = true;
            return;
        }
        if (calNum) {
            const item = convertNumber(calNum);
            calFunc.push(item);
            calFunc.push(value); // [325 , "+" ]
            calNum = "";
            paintResult(value);
        } else {
            calFunc.pop();
            calFunc.push(value);
            show.pop();
            paintResult(value);
        }
    }
};

const init = () => {
    btns.forEach((btn) => {
        btn.addEventListener("click", handleClick);
    });
};

init();
