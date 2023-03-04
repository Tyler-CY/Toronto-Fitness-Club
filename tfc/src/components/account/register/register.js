import './register-form.css'
import RegisterForm from "./register-form";
import StandardAppbar from "../../common/standard-appbar";
import StandardLayout from "../../common/standard-layout";
import backgroundImage from "../../../images/homepage/pexels-william-choquette-1954524.jpg";


const Register = () => {
    return (
        <>
            <StandardAppbar/>
            <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
                <RegisterForm/>
            </StandardLayout>

        </>
    );
}

export default Register;