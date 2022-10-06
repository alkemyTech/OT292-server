import express from 'express';

import {
  validateReadAll, validateCreation, validateDelete, validateUpdate,
} from '../validations/member.validation';
import {
  readAllMembers, createMember, deleteMenbers, putMember,
} from '../controllers/members';
import validateToken from '../middleware/auth';
import verifyAdmin from '../middleware/verifyAdmin';

const router = express.Router();

router.get('/', validateToken, verifyAdmin, validateReadAll, readAllMembers);
router.post('/', validateToken, validateCreation, createMember);
router.put('/:id', validateToken, validateUpdate, putMember);
router.delete('/:id', validateToken, verifyAdmin, validateDelete, deleteMenbers);


export default router;
