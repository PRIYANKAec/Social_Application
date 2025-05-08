const yup = require("yup");

const UserModel = require("../../models/userModel");
const {comparePassword, generateToken} = require("../../MiddleWare/jwtHash");

const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Enter a valid password"),
});

const signIn = async (req , res) =>{
    
    try {
        await userSchema.validate(req.body);

        const { email,password} = req.body;

        const user = await UserModel.findUserByEmail(email);

        if(!user){
            return res.status(404).json({error : "User not found"});
        }

        const isValidPassword = await comparePassword(password , user.password);
        if(!isValidPassword){
            return res.status(401).json({message : "Invalid email or password"});
        }
         // Generate JWT token
         const token = generateToken(user);

         // Exclude password from response
         const { password: _password, ...userWithoutPassword } = user;
 
         res.status(200).json({
             message: "SignIn successful",
             user: userWithoutPassword,
             token
         });
     } catch (error) {
         console.error("SignIn Error:", error);
         res.status(500).json({ message: error.message });
     }
    }

module.exports = signIn;