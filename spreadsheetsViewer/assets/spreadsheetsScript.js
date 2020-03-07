const changeSelectLists = async (inputValue) => {
  document.getElementById("sel1").innerHTML = '<option value="">選択して下さい</option>';
  let inputValueSplit = inputValue.split("/");
  let retrunJson = await gSpreGetSheets(inputValue);
  console.log("retrunJson");
  console.log(retrunJson);
  for (var i = 0; i < retrunJson.feed.entry.length; i++) {
    let op = document.createElement("option");
    op.value = inputValueSplit[5]+"/"+retrunJson.feed.entry[i].link[1].href.split("/")[6];  //value値
    op.text = retrunJson.feed.entry[i].content.$t;   //テキスト値
    document.getElementById("sel1").appendChild(op);
  }
}
  
const createTable = async (sheetValue) => {
    // 値(数値)から値(value値)を取得
  let retrunCellsJson = await gSpreGetCells(sheetValue);
  document.getElementById("table").innerHTML = '';
  let tableData = (new Array(Number(retrunCellsJson.feed.gs$rowCount.$t))).fill("").map(() => (new Array(Number(retrunCellsJson.feed.gs$colCount.$t))).fill(""));
  console.log(tableData);

  for (let i = 0; i < retrunCellsJson.feed.entry.length; i++) {

      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.appendChild(document.createTextNode(retrunCellsJson.feed.entry[i].content.$t));  //value値
      //            li.text = retrunCellsJson.feed.entry[i].content.$t;   //テキスト値
      document.getElementById("table").appendChild(tr).appendChild(td);
    }

}
  
  window.onload = function () {
    changeSelectLists(document.querySelector("#spreadsheetsURL").value);
  };