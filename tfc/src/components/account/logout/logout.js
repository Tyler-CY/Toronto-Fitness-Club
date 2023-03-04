import StandardAppbar from "../../common/standard-appbar";
import LogoutContent from "./logout-content";

const Logout = () => {

    // Remove token.
    localStorage.removeItem('tfc_token');


    return (
        <>
            <StandardAppbar/>
            <LogoutContent/>
        </>
    );
}

export default Logout;