import express from 'express';
import { mpesaService } from '../services/mpesa.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Check Transaction Status
router.post('/status', auth, async (req, res) => {
    try {
        const { transactionId } = req.body;

        if (!transactionId) {
            return res.status(400).json({ message: 'Transaction ID is required' });
        }

        const status = await mpesaService.checkTransactionStatus(transactionId);
        res.json(status);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Error checking transaction status' });
    }
});

export const mpesaRoutes = router;
