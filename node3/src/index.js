const http = require('http');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3333;
const CONTENT_DIR = path.join(__dirname, '../content');

const mimeTypes = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript'
};

const server = http.createServer(async (req, res) => {
  let url = req.url.split('?')[0];
  if (url === '/') url = '/index.html';
  const ext = path.extname(url);

  // Servir arquivos estáticos
  const filePath = path.join(CONTENT_DIR, url);
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Arquivo não encontrado');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});