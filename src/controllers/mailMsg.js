const subjectNewAccount = 'Bienvenido a Gameland';

const textNewAccount = (userName, link) => {
    const html = `
        <p>
            Hola ${userName},
            Bienvenido a Gameland, muchas gracias por registrarte.
            Ingresa al siguiente link para activar tu cuenta:
            <a href="${link}">Activar cuenta</a>
        </p>
    `
    return html;
}

module.exports = {
    subjectNewAccount,
    textNewAccount
}
