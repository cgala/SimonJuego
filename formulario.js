function isValidName(name) {
    // Validar que el nombre solo contenga letras y números
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(name);
}

function isValidEmail(email) {
    // Validar formato de correo electrónico
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidMessage(message) {
    // Validar que el mensaje tenga más de 5 caracteres
    return message.length > 5;
}

function sendEmail() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Validar nombre
    if (!isValidName(name)) {
        alert('Por favor, ingrese un nombre alfanumérico válido.');
        return;
    }

    // Validar correo electrónico
    if (!isValidEmail(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    // Validar mensaje
    if (!isValidMessage(message)) {
        alert('El mensaje debe tener más de 5 caracteres.');
        return;
    }

    var subject = 'Nuevo mensaje de contacto de ' + name;
    var body = 'Nombre: ' + name + '\nCorreo electrónico: ' + email + '\n\nMensaje:\n' + message;

    var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    // Abre la herramienta de envío de emails predeterminada del sistema operativo
    window.location.href = mailtoLink;
}