
const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";


function CreateIcon(userData) {

  const IconItem = document.createElement("a");
  IconItem.href = "profile.html?id=" + userData.user.id;

  const userImg = document.createElement("img");
  userImg.classname = "userImg";
  userImg.src = userData.user.iconUrl;

  const userName = document.createElement("p");
  userName.classname = "userName";
  userName.textContent = userData.user.displayName;

  const userAssess = document.createElement("div");
  userAssess.classname = "userEval";
  userAssess.textContent = userData.user.assessment;

  IconItem.append(userImg, userName,userAssess);
  return IconItem;

}


//テスト用のpost　↓

function Post() {

  const postTemplate = {
    user: {
      displayName: "nyan92015",
      iconUrl: "https://twitter.com/nyan84392441/photo",
      id: "1",
    }
  };
  fetch(baseUrl + "/Data?collection=teacher?", {
    method: "POST",
    body: JSON.stringify(postTemplate)
  });

}


function Get_Profile() {

  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });

}

const Icon_list = document.getElementsByClassName("main-content")[0];

Get_Profile().then((Icons_data) => {

  for (let i = 0; i < Icons_data.length; i = i + 1) {
    profile.append(CreateIcon(Icons_data[i]));
  }

});
