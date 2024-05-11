import React from 'react'
import { useLoader } from '../context/Context'
const Loader = () => {
    const {loader,loaderDispatcher}=useLoader();

    
    return (
        <div>
            {loader.loader && (
        <div className=' absolute bg-black bg-opacity-50 h-screen w-screen flex justify-center items-center'>
            <div>
                <img className="h-24 mx-auto" src={"/1481.gif"} alt='loader' />
            </div>
            <p>loading</p>
        </div>
    )}
    
    
            
            {!loader.loader && loader.error&&(
        <div>
            {console.log(loader.error)}
            error occured
    
            
        </div>
    )}
    
        </div>
      )
    }

export default Loader