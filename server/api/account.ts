import express from "express";
import ServiceProvider from "../service/ServiceProvider";

const router = express.Router();
const accountService = ServiceProvider.getInstance().accountService;

router.get("/api/account/balance", async (req, res) => {
    try {
        res.json({account_balance: await accountService.getAccountBalance()});
    } catch (e) {
        res.status(e.status || 500).send(e.toString());
    }
});

module.exports = router;