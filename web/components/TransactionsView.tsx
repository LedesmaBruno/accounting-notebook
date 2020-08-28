import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import ApiService from "../client/ApiService";
import {API} from "../routes";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const TransactionsView = () => {
    const [transactions, setTransactions] = React.useState([]);

    useEffect(() => {
        let didCancel = false;

        (async () => {
            const transactionsResponse = await ApiService.fetch(API.TRANSACTIONS);
            if (!didCancel) {
                if (transactionsResponse && transactionsResponse.ok) {
                    const transactions = await transactionsResponse.json();
                    setTransactions(transactions);
                }
            }
        })();

        return () => {
            didCancel = true;
        }
    });

    return(
        <NestedList transactions={transactions}/>
    );
};

const NestedList = ({transactions}) => {
    const classes = useStyles();
    const [openedTX, setOpenTx] = React.useState("");

    const handleClick = (txID) => {
        if (txID !== openedTX) {
            setOpenTx(txID);
        }
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <Typography variant={"h3"} component="div" id="nested-list-subheader">
                    Transactions
                </Typography>
            }
            className={classes.root}
        >
            {
                transactions.map((transaction, index) =>
                    <React.Fragment key={index}>
                        <ListItem button onClick={() => handleClick(transaction.id)}>
                            <ListItemIcon>
                                <MonetizationOnIcon style={{color: transaction.type === 'credit' ? 'green' : 'red'}}/>
                            </ListItemIcon>
                            <ListItemText primary={`Type: ${transaction.type} | Amount: ${transaction.amount}`} />
                            {openedTX === transaction.id ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openedTX === transaction.id} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemText primary={`Tx ID: ${transaction.id} | Date: ${transaction.effectiveDate} | Type: ${transaction.type} | Amount: ${transaction.amount}`} />
                                </ListItem>
                            </List>
                        </Collapse>
                    </React.Fragment>
                )
            }
        </List>
    );
};

export default TransactionsView;