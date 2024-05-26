const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/Product");
const profileRoutes = require("./routes/profile");
const contactUsRoute = require("./routes/Contact");
const paymentRoutes = require("./routes/Payments")
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//port number
const PORT = process.env.PORT || 4000;

//loading environment variable 
dotenv.config();

//connecting to database
database.connect();

//middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)


//connection to cloudinary
cloudinaryConnect();

//setting up routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product",productRoutes );
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/payment",paymentRoutes)

//testing the server
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your is up and running...",
    })
});


//listining to the server 
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});