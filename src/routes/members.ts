import express from 'express';
import { validateCreation } from '../validations/member.validation';
import { createMember } from '../controllers/members';
import validateToken from '../middleware/auth';

const router = express.Router();

router.post('/', validateToken, validateCreation, createMember);

export default router;
