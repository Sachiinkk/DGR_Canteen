const bcrypt = require("bcryptjs");
const db = require("../models/db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Security";

//admin registration formate


// exports.signup = async (req, res) => {
 
//   const { name, email,password , designation , status} = req.body;
//   console.log("Received body:", req.body);
  
//   try {
//     if (!name || !email || !password ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//   const [existingEmail] = await db.query("select * from users where email = ?" ,[email])
//   if(existingEmail.length) return res.status(400).json({message :"Employee Alredy Exist"})

//   const hashedPass = await bcrypt.hash(password, 10);
    

//     await db.query(
//       "INSERT INTO users (name, email,password , designation , status) VALUES (?, ?, ?,?,?)",
//       [name, email, hashedPass , designation , status ]
//     );

//     res.status(201).json({
//       hashedPass,
//       message: `user registered. succesfully.`,
//     });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     res.status(500).json({ message: "Signup failed", error: err.message });
//   }
// };


exports.signup = async (req, res) => {
 
  const { name, email,password , Designation  , status} = req.body;
  console.log("Received body:", req.body);
  
  try {
    if (!name || !email || !password ) {
      return res.status(400).json({ message: "All fields are required" });
    }

  const [existingEmail] = await db.query("select * from users where email = ?" ,[email])
  if(existingEmail.length) return res.status(400).json({message :"Employee Alredy Exist"})

  const hashedPass = await bcrypt.hash(password, 10);
    

    await db.query(
      "INSERT INTO users (name, email,password , Designation  , status) VALUES (?, ?, ?,?,?)",
      [name, email, hashedPass , Designation , 'pedding']
    );

    res.status(201).json({
      message: `user registered. succesfully.waiting for admin approval`,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM USERS WHERE email = ?", [
      email,
    ]);
    if (!users.length)
      return res.status(404).json({ message: "User Not found" });

    const user = users[0];
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    if (user.status !== "approved")
      return res.status(403).json({ token,message: "Accound yet not approved yet" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    
    res.status(200).json({
      user: { token ,id: user.id, name: user.name, Designation: user.Designation },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};



exports.approve = async (req, res) => {
  const { id } = req.params;
console.log("Approving user with ID:", id);
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    
    if (!rows.length) {
      return res.status(404).json({ message: "User not found" }); // <== Case 1
    }

    if (rows[0].status === "approved") {
      return res.status(400).json({ message: "User already approved" }); // <== Case 2
    }

    await db.query("UPDATE users SET status = 'approved' WHERE id = ?", [id]);

    res.status(200).json({ message: "User approved successfully" });
  } catch (err) {
    console.error("Approval error:", err);
    res.status(500).json({ message: "Approval failed", error: err.message }); // <== Case 3
  }
};
