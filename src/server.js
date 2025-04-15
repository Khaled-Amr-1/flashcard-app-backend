// require("dotenv").config()
// const { PORT = 5000 } = process.env;
// const mongoose = require("mongoose")

// const app = require("./app");

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Listening on port: ${ PORT }`)
//         })
//     })
//     .catch(error => console.log(error))


//     // Keith was Here ^w^


// require("dotenv").config(); // لتحميل المتغيرات البيئية من ملف .env

// const { PORT = 5000 } = process.env; // أخذ قيمة الـ PORT من البيئة، إذا لم توجد القيمة سيكون 5000
// const mongoose = require("mongoose");
// const app = require("./app");

// // التأكد من وجود MONGO_URI في البيئة
// if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined in the environment variables.");
//     process.exit(1); // إيقاف الخادم إذا لم تكن المتغيرات البيئية صحيحة
// }

// // الاتصال بـ MongoDB
// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         // عندما يتم الاتصال بنجاح بـ MongoDB، قم بتشغيل الخادم
//         app.listen(PORT, () => {
//             console.log(`Listening on port: ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         // في حال فشل الاتصال بـ MongoDB، قم بطباعة الخطأ
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // إيقاف الخادم إذا فشل الاتصال بـ MongoDB
//     });

// // Keith was Here ^w^



// require("dotenv").config(); // لتحميل المتغيرات البيئية من ملف .env
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();

// // التأكد من وجود MONGO_URI في البيئة
// if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined in the environment variables.");
//     process.exit(1); // إيقاف الخادم إذا لم تكن المتغيرات البيئية صحيحة
// }

// // استخدام middleware لتحويل الـ JSON
// app.use(express.json());

// // الاتصال بـ MongoDB
// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         // عندما يتم الاتصال بنجاح بـ MongoDB، قم بتشغيل الخادم
//         app.listen(process.env.PORT || 5000, () => {
//             console.log(`Listening on port: ${process.env.PORT || 5000}`);
//         });
//     })
//     .catch((error) => {
//         // في حال فشل الاتصال بـ MongoDB، قم بطباعة الخطأ
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // إيقاف الخادم إذا فشل الاتصال بـ MongoDB
//     });

// // تعريف بعض الـ Routes

// // Route رئيسي يعرض رسالة ترحيب
// app.get("/", (req, res) => {
//     res.send("Hello from the Flashcard App backend!");
// });

// // نموذج مبدئي للـ Flashcard
// const flashcardSchema = new mongoose.Schema({
//     question: String,
//     answer: String,
// });

// const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// // Route لإضافة Flashcard
// app.post("/add-flashcard", async (req, res) => {
//     const { question, answer } = req.body;

//     // التأكد من وجود السؤال والإجابة
//     if (!question || !answer) {
//         return res.status(400).json({ message: "Both question and answer are required" });
//     }

//     try {
//         const newFlashcard = new Flashcard({ question, answer });
//         await newFlashcard.save();
//         res.status(201).json({ message: "Flashcard added successfully!", flashcard: newFlashcard });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding flashcard", error: error.message });
//     }
// });

// // Route لعرض جميع الـ Flashcards
// app.get("/flashcards", async (req, res) => {
//     try {
//         const flashcards = await Flashcard.find();
//         res.json(flashcards);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching flashcards", error: error.message });
//     }
// });


// // Route لحذف Flashcard بناءً على الـ ID
// app.delete("/flashcards/:id", async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

//         if (!deletedFlashcard) {
//             return res.status(404).json({ message: "Flashcard not found" });
//         }

//         res.json({ message: "Flashcard deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting flashcard", error: error.message });
//     }
// });


// require("dotenv").config(); // لتحميل المتغيرات البيئية من ملف .env
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();

// // تمكين CORS للاتصالات من الفرونت إند
// app.use(cors({
//     origin: "http://localhost:5173", // تأكد أن هذا هو رابط الـ frontend بتاعك
// }));

// // التأكد من وجود MONGO_URI في البيئة
// if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined in the environment variables.");
//     process.exit(1); // إيقاف الخادم إذا لم تكن المتغيرات البيئية صحيحة
// }

// // استخدام middleware لتحويل الـ JSON
// app.use(express.json());

// // الاتصال بـ MongoDB
// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         // عندما يتم الاتصال بنجاح بـ MongoDB، قم بتشغيل الخادم
//         app.listen(process.env.PORT || 5000, () => {
//             console.log(`Listening on port: ${process.env.PORT || 5000}`);
//         });
//     })
//     .catch((error) => {
//         // في حال فشل الاتصال بـ MongoDB، قم بطباعة الخطأ
//         console.error("Error connecting to MongoDB:", error);
//         process.exit(1); // إيقاف الخادم إذا فشل الاتصال بـ MongoDB
//     });

// // تعريف بعض الـ Routes

// // Route رئيسي يعرض رسالة ترحيب
// app.get("/", (req, res) => {
//     res.send("Hello from the Flashcard App backend!");
// });

// // نموذج مبدئي للـ Flashcard
// const flashcardSchema = new mongoose.Schema({
//     question: String,
//     answer: String,
//     userId: {
//         type: String,
//         required: true,
//     },
// });

// const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// // Route لإضافة Flashcard
// app.post("/add-flashcard", async (req, res) => {
//     const { question, answer, userId } = req.body;

//     // التأكد من وجود السؤال والإجابة وuserId
//     if (!question || !answer || !userId) {
//         return res.status(400).json({ message: "Question, answer, and userId are required" });
//     }

//     try {
//         const newFlashcard = new Flashcard({ question, answer, userId });
//         await newFlashcard.save();
//         res.status(201).json({ message: "Flashcard added successfully!", flashcard: newFlashcard });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding flashcard", error: error.message });
//     }
// });

// // Route لعرض جميع الـ Flashcards الخاصة بـ userId
// app.get("/api/flashcards/:userId", async (req, res) => {
//     const { userId } = req.params;

//     try {
//         const flashcards = await Flashcard.find({ userId });
//         res.json(flashcards);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching flashcards", error: error.message });
//     }
// });

// // Route لحذف Flashcard بناءً على الـ ID
// app.delete("/flashcards/:id", async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

//         if (!deletedFlashcard) {
//             return res.status(404).json({ message: "Flashcard not found" });
//         }

//         res.json({ message: "Flashcard deleted successfully!" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting flashcard", error: error.message });
//     }
// });


require("dotenv").config(); // لتحميل المتغيرات البيئية من ملف .env
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// التأكد من وجود MONGO_URI في البيئة
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1); // إيقاف الخادم إذا لم تكن المتغيرات البيئية صحيحة
}

// middleware لتحويل الـ JSON
app.use(express.json());

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

// نموذج الـ Flashcard
const flashcardSchema = new mongoose.Schema({
    question: String,
    answer: String,
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

// POST: إضافة Flashcard
app.post("/add-flashcard", async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ message: "Both question and answer are required" });
    }

    try {
        const newFlashcard = new Flashcard({ question, answer });
        await newFlashcard.save();
        res.status(201).json({ message: "Flashcard added successfully!", flashcard: newFlashcard });
    } catch (error) {
        res.status(500).json({ message: "Error adding flashcard", error: error.message });
    }
});

// GET: عرض كل الـ Flashcards
app.get("/flashcards", async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flashcards", error: error.message });
    }
});

// DELETE: حذف Flashcard حسب ID
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

// PUT: تحديث كامل لبطاقة الفلاش
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
