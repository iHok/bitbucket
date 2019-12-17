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
  const str = "https://spreadsheets.google.com/feeds/list/" + sheetValue + "/public/values?alt=json";
  console.log(str);
  const result = document.getElementById("result");
  document.getElementById("table").innerHTML = '';

  fetch(str)
    .then((response) => response.json())
    .then((json) => {
      //      console.log(Object.keys(json.feed.entry[1].filter(gsx => gsx.test(/gsx/))));
      //      console.log(Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx)));
      console.log(json["feed"]["entry"]);
      //.filter(gsx => /gsx\$/.test(gsx))
      //        result.innerHTML = json.feed;        
      // console.log(myJson.length);

      let lineKeys = Object.keys(json.feed.entry[0]).filter(gsx => /gsx\$/.test(gsx));
      let tableData =  (new Array(json.feed.entry[0].length)).fill("").map(() => (new Array(lineKeys.length)).fill(""));;
      console.log(tableData);
      for (v of lineKeys) {
        tableData.push(v[0].replace(/gsx\$/g, ""))
        //        console.log(json.feed.entry.[v].content.$t)
      };
      for (let i = 0; i < json.feed.entry.length; i++) {
        //        table.push();
        //        console.log(json.feed.entry[i]);
        for (v of lineKeys) {
//          tableData[i + 1].push("test");        
        };
  
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(json.feed.entry[i].content.$t));  //value値
        //            li.text = json.feed.entry[i].content.$t;   //テキスト値
        document.getElementById("table").appendChild(tr).appendChild(td);
      }
      console.log(tableData);
    return false;
    });
}

window.onload = function () {
  changeSelectLists(document.querySelector("#spreadsheetsURL").value);
};