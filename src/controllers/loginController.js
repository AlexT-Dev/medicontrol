//Para la funcionalidad del servicio
const loginControl = {};


loginControl.login = (req, res) =>{
      delete req.session.user;
      delete req.session.activo; 
    res.render('../views/login/login', {
       title: "Login",
      message: ""
    })
}

module.exports = loginControl;