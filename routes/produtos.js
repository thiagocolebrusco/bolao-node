// module.exports = function(app) {

//     var lista = [
//         {
//             nome: "Caneta",
//             valor: 23.90
//         },
//         {
//             nome: "Mouse",
//             valor: 41.90
//         },
//     ]

//     app.get("/", (req, res) => res.send("Hello world"));
//     app.get("/home", (req, res) => res.render("home"));
//     app.get("/produto", (req, res) => { 
//         res.render("produtos/lista", {lista})
//     });
//     app.get("/produto/cadastro", (req, res) => {
//         res.render("produtos/cadastro")
//     });
//     app.post("/produto", (req, res) => {
//         var produto = {
//             nome: req.body.nome,
//             valor: req.body.valor
//         }
//         lista.push(produto);
//         res.redirect("/produto");
//     });
// }