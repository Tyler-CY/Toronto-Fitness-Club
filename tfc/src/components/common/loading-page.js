import StandardLayout from "./standard-layout";
import backgroundImage from "../../images/homepage/pexels-max-vakhtbovych-7031717.jpg";
import {Typography} from "@mui/material";
import {Link} from "react-router-dom";


const LoadingPage = () => {
    return (
        <>
            <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
                <Typography variant={'h2'} align='center'>Loading</Typography>
                <Typography variant={'subtitle1'} align='center'>Not working? <Link to={'/login'}
                                                                                    style={{color: '#FFFFFF'}}
                >Login</Link></Typography>

            </StandardLayout>
        </>
    );
}

export default LoadingPage;