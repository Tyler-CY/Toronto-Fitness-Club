import DetailsCard from "./details-card";
import StandardLayout from "../../common/standard-layout";

import backgroundImage from "../../../images/homepage/pexels-max-vakhtbovych-7031717.jpg"
import LoadingPage from "../../common/loading-page";

const DetailsContent = (props) => {


    if (props.fetchSuccess) {
        return (
            <>
                <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
                    <DetailsCard user={props.details}/>
                </StandardLayout>
            </>
        );
    } else {
        return <LoadingPage/>
    }
}

export default DetailsContent;