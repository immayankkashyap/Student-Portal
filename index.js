// const cors = require('cors');
// app.use(cors());

async function signup(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await axios.post("http://localhost:3000/signup", {
      username: username,
      password: password,
    });
    alert("Signup successfully");
  } catch (error) {
    alert("Signup failed: " + (error.response?.data?.message || error.message));
  }
}

async function signin(event) {
  event.preventDefault();
  const username = document.getElementById("loginIdentifier").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await axios.post("http://localhost:3000/signin", {
      username: username,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    alert("Signin successful");
    window.location.href = "welcome.html";
  } catch (error) {
    alert("Signin failed: " + (error.response?.data?.message || error.message));
  }
}

async function getuserinfo(event) {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      const response = await axios.get("http://localhost:3000/me", {
        headers: {
          // token: `Bearer ${token}`
          token: token,
        },
      });
      document.querySelector("body").innerHTML = "";
      const info = document.createElement("div");
      info.className = "user-box";
      info.innerHTML = `
  <h2>User Info:</h2>
  <p><strong>Username:</strong> ${response.data.user.username}</p>
`;
      document.querySelector("body").appendChild(info);
    }
  } catch (error) {
    alert("Signin failed: " + (error.response?.data?.message || error.message));
  }
}

async function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
