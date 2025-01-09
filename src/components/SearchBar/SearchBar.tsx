import React from 'react';

// interface Brother {
//     id: string;
//     company: string;
//     first_name: string;
//     last_name: string;
//     linkedin: string;
//     location: string;
//     majors: string[];
//     title: string;
//     pledge_class: string;
// }

interface SearchBarProps {
    filterBrothers: (query: string) => void; // Type definition for the function prop
    //brothers: Brother[];
}

const SearchBar: React.FC<SearchBarProps> = ({ filterBrothers}) => {

    const [query, setQuery] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        filterBrothers(newQuery);
        console.log(newQuery);
    }


    return (
        <div className='px-12 pt-6'>
            <input className='py-2 px-4 rounded-full border-2 border-blue-800 w-full text-xl' value={query} type="text" placeholder="search!" onChange={handleChange}/>
        </div>
    );
}

export default SearchBar;
