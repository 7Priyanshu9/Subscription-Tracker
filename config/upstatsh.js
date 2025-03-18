import {Client as WorkflowClient} from '@upstash/workflow';
import {QSTASH_URL,QSTASH_TOKEN} from './env.js';
export const client = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});