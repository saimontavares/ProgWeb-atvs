import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';

const router = Router();

router.get('/', mainController.index);
router.get('/lorem/:numero', mainController.lorem);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// MajorController
router.get('/major', majorController.index)
router.get('/major/read/:id', majorController.read)
router.get('/major/create', majorController.create)
router.post('/major/create', majorController.create)
router.get('/major/update/:id', majorController.update)
router.post('/major/update/:id', majorController.update)
router.post('/major/remove/:id', majorController.remove)

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