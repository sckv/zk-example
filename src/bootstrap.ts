import 'reflect-metadata';

import { logMe } from 'barehttp';
import { serverWithHandlers } from './infra/http/controllers';

serverWithHandlers
  .start((address) => {
    logMe.info(`Server started at ${address}`);
  })
  .catch((err) => {
    logMe.error(err);
  });
