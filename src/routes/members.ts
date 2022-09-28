import express from 'express';
import { validateCreation } from '../validations/member.validation';
import { createMember } from '../controllers/members';

const router = express.Router();

router.post('/', validateCreation, createMember);

export default router;
