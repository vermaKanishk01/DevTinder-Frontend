import React from 'react'
import profile from '../assets/profile-1.jpg'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  // console.log(user);
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });

      dispatch(removeUserFromFeed(_id));
    } catch (error) {

    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl relative">
      <figure className=''>
        <img
          className='w-full h-80'
          src={photoUrl ? photoUrl : profile}
          alt="Shoes" />
      </figure>
      <div className="card-body justify-center">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserCard