import {useState, useEffect} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { getDocs, collection } from 'firebase/firestore';
import {db} from '../../firebase';
import BrotherCard from '../../components/BrotherCard/BrotherCard';
import Loading from '../../components/Loading/Loading';
import linkedin from '../../assets/linkedin.svg';
import SearchBar from '../../components/SearchBar/SearchBar';
import { get } from 'http';

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

const AllBrothers = () => {
    const [view, setView] = useState('icons');
    const [brothers, setBrothers] = useState<Brother[]>([]);
    const [loading, setLoading] = useState(true); 

    const fetchBrothers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'members'));
          const brothersList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            company: doc.data().company,
            first_name: doc.data().first_name,
            last_name: doc.data().last_name,
            linkedin: doc.data().linkedin,
            location: doc.data().location,
            majors: doc.data().majors,
            title: doc.data().title,
            pledge_class: doc.data().pledge_class
          })) as Brother[];
          setBrothers(brothersList);
        } catch (error) {
          console.error('Error fetching members:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const getFilteredBrothers = (query: string) => {

        const filtered = (brothers.filter((brother) => {
            return brother.first_name.toLowerCase().includes(query.toLowerCase()) || brother.last_name.toLowerCase().includes(query.toLowerCase());
        }));

        setBrothers(filtered);
    }

    useEffect(() => {
        fetchBrothers();
    }, []);


    if (loading) {
        return (
            <Loading />
        );
    }
    if (view === 'icons') {
        return (
            <div>
                <Navbar />
                <SearchBar filterBrothers={getFilteredBrothers}/>
                <div className="flex px-12 min-w-full items-end ml-auto justify-end">
                    <h1 onClick = {() => setView('icons')} className={`hover:cursor-pointer border rounded-lg border-blue-800 bg-blue-800 text-white p-1 my-4 mx-2 lg:text-xl md:text-lg sm:text-md hover:scale-110 hover:duration-150 scale-100 duration-150 
                        ${view === 'icons' 
                        ? 'text-xl opacity-100 font-bold'
                        : 'text-lg opacity-75'}`}>icons</h1>
                    <h1 onClick = {() => setView('list')} className={`hover:cursor-pointer border rounded-lg border-blue-800 bg-blue-800 text-white p-1  my-4 mx-2 text-xl lg:text-xl md:text-lg sm:text-md hover:scale-110 hover:duration-150 scale-100 duration-150
                        ${view === 'icons' 
                            ? 'text-lg opacity-75'
                            : 'text-xl opacity-100 font-bold'}`}>list</h1>
                </div>
                <div className='px-12 min-h-full min-w-full'></div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-12 my-6'>
                    {brothers.map((brother) => (
                        <BrotherCard id={brother.id} name={brother.first_name + " " + brother.last_name} image='test'/>
                    ))}
                </div>
            </div>
        );
    }
    else if (view === 'list') {
        return (
            <div>
                <Navbar/>
                <SearchBar filterBrothers={getFilteredBrothers}/>
                <div className="flex px-12 min-w-full items-end ml-auto justify-end">
                    <h1 onClick = {() => setView('icons')} className={`hover:cursor-pointer border rounded-lg border-blue-800 bg-blue-800 text-white p-1 my-4 mx-2 lg:text-xl md:text-lg sm:text-md hover:scale-110 hover:duration-150 scale-100 duration-150 
                        ${view === 'list' 
                        ? 'text-lg opacity-75'
                        : 'text-xl opacity-100 font-bold'}`}>icons</h1>
                    <h1 onClick = {() => setView('list')} className={`hover:cursor-pointer border rounded-lg border-blue-800 bg-blue-800 text-white p-1 my-4 mx-2 text-xl lg:text-xl md:text-lg sm:text-md hover:scale-110 hover:duration-150 scale-100 duration-150
                        ${view === 'list' 
                            ? 'text-xl opacity-100 font-bold'
                            : 'text-lg opacity-75'}`}>list</h1>
                </div>
                <div className='px-12 min-h-full min-w-full'></div>
                <div className='px-12'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Brother</th>
                            <th scope="col">Company</th>
                            <th scope="col">Title</th>
                            <th scope="col">Location</th>
                            <th scope="col">Pledge Class</th>
                        </tr>
                    </thead>
                    <tbody>
                            {brothers.map((brother) => (
                                <tr>
                                    <td>
                                        <div className="flex justify-between items-center">
                                            <span>{`${brother.first_name} ${brother.last_name}`}</span>
                                            <a href={brother?.linkedin} target="_blank" rel="noopener noreferrer">
                                                <img src={linkedin} className='size-8'></img>
                                            </a>
                                        </div>
                                    </td>
                                    <td><span>{brother.company}</span></td>
                                    <td><span>{brother.title}</span></td>
                                    <td><span>{brother.location}</span></td>
                                    <td><span>{brother.pledge_class}</span></td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                </div>
            </div>
        );
    }
    else {
        return (
            <Loading />
        );
    }
    
}

export default AllBrothers;
