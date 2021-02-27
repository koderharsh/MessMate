export const postFCM = (idtoken,token) => {
  return fetch(`/fcm`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${idtoken}`,
    },
    body: JSON.stringify(token),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
