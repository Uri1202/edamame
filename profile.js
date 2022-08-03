const $button = document.getElementsByTagName('button');
const button_length = $button.length;
let star_count;

const star = (e)=>{
    if     ('1' === e.target.textContent) star_count=1;
    else if('2' === e.target.textContent) star_count=2;
    else if('3' === e.target.textContent) star_count=3;
    else if('4' === e.target.textContent) star_count=4;
    else if('5' === e.target.textContent) star_count=5;
}

for(let i=0;i<button_length;i++){
    document.getElementsByTagName('button')[i].addEventListener('click', (e)=> {
        star(e);
    });
}

let submitCount = 0;
let allStar = 0;
function add_star(){
    submitCount++;
    if(star_count>=1 && star_count<=5)allStar+=star_count;
    else submitCount--;
    let matome = parseFloat((allStar/submitCount).toFixed(2));
    console.log(matome);
    const $star = document.getElementById("star");
    if(matome<0)       $star.textContent = "★";
    else if(matome<3)  $star.textContent = "★★";
    else if(matome<4)  $star.textContent = "★★★";
    else if(matome<5)  $star.textContent = "★★★★";
    else if(matome==5) $star.textContent = "★★★★★";
    
}

const $submit_star = document.getElementById('sunmit_star');
submit_star.addEventListener("click", add_star);


function addDetail(text) {
    const divElement = document.createElement("div");
    divElement.className = "divElement";
    divElement.classList.add("comment");
    divElement.textContent = text;
    return divElement;
}
  
function add() {
    const todo = document.getElementById("todo");
    todo.append(addDetail(text.value));
    text.value = ""; //入力後、検索欄から文字を消す
}

const text = document.getElementById("text");
const submit = document.getElementById("submit");
submit.addEventListener("click", add); //提出を押すと、add()を実行
