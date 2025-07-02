import { NextFunction, Request, Response } from 'express';
import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from 'uuid';

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

const bemvindo = (req: Request, res: Response) => {
    const nome = req.params.nome;
    res.send(`Bem-vindo ${nome} ao ICOMP!`)
};

const hb1 = (req: Request, res: Response) => {
    res.render("hb1", {
        mensagem: "Universidade Federal do Amazonas",
        layout: "main",
    })
};

const hb2 = (req: Request, res: Response) => {
    res.render('hb2', {
        name: 'React',
        type: 'library',
        poweredByNodejs: true,
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

const about = (req: Request, res: Response) => {
    res.render('about', {
        layout: "main",
        titulo: "Sobre o Space Shooter",
        texto: "Shooter: Space Shot , conhecido no Japão como Simple 1500 Series 35: The Shooting ( SIMPLE1500シリーズ 35 The シューティング) , é um jogo de tiro com rolagem horizontal . Originalmente lançado no Japão como parte da série Simple em 2000, foi lançado na América do Norte pela A1 Games e Agetec . [ 1 ] Os jogadores podem jogar o jogo ou praticar suas várias habilidades em dois modos diferentes de jogo usando apenas uma nave.",
        imagens: [
            "/img/space-shooter1.png",
            "/img/space-shooter2.png"
        ]
    });
};

// Função para criar um cookie
const createCookie = function (req: Request, res: Response) {
    if (!('nomeCookie' in req.cookies)) {
        res.cookie('nomeCookie', 'valorCookie');
        res.send('Cookie criado com sucesso!');
    }
    else {
        res.send('Cookie já existe!');
    }
}

const clearCookie = function (req: Request, res: Response) {
    res.clearCookie('nomeCookie');
    res.send('cookie apagado');
};

const uuid = function (req: Request, res: Response, next: NextFunction) {
    const  uniqueId = uuidv4();
    res.send(`UUID: ${uniqueId}`);
};

export default { index, lorem, bemvindo, hb1, hb2, hb3, hb4, about, createCookie, clearCookie };