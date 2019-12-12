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
      //      console.log(json);
      //        result.innerHTML = json.feed;        
      // console.log(myJson.length);                                               
      for (var i = 0; i < json.feed.entry.length; i++) {
        console.log(json.feed.entry[i]);

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