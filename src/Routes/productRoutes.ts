import express from 'express';
import { createProduct, searchProduct, paginateProducts, filterProducts } from '../Controllers/productController';

const router = express.Router();

router.post('/products', createProduct);
router.get('/products/search', searchProduct);
router.get('/products', paginateProducts);
router.get('/products/filter', filterProducts);

export default router;
