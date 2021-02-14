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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

const Product = mongoose.model('Product', productSchema);
const bike = new Product({
  name: 'Road Bike',
  price: 599,
  categories: ['Cycling', 'Safety'],
});
bike
  .save()
  .then((data) => {
    console.log('It Worked!!!');
    console.log(data);
  })
  .catch((err) => {
    console.log('Not Saved');
    console.log(err.errors.name.properties.message);
  });
