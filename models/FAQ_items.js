import mongoose from 'mongoose';

const FAQItemSchema = new mongoose.Schema({
    category: String,
    question: String,
    answer: String,
});

const FAQItems = mongoose.model('FAQitems', FAQItemSchema);

export default FAQItems;