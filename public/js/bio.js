async function bioFormHandler(event) {
  event.preventDefault();

  const about_me = document
    .querySelector('textarea[name="about_me"]')
    .value.trim();

  const fav_pokemon = document
    .querySelector('input[name="fav_pokemon"]')
    .value.trim();

  const fav_game = document
    .querySelector('input[name="fav_game"]')
    .value.trim();

  const response = await fetch("/api/user", {
    method: "PUT",
    body: JSON.stringify({
      about_me,
      fav_pokemon,
      fav_game,
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

document.querySelector("#bio-save").addEventListener("click", bioFormHandler);
