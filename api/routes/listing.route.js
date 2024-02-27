import express from 'express';
import { createListing, getListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import multer from 'multer';


const router = express.Router();




router.post('/create',  createListing);
//router.delete('/delete/:id', verifyToken, deleteListing);
//router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);

export default router;