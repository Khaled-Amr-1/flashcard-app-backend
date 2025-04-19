require("dotenv").config(); // تحميل المتغيرات البيئية
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// تمكين CORS للسماح بالاتصال من الـ frontend
app.use(cors({
    origin: "http://localhost:5173", // غيّره حسب رابط مشروع الفرونت إند بتاعك
}));

// استخدام Middleware لتحويل البيانات القادمة بصيغة JSON
app.use(express.json());

// التأكد من وجود MONGO_URI
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1); // إنهاء الخادم لو فيه مشكلة
}

// الاتصال بـ MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Listening on port: ${process.env.PORT || 5000}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });

// Route رئيسي
app.get("/", (req, res) => {
    res.send("Hello from the Flashcard App backend!");
});

// تعريف مخطط البيانات (Schema) للفلاش كارد
const flashcardSchema = new mongoose.Schema({
    question: String,
    answer: String,
    userId: {
        type: String,
        required: true,
    },
});

// إنشاء نموذج (Model)
const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// POST: إضافة Flashcard جديدة
app.post("/add-flashcard", async (req, res) => {
    const { question, answer, userId } = req.body;

    if (!question || !answer || !userId) {
        return res.status(400).json({ message: "Question, answer, and userId are required" });
    }

    try {
        const newFlashcard = new Flashcard({ question, answer, userId });
        await newFlashcard.save();
        res.status(201).json({ message: "Flashcard added successfully!", flashcard: newFlashcard });
    } catch (error) {
        res.status(500).json({ message: "Error adding flashcard", error: error.message });
    }
});

// GET: جلب كل الفلاش كاردات الخاصة بمستخدم معيّن
app.get("/flashcards/", async (req, res) => {
    const { userId } = req.params;

    try {
        const flashcards = await Flashcard.find({ userId });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flashcards", error: error.message });
    }
});

// DELETE: حذف Flashcard بواسطة ID
app.delete("/flashcards/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

        if (!deletedFlashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json({ message: "Flashcard deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting flashcard", error: error.message });
    }
});

// PUT: تحديث Flashcard بالكامل بواسطة ID
app.put("/flashcards/:id", async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ message: "Both question and answer are required" });
    }

    try {
        const updatedFlashcard = await Flashcard.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );

        if (!updatedFlashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json({ message: "Flashcard updated successfully", flashcard: updatedFlashcard });
    } catch (error) {
        res.status(500).json({ message: "Error updating flashcard", error: error.message });
    }
});
