let allData = [];

//csvからデータを取得
function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "rooms.csv", true);
    req.send(null);

    req.onload = function(){
	allData = convertCSVtoArray(req.responseText); // 関数が返した値を入れる
    }
}
//csvのデータをjsの配列にコンパイル
function convertCSVtoArray(str){ 
    var result = []; 
    var tmp = str.split("\r\n"); 

    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }

    //コンパイルしたデータを1番目以降の要素だけにスライス(0番目の要素をカット)
    let arrList = result.slice(1).map(e=>e.slice(1))

    //初期状態で表示させるもの
    //html/cssで扱いやすいように変形
    let htmlWrite=document.getElementById('displayResult');
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="areaNum${labelColorId(e[1])}">${e[1]}</div><div class="roomNameJp">${e[0]}</div></div>`).join(''));

    //別の関数でもこの結果を使うために戻り値を作成
    return arrList;
}

//fillBoxに入れられた文字によってフィルし表示させるもの
function inputFilter(){
    //fillBoxの今の内容を取得
    let inputValue = document.getElementById('fillBox').value;

    //さっきの関数の戻り値（allDataに入っている）の特定の値と照合・絞り込み
    let filtered = allData.filter(
        //fillBoxに入力されたもの(inputValue)を0番目の値(ここではname)と大文字小文字関係なく照合させてフィルする
        ([name, areaSymbol]) => name.includes(inputValue.toUpperCase())
    );
    
    //フィルされた結果(filtered)をresultのdivに入れると同時にhtml/cssで扱いやすいように変形
    document.getElementById('displayResult').replaceChildren();
    document.getElementById('displayResult').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="areaNum${labelColorId(e[1])}">${e[1]}</div><div class="roomNameJp">${e[0]}</div></div>`).join(''));
}

//エリアごとに色分けをする関数(labelColorId)
function labelColorId(areaSymbol){
    //取得する取得はまず入力がないと始まらないので、上の括弧の中に適当な変数名を…okとりあえず仮置の名前にします
    // 括弧に入れた名前はこの関数内でしか有効でないので、名前は勝手に決めていいです...🆗これで入力されてくる値はこの関数の中でfigureと呼ばれることになるので、それを使っていきましょうok
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
// おまけ:上のlabelColorIdの1行で終わる版(jsにおいては動かさない関数を置いておいても無害)
function smartLabelColorId(str) { 
    return ` ${[...str][0].toLowerCase()}`;
}
//この中の処理はHTMLの要素が全部読み込まれてから動く
window.addEventListener('DOMContentLoaded', function(){ 

    getCSV();
    // const searchInput = ;
    // const htmlWrite = ;

    document.getElementById('fillBox').addEventListener('input', inputFilter);
    
});