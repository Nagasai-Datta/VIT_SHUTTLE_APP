const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(cors({
    origin: 'https://vit-shuttle-tracking-app.glitch.me', 
    methods: ['GET', 'POST'], 
    credentials: true 
}));


app.use(express.static(path.join(__dirname, 'public')));


const users = [
    { userId: '1234', password: '1234', wallet: 77 }
];


app.use(express.json());


app.post('/login', (req, res) => {
    const { userId, password } = req.body;

    // Find the user in the hardcoded list
    const user = users.find(u => u.userId === userId && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Login successful', wallet: user.wallet });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
