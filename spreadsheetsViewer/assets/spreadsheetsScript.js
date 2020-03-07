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

const jsonFeedEntryToTable = (v) => {
  console.log(v);
  for (let i = 0; i < v.length; i++) {
    console.log(v[i])
    //        console.log(json.feed.entry[i].gs$cell.row + ":" + json.feed.entry[i].gs$cell.col + ":" + json.feed.entry[i].gs$cell.$t);
//   tableData[Number(json.feed.entry[i].gs$cell.row - 1)][Number(json.feed.entry[i].gs$cell.col - 1)] = json.feed.entry[i].gs$cell.$t;
  };
    
};

const createTable = (sheetValue) => {
  // 値(数値)から値(value値)を取得
  const str = "https://spreadsheets.google.com/feeds/cells/" + sheetValue + "/public/values?alt=json";
  console.log(str);
  const result = document.getElementById("result");
  document.getElementById("table").innerHTML = '';
  fetch(str)
    .then((response) => response.json())
    .then((json) => {
      //      console.log(Object.keys(json.feed.entry[1].filter(gsx => gsx.test(/gsx/))));
      //      console.log(Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx)));
      //.filter(gsx => /gsx\$/.test(gsx))
      console.log("json");
      jsonFeedEntryToTable(json.feed.entry);

      let tableData = (new Array(Number(json.feed.gs$rowCount.$t))).fill("").map(() => (new Array(Number(json.feed.gs$colCount.$t))).fill(""));
      console.log(tableData);
 
      for (let i = 0; i < json.feed.entry.length; i++) {
        //        table.push();
        //        console.log(json.feed.entry[i]);



        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(json.feed.entry[i].content.$t));  //value値
        //            li.text = json.feed.entry[i].content.$t;   //テキスト値
        document.getElementById("table").appendChild(tr).appendChild(td);
      }

    });
  }

window.onload = function () {
  changeSelectLists(document.querySelector("#spreadsheetsURL").value);
};