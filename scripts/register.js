document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    // Obtener valores de los campos de entrada
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    // Validar los campos (aquí puedes agregar tu lógica de validación)
    if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }
    window.location.href = "login.html";
});
