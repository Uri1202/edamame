
const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";


function CreateIcon(Icon_data) {

  const IconItem = document.createElement("a");
  IconItem.href = "profile.html?id=" + Icon_data.user.id;

  const userIcon = document.createElement("img");
  userIcon.classname = "IconItem_userIcon";
  userIcon.src = Icon_data.user.iconUrl;

  const userName = document.createElement("p");
  userName.classname = "IconItem_content";
  userName.textContent = Icon_data.user.displayName;

  IconItem.append(userIcon, userName);
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
