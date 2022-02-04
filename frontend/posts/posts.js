const postsUrl = "http://localhost:8080/posts/";
const postGrid = document.getElementById("posts-grid");
const imageInput = document.getElementById("image-input");
const userInfoJson = localStorage.getItem("user");
const userInfo = JSON.parse(userInfoJson);
fetch(postsUrl)
  .then((response) => response.json())
  .then((post) => {
    post.map(createPostDiv);
  });

function createPostDiv(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postGrid.appendChild(postDiv);
  constructPostCard(postDiv, post);
}

function constructPostCard(postDiv, post) {
  //for update function
  postDiv.innerHTML = "";

  const divData = [];
  const postInfoDiv = document.createElement("div");
  postInfoDiv.className = "post-info-div";

  //creating p elements and append them
  for (let i = 0; i < 3; i++) {
    divData[i] = document.createElement("p");
    postInfoDiv.appendChild(divData[i]);
  }
  postDiv.appendChild(postInfoDiv);
  divData[0].innerText = post.user.username;
  divData[0].id = "username";

  divData[1].innerText = `@${post.user.nickname}`;
  divData[1].id = "nickname";

  divData[2].innerText = post.date;
  divData[2].id = "date";

  //creating and appending img
  divData[3] = document.createElement("img");
  divData[3].src = post.imagePath;
  postDiv.appendChild(divData[3]);

  divData[4] = document.createElement("p");
  divData[4].innerText = post.text;
  postDiv.appendChild(divData[4]);

  if (userInfo.username == post.user.username) {
    const deleteButton = document.createElement("button");
    deleteButton.onclick = (e) => deletePost(e, post);
    deleteButton.innerText = "DELETE";
    deleteButton.className = "btn-danger";

    const editButton = document.createElement("button");
    editButton.onclick = () =>
      editPost(post, submitButton, divData, editButton);
    editButton.innerText = "Edit";
    editButton.className = "btn-primary";

    const submitButton = document.createElement("button");
    submitButton.onclick = () => submitPost(post, postDiv, divData);
    submitButton.innerText = "Submit";
    submitButton.className = "btn-primary";
    submitButton.style.display = "none";
    submitButton.value = 0;
    postDiv.appendChild(editButton);
    postDiv.appendChild(submitButton);
    postDiv.appendChild(deleteButton);
  }
}

/*function searchForHashtag() {
  const submitHashtagDiv = document.getElementById("search-for-hashtag");
  const hashtagInput = document.getElementById("input-hashtag").value;
  const savedPostGrid = postGrid;

  console.log(hashtagInput);

  const cancelSearchButton = document.createElement("button");
  cancelSearchButton.innerText = "CANCEL";
  cancelSearchButton.className = "btn";
  cancelSearchButton.onclick = () => cancelSearchButton(savedPostGrid);
  submitHashtagDiv.appendChild(cancelSearchButton);

  fetch(postsUrl + "hashtag/" + hashtagInput)
    .then((response) => response.json())
    .then((post) => {
      console.log(post);
    });
}*/

function cancelSearchButton(savedPostGrid) {}

//lav så man kan se om den er redigeret
function editPost(post, submitButton, divData) {
  if (submitButton.value == 0) {
    divData[4].innerText = "";
    editTextInput = postTextSpan.cloneNode();
    editTextInput.innerText = post.text;
    editTextInput.className = "edit-span";

    divData[4].appendChild(editTextInput);

    submitButton.style.display = "";
    submitButton.value = 1;
  } else {
    divData[4].innerText = post.text;
    submitButton.style.display = "none";
    submitButton.value = 0;
  }
}

function submitPost(post, postDiv, divData) {
  const updatedPost = {
    text: divData[4].innerText,
    user: {
      id: post.user.id,
    },
  };

  fetch(postsUrl + post.id, {
    method: "PATCH",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(updatedPost),
  }).then((response) => {
    if (response.status == 200) {
      updatedPost.id = post.id;
      updatedPost.user.username = post.user.username;
      updatedPost.date = post.date;
      updatedPost.user.nickname = post.user.nickname;
      updatedPost.imagePath = post.imagePath;
      constructPostCard(postDiv, updatedPost);
    }
  });
}

function deletePost(e, post) {
  //deletes post

  fetch(postsUrl + post.id, {
    method: "DELETE",
  }).then((response) => {
    if (response.status === 200) {
      e.target.parentNode.remove();
    }
  });
}
