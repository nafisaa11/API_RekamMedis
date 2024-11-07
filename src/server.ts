import 'dotenv/config';
import app from './main';

require('dotenv').config();

app.listen(3000, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${3000}`);
});
