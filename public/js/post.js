async function postFormHandler(event) {
  event.preventDefault();

  const post_title = document
    .querySelector('input[name="titleName"]')
    .value.trim();
  const post_body = document
    .querySelector('textarea[name="postBody"]')
    .value.trim();

  if (post_title && post_body) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        post_title,
        post_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".newpost").addEventListener("submit", postFormHandler);
