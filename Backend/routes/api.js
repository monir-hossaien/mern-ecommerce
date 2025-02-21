import express from "express"
//import all model
import * as productController from "../src/controllers/productController.js";
import * as userController from "../src/controllers/userController.js";
import * as sliderController from "../src/controllers/sliderController.js";
import * as wishController from "../src/controllers/wishController.js";
import * as featureController from "../src/controllers/featureController.js";
import * as cartController from "../src/controllers/cartController.js";
import * as invoiceController from "../src/controllers/invoiceController.js"
import * as remarkController from "../src/controllers/remarkController.js"

//import auth middleware
import {authenticateUser} from "../src/middleware/authMiddleware.js";
import {upload} from "../src/Helpers/helper.js";



const router = express.Router();

//product related api
router.post("/create-product", productController.createProduct);
router.post("/create-brand", productController.createBrand);
router.post("/create-category", productController.createCategory);
router.post("/create-productDetails", productController.createProductDetails);
router.post("/create-productSlider", sliderController.createSlider);

router.get("/getAllCategories", productController.getAllCategories)
router.get("/getAllBrands", productController.getAllBrands)
router.get("/getSliderList", productController.getSliderList)
router.get("/productListByCategory/:catId", productController.productListByCategory)
router.get("/productListByBrand/:brandId", productController.productListByBrand)
router.get("/productListByKeyword/:keyword", productController.productListByKeyword)
router.get("/productListByRemark/:remark", productController.productListByRemark)
router.get("/getSimilarProducts/:catId", productController.getSimilarProducts)
router.get("/getAllProducts", productController.getAllProducts)
router.get("/product-details/:productId", productController.readProductDetails)
router.get("/productReviewList/:productId", authenticateUser, productController.productReviewList)




// user related api
router.post("/register", upload.single("profileImage"), userController.userRegistration);
router.post("/login", userController.login);
router.get("/logout", authenticateUser, userController.logout);
router.post("/send-otp", userController.emailSent);
router.post("/create-profile", authenticateUser, userController.createProfile);
router.post("/update-profile", authenticateUser, userController.updateProfile);
router.post("/create-review/:productId", authenticateUser, userController.createReview);
router.get("/read-profile", authenticateUser, userController.readProfile);


//wishes api
router.post("/create-wish/:productId", authenticateUser, wishController.createWishesProduct);
router.get("/wish-list", authenticateUser, wishController.readWishList);
router.delete("/delete-wish/:productId", authenticateUser, wishController.deleteWishProduct);

// product cart api
router.post("/add-cart/:productId", authenticateUser, cartController.addToCart);
router.put("/update-cart/:id", authenticateUser, cartController.updateCart);
router.delete("/delete-cart/:cartId", authenticateUser, cartController.deleteCart);
router.get("/cart-list", authenticateUser, cartController.cartList);

//payment related api
router.post("/create-invoice", authenticateUser, invoiceController.createInvoice);
router.get("/invoice-list", authenticateUser, invoiceController.invoiceList);
router.get("/invoice-products/:invoiceId", authenticateUser, invoiceController.invoiceProductsList);
router.post("/create-paymentSettings", invoiceController.createPaymentSettings);

router.post("/payment-success/:transactionId", invoiceController.paymentSuccess);
router.post("/payment-cancel/:transactionId", invoiceController.paymentCancel);
router.post("/payment-fail/:transactionId", invoiceController.paymentFail);
router.post("/payment-ipn/:transactionId", invoiceController.paymentIPN);

//feature api
router.post("/create-feature", featureController.createFeature);
router.get("/get-features", featureController.getFeaturesList);

// legal api
router.post("/create-legal", featureController.createLegal);
router.get("/legal-list", featureController.getLegalList);

//remark api
router.post("/create-remark", remarkController.createRemark);
router.get("/remark-list", remarkController.remarkList);

export default router;