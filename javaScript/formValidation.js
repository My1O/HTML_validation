
export function valida(input) {

    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]) {
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoInput, input);

    }
}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError",];

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo no nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo email no puede estar vacio",
        typeMismatch: " El correo no es valido ",
    },
    password: {
        valueMissing: " Este campo no password no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, maximo 12. Debe contener: 1 minuscula, 1 mayuscula, 1 numero y sin caracteres especiales",
    },
    nacimiento: {
        valueMissing: " Este campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 de edad",
    },
    numero: {
        valueMissing: " Este campo numero telefonico no puede estar vacio",
        patternMismatch: "El formato requerido es XXX-XXXX-XXXX 11 numeros",
    },
    direccion: {
        valueMissing: " Este campo numero telefonico no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres",
    },
    ciudad: {
        valueMissing: " Este campo numero telefonico no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 y 40 caracteres",
    },
    estado: {
        valueMissing: " Este campo numero telefonico no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input) {
    let mensaje = "";

    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoInput][error]);
            mensaje = mensajeDeError[tipoInput][error];
        }
    });

    return mensaje;
}
/*
const inputDOB = document.querySelector("#birth");

inputDOB.addEventListener("blur", (evento) =>{
    validarNacimiento(evento.target);
});
*/
function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferencialFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferencialFecha < fechaActual;
}