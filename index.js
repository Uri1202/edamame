const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

function CreateIcon(profileData) {
  const iconData = document.createElement("a");
  iconData.href = "profile.html?id=" + profileData.id;

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
    name: "にゃん",
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

Get_Profile().then((profileData) => {
  const iconSortList = [];
  for (let i = 0; i < profileData.length; i = i + 1) {
    iconSortList.push(profileData[i]);
  }
  //並び替え
  iconSortList.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  for (let i = 0; i < iconSortList.length; i = i + 1) {
    iconList.append(CreateIcon(iconSortList[i]));
    console.log("append ", iconSortList[i]);
  }
});
