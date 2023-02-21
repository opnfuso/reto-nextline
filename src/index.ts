import express from 'express';
const app = express();

// Middleware que transforma la req.body en JSON
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('Alguien hizo ping');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
