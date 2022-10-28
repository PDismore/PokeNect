async function searchUser(event) {
    event.preventDefault();

    const search = document.querySelector('#searchBar').value.trim();

    fetch(`/api/user/${search}`)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    document.location.replace(`/user/${data.id}`);
                })
                console.log('hi');
            } else {
                alert(response.statusText);
            }

        })
}


document.querySelector('#searchForm').addEventListener('submit', searchUser);