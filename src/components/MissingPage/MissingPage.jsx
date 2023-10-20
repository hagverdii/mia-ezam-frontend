import {useNavigate} from "react-router-dom";

const MissingPage = () => {
    const navigate = useNavigate()

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p style={{color: 'black', fontSize: '2rem', textAlign: 'center', marginTop: '3rem'}}>
                404 səhifə tapılmadı
            </p>
            <button style={{marginTop: '1rem', padding: '.7rem', fontWeight: 'bold'}} onClick={() => navigate('/')}>
                Ana səhifəyə qayıt
            </button>
        </div>
    );
};

export default MissingPage