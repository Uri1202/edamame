const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";
console.clear();
//icon
function CreateIcon(profileData) {
  const iconData = document.createElement("a");
  iconData.href = "profile2.html?id=" + profileData.id;
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

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const witt = document.createElement("div");
  witt.className = "witt";
  witt.textContent = profileData.witticism;

  const wittClick = document.createElement("div");
  wittClick.className = "wittClick";
  wittClick.textContent = "Click!";

  bubble.append(witt, wittClick);
  wittData.append(human, bubble);

  function DisplayWitt() {
    DeleteAllIcons();
    iconList.append(CreateWittDetail(profileData));
  }

  bubble.addEventListener("click", DisplayWitt, false);
  return wittData;
}

//名言詳細

function CreateWittDetail(profileData) {
  const wittData = document.createElement("div");
  wittData.className = "teacherWittSingle";

  const teacherImg = document.createElement("img");
  teacherImg.className = "wittImg";
  teacherImg.src = profileData.imageUrl;

  const teacherName = document.createElement("div");
  teacherName.className = "wittName";
  teacherName.textContent = profileData.name.hiragana;

  const witt = document.createElement("div");
  witt.className = "wittSingle";
  witt.textContent = profileData.witticism;

  wittData.append(teacherImg, witt, teacherName);
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
    searchInput.placeholder = " 先生";
  } else if (mode === "witt") {
    searchInput.placeholder = " 名言";
  } else if (mode === "news") {
    searchInput.placeholder = " タイトル";
  }

  const sub_searchBtn = document.createElement("button");
  sub_searchBtn.className = "searchBtn";

  const glass = document.createElement("span");
  glass.className = "glass";

  sub_searchBtn.append(glass);

  searchBox.append(searchInput, sub_searchBtn);
  return searchBox;
}

//テスト用のpost　↓

//先生のデータ
/*
function PostTeacher() {
  const profile_data = {
    name: {
      hiragana: "きはら　ひろし",
      kanji: "木原　浩",
      english: "KIHARA Hiroshi"
    },
    imageUrl: "https://u-aizu.ac.jp/upload/user/90009.jpg",
    rateAverage: 0,
    ratedCount: 0,
    subjects: ["数学"],
    comments: [""],
    witticism: "誰の目から見ても直感的にあきらか"
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

const radioBtn1 = document.getElementsByName("sort")[0];
const radioBtn2 = document.getElementsByName("sort")[1];
const radioBtn3 = document.getElementsByName("sort")[2];
const radioBtn4 = document.getElementsByName("sort")[3];
const radioBtn5 = document.getElementsByName("menu")[0];
const radioBtn6 = document.getElementsByName("menu")[1];
const radioBtn7 = document.getElementsByName("menu")[2];

const radioBtn = document.getElementsByClassName("sort")[0];
const displayOriginal1 = radioBtn.style.display;

const toggleBtn = document.getElementsByClassName("toggle_input")[0];
const toggleTag = document.getElementsByClassName("toggle_button")[0];
const displayOriginal2 = toggleTag.style.display;

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
const newsList = [];
const subjectList = [
  "数学",
  "英語",
  "物理",
  "プログラミング",
  "web",
  "iot",
  "line bot"
];

Get_Profile().then((profileData) => {
  /*
  for (let i = 0; i < profileData.length; i = i + 1) {
    Delete_Data(profileData[i]);
  }*/

  for (let i = 0; i < profileData.length; i = i + 1) {
    iconSortList.push(profileData[i]);
  }
  //日本語並び替え(デフォルト
  iconSortList.sort(function (a, b) {
    if (a.name.hiragana > b.name.hiragana) {
      return 1;
    } else {
      return -1;
    }
  });
  RefreshTitle("teacher");
  RefreshBtn("teacher");
  RefreshSB("teacher");
  Refresh("sort");
});

Get_News().then((newsData) => {
  for (let i = 0; i < newsData.length; i = i + 1) {
    newsList.push(newsData[i]);
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
    RefreshTitle("teacher");
    RefreshBtn("teacher");
    RefreshSB("teacher");

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

    for (let i = 0; i < iconSortList.length; i = i + 1) {
      if (iconSortList[i].witticism !== "") {
        iconList.append(CreateWitt(iconSortList[i]));
      }
    }
  } else if (mode === "news") {
    RefreshTitle("news");
    RefreshBtn("news");
    RefreshSB("news");

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

      for (let i = 0; i < iconSortList.length; i = i + 1) {
        if (iconSortList[i].witticism !== "") {
          iconList.append(CreateWitt(iconSortList[i]));
        }
      }
    } else if (mode === "news") {
      RefreshTitle("news");
      RefreshBtn("news");
      RefreshSB("news");

      DisplayNewsList();
    }
  };
}

