import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import userController, { ranking } from '../controllers/user';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:numero', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get("/about", mainController.about);
router.get('/create-cookie', mainController.createCookie);
router.get('uuid', mainController.clearCookie);

// MajorController
router.get('/major', majorController.index)
router.get('/major/read/:id', majorController.read)
router.get('/major/create', majorController.create)
router.post('/major/create', majorController.create)
router.get('/major/update/:id', majorController.update)
router.post('/major/update/:id', majorController.update)
router.post('/major/remove/:id', majorController.remove)

// UserController
router.get('/user', userController.index)
router.get('/user/create', userController.create)
router.post('/user/create', userController.create)
router.get('/user/read/:id', userController.read)
router.get('/user/update/:id', userController.update)
router.post('/user/update/:id', userController.update)
router.post('/user/remove/:id', userController.remove)
router.all('/user/logout', userController.logout)
router.get('/user/signup', userController.signup);
router.post('/user/signup', userController.signup);
router.get('/user/login', userController.login);
router.post('/user/login', userController.login);
router.get('/ranking', ranking);

// GameSessionController
router.post('/game-session', userController.gameSession);

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

export default router;