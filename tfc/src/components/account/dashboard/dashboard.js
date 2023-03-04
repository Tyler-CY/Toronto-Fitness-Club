import React from "react";
import AccountLayout from "../common/account-layout";
import NextClass from "../schedule/next-class";
import UpcomingPayment from "../payment/upcoming-payment";
import StandardAppbar from "../../common/standard-appbar";
import WelcomeBack from "./welcome-back";
import Timetable from "../schedule/timetable";

const Dashboard = () => {
    return (
        <>
            <StandardAppbar/>
            <AccountLayout>
                <WelcomeBack/>
                <NextClass/>
                <UpcomingPayment/>
                <Timetable/>
            </AccountLayout>
        </>
    );
}

export default Dashboard