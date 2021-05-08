import Server from './server';

(async () => {
  await Server.start();
})();

// listen on SIGINT signal and gracefully stop the server
process.on('SIGINT', () => {
  Server.stop().then(err => {
    process.exit(err ? 1 : 0);
  });
});
