const mongoose = require('mongoose');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config();

const app = express();

// إعداد CORS للسماح بـ localhost أثناء التطوير
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined.');
  process.exit(1);
}

mongoose.set('strictQuery', true);  // لتفادي التحذير من Mongoose

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Hello from the Flashcard App backend!');
});

// Counter لتوليد ID رقمي
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', counterSchema);

// Flashcard Schema
const flashcardSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  question: String,
  answer: String,
  category: {
    type: String,
    required: true,
  },
});
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// دالة توليد ID
async function getNextSequence(name) {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

// إضافة فلاش كارد
app.post('/add-flashcard', async (req, res) => {
  const data = req.body;
  const flashcards = Array.isArray(data) ? data : [data];
  
  const invalid = flashcards.some(fc => !fc.question || !fc.answer || !fc.category);
  if (invalid) {
    return res.status(400).json({ message: 'Each flashcard must include question, answer, and category' });
  }

  try {
    const flashcardsWithIds = await Promise.all(
      flashcards.map(async fc => {
        const nextId = await getNextSequence('flashcardid');
        return {
          id: nextId,
          question: fc.question,
          answer: fc.answer,
          category: fc.category,
        };
      })
    );
    const savedFlashcards = await Flashcard.insertMany(flashcardsWithIds);
    res.status(201).json({ message: 'Flashcards added successfully!', flashcards: savedFlashcards });
  } catch (error) {
    res.status(500).json({ message: 'Error adding flashcards', error: error.message });
  }
});

// جلب فلاش كاردات حسب الفئة (category)
app.get('/flashcards/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const flashcards = await Flashcard.find({ category });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flashcards', error: error.message });
  }
});

// حذف فلاش كارد بالـ id
app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFlashcard = await Flashcard.findOneAndDelete({ id: parseInt(id) });
    if (!deletedFlashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.json({ message: 'Flashcard deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting flashcard', error: error.message });
  }
});

// تعديل فلاش كارد بالـ id
app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ message: 'Both question and answer are required' });
  }

  try {
    const updatedFlashcard = await Flashcard.findOneAndUpdate(
      { id: parseInt(id) },
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedFlashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json({ message: 'Flashcard updated successfully', flashcard: updatedFlashcard });
  } catch (error) {
    res.status(500).json({ message: 'Error updating flashcard', error: error.message });
  }
});

// جلب كل الفلاش كاردات بدون فلترة
app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find({});
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all flashcards', error: error.message });
  }
});

module.exports.handler = serverless(app);
