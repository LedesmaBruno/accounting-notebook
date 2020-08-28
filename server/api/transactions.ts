import express from "express";
import ServiceProvider from "../service/ServiceProvider";
import {TransactionBody} from "../../model/TransactionBody";

const router = express.Router();
const transactionService = ServiceProvider.getInstance().transactionService;

router.get("/api/transactions/", async (req, res) => {
    try {
        res.json(await transactionService.getTransactions());
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post("/api/transactions/", async (req, res) => {
    try {
        let tx = req.body as TransactionBody;
        res.json(await transactionService.commitTransaction(tx));
    } catch (e) {
        res.status(e.status || 500).send(e.reason || e.toString());
    }
});

router.get("/api/transactions/:id", async (req, res) => {
    try {
        res.json(await transactionService.getTransactionById(req.params.id));
    } catch (e) {
        res.status(e.status || 500).send(e.reason || e.toString());
    }
});

module.exports = router;