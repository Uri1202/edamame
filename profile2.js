const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";
console.clear();
let profileData;
const params = new URLSearchParams(document.location.search); //URLを取得
const myId = params.get("id"); //URLのidを取得

const flame = document.getElementsByClassName("flame01")[0];
const Name = document.getElementsByClassName("name")[0];
const star5 = document.getElementsByClassName("star5")[0];
const information = document.getElementsByClassName("information")[0];
const PostBtn = document.getElementsByClassName("submit")[0];
const commentList = document.getElementsByClassName("commentList")[0];

const radioBtn = document.getElementsByName("evaluation");

const submitStar = document.getElementsByClassName("submitStar")[0];

//プロフィール追加

function AddProfile(profileData) {
  const img = document.createElement("img");
  img.className = "Img";
  img.src = profileData.imageUrl;

  const name = document.createElement("div");
  name.className = "iconName";

  const japaneseName = document.createElement("div");
  japaneseName.className = "iconName";
  japaneseName.textContent = profileData.name.hiragana;

  const englishName = document.createElement("div");
  englishName.className = "iconName";
  englishName.textContent = profileData.name.english;

  name.append(japaneseName, englishName);

  const iconStar = document.createElement("span");
  const roundRate = Math.round(profileData.rateAverage * 2) / 2;
  iconStar.className = "star5_rating";
  iconStar.dataset.rate = roundRate.toString();

  const subject = document.createElement("div");
  subject.className = "subject";
  subject.textContent = profileData.subjects;

  information.append(subject);
  flame.append(img);
  Name.append(name);
  star5.append(iconStar);
}

//コメント追加

function AddComment(profileData) {
  for (let comment of profileData.comments) {
    const commentTag = document.createElement("div");
    commentTag.className = "comment";
    commentTag.textContent = comment;

    commentList.append(commentTag);
  }
}
//自分のコメント追加
function AddMyComment() {
  const textInput = document.getElementsByClassName("text")[0];

  const commentTag = document.createElement("div");
  commentTag.className = "comment";
  commentTag.textContent = textInput.value;

  commentList.append(commentTag);
}
function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  }).then((response) => {
    return response.json();
  });
}
//評価送信

function SubmitStar(profileData) {
  let newRateAverage;
  let newRateCount;

  return () => {
    for (let i = 0; i < radioBtn.length; i = i + 1) {
      if (radioBtn[i].checked === true) {
        newRateAverage =
          (profileData.rateAverage * profileData.ratedCount + (i + 1)) /
          (profileData.ratedCount + 1);

        newRateCount = profileData.ratedCount + 1;
      }
    }
    fetch(baseUrl + "/Data?collection=teacher&id=" + myId, {
      method: "PATCH",
      body: JSON.stringify({
        rateAverage: newRateAverage,
        ratedCount: newRateCount
      })
    });

    submitStar.disable = true;

    //星の更新
    while (star5.lastChild) {
      star5.removeChild(star5.lastChild);
    }
    const iconStar = document.createElement("span");
    const roundRate = Math.round(newRateAverage * 2) / 2;
    iconStar.className = "star5_rating";
    iconStar.dataset.rate = roundRate.toString();

    star5.append(iconStar);
  };
}
Get_Profile().then((PD_cloud) => {
  for (let i = 0; i < PD_cloud.length; i = i + 1) {
    if (PD_cloud[i].id === myId) {
      profileData = PD_cloud[i];
    }
  }
  console.log("profileData: ", profileData);

  AddProfile(profileData);
  AddComment(profileData);

  //コメント書き込み
  function PostComment() {
    const textInput = document.getElementsByClassName("text")[0];
    const comment = textInput.value;

    profileData.comments.push(comment);
    const newCommentData = profileData.comments;
    fetch(baseUrl + "/Data?collection=teacher&id=" + myId + "", {
      method: "PATCH",
      body: JSON.stringify({
        comments: newCommentData
      })
    });
  }
  PostBtn.addEventListener("click", PostComment, false);
  PostBtn.addEventListener("click", AddMyComment, false);
  submitStar.addEventListener("click", SubmitStar(profileData), false);
});
