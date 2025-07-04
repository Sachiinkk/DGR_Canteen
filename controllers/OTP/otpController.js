const admin= require('./fireBase')
const db = require('../../models/db')


exports.sendOtp = async(req , res)=> {


  const {mobile} = req.body;

  if(!mobile) return res.status(400).json({message:"Mobile Number is Invalid"})

    res.status(200).json({message:`OTP sent to registered ${mobile}`})

}

exports.verifyOtp = async (req, res) => {c
  const { idToken, mobile } = req.body;

  if (!idToken || !mobile) {
    return res.status(400).json({ message: "idToken and mobile required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const phoneNumber = decodedToken.phone_number;

    if (!phoneNumber || phoneNumber !== `+91${mobile}`) {
      return res.status(401).json({ message: "Invalid phone number" });
    }

    const [existingUser] = await db.query(
      "SELECT * FROM employee WHERE mobile_number = ?",
      [mobile]
    );

    if (existingUser.length > 0) {
      return res.status(200).json({
        message: "User Already Exists",
        user: existingUser[0],
      });
    }

    await db.query("INSERT INTO employee (mobile_number, status) VALUES (?, ?)", [
      mobile,
      "approved",
    ]);

    res.status(201).json({ message: "User verified & added successfully" });
  } catch (err) {
    console.error("OTP Verify Error:", err);
    res.status(500).json({ message: "OTP Verification Failed", error: err.message });
  }
};


