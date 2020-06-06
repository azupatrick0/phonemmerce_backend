import mongoose from 'mongoose';

const phoneSchema = new mongoose.Schema({ name: String, grade: String, storageSize: String, price: String });

const buySchema = new mongoose.Schema({
  phones: [phoneSchema],
});

const BuyRequest = mongoose.model('buyrequests', buySchema);

export default BuyRequest;
