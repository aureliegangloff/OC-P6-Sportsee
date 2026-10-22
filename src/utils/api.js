const MOCK = "mock";
const API_BASE_URL = "http://localhost:8000/api";
const CHOOSE_DATA = API_BASE_URL;

import { users } from "../data/users";
import { userActivity } from "../data/user-activity";

const createRequestError = (status, message, code) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

const getMockUser = (token) => {
  if (!token) {
    throw createRequestError(401, "Authentication requise");
  }

  const user = users.find((user) => user.token === token);

  if (!user) {
    throw createRequestError(403, "Token invalide");
  }

  return user;
};

const getMockActivity = (token, startDate, endDate) => {
  if (!token) {
    throw createRequestError(401, "Authentication requise");
  }

  const userActivities = userActivity.find((item) => item.token === token);

  if (!userActivities) {
    throw createRequestError(403, "Token invalide");
  }

  const selectedActivities = userActivities.activities.filter((activity) => {
    return activity.date >= startDate && activity.date <= endDate;
  });
  return selectedActivities;
};

export async function fetchLoginUser(username, password) {
  if (CHOOSE_DATA == MOCK) {
    if (!username || !password) {
      throw createRequestError(401, "Authentication requise");
    }

    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      throw createRequestError(401, "Invalid credentials");
    }

    return {
      token: user.token,
      userId: user.id,
    };
  } else {
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
}

export async function fetchUserInfos(token) {
  if (CHOOSE_DATA == MOCK) {
    const user = getMockUser(token);
    return {
      profile: user.profile,
      statistics: user.statistics,
    };
  } else {
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
}

export async function fetchUserActivities(token, startDate, endDate) {
  if (CHOOSE_DATA == MOCK) {
    const activities = getMockActivity(token, startDate, endDate);
    return activities;
  } else {
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
      throw new Error(
        "La réponse de l’API des activités n’est pas un tableau.",
      );
    }

    return data;
  }
}
