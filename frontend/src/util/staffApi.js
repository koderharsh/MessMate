import jwtDecode from "jwt-decode";
//staff signup
export const signup = (staff) => {
  return fetch(`/signup/staff`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//staff login
export const login = (staff) => {
  return fetch(`/login/staff`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staff),
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
    localStorage.setItem("staff", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  const storedToken = localStorage.getItem("staff");
  if (typeof window == "undefined") {
    return false;
  }
  if (storedToken) {
    const staff = JSON.parse(storedToken);
    const decodedToken = jwtDecode(staff.stafftoken);
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("staff");
      window.location.href = "/login/staff";
    } else {
      return JSON.parse(storedToken);
    }
  } else {
    return false;
  }
};

//get Absentees
export const getAbsentees = (token) => {
  return fetch(`/absentees`, {
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

//get feedback
export const getFeedback = (token) => {
  return fetch(`/feedback`, {
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

export const postMenu = async (token, menu) => {
  return await fetch(`/menu`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menu),
  })
    .then((response) => {
      return console.log("hello", response.json());
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getMenu = (token, menu) => {
  return fetch(`/menu/staff`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menu),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
