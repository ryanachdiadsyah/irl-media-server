import * as express from 'express';

import { getStreams } from '../controllers/streams';


export default (context) => {
  let router = express.Router();
  router.get('/', getStreams.bind(context));
  return router;
};
