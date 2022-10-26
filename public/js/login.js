async function loginFormHandler(event) {
    event.preventDefault();
  
    const password = document.querySelector('.loginPass').value.trim();
    const username = document.querySelector('.loginId').value.trim();
  
    if (password && username) {
      const response = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
          password,
          username
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  async function signupFormHandler(event) {
    event.preventDefault();
    console.log("hi")
  
    const username = document.querySelector('.createId').value.trim();
    const password = document.querySelector('.createPass').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.loginForm').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signupForm').addEventListener('submit', signupFormHandler);