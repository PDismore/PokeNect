async function followHandler(event) {
    event.preventDefault();
  

    const followed_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
      const response = await fetch("/api/follow", {
        method: "Delete",
        body: JSON.stringify({
          followed_id,
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
  
  document
    .querySelector("#unfollow-btn")
    .addEventListener("click", followHandler);