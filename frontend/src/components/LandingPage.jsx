
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {

    const navigate = useNavigate();


    return (
      <div className="flex flex-col gap-4 font-newsreader h-screen justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to the NewsBoard!</h1>
        <h3 className='text-xl font-medium'>Explore personalised news right here</h3>
        <button className='px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200' onClick={() => navigate('/home')}>Join Now!</button>
      </div>
    );
  };
  
export default LandingPage;
  