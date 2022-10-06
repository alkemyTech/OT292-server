import express from 'express';
import { validateReadAll, validateCreation, validateDelete } from '../validations/member.validation';
import { readAllMembers, createMember, deleteMembers } from '../controllers/members';
import validateToken from '../middleware/auth';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/', validateToken, verifyAdmin, validateReadAll, readAllMembers);
router.post('/', validateToken, validateCreation, createMember);
router.delete('/:id', validateToken, verifyAdmin, validateDelete, deleteMembers);

export default router;
