import App from './App';

try {
  await new App().run()
} catch(err) {
  switch(err.code) {
    case 'EACCES':
      console.error(`Error: Port ${err.port} requires elevated privileges!`);
      break;
    case 'EADDRINUSE':
      console.error(`Error: Port ${err.port} is already in use!`);
      break;
    default:
      break;
  }
  process.exit(1);
}
