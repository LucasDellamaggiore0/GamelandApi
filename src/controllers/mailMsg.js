const subjectNewAccount = 'Welcome to Gameland';

const textNewAccount = (userName) => {
    const html = `
        <h1>Welcome to Gameland</h1>
        <p>
            Hola ${userName},
            Bienvenido a Gameland, muchas gracias por registrarte.
            Te pido muy amablemente que seas responsable a la hora de subir contenido a la pagina, ya que es un proyecto personal que realicé con mucho esfuerzo y posiblemente sea visto por muchas personas, entre ellas reclutadores.
            Espero que disfrutes de la experiencia.
            Saludos.
            Gameland Staff
        </p>
    `
    return html;
}

module.exports = {
    subjectNewAccount,
    textNewAccount
}