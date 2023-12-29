const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require('../controllers/productController');

const {authenticateUser, authorizePermissions}=require('../middleware/authentication');
const express=require('express');
const Router=express.Router();

Router.route('/').post(authenticateUser,authorizePermissions,createProduct).get(getAllProducts);
Router.route('/uploadImage').post(authenticateUser,authorizePermissions,uploadImage);

Router.route('/:id')
.get(getSingleProduct)
.patch(authenticateUser,authorizePermissions,updateProduct)
.delete(authenticateUser,authorizePermissions,deleteProduct);

module.exports=Router;