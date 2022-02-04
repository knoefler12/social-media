const postTextSpan = document.getElementById("post-text-span");
function createPost() {
  const date = new Date();
  const timeOfPost =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  const newPost = {
    date: timeOfPost,
    text: postTextSpan.textContent,
    imagePath: imageInput.value,
    user: {
      id: userInfo.id,
      username: userInfo.username,
      nickname: userInfo.nickname,
    },
  };

  fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(newPost),
  })
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((post) => {
      createPostDiv(post);
    });
}
