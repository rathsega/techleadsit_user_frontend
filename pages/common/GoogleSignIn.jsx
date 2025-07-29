import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import httpService from '../../services/httpService';
import { useRouter } from 'next/router';
import { useLoader } from '../../contexts/LoaderContext';

const GoogleSignIn = () => {

    const router = useRouter();
    const { setLoading } = useLoader();

    const navigateToMyCourses = () => {
        router.replace('/my-courses');
    }
    
    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
                    .join('')
            );

            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Invalid JWT', e);
            return null;
        }
    };

    const autoLogin = (email) => {
        const url = process.env.NEXT_PUBLIC_LMS_URL + '/login/validate_login'; // URL to open
        const postData = {
            email: email,
            password: 'TechLeads$123'
        };

        openInNewTab(url, postData);
    };

    const openInNewTab = (url, data) => {
        // Create a form element dynamically
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        // Add the data to the form as hidden input fields
        Object.keys(data).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        });

        // Append the form to the document body
        document.body.appendChild(form);

        // Set the form's target to the new window's name
        form.target = "_blank";

        // Append the form to the document body
        document.body.appendChild(form);

        // Submit the form
        form.submit();

        // Clean up the form after submitting
        document.body.removeChild(form);
    };


    const handlGoogleSigninSuccess = async (credentialResponse) => {
        //const jwt_decode = (await import('jwt-decode')).default;
        // userInfo = jwt_decode(credentialResponse.credential);
        const userInfo = decodeJWT(credentialResponse.credential);
        //console.log(userInfo);

        if (!userInfo || !userInfo.email) {
            console.error("Google login failed: no email found.");
            return;
        }

        try {
            setLoading(true)
            const response = await httpService.post('/auth/google-login', {
                email: userInfo.email,
                name: userInfo.name,
                googleId: userInfo.sub,
                picture: userInfo.picture
            });

            //console.log(response);
            setLoading(false)
            if (response.data.success) {
                const { email, generatedPassword, isNewUser } = response.data;
                autoLogin(email, generatedPassword, isNewUser); // Use your existing openInNewTab-based login
                // navigateToMyCourses();

            } else {
                console.error('Google login API failed.');
            }
        } catch (err) {
            setLoading(false)
            console.error('Error calling Google login API:', err);
        }
    }


    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={(credentialResponse) => handlGoogleSigninSuccess(credentialResponse)}
                onError={() => {
                    //console.log("Login Failed");
                }}
            />
        </GoogleOAuthProvider>

    )

}

export default GoogleSignIn;