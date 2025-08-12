const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = './db.json';
function readDishes() {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data).dishes;
}

function writeDishes(dishes) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ dishes }, null, 2));
}


app.post('/dishes', (req, res) => {
  const dishes = readDishes();
  const newDish = req.body;
  newDish.id = dishes.length ? dishes[dishes.length - 1].id + 1 : 1;
  dishes.push(newDish);
  writeDishes(dishes);
  res.status(201).json(newDish);
});


app.get('/dishes', (req, res) => {
  const dishes = readDishes();
  res.json(dishes);
});


app.get('/dishes/:id', (req, res) => {
  const dishes = readDishes();
  const dish = dishes.find(d => d.id === parseInt(req.params.id));
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});


app.put('/dishes/:id', (req, res) => {
  const dishes = readDishes();
  const index = dishes.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    dishes[index] = { ...dishes[index], ...req.body, id: dishes[index].id };
    writeDishes(dishes);
    res.json(dishes[index]);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});


app.delete('/dishes/:id', (req, res) => {
  let dishes = readDishes();
  const index = dishes.findIndex(d => d.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedDish = dishes.splice(index, 1);
    writeDishes(dishes);
    res.json(deletedDish[0]);
  } else {
    res.status(404).json({ message: 'Dish not found' });
  }
});


app.get('/dishes/get', (req, res) => {
  const nameQuery = req.query.name?.toLowerCase();
  if (!nameQuery) {
    return res.status(400).json({ message: 'Query parameter "name" is required' });
  }

  const dishes = readDishes();
  const results = dishes.filter(d =>
    d.name.toLowerCase().includes(nameQuery)
  );

  if (results.length > 0) {
    res.json(results);
  } else {
    res.json({ message: 'No dishes found' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
