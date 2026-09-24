import logo from '../assets/logo.png'


const Navbar = () => {
    return (
        <>
        <nav className="fixed top-0 left-0 z-50 w-full h-17 bg-gray-200 flex itmes-center justify-between rounded-b-2xl">
            <div className='w-full flex items-center justify-center md:justify-start md:ml-22'>
                <img src={logo} alt="logo" width={45} className=''/>
                <h2 className='text-2xl font-bold cursor-pointer '>Drop<span className='text-blue-900'>Vault</span></h2>
            </div>
            
            <div className='mr-22 hidden md:flex items-center justify-center'>
                <ul className='flex items-center justify-center gap-8'>
                    <li className='text-xl font-medium hover: transition cursor-pointer'>Home</li>
                    <li className='text-xl font-medium hover: transition cursor-pointer'>About</li>
                    <li className='text-xl font-medium hover: transition cursor-pointer'>Contact</li>
                </ul>
            </div>

        </nav>
        </>
    )
}

export  default Navbar