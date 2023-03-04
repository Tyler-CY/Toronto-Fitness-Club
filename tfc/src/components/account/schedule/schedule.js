import StandardAppbar from "../../common/standard-appbar";
import NextClass from "./next-class";
import Timetable from "./timetable";
import AccountLayout from "../common/account-layout";


const Schedule = () => {

    return (
        <>
            <StandardAppbar/>
            <AccountLayout>
                <NextClass/>
                <Timetable/>
            </AccountLayout>
        </>
    );
}

export default Schedule