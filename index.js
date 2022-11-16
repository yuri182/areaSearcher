let allData = []; // varではなくletを使う方がいいらしかったです

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

// あ、すみません、resultはもう算出されてましたねいえあこれでOK
    return result.slice(1).map(e=>e.slice(1)); // 表に使う元データを返す感じ？OK

    // a 方針としては、まずこの関数を値を返すものに変えます
    // y なるほどなるほど
    
    // let htmlWrite=document.getElementById('result');
    // htmlWrite.insertAdjacentHTML('afterbegin',arrList.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum">${e[1]}</div>`).join(''));

}
 
getCSV(); 

/* y OK*/
// a まず、最初に読み込むCSVは母体のデータとして最初から最後まで使うので、独立した変数にしたいと思います

// 上までの内容は最初に一回だけ実行されるので、
// 以下にinputの内容が変わるごとに行う操作を書いていきます↓OK

// あ、htmlの方どうなってましたっけ？ひらけるようにしました

const searchInput = document.getElementById('input');//ok
const htmlWrite = document.getElementById('result');//私見てるだけになってる()

function inputFilter(){
    // 中身を書いていきますｗ
    // やること：
    // 1. inputの今の内容を取得
    let inputValue = searchInput.value;

    // 2. さっきの関数の返り値（allDataに入っている）の特定の値と照合・絞り込み
    // ここで確か領域さんのコードを使う
    let filtered = allData.filter(
        ([name, symbol]) => name.includes(inputValue)
    );
    
    // 3. その結果をresultのdivに入れる
    // じゃあこの部分やってみますか？あああああ基本的には30行目のコピペですが（ではない）
    htmlWrite.insertAdjacentHTML('afterbegin',filtered.map((e)=>`<div class="arr"><div class="roomNameJp">${e[0]}</div><div class="areaNum">${e[1]}</div>`).join(''));
    // ただし変数名が違うので…はい、それを…🆗これで一回試してみるとどうでしょう
    //やりますね
    //コメントついたまま走らせます
    // まず動くかどうかから（ちょっとJS得意でないので心配😣）
} 

// searchInput.oninput = inputFilter; //なんでoninputは全部小文字なんだｗ
searchInput.addEventListener("input", inputFilter); // これでどうでしょうか（上のは古かったっぽい）走らせます



