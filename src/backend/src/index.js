import app from './app.js';

app.get('/', (req, res) => {
  res.status(200).send('Hello');
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
