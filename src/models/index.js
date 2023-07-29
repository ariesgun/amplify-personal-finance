// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SessionNordigen, Record } = initSchema(schema);

export {
  SessionNordigen,
  Record
};