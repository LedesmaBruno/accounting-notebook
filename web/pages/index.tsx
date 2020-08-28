import * as React from "react";
import dynamic from "next/dynamic";

const TransactionsView = dynamic(() => import("../components/TransactionsView"));

const Index = () => {
    return <TransactionsView/>
};

export default Index;