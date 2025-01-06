import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useState, useEffect } from 'react';
import linkedin from '../../assets/linkedin.svg';
import './Brother.css';
import defaultpfp from '../../assets/defaultpfp.png';
import back from '../../assets/back.png';
import Loading from '../../components/Loading/Loading';


interface Brother {
    id: string;
    company: string;
    first_name: string;
    last_name: string;
    linkedin: string;
    location: string;
    majors: string[];
    title: string;
    pledge_class: string;
}

const Brother = () => {

    const {id} = useParams();
    const [brother, setBrother] = useState<Brother | null >(null);
    const [loading, setLoading] = useState(true);
    
    const fetchBrothers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'members'));
          const doc = querySnapshot.docs.find((doc) => doc.id === id);
          console.log(doc)
          if (doc) {
          const brotherData = {
            id: doc.id,
            company: doc.data().company,
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
            linkedin: doc.data().linkedin,
            location: doc.data().location,
            majors: doc.data().majors,
            title: doc.data().title,
            pledge_class: doc.data().pledge_class
          } as Brother;
          setBrother(brotherData);  
          }
        } catch (error) {
          console.error('Error fetching members:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBrothers();
        console.log(brother)
    });

    if (loading) {
        return (
            <Loading />
        );
    }
    
    return (
        <div>
            <Navbar/>
            <div className='flex flex-row items-center justify-center py-4 h-[calc(100vh-98px)]'>
                <a className='active pl-4 blue-800' href='/all'>
                    <img src={back} alt='back icon'></img>
                </a>
                <div className='flex flex-col min-h-min items-center basis-1/2 flex-shrink'>
                    <img src={defaultpfp} alt='img' className="rounded-lg border border-gray-300 shadow-md"></img>
                    <div className='flex flex-row items-center justify-center py-6'>
                        <h1 className='px-4'>{`${brother?.first_name} ${brother?.last_name}`}</h1>
                        <a href={brother?.linkedin} target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt='logo' className='size-10'></img>
                        </a>
                    </div>
                </div>
                <div className="min-h-min w-0.5 self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
                <div className='flex flex-col items-center basis-1/2 my-12 px-4 flex-shrink'>
                    <div className='flex flex-col items-center justify-center py-4'>
                        <h2 className='text-blue-800'>Professional Information</h2> 
                        <div className='flex flex-col items-center'>
                            <h4 className='text-xl md:text-lg lg:text-xl whitespace-nowrap'>Company: {brother?.company}</h4>
                            <h4 className='text-xl md:text-lg lg:text-xl whitespace-nowrap'>Title: {brother?.title}</h4>
                            <h4 className='text-xl md:text-lg lg:text-xl whitespace-nowrap'>Location: {brother?.location}</h4>
                        </div> 
                    </div>
                    <div className='flex flex-col min-h-min items-center justify-center py-4'>
                        <h2 className='text-blue-800'>AKPsi Information</h2>
                        <div className='flex flex-col items-center'>
                            <h4 className='text-xl md:text-lg lg:text-xl whitespace-nowrap'>Major(s): {brother?.majors.join('|')}</h4>
                            <h4 className='text-xl md:text-lg lg:text-xl whitespace-nowrap'>Pledge Class: {brother?.pledge_class}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brother;
