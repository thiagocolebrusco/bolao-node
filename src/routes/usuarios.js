module.exports = function(app) {

    app.get("/", (req, res) => {
        res.locals.module = 'home'
        res.render("home/index")
    });
    app.get("/usuarios", function(req, res){
        res.locals.module = 'usuario'
        var usuariosController = new app.controllers.UsuariosController(app);
        usuariosController.listar(function(err, list) {
            res.render('usuarios/lista', {list});
        })
    })
    app.get("/usuarios/cadastro/:id?", (req, res) => { 
        res.locals.module = 'usuario'
        if(req.params.id){
            var usuariosController = new app.controllers.UsuariosController(app);
            usuariosController.buscarPorId(req.params.id, function(err, user){
                res.render("usuarios/cadastro", { user: user })
            })
        } else {
            res.render("usuarios/cadastro", { user: {}})
        }
        
    });
    app.post("/usuarios/cadastro/:id?", (req, res) => {
        res.locals.module = 'usuario' 
        var user = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        if(req.params.id)
            user.id = req.params.id

        var usuariosController = new app.controllers.UsuariosController(app);
        usuariosController.salvar(user, function(err) {
            if(err)
                res.render('usuarios/cadastro', {user: user, message: err.message});
            else
                res.render('usuarios/cadastro', {user: user, message: "Salvo com sucesso"});
        })
    });
    app.get("/usuarios/excluir/:id", (req, res) => {
        if(!req.params.id) {
            res.send("Inválido");
        } else {
            var id = req.params.id

            var usuariosController = new app.controllers.UsuariosController(app);
            usuariosController.excluir(id, function(err, deleted) {
                if(err || !deleted)
                    res.send("Falha ao excluir");
                else
                    res.redirect('/usuarios');
            }) 
        }
    });

}