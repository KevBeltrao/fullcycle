const express = require('express');

const db = require('./config/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  db.query('SELECT * FROM people', (err, people) => {
    if (err) {
      return res.send('something went wrong');
    }
    res.render('index', { people });
  });
});

app.post('/people', (req, res) => {
  db.query('INSERT INTO people SET ?', req.body, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/');
  });
});

app.delete('/people/:id', (req, res) => {
  db.query('DELETE FROM people WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.status(200).send('Deleted successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
