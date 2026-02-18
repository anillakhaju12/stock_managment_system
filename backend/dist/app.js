import express from 'express';
const app = express();
app.get('/', (req, res) => {
    res.status(200).json({
        "message": "Server Created"
    });
});
export default app;
//# sourceMappingURL=app.js.map