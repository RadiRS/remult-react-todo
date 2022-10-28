import express from 'express';
import { api } from './api';

const app = express();
app.use(api);

// eslint-disable-next-line no-console
app.listen(3002, () => console.log('Server started'));
