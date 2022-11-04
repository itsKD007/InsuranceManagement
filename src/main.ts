import express, { Request, Response, } from 'express';
import path from 'path';

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, "frontend")));

app.listen(PORT, () => {
  console.log("Server running on :3000");
});
