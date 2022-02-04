const divCreateAccount = document.getElementById("create-account-div");
const inputLoginPassword = document.getElementById("input-login-password");
const inputLoginUsername = document.getElementById("input-login-username");
const inputLoginNickname = document.getElementById("input-login-nickname");
function createAccountElements(e) {
  if (e.target.id == 0) {
    divCreateAccount.innerHTML = `
        <h2>Create account</h2>
        <h4>Choose a username</h4>
        <input class="btn" id="input-create-username">
        <h4>Choose a handle</h4>
        <input class="btn" id="input-create-nickname">
        <h4>Choose a password</h4>
        <input class="btn" type="password" id="input-create-password">
        <div class="login-buttons-div">
            <input type="button" class="btn" id="submit-login" onclick="submitNewAccount()" value="Create account">
        </div>
    `;

    e.target.id = 1;
  } else {
    divCreateAccount.innerHTML = "";
    e.target.id = 0;
  }
}

function submitLogin() {
  const myUser = {
    username: inputLoginUsername.value,
    password: inputLoginPassword.value,
  };

  fetch(`http://localhost:8080/users/${myUser.username}/${myUser.password}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((user) => {
      if (user != null) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/posts/posts.html";
      } else {
        const loginHeader = document.getElementById("login-h2");
        loginHeader.innerText = "Forkert adgangskode, prøv igen";
        loginHeader.style.color = "red";
        throw new Error("wrong password try again");
      }
    });
}

function submitNewAccount() {
  const createUsername = document.getElementById("input-create-username");
  const createNickname = document.getElementById("input-create-nickname");
  const createPassword = document.getElementById("input-create-password");

  const newAccount = {
    username: createUsername.value,
    nickname: createNickname.value,
    password: createPassword.value,
  };
  fetch("http://localhost:8080/users", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(newAccount),
  }).then(() => {
    inputLoginUsername.value = createUsername.value;
    document.getElementById("input-login-password").value =
      createPassword.value;
    document.getElementById("1").id = 0;
    divCreateAccount.innerText = "";
  });
}
