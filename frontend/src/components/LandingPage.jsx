
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {

    const navigate = useNavigate();


    return (
      <div className="flex flex-col gap-4 font-newsreader h-screen justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to the NewsBoard</h1>
        <button className='btn btn-neutral' onClick={() => navigate('/home')}>Join Now!</button>
      </div>
    );
  };
  
export default LandingPage;
  