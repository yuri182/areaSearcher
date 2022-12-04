let allData = []; // 1 あ、ちょっと下に行かせてください

//この中の処理はHTMLの要素が全部読み込まれてから動く
window.addEventListener("DOMContentLoaded", () => { // 2 ←なぜなら DOMContentLoaded がページ読み込み時に働くため
    getCSV(); // 3 // 14（終了したので戻ってくる）
    // const searchInput = ;
    // const htmlWrite = ;
    document.getElementById("strFilter").addEventListener("input", inputFilter);
    // document.getElementsByName('roomGenre') ←この行はもういらない
    // まずgetElementsByNameの結果をofの後ろに入れられるようにします
    for (const radio of document.getElementsByName("roomGenre")) {
        radio.addEventListener("change", inputFilter); // たぶん🆗で、こんどはinputではなく、changeですかねそこに入るのは……？🆗その一個一個がradioに入るので、それを個別に処理
    }
    // 挙動が変なのは、ラジオボタンの選択時に何も処理をかけていないからですふぇ↑の処理をラジオボタンの分も用意するというと?調べてます…ouf
    // document.getElementByName(なんとか).addEventListener(かんとか, inputFilter); までは確か
    // で、さっき使ったのと同じfor文ですね嫌いなやつだ…何を回すんだ...getElement"s"ByNameでした…IdはElementなのにか複数個取れるのであーそれをforで回す
});

//csvからデータを取得
function getCSV() { // 4
    const req = new XMLHttpRequest(); // 5
    req.open("get", "rooms.csv", true); // 6
    req.send(null); // 7

    req.onload = function () { // 8
        //関数(convertCSVtoArray)の戻り値(arrList)を入れる
        const csvArray = convertCSVtoArray(req.responseText); // 9 // 12（戻ってくる）
        // ↑ 「reqのresponseTextをconvertCSVtoArrayしたものを、allDataに入れる」
        //というかこういう概念がわからない場合は、本当に「なでしこ」とか「プロデル」を触った方がいいかもしれません……（）
        //うーん（なぜなら日本語として読めるので）

        const displayResult = document.getElementById("displayResult");

        allData = csvArray.map((data, index) => {
            const [ name, areaSymbol ] = data;
            const arr = document.createElement("div");
            arr.classList.add("arr");
            if (index % 2) arr.classList.add("odd-child");

            const areaName = document.createElement("div");
            areaName.classList.add("areaNum", areaSymbol[0].toLowerCase());
            areaName.textContent = areaSymbol;

            const roomNameJp = document.createElement("div");
            roomNameJp.className = "roomNameJp";
            roomNameJp.textContent = name;

            arr.appendChild(areaName);
            arr.appendChild(roomNameJp);

            displayResult.appendChild(arr);

            return { csvData: data, htmlElement: arr };
        });
    };
} // 13 （なにもせずに終了）
//csvのデータをjsの配列にコンパイル
function convertCSVtoArray(str) { // 10
    const result = [];
    const tmp = str.split("\r\n");

    for (let i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(",");
    }

    //コンパイルしたデータを1番目以降の要素だけにスライス(0番目の要素をカット)
    const arrList = result.slice(1).map(e => e.slice(1)); //ここでできるのか

    //関数(convertCSVtoArray)の結果を別の場所で使用可能な形に定義(戻り値)?
    //関数というのは定型処理のことで、例えばarr（入ってきた値）の性質に応じて適切なarrList（出力）を返すものです
    //例えば3+1=4ですが、これは
    // function plus(n) { let result = n+1; return result; }
    //という関数に3を与えたものと考えられます。つまりplusの外でplus(3)という風に書くと、実質この"plus(3)"が"4"という数のように使えるということです
    //例えば↑のplus()の外で、let a = plus(4); と書くと、4がまずplusのnに入り、4+1がresultになり、resultが戻り値になるので、
    //let a = plus(4); が let a = 5; と書くのと同じになるという効果です
    //大体わかりました...
    //最初のgetCSV()のように戻り値を返さない関数もあります...
    //こういうのは中に書いてある処理だけをやって、それ自体の結果は返さないので
    //たとえば let x = getCSV(); と書いても x は空のままです
    //getCSV()が確かに働いた証として、allDataの値が変わったりはしますが
    //処理同士が引っ絡まっててわからん...順番通りに処理されるわけじゃないから書いてある順番がぐちゃぐちゃ()
    //順番について言うと、function nantoka(){}と書いたものは、それが使われるまでは何もしません
    //なのでこのコードで実際に処理される順番を順に書き出すと
    //なんだろう順番はなんとなくわかりました
    //arrListてconvertCSVtoArrayの結果じゃないですか?そうです
    //結果より先にarrListを使ってるのはなぜ...？関数の中でですか？外でですか？中です
    //外ではconvertCSVtoArrayって名前で動くはずなので
    //ああなるほど
    //😇結果を出すより先に使うのが謎すぎて先へ進めない
    //そういう意味でarrListが結果なのではなく、return arrList; と書くと、arrListとして作ったものがこの時点で結果となって外に出ていきますという意味です
    //そういうことか。arrListができるのはlet文（宣言という）を書いた時です
    return arrList; // ここを順番としては11
    //名前を使ってreturnすると💯
    //再読文字みたいなもんです?まあそうですね（笑）まあ何回でも使えるので、使った分だけこの関数の中が処理されます
    //行ったり来たりでわからなくなるぅ()
    //基本的に関数は頭の中で「～したもの」と読み替えるといいです
    // convertCSVtoArray(str)は「strをconvertCSVtoArrayしたもの」
    //余計ややこしくなってしまった何かすみませんあああああ
}

