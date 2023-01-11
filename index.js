let allData = []; // 1 あ、ちょっと下に行かせてください

//この中の処理はHTMLの要素が全部読み込まれてから動く
window.addEventListener('DOMContentLoaded', function(){ // 2 ←なぜなら DOMContentLoaded がページ読み込み時に働くため
    getCSV(); // 3 // 14（終了したので戻ってくる）
    // const searchInput = ;
    // const htmlWrite = ;
    document.getElementById('strFilter').addEventListener('input', inputFilter);
    // document.getElementsByName('roomGenre') ←この行はもういらない
    // まずgetElementsByNameの結果をofの後ろに入れられるようにします
    for (let radio of document.getElementsByName('roomGenre')) {
        radio.addEventListener('change', inputFilter); // たぶん🆗で、こんどはinputではなく、changeですかねそこに入るのは……？🆗その一個一個がradioに入るので、それを個別に処理
    };
    // 挙動が変なのは、ラジオボタンの選択時に何も処理をかけていないからですふぇ↑の処理をラジオボタンの分も用意するというと?調べてます…ouf
    // document.getElementByName(なんとか).addEventListener(かんとか, inputFilter); までは確か
    // で、さっき使ったのと同じfor文ですね嫌いなやつだ…何を回すんだ...getElement"s"ByNameでした…IdはElementなのにか複数個取れるのであーそれをforで回す
});

//csvからデータを取得
function getCSV(){ // 4
    var req = new XMLHttpRequest(); // 5
    req.open("get", "rooms.csv", true); // 6
    req.send(null); // 7

    req.onload = function(){ // 8
    //関数(convertCSVtoArray)の戻り値(arrList)を入れる
	allData = convertCSVtoArray(req.responseText); // 9 // 12（戻ってくる）
    // ↑ 「reqのresponseTextをconvertCSVtoArrayしたものを、allDataに入れる」
    //というかこういう概念がわからない場合は、本当に「なでしこ」とか「プロデル」を触った方がいいかもしれません……（）
    //うーん（なぜなら日本語として読めるので）
    }
} // 13 （なにもせずに終了）
//csvのデータをjsの配列にコンパイル
function convertCSVtoArray(str){ // 10
    var result = []; 
    var tmp = str.split("\r\n"); 

    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }   

    //コンパイルしたデータを1番目以降の要素だけにスライス(0番目の要素をカット)
//    let arrList = result.slice(1).map(e=>e.slice(1))//ここでできるのか
    let arrList = result.slice(1)
    //初期状態で表示させるもの
    //html/cssで扱いやすいように変形
    let htmlWrite=document.getElementById('displayResult');
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="area"><div class="areaCol${labelColorId(e[3])}"></div><div class="areaNum">${e[3]}</div></div><div class="roomNameJp">${e[1]}</div><div class="roomNum">${e[0]}</div></div>`).join(''));

    return arrList;// ここを順番としては11 
}

function radioFilterProgram() { // ここに適当な名前の関数と処理を、たぶん引数はいらない考えておくので進んでもらっていいです
    let roomGenre = document.getElementById('radioFilter').elements['roomGenre'].value;
    //以下roomGenreの値によってlabelColorIdみたいなことをするのですが…………
    if(roomGenre == "all"){
        return [""]; // 直しましたあ、そういうことか()はい、1個もないと値を返してくれないので
    }else if(roomGenre == "lab"){
        return ["研究室"];
    }else if(roomGenre == "atelier"){
        return ["アトリエ", "工房", "デッサン"]; // 諸事情により追加なるほど増やしても大丈夫ですかね増やしても大丈夫になるように作ると↓のやばいものになるわけですああああああなので大丈夫です
    }else if(roomGenre == "lecture"){ //一体何が、いけなかったんでしょうかね〜(syamu)😇
        return ["講義室"];
    } 
    // こんな感じ配列を返す?はい、配列はあ、もしかしてまだ出てきてない…CSVの行みたいなものですまあやったはやったけどさっきのがだめでこっちはいいのかなるほど "あ" || "い" と書くと、絶対"あ"だけになります。||というのは、前の値が偽（だいたい値がないこと）の時は後ろを取るということなので、"あ"は値があるのでそのまま"あ"になります。
    //あがあるから十中八九あしか選ばれないってことかそうです100%です←かっこよ決まりなので😇←インテリ系の登場人物のセリフぅ←ちょっとうざい系閑話休題()🤓←インテリ系えぇ...
    // というか二つあるケースを忘れていたので、文字列ではなく配列を返すようにしましょう……すみませんおうふ...
    //調べます。その書き方はいいところまで行くのですが、残念ながらアトリエしか返らないと思います
    //次はどうしよう、で、この関数の結果をどこかに入れますinputFilterですかね
}

function inputFilter(){    //fillBoxの今の内容を取得
    let inputValue = document.getElementById('strFilter').value;
    let radioValue = radioFilterProgram();

    //さっきの関数の戻り値（allDataに入っている）の特定の値と照合・絞り込み
    let filtered = allData.filter(
        ([roomNum, name, subName, areaSymbol])=>{
            const nameFilter = name.includes(inputValue.toUpperCase()) && radioValue.some((value) => name.includes(value.toUpperCase()))
            const subNameFilter = subName.includes(inputValue.toUpperCase()) && radioValue.some((value) => subName.includes(value.toUpperCase()))
            return nameFilter || subNameFilter;
        }
    )
    
    //フィルされた結果(filtered)をresultのdivに入れると同時にhtml/cssで扱いやすいように変形
    document.getElementById('displayResult').replaceChildren();

    document.getElementById('displayResult').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="area"><div class="areaCol${labelColorId(e[3])}"></div><div class="areaNum">${e[3]}</div></div><div class="roomNameJp">${e[1]}</div><div class="roomNum">${e[0]}</div></div>`).join(''));
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
