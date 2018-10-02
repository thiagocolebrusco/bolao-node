const multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app) {
    app.get("/times", (req, res) => {
        res.locals.module = 'time'
        var timesController = new app.controllers.TimesController(app);
        timesController.listar(function(err, list) {
            res.render('times/lista', {list});
        })
    })
    app.get("/times/cadastro/:id?", (req, res) => {
        res.locals.module = 'time'
        var timesController = new app.controllers.TimesController(app);
        if(req.params.id){
            var id = req.params.id
            timesController.buscarPorId(id, function(err, team) {
                res.render('times/cadastro', {team});
            })
        } else {
            res.render('times/cadastro', {team: {}});
        }
    })
    app.post("/times/cadastro/:id?", upload.single("img"),  (req, res) => {
        res.locals.module = 'time'

        var team = {
            name: req.body.name,
            acronym: req.body.acronym,
            img: req.file ? req.file.filename : null
        }
        if(req.params.id)
            team.id = req.params.id

        var timesController = new app.controllers.TimesController(app);
        timesController.salvar(team, function(err) {
            var message = err ? err.message : "Salvo com sucesso";
            res.render('times/cadastro', {team, message});
        })
    })
    app.get("/times/excluir/:id", (req, res) => {
        if(!req.params.id){
            res.send("Erro ao excluir");
        }
        else {
            var id = req.params.id
            var timesController = new app.controllers.TimesController(app);
            timesController.excluir(id, function(err, deleted) {
                if(err || !deleted) {
                    res.send("Não foi possível excluir");
                } else {
                    res.redirect("/times");
                }
            })
        }
    })
}

function isAuthenticated(req, res, next) {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user && req.user.authenticated)
    return next();

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/login');
}