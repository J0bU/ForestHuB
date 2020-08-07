'use strict'

require('dotenv').config();

const app = require('./server');
require('./database');

// --------------Creating variable with Express ----------
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})