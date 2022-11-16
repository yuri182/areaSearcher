function getCSV(){
    var req = new XMLHttpRequest();
    req.open("get", "rooms.csv", true);
    req.send(null);

    req.onload = function(){
	convertCSVtoArray(req.responseText); 
    }
}
 
function convertCSVtoArray(str){ 
    var result = []; 
    var tmp = str.split("\r\n"); 

    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
    console.log(result);

    const arrList= result.slice(1).map(e=>e.slice(1));
    console.log(arrList);
}
 
getCSV(); 


