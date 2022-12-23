const formulario = document.querySelector('.form');
const btnEnviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const text = document.querySelector('#text');
const divError = document.querySelector('.Error');
const er =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
const btnlimpiar = document.querySelector('#limpiar');



Eventos();
function Eventos() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur',validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    text.addEventListener('blur',validarFormulario);
    btnEnviar.addEventListener('click', enviarform);
    btnlimpiar.addEventListener('click', resetearformulario);
}
function iniciarApp() {

    btnEnviar.disabled = true;
    btnEnviar.classList.add('disable');
    btnDisable();
    validarFormulario();
    enviarform()
    limpiarForm() 

}

function btnDisable() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('disable');
}



function eliminarError() {
    let errordiv = document.querySelectorAll('.Error p');

    if (errordiv.length > 0) {
        const eliminar = document.querySelector('.Error p')
        eliminar.remove();
    }
}




function validarFormulario(e) {

    eliminarError()
    activarbtn() 

   


    if (e.target.value.length > 0) {

        if (e.target.type !== 'email') {
            e.target.classList.add('green-border');
            e.target.classList.remove('inputError');
            divError.classList.add('vista');

        }

    }else{
        mensajeErrores('Todos los campos deben estar llenos')

        e.target.classList.add('inputError')
        e.target.classList.remove('green-border');
    }

    if (e.target.type === 'email') {
        const email = e.target.value;

        if (er.test(email)) {
            e.target.classList.add('green-border');
            e.target.classList.remove('inputError');
            divError.classList.add('vista');


        }else{
            mensajeErrores('Email no valido')
            e.target.classList.add('inputError');
            e.target.classList.remove('green-border');

        }
    }
}




function mensajeErrores(mensajes) {

    const error = document.createElement('P');
    error.classList.add('activo')
    error.textContent = mensajes;
    
    divError.classList.remove('vista');

    const errorExiste = document.querySelectorAll('.activo');
    if (errorExiste.length === 0) {
        divError.appendChild(error)
    }

}

function activarbtn() {

    if (er.test(email.value) && asunto.value !== '' && text.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('disable');
    }else{
        btnDisable()
    }
}



function enviarform() {
    const spinner = document.querySelector('div .spn');
    spinner.classList.remove('activar');

    const enviado = document.createElement('P');
    enviado.textContent ='Mensaje Enviado Correctamente';
    enviado.classList.add('send');
    

    setTimeout(() => {
        spinner.classList.add('activar');
        formulario.appendChild(enviado);

        setTimeout(() => {
            enviado.remove();
            resetearformulario()

        },5000);

    },3000);


    
}

function resetearformulario() {
    email.value = '';
    asunto.value = '';
    text.value = '';
}