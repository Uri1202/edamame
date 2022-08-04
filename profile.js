const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net/Data?collection=teacher";
const $button = document.getElementsByTagName('button');
const button_length = $button.length;
let star_count;
let params = new URLSearchParams(document.location.search);//URLを取得
let myId = params.get("id");//URLのidを取得
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

function sendStarCountSum(){
    return fetch(baseUrl, {method: "GET"})
    .then((res)=>{
        return(res.json());
    })
    .then((body)=>{
        body.find((id,rateAverage) => {
            if(id=myId) return rateAverage;
        })
    })
}

function sendSubmitCount(){
    return fetch(baseUrl, {method: "GET"})
    .then((res)=>{
        return(res.json());
    })
    .then((body)=>{
        body.find((id,ratedCount) => {
            if(id=myId) return ratedCount;
        })
    })
}

let submitCount = sendSubmitCount();
let starCountSum = sendStarCountSum();

let allStar = 0;
function add_star(){
    submitCount++;
    if(star_count>=1 && star_count<=5)allStar+=star_count;
    else submitCount--;
    starCountSum = parseFloat((allStar/submitCount).toFixed(2));
    // const $star = document.getElementById("star");
    const el = document.querySelector('#star');
    if(starCountSum==5)       el.dataset.rate= "5";
    else if(starCountSum<5 && starCountSum>4)  el.dataset.rate= "4.5";
    else if(starCountSum==4)  el.dataset.rate= "4";
    else if(starCountSum<4 && starCountSum>3)  el.dataset.rate= "3.5";
    else if(starCountSum==3)  el.dataset.rate= "3";
    else if(starCountSum<3 && starCountSum>2)  el.dataset.rate= "2.5";
    else if(starCountSum==2)  el.dataset.rate= "2";
    else if(starCountSum<2 && starCountSum>1)  el.dataset.rate= "1.5";
    else if(starCountSum==1)  el.dataset.rate= "1";
    //console.log(starCountSum);
    fetch(baseUrl + "&id=" + myId + "&key=rateAverage",{//評価平均データを格納
        method:'PATCH',
        body: JSON.stringify(starCountSum),
    })
    fetch(baseUrl + "&id=" + myId + "&key=ratedCount",{//評価回数データを格納
        method:'PATCH',
        body: JSON.stringify(submitCount),
    })
}

const $submit_star = document.getElementById('submit_star');
$submit_star.addEventListener("click", add_star);


function createCommentElement(text) {
    const divElement = document.createElement("div");
    divElement.className = "divElement";
    divElement.classList.add("comment");
    divElement.textContent = text;
    return divElement;
}

function getComments(){
    return fetch(baseUrl,{method:"GET"})
    .then((res) => res.json())
    .then((body) => {
        return body;
    });
}

const commentList = document.getElementById("commentList");

getComments()
.then((posts)=>{
    const commentElements =[];
    for(let i=0;i<posts.length;i++){
        commentElements.push(createCommentElement(posts[i]));
    }
    return commentElements;
})
.then((commentElements)=>{
    for(let i=0;i<commentElements.length;i++){
        commentList.append(commentElements[i]);
    }
});

function add() {
    //const commentList = document.getElementById("commentList");
    //commentList.append(createCommentElement(text.value));
    let comments = [text.value];//コメントの内容
    fetch(baseUrl + "&id=" + myId + "&key=comments",{//コメントデータを格納
        method:'PATCH',
        body: JSON.stringify(comments),
    })
    text.value = ""; //入力後、検索欄から文字を消す
    
    
}

const text = document.getElementById("text");
const submit = document.getElementById("submit");
submit.addEventListener("click", add); //提出を押すと、add()を実行



//サーバー内確認
fetch(baseUrl,{
    method:"GET"
})
.then((response) =>{
    return response.json()
})
.then((data)=>{
    console.log(data)
})


