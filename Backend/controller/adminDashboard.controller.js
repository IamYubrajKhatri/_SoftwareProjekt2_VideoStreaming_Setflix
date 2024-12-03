export async function adminDashboard(req,res){
    res.status(200).json({ success: true, message: "Welcome to the admin dashboard", user: req.user });
    console.log("Welcome to admin Dashboard");   
}