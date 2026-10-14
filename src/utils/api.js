const API_BASE_URL = "http://localhost:8000/api";

const createRequestError = (status, message, code) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

export async function fetchLoginUser(username, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw createRequestError(response.status, data?.message, "LOGIN");
  }

  return {
    token: data.token,
  };
}

export async function fetchUserInfos(token) {
  const response = await fetch(`${API_BASE_URL}/user-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw createRequestError(
      response.status,
      data?.message ||
        `Impossible de récupérer les infos (erreur ${response.status}).`,
      "USER_INFO",
    );
  }

  return { profile: data.profile, statistics: data.statistics };
}

export async function fetchUserActivities(token, startDate, endDate) {
  const response = await fetch(
    `${API_BASE_URL}/user-activity?startWeek=${startDate}&endWeek=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Impossible de récupérer vos activités (erreur ${response.status}).`,
    );
  }

  if (!Array.isArray(data)) {
    throw new Error("La réponse de l’API des activités n’est pas un tableau.");
  }

  return data;
}
