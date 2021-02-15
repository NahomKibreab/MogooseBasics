const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/shopApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log('Connection Opened!!!');
  })
  .catch((err) => {
    console.log('Not Connected!!!');
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`;
});

const Person = mongoose.model('Person', personSchema);
