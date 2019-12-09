function readSpreadsheets() {
  let spreadsheetsURLsplit = document.querySelector("#spreadsheetsURL").value.split("/");
  var url = "https://spreadsheets.google.com/feeds/worksheets/" + spreadsheetsURLsplit[5] + "/public/basic?alt=json";
  console.log(url)
  document.getElementById("sel1").innerHTML = '';
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.feed);
      for (var i = 0; i < json.feed.entry.length; i++) {
        console.log(json.feed.entry[i].content.$t + ":" + json.feed.entry[i].link[1].href);
        let op = document.createElement("option");
        op.value = json.feed.entry[i].link[1].href.split("/")[6];  //value値
        op.text = json.feed.entry[i].content.$t;   //テキスト値
        document.getElementById("sel1").appendChild(op);
      }


      return false;
    });
}

function createTable() {
  const sel1 = document.form1.sel1;

  // 値(数値)を取得
  const num = sel1.selectedIndex;
  let spreadsheetsURLsplit = document.querySelector("#spreadsheetsURL").value.split("/");

  // 値(数値)から値(value値)を取得
  const str = "https://spreadsheets.google.com/feeds/list/" + spreadsheetsURLsplit[5] + "/" + sel1.options[num].value + "/public/values?alt=json";
  console.log(str);
  const result = document.getElementById("result");
  document.getElementById("table").innerHTML = '';

  fetch(str)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
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
  readSpreadsheets();
}