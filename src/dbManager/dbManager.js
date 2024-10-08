export const signIn = async (username, password) => {
  const response = await fetch("http://localhost:4200/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  let success = (await response.json()).success;
  console.log(success);
};

export const createUser = async (username, password) => {
  const response = await fetch("http://localhost:4200/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
};

export const getConferences = async (username, password) => {
  const response = await fetch("http://localhost:4200/getConferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch conferences");
  }

  return await response.json();
};

export const deleteConference = async (username, password, conferenceId) => {
  const response = await fetch("http://localhost:4200/deleteConference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, conferenceId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete conference");
  }

  return await response.json();
};

export const createConference = async (username, password, data) => {
  const response = await fetch("http://localhost:4200/createConference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, data }),
  });

  if (!response.ok) {
    throw new Error("Failed to create conference");
  }

  return await response.json();
};
