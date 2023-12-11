function esValidoNombre(nombre) {
    // Validar que el nombre solo contenga letras y números
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(nombre);
}
function esValidoEmail(email) {
    // Validar formato de correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function esValidoMensaje(mensaje) {
    // Validar que el mensaje tenga más de 5 caracteres
    return mensaje.length > 5;
}
function enviarEmail() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var mensaje = document.getElementById('mensaje').value;
    // Validar nombre
    if (!esValidoNombre(nombre)) {
        alert('Por favor, ingrese un nombre alfanumérico válido.');
        return;
    }
    // Validar correo electrónico
    if (!esValidoEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }
    // Validar mensaje
    if (!esValidoMensaje(mensaje)) {
        alert('El mensaje debe tener más de 5 caracteres.');
        return;
    }
    var subject = 'Nuevo mensaje de contacto de ' + nombre;
    var body = 'Nombre: ' + nombre + '\nCorreo electrónico: ' + email + '\n\nMensaje:\n' + mensaje;
    var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    // Abre la herramienta de envío de emails predeterminada del sistema operativo
    window.location.href = mailtoLink;
}