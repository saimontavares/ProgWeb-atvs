import { Router } from 'express';
import { LoremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (_req, res) => {
    res.send("Hello World!")
    // res.json({valor : 12})
})

router.get("/lorem/:numero", (_req, res) => {
    const numero = parseInt(_req.params.numero, 10);
    if (isNaN(numero) || numero < 1) {
        res.status(400).send("Parâmetro inválido. Informe um número inteiro positivo.");
        return;
    }
    const lorem = new LoremIpsum();
    const paragrafos = Array.from({ length: numero }, () => `<p>${lorem.generateParagraphs(1)}</p>`).join('\n');
    res.send(paragrafos);
})

router.get('/hb1', (req, res) => {
    res.render("hb1", {
        mensagem: "Seja bem-vindo(a)!",
        layout: false,
    })
})

router.get('/hb2', (req, res) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});

router.get('/hb3', (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', { profes, layout: false });
});

router.get('/hb4', function (req, res) {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb4', { technologies, layout: false });
});

router.get("/bemvindo/:nome", (req, res) => {
    const nome = req.params.nome;
    res.send(`Bem-vindo ${nome} ao ICOMP!`)
});

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Instituto de computação</h1>
    <script src="js/script.js"></script>
</body>
</html>`

router.get("/html", (_req, res) => {
    res.send(html)
});

router.get("/about", (_req, res) => {
    res.send("Página About!")
})

export default router;