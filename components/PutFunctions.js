export const PutFunctions = () => {
  const url =
    "https://192.168.0.17/api/WkIlfe6VBKQZojZ5TkHo22Dw-Tt24XsK5c69WtkA/lights/1/state";
  const requestBody = {
    on: true,
  };

  fetch(url, {
    method: "PUT", // Assuming you want to update the state using a PUT request
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};
