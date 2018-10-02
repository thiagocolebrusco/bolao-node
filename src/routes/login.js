
module.exports = function(app) {
    app.get("/login", (req, res) => {
        res.render("login")
    })

    app.post("/login", (req, res) => {
        var user = {
            username: req.body.username,
            password: req.body.password,
        }
        
        var usuariosController = new app.controllers.UsuariosController(app);
        usuariosController.login(user, function(err, user) {
            if(!user){
                res.render("login", {message: err} )
            } else {
                req.session.user = user;
                console.log(req.session)
                res.redirect("/")
            }
        })
    })

    app.all("*", checkUser);
}

function checkUser(req, res, next) {
    if ( req.path == '/login') return next();
  
    console.log("checkUser", req.session)
    if(req.session && req.session.user)
        next();
    else
        res.redirect("/login")
}