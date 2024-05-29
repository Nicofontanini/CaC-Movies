// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario

    // Aquí deberías agregar la lógica para verificar las credenciales del usuario.
    // Si las credenciales son correctas, muestra la página de inicio y oculta la página de inicio de sesión.
    var username = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    // Supongamos que aquí tienes una función llamada 'authenticateUser' que verifica las credenciales.
    if (authenticateUser(username, password)) {
        window.location.href = 'index.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

function authenticateUser(username, password) {
    // Aquí deberías implementar la lógica para verificar las credenciales del usuario.
    // Puedes usar localStorage, sessionStorage, cookies o comunicarte con un backend para autenticar al usuario.
    // Por simplicidad, en este ejemplo, solo comparamos el nombre de usuario 'admin' y la contraseña 'admin'.
    return (username === 'admin@admin.com' && password === 'admin');
}


