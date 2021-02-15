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

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: 'Bike Helmet' });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory('Road');
  console.log(foundProduct);
};

findProduct();

// const bike = new Product({
//   name: 'Road Bike',
//   price: 599,
//   categories: ['Cycling', 'Safety'],
// });
// bike
//   .save()
//   .then((data) => {
//     console.log('It Worked!!!');
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log('Not Saved');
//     console.log(err.errors.name.properties.message);
//   });
