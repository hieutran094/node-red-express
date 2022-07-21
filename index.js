import * as http from 'http';
import express from 'express';
import nodeRed from 'node-red';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const server = http.createServer(app);

const settings = {
  httpAdminRoot: '/',
  httpNodeRoot: '/',
  ui: { path: 'ui' },
  userDir: './',
  flowFile: 'flows.json',
  apiMaxLength: '50mb',
  editorTheme: {
    page: {},
    palette: {
      editable: true,
    },
  },
  functionGlobalContext: {
    testValue: 'exampleString',
    testPackage: moment,
  },
};

function bootstrap(settings) {
  nodeRed.init(server, settings);
  app.use(settings.httpAdminRoot, nodeRed.httpAdmin);
  app.use(settings.httpNodeRoot, nodeRed.httpNode);
  server.listen(process.env.PORT, () => {
    console.log('Server started on PORT: ' + process.env.PORT);
  });
  nodeRed.start();
}

bootstrap(settings);
