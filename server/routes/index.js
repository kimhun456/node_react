import express from 'express';
import account from './account';
import memo from './memo';

const router = express.Router();
router.use('/memo',memo);
router.use('/account', account);

export default router;