
let spreadsheetsURLsplit = document.querySelector("#spreadsheetsURL").value.split("/");
//console.log(spreadsheetsURL.value);
//console.log(spreadsheetsURL.value.split("/"));
//console.log(document.getElementsByTagName('head')[0])
var url = "https://spreadsheets.google.com/feeds/worksheets/"+ spreadsheetsURLsplit[5] +"/public/basic?alt=json";
console.log(url)

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
        }
        return false;
    });


    function createSelectBox(){
        //連想配列の配列
        var arr = [
          {val:"01", txt:"ポチ"},
          {val:"02", txt:"タマ"},
          {val:"03", txt:"モモ"}
        ];
       
        //連想配列をループ処理で値を取り出してセレクトボックスにセットする
        for(var i=0;i<arr.length;i++){
          let op = document.createElement("option");
          op.value = arr[i].val;  //value値
          op.text = arr[i].txt;   //テキスト値
          document.getElementById("sel1").appendChild(op);
        }
      };