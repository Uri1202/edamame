const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

function CreateIcon(profileData) {
  const iconData = document.createElement("a");
  iconData.href = "profile.html?id=" + profileData.id;
  iconData.classname = "icon";
  //名前、画像,星評価のタグ作り
  const iconImg = document.createElement("img");
  iconImg.classname = "iconImg";
  iconImg.src = profileData.imageUrl;

  const iconName = document.createElement("div");
  iconName.classname = "iconName";
  iconName.textContent = profileData.name;

  const iconStar = document.createElement("span");
  const roundRate = Math.round(profileData.rateAverage * 2) / 2;
  iconStar.classname = "star5_rating";
  iconStar.dataset.rate = roundRate;

  iconData.append(iconImg, iconName, iconStar);
  return iconData;
}

//テスト用のpost　↓

/*
function Post() {
  const profile_data = {
    name: 
    {　
      hiragana: "にゃん",
      kanji: "煮ゃん",
      english: "nyan92015"
            },
    imageUrl: "https://twitter.com/nyan84392441/photo",
    rateAverage: 2.3,
    ratedCount: 1,
    subjects: ["数学"],
    comments: ["おはよう"]
  };
  fetch(baseUrl + "/Data?collection=teacher?", {
    method: "POST",
    body: JSON.stringify(profile_data)
  });
}
*/

//Post();

function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}

const iconList = document.getElementsByClassName("main-content")[0];
const iconSortList = [];
Get_Profile().then((profileData) => {
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

const btn1 = document.getElementsByClassName("sortJapanese")[0];
const btn2 = document.getElementsByClassName("sortEnglish")[0];
const btn3 = document.getElementsByClassName("sortsubject")[0];

//日本語並び替え

function sort_japanese(){

  iconSortList.sort(function (a, b) {
    if (a.name.hiragana > b.name.hiragana) {
      return 1;
    } else {
      return -1;
    }
    return 0;
  });

  const icons = document.getElementsByClassName("icon");
  icons.remove();
  
  for (let i = 0; i < iconSortList.length; i = i + 1) {
    iconList.append(CreateIcon(iconSortList[i]));
  }
}

//英語並び替え

iconSortList.sort(function (a, b) {
  if (a.name.english > b.name.english) {
    return 1;
  } else {
    return -1;
  }
});