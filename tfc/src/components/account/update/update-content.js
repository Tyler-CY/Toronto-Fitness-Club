import UpdateCard from "./update-card";
import StandardLayout from "../../common/standard-layout";
import backgroundImage from "../../../images/homepage/pexels-max-vakhtbovych-7031717.jpg";


const UpdateContent = () => {


    return (
        <>
            <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
                <UpdateCard/>
            </StandardLayout>
        </>
    );
}

export default UpdateContent;