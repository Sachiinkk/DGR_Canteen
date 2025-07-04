const db = require('../models/db')

exports.allocateCoupons = async (req , res) =>{
    const { id } = req.params;
    const { count } = req.body;

  try {
   
    if (!count || isNaN(count) || count < 1) {
      return res.status(400).json({ message: "Invalid coupon count" });
    }

    // Validate user
     const [result] = await db.query(
      "UPDATE users SET coupons = ? WHERE Designation = 'employee' AND status = 'approved'",
      [count]
    );
     if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No approved employees found" });
    }

    
    res.status(200).json({ message: `✅ ${count} coupons allocated to employee ID ${id}` });
  } catch (err) {
    console.error("Coupon Allocation Error:", err);
    res.status(500).json({ message: "Coupon allocation failed", error: err.message });
  }
}
function generateCouponCode() {
  return "CPN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
} 


exports.addUsers = async (req , res) =>{

const {name , email , password , Designation , status}= req.body;

if(!name || !email || !password || !Designation) return res.status(400).json({message :"All Field is require"})
try {
   const [row ]= await db.query("Select * from users where email = ?" , [email]);
  if(row.length) return res.status(400).json({message :"Users Aleady exist"})

    db.query("Insert into users (name , email , password , Designation , status) values(?,?,?,?,?)" , [name , email , password , Designation ,'approved']);
    res.status(200).json({message:"Canteen Added succesfully"})
  
} catch (error) {
  res.status(500).json({message:error})
  
} 

}


exports.deleteEmployee = async(req , res) =>{
   const { id } = req.params;

   try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ? AND Designation = 'employee'" , [id]);
    if(!rows.length){
      return res.status(404).json({message : "Employee Not Found"});
    } 
    await db.query("DELETE FROM users WHERE id = ? AND Designation = 'employee'", [id]);
    res.status(200).json({ message: "✅ Employee deleted successfully" });
    
   } catch (error) {
    res.status(500).json({message: "❌ Failed to delete employee", error: err.message})
   }
}

exports.deleteCanteen = async(req , res) =>{
  const {id} = req.params;
  try {
    
const [rows] =await  db.query("SELECT * FROM users where id = ? and Designation = 'canteen'" , [id]);
if(!rows.length){
      return res.status(404).json({message : "Canteen Not Found"});
    } 
    await db.query("DELETE * USERS WHERE id = ? AND  Designation = 'canteen'",[id])
    res.status(200).json({ message: "✅ Canteen deleted successfully" });

  } catch (error) {
     res.status(500).json({ message: "❌ Failed to delete canteen", error: err.message });
  }
}

exports.deleteCanteen = async(req , res) =>{
  const {id} = req.params;
  try {
    
const [rows] =await  db.query("SELECT * FROM users where id = ? and Designation = 'canteen'" , [id]);
if(!rows.length){
      return res.status(404).json({message : "Canteen Not Found"});
    } 
    await db.query("DELETE FROM users WHERE id = ? AND Designation = 'canteen'", [id]);
    res.status(200).json({ message: "✅ Canteen deleted successfully" });

  } catch (error) {
     res.status(500).json({ message: "❌ Failed to delete canteen", error: err.message });
  }
} 