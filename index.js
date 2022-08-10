const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

//icon
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
  if (toggleBtn.checked !== true) {
    iconName.textContent = profileData.name.hiragana;
  } else {
    iconName.textContent = profileData.name.english;
  }

  const iconStar = document.createElement("span");
  const roundRate = Math.round(profileData.rateAverage * 2) / 2;
  iconStar.className = "star5_rating";
  iconStar.dataset.rate = roundRate.toString();

  iconData.append(iconImg, iconName, iconStar);
  return iconData;
}

//名言
function CreateWitt(profileData) {
  const wittData = document.createElement("div");
  wittData.className = "teacherWitt";

  const human = document.createElement("img");
  human.src = "https://icooon-mono.com/i/icon_10226/icon_102261_64.png";
  human.className = "human";

  const witt = document.createElement("div");
  witt.className = "witt";
  witt.textContent = profileData.witticism;

  const wittLike = document.createElement("div");
  wittLike.className = "wittLike";

  const wittHeart = document.createElement("div");
  wittHeart.className = "wittHeart";

  wittData.append(human, witt, wittLike, wittHeart);
  return wittData;
}

//お知らせ
function CreateNews(newsData) {
  const news = document.createElement("div");
  news.className = "news";

  const newsRibbon = document.createElement("div");
  newsRibbon.className = "newsRibbon";

  const newsTitle = document.createElement("div");
  newsTitle.className = "newsTitle";
  newsTitle.textContent = newsData.title;

  const newsContent = document.createElement("div");
  newsContent.className = "newsContent";
  newsContent.textContent = newsData.content;

  news.append(newsTitle, newsContent, newsRibbon);
  return news;
}

//検索ボックス

function CreateSB(mode) {
  const searchBox = document.createElement("div");
  searchBox.className = "searchBox";

  const searchInput = document.createElement("input");
  searchInput.className = "searchInput";
  searchInput.type = "text";

  if (mode === "teacher") {
    searchInput.placeholder = "先生";
  } else if (mode === "witt") {
    searchInput.placeholder = "名言";
  } else if (mode === "news") {
    searchInput.placeholder = "タイトル";
  }

  const sub_searchBtn = document.createElement("button");
  sub_searchBtn.className = "subSearchBtn";

  searchBox.append(searchInput, sub_searchBtn);
  return searchBox;
}
/*
//テスト用のpost　↓

//先生のデータ
function PostTecher() {
  const profile_data = {
    name: {
      hiragana: "かー　にこらす",
      kanji: "",
      english: "CARR Nicholas"
    },
    imageUrl: "https://u-aizu.ac.jp/upload/user/90143.jpg",
    rateAverage: 3.4,
    ratedCount: 1,
    subjects: ["英語"],
    comments: ["おはよう"],
    witticism: ["Boys be anxious"]
  };
  fetch(baseUrl + "/Data?collection=teacher", {
    method: "POST",
    body: JSON.stringify(profile_data)
  });
}

PostTeacher();
*/
//ニュースのデータ
/*
function PostNews() {
  const news_data = {
    title: "タイトル",
    content: "内容"
  };
  fetch(baseUrl + "/Data?collection=news", {
    method: "POST",
    body: JSON.stringify(news_data)
  });
}

PostNews();
*/
//データの取得

//先生のデータ
function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}

