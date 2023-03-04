import StandardAppbar from "../../common/standard-appbar";
import UpcomingPayment from "./upcoming-payment";
import PastPayments from "./past-payments";
import AccountLayout from "../common/account-layout";


const Payment = () => {
    return (
        <>
            <StandardAppbar/>
            <AccountLayout>
                <UpcomingPayment/>
                <PastPayments/>
            </AccountLayout>
        </>
    );
}

export default Payment