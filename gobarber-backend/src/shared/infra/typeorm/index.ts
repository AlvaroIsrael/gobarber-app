import { createConnections } from 'typeorm';

createConnections().then(_ => console.log('Database connection successfully initialized 👍🏻.'));
