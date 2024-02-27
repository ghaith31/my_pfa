import express from 'express';
import { signin, signup, google, github, signOut } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.post('/github', github);
router.get('/signout', signOut);
export default router;
