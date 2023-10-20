import {useNavigate} from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate()

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p style={{color: 'black', fontSize: '2rem', textAlign: 'center', marginTop: '3rem'}}>
                Bu səhifəyə daxil olmağa səlahiyyətiniz çatmır
            </p>
            <button style={{marginTop: '1rem', padding: '.7rem', fontWeight: 'bold'}} onClick={() => navigate('/')}>
                Geri qayıt
            </button>
        </div>
    );
};

export default UnauthorizedPage;