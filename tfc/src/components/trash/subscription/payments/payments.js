import StandardAppbar from "../../../common/standard-appbar";
import StandardLayout from "../../../common/standard-layout";
import backgroundImage from "../../../../images/homepage/pexels-geancarlo-peruzzolo-6796964.jpg";
import * as React from "react";
// import UpdateCard from "./update-card";

const Payments = () => {
    return (
        <>
            <StandardAppbar/>

            <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
                {/*<CardInfo/>*/}
                {/*<UpcomingPayment/>*/}
                {/*<PastPayments/>*/}
                {/*<UpdateCard/>*/}
            </StandardLayout>
        </>
    );
}

// export default Payments