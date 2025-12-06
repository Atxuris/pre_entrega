const formulario = document.getElementById("formulario");

//Función auxiliar para limpiar todos los mensajes de error
function limpiarMensajesError() {
    document.getElementById("error_nombre_vacio").innerText = "";
    document.getElementById("error_email_vacio").innerText = "";
    document.getElementById("error_password_vacio").innerText = "";
    document.getElementById("error_email_formato").innerText = "";
    document.getElementById("error_password_formato").innerText = "";
}

//Escuchamos el evento SUBMIT del formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();  
    
    limpiarMensajesError();
    let hayErrores = false;
    
    // Obtener y limpiar los valores
    const inputNombre = document.getElementById("nombre").value.trim();
    const inputEmail = document.getElementById("email").value.trim();
    const inputPassword = document.getElementById("password").value;  

    //Validaciones de Campos Vacíos
    
    if (inputNombre === "") {
        document.getElementById("error_nombre_vacio").innerText = "El nombre no puede estar vacío.";
        hayErrores = true;
    }  

    if (inputEmail === "") {
        document.getElementById("error_email_vacio").innerText = "El correo electrónico no puede estar vacío.";
        hayErrores = true;
    } 

    if (inputPassword === "") {
        document.getElementById("error_password_vacio").innerText = "La contraseña no puede estar vacía.";
        hayErrores = true;
    } 
    
    //Solo continuar con validaciones de formato si los campos no están vacíos
    if (!hayErrores) {
        
        //Validación de Formato de Email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(inputEmail)) {
            document.getElementById("error_email_formato").innerText = "Por favor, introduce un formato de correo electrónico válido.";
            hayErrores = true;
        }

        //Validación de Complejidad de Contraseña (Longitud Mínima)
        const longitudMinima = 8;
        if (inputPassword.length < longitudMinima) {
            document.getElementById("error_password_formato").innerText = `La contraseña debe tener al menos ${longitudMinima} caracteres.`;
            hayErrores = true;
        }
    }
    
    //Acción Final (Registro Exitoso)
    if (!hayErrores) {        
        alert("¡Registro exitoso! Redirigiendo a la página de inicio.");
        window.location.href = "../index.html"; 
    }   
});

//Escuchamos el evento RESET para limpiar los mensajes de error si existe el botón <button type="reset">
formulario.addEventListener("reset", () => {
    setTimeout(limpiarMensajesError, 50); 
});