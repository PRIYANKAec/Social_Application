const yup = require("yup");

const OfficialModel = require("../../models/officialModel");
const {comparePassword, generateToken} = require("../../MiddleWare/jwtHash");

const officialSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Enter a valid password"),
    GovernmentId: yup.string().required("Government ID is required"),
});

const signInOfficial = async (req , res) =>{
    
    try {
        await officialSchema.validate(req.body);

        const { email,password,GovernmentId} = req.body;

        const official = await OfficialModel.findOfficialByEmail(email);

        if(!official){
            return res.status(404).json({error : "User not found"});
        }

        const isValidPassword = await comparePassword(password , official.password);
        if(!isValidPassword){
            return res.status(401).json({message : "Invalid email or password"});
        }
         // Generate JWT token
         const token = generateToken(official);

         // Exclude password from response
         const { password: _password, ...officialWithoutPassword } = official;
 
         res.status(200).json({
             message: "SignIn successful",
             official: officialWithoutPassword,
             token
         });
     } catch (error) {
         console.error("SignIn Error:", error);
         res.status(500).json({ message: error.message });
     }
    }
module.exports = signInOfficial;