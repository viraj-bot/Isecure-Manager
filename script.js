document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

    const username = document.querySelector('#sign-In-username').value;
    const pass = document.querySelector('#sign-In-password').value;

    if (username && pass) {

    } else {
        document.querySelector('#sign-In-username').placeholder = "Username";
        document.querySelector('#sign-In-password').placeholder = "Password";
        document.querySelector('#sign-In-username').classList.add('white_placeholder');
        document.querySelector('#sign-In-password').classList.add('white_placeholder');
    }
});