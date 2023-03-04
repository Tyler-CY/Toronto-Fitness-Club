import StandardAppbar from "../../common/standard-appbar";
import AccountLayout from "../common/account-layout";
import UpdateCard from "../update/update-card";


const Profile = () => {
    return (
        <>
            <StandardAppbar/>
            <AccountLayout>
                <UpdateCard/>
            </AccountLayout>
        </>
    );
}

export default Profile;