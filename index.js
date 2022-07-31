const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

function CreateIcon(profileData) {
  const iconData = document.createElement("a");
  iconData.href = "profile.html?id=" + profileData.id;
  iconData.className = "teacher";
  //名前、画像,星評価のタグ作り
  const iconImg = document.createElement("img");
  iconImg.className = "iconImg";
  iconImg.src = profileData.imageUrl;

  const iconName = document.createElement("div");
  iconName.className = "iconName";
  iconName.textContent = profileData.name.hiragana;

  const iconStar = document.createElement("span");
  const roundRate = Math.round(profileData.rateAverage * 2) / 2;
  iconStar.className = "star5_rating";
  iconStar.dataset.rate = roundRate;

  iconData.append(iconImg, iconName, iconStar);
  return iconData;
}
/*
//テスト用のpost　↓
function Post() {
  const profile_data = {
    name: {
      hiragana: "にゃんb",
      kanji: "煮ゃん",
      english: "b"
    },
    imageUrl: "https://twitter.com/nyan84392441/photo",
    rateAverage: 4.32,
    ratedCount: 1,
    subjects: ["数学", "物理"],
    comments: ["おはよう"]
  };
  fetch(baseUrl + "/Data?collection=teacher", {
    method: "POST",
    body: JSON.stringify(profile_data)
  });
}

Post();
*/
function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}

const iconList = document.getElementsByClassName("main-content")[0];
const iconSortList = [];
const subjectList = ["数学", "英語", "物理", "プログラミング"];

Get_Profile().then((profileData) => {
  for (let i = 0; i < profileData.length; i = i + 1) {
    if (profileData[i].name !== "ERASER") {
      iconSortList.push(profileData[i]);
    }
  }

  //日本語並び替え(デフォルト)
  
  iconSortList.sort(function (a, b) {
    if (a.name.hiragana > b.name.hiragana) {
      return 1;
    } else {
      return -1;
    }
  });

  for (let i = 0; i < iconSortList.length; i = i + 1) {
    iconList.append(CreateIcon(iconSortList[i]));
  }
});

//タグの削除と順番を変えたタグを投げる

function Refresh(mode) {
  while (iconList.lastChild) {
    iconList.removeChild(iconList.lastChild);
  }
  if (mode !== "delete") {
    for (let i = 0; i < iconSortList.length; i = i + 1) {
      iconList.append(CreateIcon(iconSortList[i]));
    }
  }
}
//日本語並び替え

function Sort_japanese() {
  iconSortList.sort(function (a, b) {
    if (a.name.hiragana > b.name.hiragana) {
      return 1;
    } else {
      return -1;
    }
  });
  Refresh();
}

//英語並び替え

function Sort_english() {
  iconSortList.sort(function (a, b) {
    if (a.name.english > b.name.english) {
      return 1;
    } else {
      return -1;
    }
  });
  Refresh();
}

//教科並び替え
function Sort_subject() {
  Refresh("delete");
  for (let sub of subjectList) {
    const subIconList = document.createElement("div");
    subIconList.className = sub;
    subIconList.textContent = sub;

    for (let i = 0; i < iconSortList.length; i = i + 1) {
      if (iconSortList[i].subjects.includes(sub)) {
        subIconList.append(CreateIcon(iconSortList[i]));
      }
    }
    iconList.append(subIconList);
  }
}

const btn1 = document.getElementsByClassName("Japanese")[0];
const btn2 = document.getElementsByClassName("English")[0];
const btn3 = document.getElementsByClassName("Subject")[0];

btn1.addEventListener("click", Sort_japanese, false);
btn2.addEventListener("click", Sort_english, false);
btn3.addEventListener("click", Sort_subject, false);

//検索

//名前検索
function Search_name(textContent) {
  const pickIconList = [];
  for (let iconData of iconSortList) {
    //ひらがな
    if (iconData.name.hiragana.includes(textContent)) {
      pickIconList.push(CreateIcon(iconData));
    }
    //漢字
    else if (iconData.name.kanji.includes(textContent)) {
      pickIconList.push(CreateIcon(iconData));
    }
    //英語
    else if (iconData.name.english.includes(textContent)) {
      pickIconList.push(CreateIcon(iconData));
    }
  }
  if (pickIconList.length !== 0) {
    return pickIconList;
  } 
  else {
    return 0;
  }
}

//教科検索
function Search_subject(textContent) {
  if (subjectList.indexOf(textContent) !== -1) {

    const pickIconList = document.createElement("div");
    pickIconList.className = textContent;
    pickIconList.textContent = textContent;

    for (let i = 0; i < iconSortList.length; i = i + 1) {
      if (iconSortList[i].subjects.includes(textContent)) {
        pickIconList.append(CreateIcon(iconSortList[i]));
      }
    }
    return pickIconList;
  } 
  else {
    return 0;
  }
}

function Search() {
  Refresh("delete");

  const textContent = document.getElementsByClassName("textbox")[0];
  const pickIconList1 = Search_name(textContent.value);
  const pickIconList2 = Search_subject(textContent.value);

  if (pickIconList1 === 0 && pickIconList2 === 0) {
    iconList.textContent = "先生が見つかりません！";
  } else if (pickIconList1 !== 0) {
    for (let icon of pickIconList1) {
      iconList.append(icon);
    }
  } else if (pickIconList2 !== 0) {
    iconList.append(pickIconList2);
  }
}

const btn4 = document.getElementsByClassName("search")[0];
btn4.addEventListener("click", Search, false);
