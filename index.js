import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import 'regenerator-runtime/runtime';
import routes from './src/routes/index';

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
app.use(routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to freelancerz' });
});
// finally, let's start our server...
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`);
});
export default app;
