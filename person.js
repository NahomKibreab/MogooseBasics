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

personSchema.pre('save', async function () {
  this.first = 'Alex';
  this.last = 'Mehanzel';
  console.log('About to Save!!!');
});

personSchema.post('save', async function () {
  console.log('Just Saved!!!');
});

const Person = mongoose.model('Person', personSchema);
