import React from 'react';
import { useNavigate } from 'react-router-dom';
import pfp from '../../assets/defaultpfp.png';
type BrotherCardProps = {
    id: string;
    name: string;
    image: string;
};

const BrotherCard: React.FC<BrotherCardProps> = ({ id, name, image }) => {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/brother/${encodeURIComponent(id)}`);
    }
    return (
        <div onClick={handleClick} className='border-2 bg-white border-blue-900 rounded-md inline-flex items-center justify-center p-4 hover:scale-110 hover:duration-150 scale-100 duration-150 hover:cursor-pointer flex-col'>
            <img src={pfp} className='rounded-md py-4 w-36 h-48'></img>
            <h1 className='text-2xl sm:text-lg md:text-xl text-center w-full'>{name}</h1>
        </div>
    );
}

export default BrotherCard;
