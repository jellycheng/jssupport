'use strict';

let received = false;

module.exports = (app, options, next) => {
  if (app.root) {
    const signals = options && options.signals ? options.signals : ['SIGINT', 'SIGTERM'];
    app.onGracefullyShutdown = hook => app.addHook('gracefullyShutdown', hook);
 
    for (const signal of signals) {
      process.once(signal, async () => {
        if(app.log) {
          app.log.info({signal}, 'received signal');
        }
        if (!received) {
          received = true;
          if(app.log) {
            app.log.info('signal close hook');
          }
          //console.log('signal close hook');
          await app.runHooks('gracefullyShutdown', signal);
          await app.close();
        }
      });
    }
  }

  next();
};
