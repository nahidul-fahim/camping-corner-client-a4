import JSConfetti from 'js-confetti'
import { IoMdCheckmarkCircleOutline, IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';


const SuccessPage = () => {

    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti()

    return (
        <div className='container mx-auto h-screen flex flex-col justify-center items-center gap-4'>
            <IoMdCheckmarkCircleOutline className='text-8xl text-[#22C55E]' />
            <h1 className='font-primary text-4xl text-bodyText'>Order placed successfully!</h1>
            <Link to={"/"} className='text-body flex justify-center items-center gap-1 text-secondary hover:text-primary duration-300 font-medium'><IoIosArrowRoundBack className='text-2xl'/> Return to Home</Link>
        </div>
    );
};

export default SuccessPage;