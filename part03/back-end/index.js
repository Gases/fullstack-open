const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://gassess:${password}@cluster0.d6rtu.mongodb.net/phoneApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Entry = mongoose.model('Entry', entrySchema);

if (process.argv.length === 3) {
  console.log('phonebook');
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    
    mongoose.connection.close();
  });

} else if (process.argv.length > 3) {
  const entry = new Entry({
    name: name,
    number: number,
    id: (Math.random() * 1000000).toFixed(0),
  });
  
  entry.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

let persons = [
  { 
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: 4,
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
];

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => {
  if (req.method === 'POST') {
    return [
      JSON.stringify(req.body)
    ]
  }
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  const date = new Date();
  
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);

  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const id = (Math.random() * 1000000).toFixed(0);
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'missing information'
    });
  } else if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({
      error: 'name already exists'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: id
  }

  persons = persons.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});