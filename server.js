const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://www.amazon.in/s?k=m21";

request(URL, function (err, res, body) {
  if (err) {
    console.log(err, "error occured while hitting URL");
  } else {
    const arr = [];
    let $ = cheerio.load(body);
    $(
      "div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28"
    ).each(function (index) {
      const data = $(this)
        .find("div.a-section.a-spacing-none>h2>a")
        .attr("href");
      const name = $(this)
        .find("div.a-section.a-spacing-none>h2>a>span")
        .text();
      console.log(data);
      console.log(name);
      const obj = {
        data: data,
        name: name,
      };
      //   console.log(obj);
      arr.push(JSON.stringify(obj));
    });
    // console.log(arr.toString());
    fs.writeFile("data.txt", arr, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
  }
});
