import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice';
import profile from "../assets/profile-1.jpg"

const Requests = () => {

    const dispacth = useDispatch();
    const requests = useSelector((store) => store.requests);
    // console.log(requests);

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            // console.log(res);
            dispacth(addRequests(res?.data?.data));
        } catch (error) {

        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials: true}); // {} - cannot send any data in post api so we put the empty object, if we send any data then put the data in this empty object.

            // console.log(res);
            dispacth(removeRequest(_id))

        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

    if (!requests) return;

    if (requests.length === 0) {
        return <h1 className='text-bold text-3xl text-white my-5 text-center'>No Requests Found</h1>
    }

    return (
        <div className='text-center my-10 flex flex-col gap-3'>
            <h1 className='text-bold text-3xl text-white'>Connection Requests</h1>

            {
                requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                    return (
                        <div key={_id} className='flex justify-between items-center p-4 rounded-lg bg-base-300 w-2/3 m-auto'>
                            <img className='w-20 rounded-full' src={photoUrl ? photoUrl : profile} alt="photo" />
                            <div className='text-left mx-4'>
                                <h2 className='text-bold text-xl'>{firstName + " " + lastName}</h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                                <button className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests;