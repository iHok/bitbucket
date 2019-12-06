function readSpreadsheets(){
  let spreadsheetsURLsplit = document.querySelector("#spreadsheetsURL").value.split("/");
  //console.log(spreadsheetsURL.value);
  //console.log(spreadsheetsURL.value.split("/"));
  //console.log(document.getElementsByTagName('head')[0])
  var url = "https://spreadsheets.google.com/feeds/worksheets/"+ spreadsheetsURLsplit[5] +"/public/basic?alt=json";
  console.log(url)
    document.getElementById("sel1").innerHTML = '';
fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json.feed);
//        result.innerHTML = json.feed;        
        // console.log(myJson.length);                                               
        for (var i=0; i<json.feed.entry.length; i++) {
            console.log(json.feed.entry[i].content.$t+":"+json.feed.entry[i].link[1].href);
 //           if(myJson[i].name == "中央線"){
 //               console.log("遅延しています");
 //               return true;
 //           }
            let op = document.createElement("option");
//            op.value = json.feed.entry[i].link[1].href;  //value値
//            op.value = json.feed.entry[i].link[1].href +"?alt=json";  //value値
            op.value = json.feed.entry[i].link[1].href.split("/")[6];  //value値
            op.text = json.feed.entry[i].content.$t;   //テキスト値
            document.getElementById("sel1").appendChild(op);

}

        return false;
    });
  }

    function createTable(){
      const sel1 = document.form1.sel1;

      // 値(数値)を取得
      const num = sel1.selectedIndex;
    
      // 値(数値)から値(value値)を取得
      const str = "https://spreadsheets.google.com/feeds/list/"+ spreadsheetsURLsplit[5]+"/"+sel1.options[num].value+"/public/values?alt=json";
      console.log(str);
      const result = document.getElementById("result");
      document.getElementById("table").innerHTML = '';

      fetch(str)
      .then((response) => response.json())
      .then((json) => {
          console.log(json);
  //        result.innerHTML = json.feed;        
          // console.log(myJson.length);                                               
          for (var i=0; i<json.feed.entry.length; i++) {
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
  
/*      .then((response2) => {console.log(response2.json())});
//      .then((response2) => response2.json())
//      .then((json2) => {
//        console.log(json2.feed);
//        for (var i=0; i<json2.feed.entry.length; i++) {
//        console.log(json2.feed.entry[i].content.$t+":"+json2.feed.entry[i].link[1].href);
//        }
        return false;
//      });

    };
*/

window.onload = function(){
  readSpreadsheets();
}