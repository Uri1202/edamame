function Get_Profile() {
    return fetch(baseUrl + "/Data?collection=sns", {
      method: "GET"
    }).then((response) => {
      return response.json();
    });
}

