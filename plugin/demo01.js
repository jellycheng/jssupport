'use strict';

module.exports = (app, options, next) => {
  app.decorate('demo01', options);
  next();
};

