import * as express from 'express';
import { Router } from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as config from 'config';

import index from './routes/index';
import users from './routes/users';
import * as http from 'http';

const app = express();
const appRouter: Router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const logger = morgan('dev');

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
const indexRoutes = index(appRouter);
const userRoutes = users(appRouter);

// Use routes
app.use('/', appRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', config.get('port'));

const server = http.createServer(app);
server.listen(config.get('port'), config.get('host'));

server.on('listening', () => {
  console.log(`Server started and listening on ${config.get('host')}:${config.get('port')}`);
});
