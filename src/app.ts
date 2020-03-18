import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/not-found.middleware';
import { categoriesRouter, faqsRouter, questionVariantsRouter, sourcesRouter, suggestionsRouter } from './routes';

declare const module: WebpackHotModule;

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/faqs', faqsRouter);
app.use('/question-variants', questionVariantsRouter);
app.use('/sources', sourcesRouter);
app.use('/suggestions', suggestionsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}