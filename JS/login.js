let email = "admin@admin.com";
let password = 'admin1234';

const formulario = document.getElementById("formulario");
const enviarBtn = document.getElementById("enviar-btn");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();  
    
    //Limpiar todos los mensajes de error antes de revalidar
    document.getElementById("empty_email").innerText = "";
    document.getElementById("empty_password").innerText = "";
    document.getElementById("email_error").innerText = "";
    document.getElementById("password_error").innerText = "";

    //Variable para rastrear si hay errores de validación
    let hayErrores = false;
    
    //Obtener los valores de los campos de entrada 
    let inputEmail = document.getElementById("email").value.trim();
    let inputPassword = document.getElementById("password").value;  

    //Validar que los campos no estén vacíos
    if (inputEmail === "") {
        document.getElementById("empty_email").innerText = "El campo de correo electrónico no puede estar vacío.";
        hayErrores = true;
    } 

    if (inputPassword === "") {
        document.getElementById("empty_password").innerText = "El campo de contraseña no puede estar vacío.";
        hayErrores = true;
    } 

    //verificar credenciales si no hay errores de campos vacíos
    if (!hayErrores) {
        //Validar las credenciales
        if (inputEmail !== email) {
            document.getElementById("email_error").innerText = "El correo electrónico es incorrecto.";
            hayErrores = true; // Establecer que hay error
        }
    
        if (inputPassword !== password) {
            document.getElementById("password_error").innerText = "La contraseña es incorrecta.";
            hayErrores = true; // Establecer que hay error
        }
    }
    
    //Redirección si todo es correcto
    if (!hayErrores) {
        window.location.href = "../index.html"; 
    }   
});


// EVENT LISTENER para el evento 'reset' para limpiar los campos de error
formulario.addEventListener("reset", () => {
    // Retraso para asegurar que los campos ya se hayan vaciado por el navegador
    setTimeout(limpiarMensajesError, 50); 
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();  
    limpiarMensajesError(); 
});
            