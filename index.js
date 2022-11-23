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

    // let filter=document.getElementById('input');

    let arrList = result.slice(1).map(e=>e.slice(1))
    
    let htmlWrite=document.getElementById('result');
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum">${e[1]}</div></div>`).join(''));

    return arrList; // 表に使う元データを返す感じ？OK

    // a 方針としては、まずこの関数を値を返すものに変えます
    // y なるほどなるほど
}

function inputFilter(){
    // やること：
    // 1. inputの今の内容を取得
    let inputValue = document.getElementById('input').value;

    // 2. さっきの関数の返り値（allDataに入っている）の特定の値と照合・絞り込み
    // ここで確か領域さんのコードを使う
    let filtered = allData.filter(
        ([name, symbol]) => name.includes(inputValue)
    );
    
    // 3. その結果をresultのdivに入れる
    document.getElementById('result').replaceChildren();
    document.getElementById('result').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum${sortColor(e[1])}">${e[1]}</div></div>`).join(''));
}
//returnをぶち込むんですよね ←とは？47行目のどこかにreturnをぶち込むんですよね?あれ...?
// returnは、関数からこれを出すよという宣言で、その関数の外では使いません
//結果じゃないんだっけ。じゃあfigureを入れればいいのかさっきのfigure.slice(何とか)と同様、関数の外では、「関数名(関数に入力した値)」と書くとその結果を意味します``で囲んだ文字列の中に何かの結果を挟むときは${何か}ですねなるほどな🆗いつ情報の出元を書くんだと思ったわ。ここで書くのか💯上の方にも足しますか？うーんこれよくわからんな
//${sortColor(e[1])} ←sortColor(figure)←sortColorが変数ですよね。
// （実は言語ごとに呼び方が違うんですけど）、上の行の中で「変数」と一般的に言うのはe[1]だけですね（厳密にはe）、figureは仮変数（←入力したものを仮に置き換えて呼ぶ名前なので）と言い、sortColorは関数です
//ただの函の名前かよsortColorまあそうですねok
//んではこの中の(e[1])が(figure)に変わってますけど56行目のfigureはe[1]をもとに入力してる?hな名前つけたのはわかりやすくするため?それで合っています。で、名前はわかりやすくというより、後で使えるようにか。はい、(...)←に入れたものを{...}←で使えるよlうにということですあー()カッコ空っぽでも呼び出せてはいるってことですよね。まあやらないと思いますけど()が空の場合は、{}の中で行われるものはすべて外にあるものと同じ名前を使う処理しかしないということですあーー。
//グローバルな値だとかなんだとかってやつですかね。そんな感じです。ok()の中に何かがあると、それがその関数の中で読み替えられることになります。e[0]を入れたらe[0]がfigureになって、e[1]とか"MOji"とか何でも入れたものが
//説明聞くより先に当ててきますか。動くか検証しないと。🆗
//コメントすげえ量あるjswww文芸的プログラミング（いいえ）（はい）
function sortColor(figure){
    //取得する取得はまず入力がないと始まらないので、上の括弧の中に適当な変数名を…okとりあえず仮置の名前にします
    // 括弧に入れた名前はこの関数内でしか有効でないので、名前は勝手に決めていいです...🆗これで入力されてくる値はこの関数の中でfigureと呼ばれることになるので、それを使っていきましょうok
    if(figure.slice(0,1) == "A"){
        return " a";
        // ""で囲むとただの文字列になるので、左に書いたやつを使います裸のAはAという名前を持つ何かで、"A"が「A」という字の意味になりますど忘れでしたね。
        //したっけ突っ込む?とりあえずここに出したい文字列を書きますかねいうても47行目のdiv class="areaNum"似続けて"a"を入れられればいいんですけどねじゃあ " a"だけ出力しますか？です
        // そうすると、一番原始的なのは、return （出したい文字列）; という感じになります
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
    } // ではこの関数はこれで終了、これを47行目とかに入れていきましょうですね入れてみましょうできます？今調べてます🆗

}

    //ifで振り分けるifの構文はわかります？
    // その前に、入力と出力の関係はどうしたいですか？
    // 値がAだったらclass="a",Bだったらclass="b"……みたいなことですか？そです
    //47行目で出したやつに突っ込まなきゃですよね
    // はい、そうですが、つまり目標としては、
    // 「入力された文字」→ class="○" ←ここに入力された文字の小文字を入れて返す、ということであってますか？
    //配列の1番目の要素にはA1みたいな感じでABCDE...と数字がセットで入ってるのでそれはできないかもしれない。
    //私が考えてたのは、「もしAが入ってたら(A1,A2,A3しかないが)、class="a"を<div class="areaNum,○←ここに追加">すっていう感じ
    // では、整理すると
    // 入力：「英文字1字 + 数字1字（そう）」
    // 出力：「class="英文字1字(小文字←いや別に大文字でもいいけどさ)"」
    // わかりました、その場合は自動的に最初の文字だけ取り出して、小文字にして文字列の中に放り込むという方がいいですね
    // そうすると、より簡単になると思います。ifは融通がきかないので、Aの時、Bの時…Zの時みたいに最悪26回書かないといけないので💀
    //まあ今回出てくる英文字はABCDEFGPQRSだけですけどね。(そういう話ではない)
    //でもまあ登場した文字を横流しにするほうが現実的ですね。if文の練習をしたいですか←どっちやるかって言われたらこっちwwwどうせいつまでも使うし？それとも文字切り出しの練習をしたいですか？
    // ではまあif文で書いてみましょう（どちらにしろ文字の照合は必要になりますね）
    //ですねえ
    // そうすると、ifの条件の中は = ではなく、先頭の文字が何である、という処理をかませないといけないです
    // {}終わってんの気づかなかった

window.addEventListener('DOMContentLoaded', function(){ // これでこの中の処理がHTMLの要素が全部読み込まれてから動くことになりますok

    getCSV();
    // const searchInput = ;
    // const htmlWrite = ;



    document.getElementById('input').addEventListener('input', inputFilter); //
    
});
//e[1]にはいってるABCDEF...なんですが。e[1]の内容を取得して、Aだったらclass="a"を挿入するみたいなことをして、
//ABCDEF...ごとに色を分けたいんですよね。
//というより配列の1番目のデータですね。1番目に入ってるデータにAが入ってたらこのクラス、Bだったらこのクラス...みたいにしたい。
//CSSはあくまでも与えられたクラスによって振り分けることがメインだわ。nth-childとかはできるようになりましたけどね💯
// なるほど
// 一旦配列のことは忘れて、内容によって出力を変えるという処理ですが
// なんとなくJSでのやり方はわかりそうですか？（if文を使う）←なんとなく...
//サクサク書いてみますね。どこから参照すればいいのかわからないけどfilltered?
// 例えば x という変数に"A"が入っていた時に、'class="A"'という文字列を出力すればいいという感じですか？
//というより配列の中のデータを参照してその値?にAが入ってたらこっち...みたいにしたいあ、そうですね書きまちがえました
//だからまあ「どっかから値を参照する(どうせアロー関数使う)」、「参照した結果に応じてifで振り分ける」だいたいそうですok
// このコードではHTMLを出力しているのが26行目と47行目なので、最終的にはそこに入ることになるのですが、
// 処理自体は単独でできるので、どこかに新しい関数を作って書いてみましょう
//ふりわけのためのfunction枠作りますね