//背景変更

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
    toggleTag.style.display = displayOriginal2;
  } else if (mode === "witt") {
    radioBtn.style.display = "none";
    toggleTag.style.display = "none";
  } else if (mode === "news") {
    radioBtn.style.display = "none";
    toggleTag.style.display = "none";
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

radioBtn1.addEventListener("click", Sort_japanese, false);
radioBtn2.addEventListener("click", Sort_english, false);
radioBtn3.addEventListener("click", Sort_subject, false);
radioBtn4.addEventListener("click", Sort_rate, false);

//名言表示

function DisplayWitt() {
  const bubble = document.getElementsByClassName("bubble");
  const witt = document.getElementsByClassName("witt");
  function AppendWitt(i) {
    return () => {
      for (let iconData of iconSortList) {
        if (witt[i].textContent === iconData.witticism) {
          DeleteAllIcons();
          iconList.append(CreateWittDetail(iconData));
        }
      }
    };
  }
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].addEventListener("click", AppendWitt(i), false);
  }
}
radioBtn6.addEventListener("click", DisplayWitt, false);
//検索

//メイン検索

function MainSearch() {
  btnNum = 1;
  const textContent = document.getElementsByClassName("textbox")[0];
  const keyWord = textContent.value;

  const pickIconList1 = Search_name(keyWord);
  const pickIconList2 = Search_witt(keyWord);
  const pickIconList3 = Search_news(keyWord);

  if (pickIconList1 !== 0) {
    DeleteAllIcons();
    RefreshTitle("teacher");
    RefreshBtn("teacher");
    RefreshSB("teacher");
    radioBtn.style.display = displayOriginal1;

    for (let icon of pickIconList1) {
      iconList.append(icon);
    }
  } else if (pickIconList2 !== 0) {
    DeleteAllIcons();
    RefreshTitle("witt");
    RefreshBtn("witt");
    RefreshSB("witt");
    radioBtn.style.display = "none";

    for (let icon of pickIconList2) {
      iconList.append(icon);
    }
  } else if (pickIconList3 !== 0) {
    DeleteAllIcons();
    RefreshTitle("news");
    RefreshBtn("news");
    RefreshSB("news");
    radioBtn.style.display = "none";

    for (let icon of pickIconList3) {
      iconList.append(icon);
    }
  }
}
//サブ検索
function SubSearch() {
  btnNum = 2;
  const SearchBtn = document.getElementsByClassName("searchBtn")[0];

  function search() {
    const textContent = document.getElementsByClassName("searchInput")[0];
    if (textContent.placeholder === " 先生") {
      const pickIconList1 = Search_name(textContent.value);
      const pickIconList2 = Search_subject(textContent.value);
      if (pickIconList1 !== 0) {
        DeleteAllIcons();
        for (let icon of pickIconList1) {
          iconList.append(icon);
        }
      } else if (pickIconList2 !== 0) {
        DeleteAllIcons();
        iconList.append(pickIconList2);
      }
    } else if (
      textContent.placeholder === " 名言" &&
      textContent.value !== ""
    ) {
      const pickIconList1 = Search_witt(textContent.value);
      if (pickIconList1 !== 0) {
        DeleteAllIcons();
        for (let icon of pickIconList1) {
          iconList.append(icon);
        }
      }
    } else if (textContent.placeholder === " タイトル") {
      const pickIconList1 = Search_news(textContent.value);
      if (pickIconList1 !== 0) {
        DeleteAllIcons();
      }
      for (let news of pickIconList1) {
        iconList.append(news);
      }
    }
  }
  SearchBtn.addEventListener("click", DisplayWitt, false);
  SearchBtn.addEventListener("click", search, false);
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

//名言検索

function Search_witt(textContent) {
  const pickIconList = [];
  for (let iconData of iconSortList) {
    if (iconData.witticism.includes(textContent)) {
      pickIconList.push(CreateWitt(iconData));
    }
  }

  if (pickIconList.length !== 0) {
    return pickIconList;
  } else {
    return 0;
  }
}

//ニュース検索
function Search_news(textContent) {
  const pickIconList = [];
  for (let newsData of newsList) {
    if (
      newsData.content.includes(textContent) ||
      newsData.title.includes(textContent)
    ) {
      pickIconList.push(CreateNews(newsData));
    }
  }
  if (pickIconList.length !== 0) {
    return pickIconList;
  } else {
    return 0;
  }
}

const mainSearchBtn = document.getElementsByClassName("search")[0];
mainSearchBtn.addEventListener("click", MainSearch, false);

//メニュー切り替え

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
    MainSearch();
  }
}

toggleBtn.addEventListener("click", Switch, false);

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

radioBtn5.addEventListener("click", SubSearch, false);
radioBtn6.addEventListener("click", SubSearch, false);
radioBtn7.addEventListener("click", SubSearch, false);
