const changeSelectLists = (inputValue) => {
  console.log("changeSelectLists")
  let inputValueSplit = inputValue.split("/");
  if (inputValueSplit[2] === "docs.google.com" && inputValueSplit[3] === "spreadsheets") {
    var url = "https://spreadsheets.google.com/feeds/worksheets/" + inputValueSplit[5] + "/public/basic?alt=json";
    console.log(url)
    document.getElementById("sel1").innerHTML = '<option value="">選択して下さい</option>';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        console.log(json.feed.entry.length);
        for (var i = 0; i < json.feed.entry.length; i++) {
          let op = document.createElement("option");
          op.value = inputValueSplit[5]+"/"+json.feed.entry[i].link[1].href.split("/")[6];  //value値
          op.text = json.feed.entry[i].content.$t;   //テキスト値
          document.getElementById("sel1").appendChild(op);
        }
        return false;
      });
   } else {
    console.log("スプレッドシートのURLではありません")
    return false;
  }
}

const createTable = (sheetValue) => {
  // 値(数値)から値(value値)を取得
  // https://spreadsheets.google.com/feeds/cells/+ sheetValue +/public/values?alt=json で作り直す
  const str = "https://spreadsheets.google.com/feeds/list/" + sheetValue + "/public/values?alt=json";
  console.log(str);
  const result = document.getElementById("result");
  document.getElementById("table").innerHTML = '';

  fetch(str)
    .then((response) => response.json())
    .then((json) => {
      //      console.log(Object.keys(json.feed.entry[1].filter(gsx => gsx.test(/gsx/))));
      //      console.log(Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx)));
      //console.log(json.feed["entry"]);
      //.filter(gsx => /gsx\$/.test(gsx))
      //        result.innerHTML = json.feed;        
      console.log(json);
      console.log("json.feed.entry[0]");
      //console.log(json.feed.entry[0]);

      let row = [];//Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx));
      for (let i = 0; i < json.feed.entry.length; i++) {
        for (v of Object.keys(json.feed.entry[i]).filter(gsx => /gsx\$/.test(gsx))) {
          console.log(i + ":" + v + ":長さ" + Object.keys(json.feed.entry[i]).filter(gsx => /gsx\$/.test(gsx)).length) + ":中身";
          if (row.indexOf(v) >= 0) {
            row.splice(row.indexOf(v), 0, v);
          } else {
            row[row.length] = v;
          }
          
          //          console.log(v);
        };
      };
      console.log("row");
//      row = row.filter((x, i, self) => self.indexOf(x) === i);
      console.log(row);
 
      let lineKeys = Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx));
      let tableDataTest = (new Array(json.feed.entry.length)).fill("").map(() => (new Array(row.length)).fill(""));
      console.log(tableDataTest);
      let tableData = (new Array(json.feed.entry.length)).fill("").map(() => (new Array(row.length)).fill(""));
      lineKeys.forEach((v, j) => {
        tableData[0][j] = v.replace(/gsx\$/g, "");
      });
//      console.log(lineKeys);
      console.log(tableData);


      for (let i = 0; i < json.feed.entry.length; i++) {
        //        table.push();
        //        console.log(json.feed.entry[i]);
        lineKeys.forEach((v, j) => {
//          tableData[i+1][j] = json.feed.entry[i][v].$t;
        });

        for (v of Object.keys(json.feed.entry[i]).filter(gsx => /gsx\$/.test(gsx))) {
//          console.log(i+":"+v+":長さ" + Object.keys(json.feed.entry[i]).filter(gsx => /gsx\$/.test(gsx)).length)+":中身";
        };


        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(json.feed.entry[i].content.$t));  //value値
        //            li.text = json.feed.entry[i].content.$t;   //テキスト値
        document.getElementById("table").appendChild(tr).appendChild(td);
      }
    return false;
    });
}

window.onload = function () {
  changeSelectLists(document.querySelector("#spreadsheetsURL").value);
};