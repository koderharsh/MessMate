import jwtDecode from "jwt-decode";
//staff signup
export const signup = (student) => {
  return fetch(`/signup/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//staff login
export const login = (student) => {
  return fetch(`/login/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// add token to localstorage
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("student", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  const storedToken = localStorage.getItem("student");
  if (typeof window == "undefined") {
    return false;
  }
  if (storedToken) {
    const student = JSON.parse(storedToken);
    const decodedToken = jwtDecode(student.studenttoken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("student");
      window.location.href = "/login/student";
    } else {
      return JSON.parse(storedToken);
    }
  } else {
    return false;
  }
};

export const postAbsentee = (token, meal) => {
  return fetch(`/absentees`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(meal),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postFeedback = (token, feedback) => {
  return fetch(`/feedback`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getMenu = (token) => {
  return fetch(`/menu/student`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
