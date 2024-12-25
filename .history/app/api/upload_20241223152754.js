import nextConnect from "next-connect";
import multer from "multer";
import { MongoClient } from "mongodb";

// Multer setup for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

const handler = nextConnect();

handler.use(upload.single("image")); // 'image' is the field name in form

handler.post(async (req, res) => {
  try {
    const { image } = req.file; // The uploaded image
    const imagePath = `/uploads/${image}`;

    // MongoDB Connection URI
    const uri = "mongodb+srv://yude7374:Tazeem123@cluster0.yrsq5.mongodb.net/";
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Access the database and collection
    const db = client.db("product");
    const studentsCollection = db.collection("students");

    // Store image URL in MongoDB
    const newStudent = {
      name: req.body.name, // Get name or other form data
      image: imagePath, // Image URL stored in MongoDB
    };

    await studentsCollection.insertOne(newStudent);

    client.close();

    res
      .status(200)
      .json({ message: "Image uploaded and saved to MongoDB", imagePath });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

export default handler;
