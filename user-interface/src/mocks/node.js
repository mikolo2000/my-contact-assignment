import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { beforeAll, afterAll, afterEach } from "vitest";
 
export const server = setupServer(...handlers);

