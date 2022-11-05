import express, { Request, Response, } from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());

app.post('/api/login', (req: Request, res: Response) => {
  res.send({
    success: true,
    user: {
      username: 'itskd007',
      name: 'Kaustav Doari',
      email: 'kd@example.com',
      phone: '9876543210',
      type: 'customer'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on :${PORT}`);
});

