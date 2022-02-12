// let tableData = document.getElementsByTagName("td");
// console.log(tableData[0].innerHTML);
const fs = require("fs");
let data = fs.readFileSync("./categories.txt", "utf-8");
let data2 = data.split(",");
console.log(data2);

// fs.writeFileSync("cat.json", JSON.stringify(data2));

// let categories = [];

// for (let i = 0; i < tableData.length - 1; i++) {
//   // console.log(tableData[i].innerHTML);
//   categories.push(tableData[i].innerHTML);
// }

// let newCategories = categories.filter((el) => el);

// let newest = newCategories.filter((el) => !el.includes(" "));
// newest = newest.filter((el) => !el.includes(","));
// console.log(newest);

// let content = document.getElementsByName("h1");
// console.log(content);

// content.innerHTML = newest.toString();
