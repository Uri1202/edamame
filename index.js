function Get_Profile() {
    return fetch(baseUrl + "/Data?collection=teacher", {
      method: "GET"
    }).then((response) => {
      return response.json();
    });
}
Get_Profile()