//ニュースのデータ
function Get_News() {
  return fetch(baseUrl + "/Data?collection=news", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}

//データの削除
/*
function Delete_Data(profileData) {
  const myId = profileData.id;
  fetch(baseUrl + "/Data?collection=teacher&id=" + myId, {
    method: "DELETE"
  });
}
*/

const background = document.getElementsByClassName("background")[0];
const iconList = document.getElementsByClassName("main-content1")[0];
const Title = document.getElementsByClassName("Title")[0];
const SearchBox = document.getElementsByClassName("SearchBox")[0];

const radioBtn = document.getElementsByClassName("sort")[0];
const displayOriginal1 = radioBtn.style.display;

const toggleBtn = document.getElementsByClassName("toggle_button")[0];
const displayOriginal2 = toggleBtn.style.display;

const teacherTitle = document.createElement("div");
teacherTitle.className = "title";
teacherTitle.textContent = "先生一覧";

const wittTitle = document.createElement("div");
wittTitle.className = "title";
wittTitle.textContent = "先生たちの名言集";

const newsTitle = document.createElement("div");
newsTitle.className = "title";
newsTitle.textContent = "掲示板";

let btnNum = 0;
const backgroundUrl = "https://gahag.net/007558-chalkboard-background/";
const iconSortList = [];
const subjectList = ["数学", "英語", "物理", "プログラミング"];

Get_Profile().then((profileData) => {
  /*
  for (let i = 0; i < profileData.length; i = i + 1) {
    Delete_Data(profileData[i]);
  }
  */

  RefreshBG("delete");
  RefreshTitle("teacher");
  RefreshSB("teacher");

  const subSearchBtn = document.getElementsByClassName("subSearchBtn")[0];
  console.log(subSearchBtn);

  for (let i = 0; i < profileData.length; i = i + 1) {
    iconSortList.push(profileData[i]);
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

//タイトルの削除

function DeleteTitle() {
  Title.removeChild(Title.lastChild);
}
//タイトルの変更

function RefreshTitle(mode) {
  if (Title.hasChildNodes()) {
    DeleteTitle();
  }
  if (mode === "teacher") {
    Title.append(teacherTitle);
  } else if (mode === "witt") {
    Title.append(wittTitle);
  } else if (mode === "news") {
    Title.append(newsTitle);
  }
}

//検索ボックスの削除
function DeleteSB() {
  SearchBox.removeChild(SearchBox.lastChild);
}

//検索ボックスの変更

function RefreshSB(mode) {
  if (SearchBox.hasChildNodes()) {
    DeleteSB();
  }
  if (mode === "teacher") {
    SearchBox.append(CreateSB("teacher"));
  } else if (mode === "witt") {
    SearchBox.append(CreateSB("witt"));
  } else if (mode === "news") {
    SearchBox.append(CreateSB("news"));
  }
}
//タグの削除
function DeleteAllIcons() {
  while (iconList.lastChild) {
    iconList.removeChild(iconList.lastChild);
  }
}

//順番を変えたタグを投げる
function Refresh(mode) {
  DeleteAllIcons();

  if (mode === "sort") {
    radioBtn.style.display = displayOriginal1;

    if (radioBtn3.checked === true) {
      Sort_subject();
    } else {
      for (let i = 0; i < iconSortList.length; i = i + 1) {
        iconList.append(CreateIcon(iconSortList[i]));
      }
    }
  } else if (mode === "witt") {
    RefreshTitle("witt");
    RefreshBtn("witt");
    radioBtn.style.display = "none";

    for (let i = 0; i < iconSortList.length; i = i + 1) {
      iconList.append(CreateWitt(iconSortList[i]));
    }
  } else if (mode === "news") {
    RefreshTitle("news");
    RefreshBtn("news");
    radioBtn.style.display = "none";

    DisplayNewsList();
  }
}

function Refresh_value(mode) {
  return () => {
    DeleteAllIcons();

    if (mode === "sort") {
      RefreshTitle("teacher");
      RefreshBtn("teacher");
      RefreshSB("teacher");
      console.log("a");
      radioBtn.style.display = displayOriginal1;

      if (radioBtn3.checked === true) {
        Sort_subject();
      } else {
        for (let i = 0; i < iconSortList.length; i = i + 1) {
          iconList.append(CreateIcon(iconSortList[i]));
        }
      }
    } else if (mode === "witt") {
      RefreshTitle("witt");
      RefreshBtn("witt");
      RefreshSB("witt");
      radioBtn.style.display = "none";

      for (let i = 0; i < iconSortList.length; i = i + 1) {
        iconList.append(CreateWitt(iconSortList[i]));
      }
    } else if (mode === "news") {
      RefreshTitle("news");
      RefreshBtn("news");
      RefreshSB("news");
      radioBtn.style.display = "none";

      DisplayNewsList();
    }
  };
}

//背景変更

function RefreshBG(mode) {
  if (mode === "news") {
    background.style.backgroundImage = "url(" + backgroundUrl + ")";
  } else if (mode === "delete") {
    background.style.background = "none";
  }
}

function RefreshBG_value(mode) {
  return () => {
    if (mode === "news") {
      background.style.backgroundImage = "url(" + backgroundUrl + ")";
    } else if (mode === "delete") {
      background.style.background = "none";
    }
  };
}

//ボタン変更
function RefreshBtn(mode) {
  if (mode === "teacher") {
    radioBtn.style.display = displayOriginal1;
    toggleBtn.style.display = displayOriginal2;
  } else if (mode === "witt") {
    radioBtn.style.display = "none";
    toggleBtn.style.display = "none";
  } else if (mode === "news") {
    radioBtn.style.display = "none";
    toggleBtn.style.display = "none";
  }
}
//日本語並び替え

function Sort_japanese() {
  btnNum = 0;
  iconSortList.sort(function (a, b) {
    if (a.name.hiragana > b.name.hiragana) {
      return 1;
    } else {
      return -1;
    }
  });
  if (radioBtn5.checked === true) {
    Refresh("sort");
  } else if (radioBtn6.checked === true) {
    Refresh("witt");
  }
}

//英語並び替え

function Sort_english() {
  btnNum = 0;
  iconSortList.sort(function (a, b) {
    if (a.name.english > b.name.english) {
      return 1;
    } else {
      return -1;
    }
  });
  if (radioBtn5.checked === true) {
    Refresh("sort");
  } else if (radioBtn6.checked === true) {
    Refresh("witt");
  }
}

//評価並び替え

function Sort_rate() {
  btnNum = 0;
  iconSortList.sort(function (a, b) {
    if (a.rateAverage < b.rateAverage) {
      return 1;
    } else {
      return -1;
    }
  });
  if (radioBtn5.checked === true) {
    Refresh("sort");
  } else if (radioBtn6.checked === true) {
    Refresh("witt");
  }
}

//教科並び替え
function Sort_subject() {
  btnNum = 0;
  if (radioBtn5.checked === true) {
    DeleteAllIcons();
    for (let sub of subjectList) {
      const subIconList = document.createElement("div");
      subIconList.className = "subject";
      const heading = document.createElement("h2");
      heading.textContent = sub;
      subIconList.append(heading);

      for (let i = 0; i < iconSortList.length; i = i + 1) {
        if (iconSortList[i].subjects.includes(sub)) {
          subIconList.append(CreateIcon(iconSortList[i]));
        }
      }
      iconList.append(subIconList);
    }
  }
}

const radioBtn1 = document.getElementsByName("sort")[0];
const radioBtn2 = document.getElementsByName("sort")[1];
const radioBtn3 = document.getElementsByName("sort")[2];
const radioBtn4 = document.getElementsByName("sort")[3];
radioBtn1.addEventListener("click", Sort_japanese, false);
radioBtn2.addEventListener("click", Sort_english, false);
radioBtn3.addEventListener("click", Sort_subject, false);
radioBtn4.addEventListener("click", Sort_rate, false);
//検索

function SubSearch() {
  const searchInput = document.getElementsByclassName("searchInput")[0];
  console.log("ad");
  if (searchInput.placeholder === "先生") {
    Search();
  }
}

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
  } else {
    return 0;
  }
}

//教科検索
function Search_subject(textContent) {
  if (subjectList.indexOf(textContent) !== -1) {
    const pickIconList = document.createElement("div");
    pickIconList.className = "subject";
    const heading = document.createElement("h2");
    heading.textContent = textContent;
    pickIconList.append(heading);

    for (let i = 0; i < iconSortList.length; i = i + 1) {
      if (iconSortList[i].subjects.includes(textContent)) {
        pickIconList.append(CreateIcon(iconSortList[i]));
      }
    }
    return pickIconList;
  } else {
    return 0;
  }
}

function Search() {
  btnNum = 1;
  DeleteAllIcons();

  const textContent = document.getElementsByClassName("textbox")[0];
  const pickIconList1 = Search_name(textContent.value);
  const pickIconList2 = Search_subject(textContent.value);

  if (pickIconList1 !== 0) {
    for (let icon of pickIconList1) {
      iconList.append(icon);
    }
  } else if (pickIconList2 !== 0) {
    iconList.append(pickIconList2);
  }
}

const mainSearchBtn = document.getElementsByClassName("search")[0];
mainSearchBtn.addEventListener("click", Search, false);

//メニュー切り替え

const radioBtn5 = document.getElementsByName("menu")[0];
const radioBtn6 = document.getElementsByName("menu")[1];
const radioBtn7 = document.getElementsByName("menu")[2];
radioBtn5.addEventListener("click", Refresh_value("sort"), false);
radioBtn6.addEventListener("click", Refresh_value("witt"), false);
radioBtn7.addEventListener("click", Refresh_value("news"), false);
radioBtn5.addEventListener("click", RefreshBG_value("delete"), false);
radioBtn6.addEventListener("click", RefreshBG_value("delete"), false);
radioBtn7.addEventListener("click", RefreshBG_value("news"), false);
//言語切り替え

function Switch() {
  if (btnNum === 0) {
    Refresh("sort");
  } else {
    Search();
  }
}

toggleBtn.addEventListener("click", Switch, false);
//名言詳細表示

function CreateWittDetail(profileData) {
  const wittData = document.createElement("div");
  wittData.className = "teacherWittSingle";

  const teacherImg = document.createElement("img");
  teacherImg.className = "Img";
  teacherImg.src = profileData.imageUrl;

  const teacherName = document.createElement("div");
  teacherName.className = "Name";
  teacherName.textContent = profileData.name.hiragana;

  const witt = document.createElement("div");
  witt.className = "wittSingle";
  witt.textContent = profileData.witticism;

  wittData.append(teacherImg, witt, teacherName);
  return wittData;
}

//名言表示

function DisplayWitt() {
  const witt = document.getElementsByClassName("witt");
  function AppendWitt(i) {
    return () => {
      DeleteAllIcons();
      iconList.append(CreateWittDetail(iconSortList[i]));
    };
  }
  for (let i = 0; i < witt.length; i++) {
    witt[i].addEventListener("click", AppendWitt(i), false);
  }
}
radioBtn6.addEventListener("click", DisplayWitt, false);

//ニュースリスト表示

function DisplayNewsList() {
  Get_News().then((newsData) => {
    const newsNum = newsData.length;
    for (let i = 0; i < Math.floor(newsNum / 3) + 1; i = i + 1) {
      const newsList = document.createElement("div");
      newsList.className = "newsList";
      if (i === Math.floor(newsNum / 3)) {
        for (let j = 0; j < newsNum % 3; j = j + 1) {
          newsList.append(CreateNews(newsData[i * 3 + j]));
        }
      } else {
        for (let j = 0; j < 3; j = j + 1) {
          newsList.append(CreateNews(newsData[i * 3 + j]));
        }
      }
      iconList.append(newsList);
    }
  });
}
