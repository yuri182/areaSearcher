let allData = [];

function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "rooms.csv", true);
    req.send(null);

    req.onload = function(){
	allData = convertCSVtoArray(req.responseText); // ←関数が返した値を入れる
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
    htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum">${e[1]}</div>`).join(''));

    return arrList; // 表に使う元データを返す感じ？OK

    // a 方針としては、まずこの関数を値を返すものに変えます
    // y なるほどなるほど
}

/* y OK*/
// a まず、最初に読み込むCSVは母体のデータとして最初から最後まで使うので、独立した変数にしたいと思います

// 上までの内容は最初に一回だけ実行されるので、
// 以下にinputの内容が変わるごとに行う操作を書いていきます↓OK

// あ、htmlの方どうなってましたっけ？ひらけるようにしました

function inputFilter(){
    // 中身を書いていきますｗ
    // やること：
    // 1. inputの今の内容を取得
    let inputValue = document.getElementById('input').value;

    // 2. さっきの関数の返り値（allDataに入っている）の特定の値と照合・絞り込み
    // ここで確か領域さんのコードを使う
    let filtered = allData.filter(
        ([name, symbol]) => name.includes(inputValue)
    );
    
    // 3. その結果をresultのdivに入れる🆗なんか変な感じw一応これで動くと思いますが、後でもっと綺麗に書き直せます
    //とえいあえず走らせてうまく行ったら明日にしようかな。。🆗
    //ぎゃああああ走った〜〜〜！！！（マクドの放送中止になったくっそうるさいCM）
    // www
    //意図せずともその反応になってしまった🎉🎉🎉🎉🎉
    // じゃあこの部分やってみますか？あああああ基本的には30行目のコピペですが（ではない）
    document.getElementById('result').replaceChildren();   // ←この行に80行目の関数を使って1行書くと消えます！残念ながらそっちではないです…いいえそれは要素ではないです
    document.getElementById('result').insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum">${e[1]}</div></div>`).join(''));
    // ただし変数名が違うので…はい、それを…🆗これで一回試してみるとどうでしょう
    //やりますね
    //コメントついたまま走らせます
    // まず動くかどうかから（ちょっとJS得意でないので心配😣）
}

window.addEventListener('DOMContentLoaded', function(){ // これでこの中の処理がHTMLの要素が全部読み込まれてから動くことになりますok

    getCSV();
    // const searchInput = ;
    // const htmlWrite = ;



    document.getElementById('input').addEventListener('input', inputFilter); //
    //入力して消すと増える
    // その通りです、それを回避するにはどうしたらいいでしょう？（）
//消して書き直す?正解
//さあどう消すか
// いったんこれで動かしますか？消す機能も入れてからにしますか？
//消すのくらいは自分で書きたいけどわからん
//今なんか調べたんですけど、最新（今年入ったAPI？）のやり方はこれっぽいです
// https://developer.mozilla.org/ja/docs/Web/API/Element/replaceChildren
// 最初は一回消してからやるつもりだったんですが、↑を使うと簡単に毎回入れ替えられるらしい
//ひぃ
// あ、でも普通に消した方が簡単ですかね（技術レベル的な意味で）
//うう普通に消しましょう...
});

