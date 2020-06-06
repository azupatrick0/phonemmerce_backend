import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';


const phoneSchema = new mongoose.Schema({ name: String, grade: String, storageSize: String, price: String });

const sellSchema = new mongoose.Schema({
  phones: [phoneSchema],
});

sellSchema.plugin(mongoosePaginate);

const SellRequest = mongoose.model('sellrequests', sellSchema);

export default SellRequest;
