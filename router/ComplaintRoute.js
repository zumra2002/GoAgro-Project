import express from 'express'
import Complait from '../modle/Complain.js'


const router = express.Router()

router.post('/', async (req, res) =>{

    try {
        
        const newComplaint = {
            name: req.body.name,
            email: req.body.email,
            photo: req.body.photo,
            description: req.body.description,
            problem_type: req.body.problem_type,
            reply: req.body.reply
        };


        const complaint = await Complait.create(newComplaint);
        res.status(201).send({ message: 'complaint created successfull', complaint });
        
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }

})

router.get('/', async(req,res)=>{ // view all complaints

    try{

        const complaints = await Complait.find({})

        return res.status(200).json({
            
            data: complaints
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one complaint

    try{

        const {id} = req.params;
        const complaint = await Complait.findById(id)

        return res.status(200).json({
            
            data: complaint
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update complaint

    try {

        

        const {id} = req.params;
        const result = await Complait.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'complaint not found'})
        }

        return res.status(200).send({message: 'complaint update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // view one complaint

    try{

        const {id} = req.params;
        const result = await Complait.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'complaint not found'})
        }

        return res.status(200).send({message: "compalaint deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 


router.get('/email/:email', async(req,res)=>{ // view all complaints one 

        const email = req.params.email
    try{

        const compalaint = await Complait.find({email})

        return res.status(200).json({
            
            data: compalaint
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

export default router