var button = document.querySelector("button");
var input = document.querySelector("input");
var list = document.querySelector("#word-list");

button.addEventListener("click", getString);

input.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
        getString();
  }
});

var file = loadFile("http://data.aaronlander.com/WordFinder/dictionary.txt");
var words = file.split(" ");

function getString(){
    var string = input.value.toLowerCase();
    list.innerHTML="";
    findWords(string);
}

function findWords(string){
    var wordMatch = [];
    var stringArr = string.split("");
    var tempStringArr = stringArr.slice(0);
    
    for(i=0; i<words.length; i++){
        if(words[i].length < 3){
            continue;
        }
        
        tempStringArr = stringArr.slice(0);
        var wordArr = words[i].split("");

        for(j=0; j<wordArr.length; j++){
            if (tempStringArr.includes(wordArr[j])){
                var index = tempStringArr.findIndex(function(element){
                    return element == wordArr[j];
                });
                tempStringArr[index] = 0;
            }
            else{
                break;
            }

            if(j == wordArr.length - 1){
                wordMatch.push(words[i]);
            }
        }
    }

    makeList(wordMatch);
}

function makeList(wordArr){

    if(wordArr == false){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode('No words found.'));
        list.appendChild(li);
        return;
    }
    for(i=0; i<wordArr.length; i++){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(wordArr[i]));
        list.appendChild(li);
    }
}
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    }
    return result;
  }







