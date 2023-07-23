// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Record } = initSchema(schema);

export {
  Record
};