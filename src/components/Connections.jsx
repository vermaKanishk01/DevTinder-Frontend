import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import profile from '../assets/profile-1.jpg'

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
            // console.log(res.data.data);
            dispatch(addConnection(res?.data?.data))
        } catch (error) {
            // handle error case
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections) return;

    if(connections.length === 0){
        <h1>No Connections Found</h1>
    }

  return (
    <div className='text-center my-10 flex flex-col gap-3'>
        <h1 className='text-bold text-3xl text-white'>Connections</h1>

        {
            connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;

                return (
                    <div key={_id} className='flex p-4 rounded-lg bg-base-300 w-1/2 m-auto'>
                        <img className='w-20 rounded-full' src={photoUrl ? photoUrl : profile} alt="photo" />
                        <div className='text-left mx-4'>
                            <h2 className='text-bold text-xl'>{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )   
            })
        }
    </div>
  )
}

export default Connections;