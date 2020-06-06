import express from 'express';
import Phones from '../controllers';
import {
  buyRequest,
  sellRequest
} from '../middlewares';

const router = express.Router();

router.post('/buyrequest/save', buyRequest, Phones.save);
router.post('/sellrequest/save', sellRequest, Phones.save);
router.get('/search', Phones.fetch);

export default router;