//なんかここらへんに書いたほうが順番的に正しいのでは?
//コード上の順番もそうですが、たぶんどこかの関数の中に差し込む形になる気がしますoh
//方針としては、
// - ラジオボタンが選択された時に結果の一覧をフィルターする
// - 自由記述欄に変化があった時（←実装済み）の結果の一覧にラジオボタンの選択を反映させる
// なのでとりあえずラジオボタンの今の値をフィルターすべき文字列に変換する関数を立てる、ということでいいですか？
// 自由記述欄にラジオボタンでフィルターする文字列が勝手に入力されたりしなければいいです。まあそうですね（スタイリングはCSSでどうにでもできます）
//じゃあこれではい

/*
function radioFilterProgram() { // ここに適当な名前の関数と処理を、たぶん引数はいらない考えておくので進んでもらっていいです
    const roomGenre = document.getElementById("radioFilter").elements["roomGenre"].value;
    //以下roomGenreの値によってlabelColorIdみたいなことをするのですが…………
    if (roomGenre == "all") {
        return [""]; // 直しましたあ、そういうことか()はい、1個もないと値を返してくれないので
    } else if (roomGenre == "lab") {
        return ["研究室"];
    } else if (roomGenre == "atelier") {
        return ["アトリエ", "工房", "デッサン"]; // ししししし諸事情により追加なるほど増やしても大丈夫ですかね増やしても大丈夫になるように作ると↓のやばいものになるわけですああああああなので大丈夫です
    } else if (roomGenre == "lecture") { //一体何が、いけなかったんでしょうかね〜(syamu)😇
        return ["講義室"];
    }
    // はいこれで関数終了ですおめでとうございます←
    // こんな感じ配列を返す?はい、配列はあ、もしかしてまだ出てきてない…CSVの行みたいなものですまあやったはやったけどさっきのがだめでこっちはいいのかなるほど "あ" || "い" と書くと、絶対"あ"だけになります。||というのは、前の値が偽（だいたい値がないこと）の時は後ろを取るということなので、"あ"は値があるのでそのまま"あ"になります。
    //あがあるから十中八九あしか選ばれないってことかそうです100%です←かっこよ決まりなので😇←インテリ系の登場人物のセリフぅ←ちょっとうざい系閑話休題()🤓←インテリ系えぇ...
    // というか二つあるケースを忘れていたので、文字列ではなく配列を返すようにしましょう……すみませんおうふ...
    //調べます。その書き方はいいところまで行くのですが、残念ながらアトリエしか返らないと思います
    //次はどうしよう、で、この関数の結果をどこかに入れますinputFilterですかね
}
*/

//let radioFilterProgram = document.getElementById('radioFilter')
//半日掛かりそうもうわからんちょっと正しいか今調べてます…たぶんこれでいいと思います
//...この場合はHTML側でformの中に入れたので、document.getElementById('radioFilter').elements['roomGenre'].value;で取れないですかね？
//これの意味は、さっき<form>を作ったのでdocument.getElementById('radioFilter')するとform要素が取れて、その中のinputなどの一覧がelementsとしてアクセスできる→elementsが'roomGenre'なやつのvalueを特定するってことですよねそうです

//fillBoxに入れられた文字によってフィルし表示させるもの
function inputFilter() { //fillBoxの今の内容を取得
    const inputValue = document.getElementById("strFilter").value;
    const radioValue = document.getElementById("radioFilter").elements.roomGenre.value;
    const radioFilter = {
        all: [""],
        lab: ["研究室"],
        atelier: ["アトリエ", "工房", "デッサン"],
        lecture: ["講義室"]
    }[radioValue];
    const upperCaseInput = inputValue.toUpperCase();
    let index = 0;

    //さっきの関数の戻り値（allDataに入っている）の特定の値と照合・絞り込み
    allData.forEach(data => {
        const name = data.csvData[0];
        const element = data.htmlElement;

        if (name.includes(upperCaseInput) && radioFilter.some(value => name.includes(value))) {
            // delete style "display: none" from element
            element.style.display = "";

            if (index % 2) {
                element.classList.add("odd-child");
            } else {
                element.classList.remove("odd-child");
            }
            index++;
        } else {
            // add style "display: none" to element
            element.style.display = "none";
        }
    });
}

/*
//エリアごとに色分けをする関数(labelColorId)
function labelColorId(areaSymbol) {
    //取得する取得はまず入力がないと始まらないので、上の括弧の中に適当な変数名を…okとりあえず仮置の名前にします
    // 括弧に入れた名前はこの関数内でしか有効でないので、名前は勝手に決めていいです...🆗これで入力されてくる値はこの関数の中でfigureと呼ばれることになるので、それを使っていきましょうok
    if (areaSymbol.slice(0, 1) == "A") {
        return " a";
    } else if (areaSymbol.slice(0, 1) == "B") {
        return " b";
    } else if (areaSymbol.slice(0, 1) == "C") {
        return " c";
    } else if (areaSymbol.slice(0, 1) == "D") {
        return " d";
    } else if (areaSymbol.slice(0, 1) == "E") {
        return " e";
    } else if (areaSymbol.slice(0, 1) == "F") {
        return " f";
    } else if (areaSymbol.slice(0, 1) == "G") {
        return " g";
    } else if (areaSymbol.slice(0, 1) == "P") {
        return " p";
    } else if (areaSymbol.slice(0, 1) == "Q") {
        return " q";
    } else if (areaSymbol.slice(0, 1) == "R") {
        return " r";
    }
}
// おまけ:上のlabelColorIdの1行で終わる版(jsにおいては動かさない関数を置いておいても無害)
function smartLabelColorId(str) {
    return ` ${[...str][0].toLowerCase()}`;
}
*/

//動いてない()
