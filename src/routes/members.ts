import express from 'express';

import {
  validateReadAll, validateCreation, validateDelete, validateUpdate,
} from '../validations/member.validation';
import {
  readAllMembers, createMember, deleteMembers, putMember,
} from '../controllers/members';

import validateToken from '../middlewares/authenticateToken';
import verifyAdmin from '../middlewares/verifyAdmin';

const router = express.Router();

router.get('/', validateToken, verifyAdmin, validateReadAll, readAllMembers);
router.post('/', validateToken, validateCreation, createMember);

router.put('/:id', validateToken, validateUpdate, putMember);
router.delete('/:id', validateToken, verifyAdmin, validateDelete, deleteMembers);

export default router;
