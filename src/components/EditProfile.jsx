import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [gender, setGender] = useState(user.gender);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()

    const saveProfile = async () => {
        // clear Errors
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, gender, age, about },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data));
            setShowToast(true);
            setInterval(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error.response.data);
        }
    }

    return (
        <>
            <div className='flex justify-center my-10'>
                <div className='flex justify-center mx-10'>
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">First Name</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Photo Url :</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={photoUrl}
                                        onChange={(e) => setPhotoUrl(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">About</legend>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type here"
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary m-2" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, gender, age, about }} />
            </div>
            {
                showToast && 
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile saved successfully.</span>
                    </div>
                </div>
            }
        </>
    )
}

export default EditProfile