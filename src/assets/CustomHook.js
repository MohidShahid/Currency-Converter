import { useEffect, useState } from 'react'

const useCustomHook = (url) => {
    const [data, Setdata] = useState(null)
 useEffect(()=>{
    const fetchdata = async()=>{
    try{
        let response = await fetch(url)
        let jsondata =  await response.json()
        Setdata(jsondata)
    }
    catch(error){
    console.log("Error fetching the data :" , error)
    }

};

fetchdata();


 },[url])

 return data;
}

export default useCustomHook;