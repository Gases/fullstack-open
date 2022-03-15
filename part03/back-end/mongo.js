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
