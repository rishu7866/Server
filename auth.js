const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const router = express.Router();
require("./app");
app.use(express.urlencoded({ extended: false }));
const User = require("./userSchema");
const multer = require("multer");


function generateOTP() {
  var otp = "";
  var otpLength = 2;
  var characters = "0123456789";
  for (var i = 0; i < otpLength; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
}

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = new Date();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb("not created", './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  },
});
const upload = multer({ storage:storage });

router.post('/details', upload.single("File"),  (req, res,next) => {
  const { Auth, Loc, Desc } = req.body;
  const like=generateOTP()
  const fulldate=`${date.getDate()} ${month[date.getMonth()]} ${date.getUTCFullYear()}`
  const file=req.file
  if (!Auth || !Loc || !Desc) {
    res.status(422).json({ error: "empty field from console" });
    return console.log("empty field");
  }
  const user = new User({
    file,
    Auth,
    Loc,
    Desc,
    like,
    fulldate,
  });

  user.save();

  res.status(201).json({ message: "user registered successfully" });
  console.log("user registered successfully");
});



router.get("/", async (req, res) => {
  try {
    const postview=await User.find({}).then((data) => {
      res.json(postview)
      res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    res.send({ status: "Cant get Data" });
  }
});

module.exports = router;
