require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const testsRoute = require("./routes/tests");
const lessonsRoute = require("./routes/lessons");
const attendanceRoute = require("./routes/attendance");
const messagesRoute = require("./routes/messages");
const homeworkRoute = require("./routes/homework");
const gradesRoute = require("./routes/grades");
const specialDatesRoute = require("./routes/specialDates");
const behaviorRoute = require("./routes/behavior");
const studentsRoute = require("./routes/students");
const classesRoute = require("./routes/class");
require("./strategies/local");
require("./database");

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "AAAAAAAAAAAAAAAAAAAAAAAAA",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/tests", testsRoute);
app.use("/lessons", lessonsRoute);
app.use("/attendance", attendanceRoute);
app.use("/messages", messagesRoute);
app.use("/homework", homeworkRoute);
app.use("/grades", gradesRoute);
app.use("/specialDates", specialDatesRoute);
app.use("/behavior", behaviorRoute);
app.use("/students", studentsRoute);
app.use("/class", classesRoute);

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}`));
