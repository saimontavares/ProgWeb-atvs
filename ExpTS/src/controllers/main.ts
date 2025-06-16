import { Request, Response } from 'express';
import { LoremIpsum } from "lorem-ipsum";

const index = (req: Request, res: Response) => {
    res.send("Hello World!")
};

const lorem = (req: Request, res: Response) => {
    const numero = parseInt(req.params.numero, 10);
    if (isNaN(numero) || numero < 1) {
        res.status(400).send("Parâmetro inválido. Informe um número inteiro positivo.");
        return;
    }
    const loremip = new LoremIpsum();
    const paragrafos = Array.from({ length: numero }, () => `<p>${loremip.generateParagraphs(1)}</p>`).join('\n');
    res.send(paragrafos);
};

const bemvindo = (req: Request, res: Response)=> {
    const nome = req.params.nome;
    res.send(`Bem-vindo ${nome} ao ICOMP!`)
};

const hb1 = (req: Request, res: Response) =>  {
    res.render("hb1", {
        mensagem: "Universidade Federal do Amazonas",
        layout: "main",
    })
};

const hb2 = (req: Request, res: Response) => {
    res.render('main/hb2', {
        nome: 'React',
        tipo: 'library',
        poweredByNode: true,
        layout: "main",
    });
};

const hb3 = (req: Request, res: Response) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', { profes, layout: "main" });
};

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb4', { technologies, layout: "main" });
};

export default { index, lorem, bemvindo, hb1, hb2, hb3, hb4 };