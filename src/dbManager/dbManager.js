export const signIn = async (username, password) => {
  console.log("bruh");
  const response = await fetch("http://localhost:4200/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  let success = (await response.json()).success;
  console.log(success);
  //   if (success) console.log("SUCCESS");
  //   else console.log("FUCK");
};

export const createUser = async (username, password) => {
  const response = await fetch("http://localhost:4200/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  //   let success = await response.json().success;
  //   if (success) console.log("SUCCESS");
  //   else console.log("FUCK");
};

export const getConferences = async (username, password) => {
  const response = await fetch("http://localhost:4200/getConferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });

  return response.json();
};
