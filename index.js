const baseUrl = "https://us-central1-aizuhack-353413.cloudfunctions.net";

function Get_Profile() {
  return fetch(baseUrl + "/Data?collection=teacher", {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}
Get_Profile();
