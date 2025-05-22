const bcrypt = require('bcrypt');
const yup = require('yup');

const Official = require('../../models/officialModel');
const { generateToken } = require('../../MiddleWare/jwtHash');

const OfficialSchema = yup.object().shape({
    GovernmentId: yup.string().required('Government ID is required'),
    username:     yup.string().required('UserName is required').max(50),
    email:        yup.string().email('Invalid email format').required('Email is required').matches(/^[\w-.]+@(gmail\.com|yahoo\.com|outlook\.com)$/, 'Only gmail.com, yahoo.com, outlook .com is allowed'),
    password:     yup.string().required('Password is required').min(6, 'Password should be atleast 6 characters'),
    designation:  yup.string().required('Designation is required').max(50),
    phoneNumber:  yup.string().required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must be digits').length(10, 'Phone number must be 10 digits'),
})

const createOfficial = async( req, res ) => {
    try {
        //validate the requested Data from the user
        await OfficialSchema.validate(req.body);

        const { GovernmentId, username, email, password, phoneNumber, designation } = req.body;

        //validate required fields
        if(!GovernmentId || !email || !designation || !password) {
            return res.status(400).json({ error: 'Required fields are missing or invalid.' })
        }

        const existingOfficial = await Official.findOfficialByGovernmentId(GovernmentId);
        
        if(existingOfficial) {
            return res.status(400).json({ error: "User already exists"});
        }

        const existingOfficialByEmail = await Official.findOfficialByEmail(email);

        if(existingOfficialByEmail) {
            return res.status(400).json({ error: "Email already exist"});
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const newOfficial = await Official.createOfficial({
            GovernmentId,
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            designation
        });

        const token = generateToken(newOfficial);

        res.status(201).json({ message: "User created Successfully", Official: newOfficial, token:token});
    } catch(error)
    {
        console.error("Error creating User: ", error);
        if(error.name == 'ValidationError') { 
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = createOfficial;