//Para la funcionalidad del servicio
const loginControl = {};

loginControl.login = (req, res) =>{
    res.render('../views/login/login', { titulo: "Login"})
}

module.exports = loginControl;