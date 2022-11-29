let allData = [];

function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "rooms.csv", true);
    req.send(null);

    req.onload = function(){
	allData = convertCSVtoArray(req.responseText); // 関数が返した値を入れる
    }
}
 
function convertCSVtoArray(str){ 
    var result = []; 
    var tmp = str.split("\r\n"); 

    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }

    // let filter=document.getElementById('sortBox');

    let arrList = result.slice(1).map(e=>e.slice(1))
    
    let htmlWrite=document.getElementById('result');
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="areaNum${sortColor(e[1])}">${e[1]}</div><div class="roomNameJp">${e[0]}</div></div>`).join(''));

    return arrList; // 表に使う元データを返す感じ？OK

    // a 方針としては、まずこの関数を値を返すものに変えます
    // y なるほどなるほど
}

function inputFilter(){
    // やること：
    // 1. inputの今の内容を取得
    let inputValue = document.getElementById('sortBox').value;

    // 2. さっきの関数の返り値（allDataに入っている）の特定の値と照合・絞り込み
    // ここで確か領域さんのコードを使う
    let filtered = allData.filter(
        ([name, symbol]) => name.includes(inputValue.toUpperCase())
    );
    
    // 3. その結果をresultのdivに入れる
    document.getElementById('result').replaceChildren();
    document.getElementById('result').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="areaNum${sortColor(e[1])}">${e[1]}</div><div class="roomNameJp">${e[0]}</div></div>`).join(''));
}
function sortColor(figure){
    if(figure.slice(0,1) == "A"){
        return " a";
    }else if(figure.slice(0,1) == "B"){
        return " b";
    }else if(figure.slice(0,1) == "C"){
        return " c";
    }else if(figure.slice(0,1) == "D"){
        return " d";
    }else if(figure.slice(0,1) == "E"){
        return " e";
    }else if(figure.slice(0,1) == "F"){
        return " f";
    }else if(figure.slice(0,1) == "G"){
        return " g";
    }else if(figure.slice(0,1) == "P"){
        return " p";
    }else if(figure.slice(0,1) == "Q"){
        return " q";
    }else if(figure.slice(0,1) == "R"){
        return " r";
    }
}

function smartSortColor(str) { // おまけ: 上のsortColorの1行で終わる版
    return ` ${[...str][0].toLowerCase()}`;
}

window.addEventListener('DOMContentLoaded', function(){ // これでこの中の処理がHTMLの要素が全部読み込まれてから動くことになりますok
    getCSV();
    // const searchInput = ;
    // const htmlWrite = ;
    document.getElementById('sortBox').addEventListener('sortBox', inputFilter); //
    
});