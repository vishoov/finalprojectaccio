const router = require("express").Router();
const Product = require("../model/product.model");


//get all products
router.get("/products", async (req, res)=>{
    try{

        const products = await Product.find();
        
        if(!products){
            return res.status(404).json({message:'Products not found'});
        }
        
        res.status(200).json(products);

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
})



//add new product
//afreen

router.post('/createProduct', async (req, res) => {

    try {
        const product = req.body;
        console.log("Product data:", product);
        // if (!name || !price || !description) {
        //     return res.status(400).json({ message: " all details (name, price, description)." });
        // 
        const newProduct = await new Product(product);
        console.log(newProduct);
        await newProduct.save();
        res.status(201).json({ message: "product added", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "error adding product", error: error.message });
    }
});



// router.post('/createProduct',async (req,res)=>{

//     try{

        

//         const product = await Product.Create(req.body);

//         await product.save();

//         res.status(200).json({message:'Product created successfully'});

//     }

//     catch(err){

//         res.status(400).json(err);

//     }

//     })

//get product by id
router.get('/:id', async (req, res)=>{

    try{
        const id = req.params.id;
        const product = await Product.find({_id:id});
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(201).json({product:product});

    }catch(err){

        console.error(err);

        res.status(500).json({message: 'Internal Server Error'});

    }

})

//update product by id
router.put("/updateProduct/:id", async (req, res)=>{
    try{
        const product = Product.find({_id:req.params.id});
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        
        res.status(200).json({message:'Product updated successfully', product:updatedProduct});



    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

//delete product by id
router.delete('/deleteProduct/:id',async (req,res)=>{

    try{

        const id=req.params.id;

        const product = await Product.findByIdAndDelete(id);

        res.status(200).json({message:'Product deleted successfully', product:product});

    }

    catch(err){

        res.status(400).json(err);

    }

    })


//get products by category
router.get("/category/:category", async (req, res)=>{
    try{
        const category = req.params.category;

        const products = await Product.find({category:category});

        if(!products){
            return res.status(404).json({message:'Products not found'});
        }

        res.status(200).json({products:products});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
})

//get products by seller id
router.get('/products/seller/:sellerId', async (req, res) => {

    try {

        

        const sellerId = req.params.sellerId;

       

        const products = await Product.find({ seller: sellerId });

       

        if (products.length === 0) {

            return res.status(404).json({ message: "No product found." });

        }

    

        res.status(200).json({ message: "product found", products: products });

    } catch (error) {

      

        res.status(500).json({ message: "error fetching products", error: error.message });

    }

});


module.exports = router;