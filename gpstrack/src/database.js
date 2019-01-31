const mongoose = require('mongoose');

var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gpstrack'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/gpstrackdb-development'
  },

  test: {
//    baseUrl: "/nodeArticulos/",                                                                                                                                                                           
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gpstrack'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://mongo-server/gpstrackdb-test'
  },

  production: {
    baseUrl: "/",
    root: rootPath,
    app: {
      name: 'gpstrack'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://emontoya:*******@ds163397.mlab.com:63397/emontoya'
  }
};

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/gpstrackdb-development', {
//mongoose.connect('mongodb://mongo-server/gpstrackdb', {
  useCreateIndex: true,
  useNewUrlParser: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));