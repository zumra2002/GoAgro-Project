import express from 'express'
import Payment from '../modle/Payment.js'

const router =express.Router()

router.post('/', async (req, res) =>{

    try {
        
        const newPayment = {
            buyeremail: req.body.buyeremail,
            selleremail: req.body.selleremail,
            Total: req.body.Total,
            photo: req.body.photo,
            description: req.body.description,
            itemID: req.body.problem_type,
            stetus: req.body.reply,
            quantity: req.body.quantity,
            orderId : req.body.orderId
        };


        const payment = await Payment.create(newPayment);
        res.status(201).send({ message: 'Payment is successful', payment });
        
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }

})

router.get('/', async(req,res)=>{ // view all payments

    try{

        const payments = await Payment.find({})

        return res.status(200).json({
            
            data: payments
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one payment

    try{

        const {id} = req.params;
        const payment = await Payment.findById(id)

        return res.status(200).json({
            
            data: payment
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update payment

    try {

        

        const {id} = req.params;
        const result = await Payment.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'payment not found'})
        }

        return res.status(200).send({message: 'payment successfuly updated'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // view one complaint

    try{

        const {id} = req.params;
        const result = await Payment.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'payment not found'})
        }

        return res.status(200).send({message: "Payment deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/email/:email', async (req, res) => { 
    const email = req.params.email;
    try {
        
        const payments = await Payment.find({ 
            $or: [
                { buyeremail: email },
                { selleremail: email }
            ],
            stetus: "successful" 
        });
        return res.status(200).json({ data: payments }); 
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" }); 
    }
});


export default router;