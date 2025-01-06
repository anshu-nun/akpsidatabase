import React from "react";

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('isAuthenticated');
    }


    return (
        <div className='bg-gray-100'>
            {/* <img src={akpsiLogo} className='w-20 h-15'></img> */}
            <ul className="nav p-4 flex items-center">
                <li className="nav-item mx-6 text-2xl border-b-2 border-r-2 rounded shadow-lg hover:scale-110 hover:duration-150 scale-100 duration-150">
                    <a className="nav-link text-blue-800 active" href="/all">All Brothers</a>
                </li>
                <li className="nav-item left-0 mx-6 text-2xl border-b-2 border-r-2 rounded shadow-lg hover:scale-110 hover:duration-150 scale-100 duration-150 ml-auto">
                    <a className="nav-link text-blue-800 active" aria-current="page" href="/" onClick={logout}>Logout</a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
