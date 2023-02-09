let allData = [];

//この中の処理はHTMLの要素が全部読み込まれてから動く
window.addEventListener('DOMContentLoaded', function(){
    getCSV();
    document.getElementById('strFilter').addEventListener('input', inputFilter);
    for (let radio of document.getElementsByName('roomGenre')) {
        radio.addEventListener('change', inputFilter);
    };
});

//csvからデータを取得
function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "rooms.csv", true);
    req.send(null);

    req.onload = function(){
	allData = convertCSVtoArray(req.responseText); 
    }
}
//csvのデータをjsの配列にコンパイル
function convertCSVtoArray(str){ // 10
    var result = []; 
    var tmp = str.split("\r\n"); 

    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }   

    //コンパイルしたデータを1番目以降の要素だけにスライス(0番目の要素をカット)
    let arrList = result.slice(1)
    //初期状態で表示させるもの
    let htmlWrite=document.getElementById('displayResult');
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="area"><div class="areaCol${labelColorId(e[3])}"></div><div class="areaNum">${e[3]}</div></div><div class="roomNameJp">${e[1]}</div></div>`).join(''));

    return arrList;
}

function radioFilterProgram() {
    let roomGenre = document.getElementById('radioFilter').elements['roomGenre'].value;
    if(roomGenre == "all"){
        return [""];
    }else if(roomGenre == "lab"){
        return ["研究室"];
    }else if(roomGenre == "atelier"){
        return ["アトリエ", "スタジオ", "工房", "デッサン"];
    }else if(roomGenre == "lecture"){
        return ["講義室", "演習室"];
    } 
}

function inputFilter(){    //fillBoxの今の内容を取得
    let inputValue = document.getElementById('strFilter').value;
    let radioValue = radioFilterProgram();

    //さっきの関数の戻り値の特定の値と照合・絞り込み
    let filtered = allData.filter(
        ([roomNum, name, subName, areaSymbol])=>{
            const nameFilter = name.includes(inputValue.toUpperCase()) && radioValue.some((value) => name.includes(value.toUpperCase()))
            const subNameFilter = subName.includes(inputValue.toUpperCase()) && radioValue.some((value) => subName.includes(value.toUpperCase()))
            return nameFilter || subNameFilter;
        }
    )
    
    //フィルターされた結果(filtered)をresultのdivに入れると同時にhtml/cssで扱いやすいように変形
    document.getElementById('displayResult').replaceChildren();

    document.getElementById('displayResult').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="area"><div class="areaCol${labelColorId(e[3])}"></div><div class="areaNum">${e[3]}</div></div><div class="roomNameJp">${e[1]}</div></div>`).join(''));
}

//エリアごとに色分けをする関数(labelColorId)
function labelColorId(areaSymbol){
    if(areaSymbol.slice(0,1) == "A"){
        return " a";
    }else if(areaSymbol.slice(0,1) == "B"){
        return " b";
    }else if(areaSymbol.slice(0,1) == "C"){
        return " c";
    }else if(areaSymbol.slice(0,1) == "D"){
        return " d";
    }else if(areaSymbol.slice(0,1) == "E"){
        return " e";
    }else if(areaSymbol.slice(0,1) == "F"){
        return " f";
    }else if(areaSymbol.slice(0,1) == "G"){
        return " g";
    }else if(areaSymbol.slice(0,1) == "P"){
        return " p";
    }else if(areaSymbol.slice(0,1) == "Q"){
        return " q";
    }else if(areaSymbol.slice(0,1) == "R"){
        return " r";
    }
}
function smartLabelColorId(str) { 
    return ` ${[...str][0].toLowerCase()}`;
}
