import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Processing from '../../../components/Processing';
import PlaceholderImage from '../partials/PlaceholderImage';

const DisplayAvatar = ({ username, currentAvatar, userName, placeholderColor }) => {
    const { data, isError, error: fetchError, isLoading } = useQuery({
        queryKey: ['userprofile', username],
        queryFn: () => fetchUserProfile(username),
        initialData: { avatar: currentAvatar, name: userName, placeholder_color: placeholderColor },
    });

    if (isLoading) {
        return <Processing text="Loading avatar..." />;
    }

    if (isError) {
        return <p className="text-red-500">Failed to load avatar: {fetchError.message}</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                <PlaceholderImage
                    name={data.name}
                    avatar={data.avatar}
                    placeholderColor={data.placeholder_color}
                />
            </div>
        </div>
    );
};

export default DisplayAvatar;
