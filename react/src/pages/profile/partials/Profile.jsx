import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';

const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/profile/${username}`);
                setProfile(response.data);
            } catch (error) {
                setError('Profile not found');
            }
        };

        fetchProfile();
    }, [username]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{profile.name}</h1>
            <h2>@{profile.username}</h2>
            <img src={profile.avatar_url} alt={`${profile.username}'s avatar`} style={{ borderColor: profile.placeholder_color }} />
            {/* Add other profile details here */}
        </div>
    );
};

export default Profile;
