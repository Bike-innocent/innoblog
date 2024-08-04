import React from 'react';

import UpdateProfileInformation from './UpdateProfileInformationForm';
import UserAvatar from './UserAvatar';
// import Profile from './partials/Profile';

function EditProfile() {
  return (
    <div className="p-2 md:p-4 lg:p-5 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserAvatar />
        </div>
        <div className="md:col-span-2">
          <UpdateProfileInformation />
        </div>
      </div>
      <div>
      
      </div>



    </div>
  );
}

export default EditProfile;
