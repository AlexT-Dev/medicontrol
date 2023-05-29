

function messageAlert(textMessage) {


    switch(textMessage){
        //Para mensajes de usuario al iniciar sesión (login)
        case "noAccountOrPassword":
            return 'No tiene cuenta o contraseña, intente de nuevo.'
       
        case "incorrectPassword":
            return 'Contraseña inválida.'     
            
    }

}








module.exports = messageAlert;