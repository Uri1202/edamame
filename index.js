const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

function CreateIcon(profileData) {
  const iconData = document.createElement("a");
  iconData.href = "profile.html?id=" + profileData.id;

  //名前、画像、星評価のタグ作り
  const iconImg = document.createElement("img");
  iconImg.classname = "iconImg";
  iconImg.src = profileData.icon_data.imageUrl;

  const iconName = document.createElement("div");
  iconName.classname = "profileName";
  iconName.textContent = profileData.icon_data.name;

  const iconRate = document.createElement("div");
  iconRate.classname = "profileRate";

  //星のタグ作り
  const stars = {};

  for (let i = 1; i <= 5; i++) {

    const star = document.createElement("div");
    stars["star" + String(i)] = star;

    if (i <= Math.round(profileData.icon_data.rateAverage)) {
      stars["star" + String(i)].classname = "yellow";
    } else {
      stars["star" + String(i)].classname = "grey";
    }

    iconRate.append(stars["star" + String(i)]);
  }

  iconData.append(iconImg, iconName, iconRate);
  return iconData;
}

//テスト用のpost　↓

function Post() {
  const profile_data = {
    icon_data: {
      name: "nyan92015",
      imageUrl: "https://twitter.com/nyan84392441/photo",
      rateAverage: 2.3
    },
    ratedCount: 1,
    subjects: "数学",
    comments: "おはよう"
  };
  fetch(baseUrl + "/Data?collection=teacher?", {
    method: "POST",
    body: JSON.stringify(profile_data)
  });
}

Post();

function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}

const IconList = document.getElementsByClassName("main-content")[0];

Get_Profile().then((profileData) => {
  for (let i = 0; i < profileData.length; i = i + 1) {
    IconList.append(CreateIcon(profileData[i]));
  }
});
