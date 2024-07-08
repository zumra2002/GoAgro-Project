import express from 'express';
import bcrypt from 'bcrypt'
import Shopowner from '../modle/Shopowner.js'
import jwt from 'jsonwebtoken'







const router = express.Router()

router.post('/', async (req, res) => {
    const { name,  NIC , phone , role, about, email , isApproved, password, address } = req.body;
    const user = await Shopowner.findOne({ email });
    if (user) {
        return res.json({ message: "User already exists" });
        
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newShopowner = new Shopowner({
        name,
        NIC,
        phone,
        role,
        about,
        address,
        email,
        password: hashPassword
    });

    await newShopowner.save();
    return res.json({ message: "Registered" });
});

router.get('/', async(req,res)=>{ // view all Shopowners

    try{

        const Shopowners = await Shopowner.find({})

        return res.status(200).json({
            
            data: Shopowners
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one farmer

    try{

        const {id} = req.params;
        const shopowner = await Shopowner.findById(id)

        return res.status(200).json({
            
            data: shopowner
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update Shopowner

    try {

        

        const {id} = req.params;
        const result = await Shopowner.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'complaint not found'})
        }

        return res.status(200).send({message: 'complaint update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // view one Shopowner

    try{

        const {id} = req.params;
        const result = await Shopowner.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'complaint not found'})
        }

        return res.status(200).send({message: "compalaint deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.post('/login', async (req, res) => { //Login
    const { email, password } = req.body;
    try {
        const user = await Shopowner.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email " });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            // Secure: true, // Uncomment in production if served over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
        });
        
        return res.json({ status: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
  });


  router.get('/email/:email', async (req, res) => { // view one shop owner by email
    try {
        const email = req.params.email; // Extract email from URL params
        const shopowner = await Shopowner.findOne({ email:email })

        if (!shopowner) {
            return res.status(404).json({ message: "Show owner not found" });
        }

        return res.status(200).json({
            data: shopowner
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


export default router
