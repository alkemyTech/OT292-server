import express from 'express';
import { validateReadAll } from '../validations/member.validation';
import { readAllMembers } from '../controllers/members';
import validateToken from '../middleware/auth';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/', validateToken, verifyAdmin, validateReadAll, readAllMembers);

export default router;
