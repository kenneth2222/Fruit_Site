const productRouter = require ('express').Router()
const {createProduct, getAllProducts} = require("../controller/productController");
const upload = require ('../helper/multer')

productRouter.get("/products", getAllProducts);
// productRouter.post("/create", upload.array("images", 5), createProduct); 
productRouter.post("/create", upload.single("image"), createProduct); 

module.exports = productRouter;
