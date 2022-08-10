let stars = document.getElementsByClassName("star");
let clicked = false; //未クリック
let star_count;
let count = 0;
let star_total = 0;
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener(
      "mouseover",
      () => {
        if (!clicked) {
          //クリックが一度もされてない時
          for (let j = 0; j <= i; j++) {
            stars[j].style.color = "#f0da61"; //黄色に
          }
        }
      },
      false
    );

    stars[i].addEventListener(
      "mouseout",
      () => {
        if (!clicked) {
          for (let j = 0; j < stars.length; j++) {
            stars[j].style.color = "#a09a9a"; //グレー
          }
        }
      },
      false
    );

    stars[i].addEventListener(
      "click",
      () => {
        clicked = true; //クリックされたら
        for (let j = 0; j <= i; j++) {
          stars[j].style.color = "#f0da61"; //黄色に
          star_count = j;
        }
        for (let j = i + 1; j < stars.length; j++) {
          stars[j].style.color = "#a09a9a"; //グレー
        }
      },
      false
    );
  }
});

function addDetail(text) {
  const divElement = document.createElement("div");
  divElement.className = "divElement";

  const textElement = document.createElement("p");
  textElement.className = "textElement";
  let total_point = document.getElementById("point");

  if (star_count == 0) {
    textElement.textContent = "⭐️ " + text;
  } else if (star_count == 1) {
    textElement.textContent = "⭐️⭐️ " + text;
  } else if (star_count == 2) {
    textElement.textContent = "⭐️⭐️⭐️ " + text;
  } else if (star_count == 3) {
    textElement.textContent = "⭐️⭐️⭐️⭐️ " + text;
  } else if (star_count == 4) {
    textElement.textContent = "⭐️⭐️⭐️⭐️⭐️ " + text;
  } else {
    textElement.textContent = text;
  }
  star_total += star_count + 1;
  count++; //割る数字（評定平均で）
  let matome = parseFloat((star_total / count).toFixed(2));
  total_point.textContent = matome;

  divElement.append(textElement);
  return divElement;
}

function add() {
  const input = document.getElementById("input");
  const todo = document.getElementById("todo");
  todo.append(addDetail(input.value));
  input.value = ""; //入力後、検索欄から文字を消す
  const hr = document.createElement("hr");
  todo.append(hr);
}

const submit = document.getElementById("submit");
submit.addEventListener("click", add); //提出を押すと、add()を実行
