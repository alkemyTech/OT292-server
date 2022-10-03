import express from 'express';
import { validateReadAll } from '../validations/member.validation';
import { readAllMembers } from '../controllers/members';
import { validateCreation } from '../validations/member.validation';
import { createMember } from '../controllers/members';
import validateToken from '../middleware/auth';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/', validateToken, verifyAdmin, validateReadAll, readAllMembers);
router.post('/', validateToken, validateCreation, createMember);

export default router;