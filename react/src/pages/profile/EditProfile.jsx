import React from 'react';
import DeleteUserForm from './partials/DeleteUserForm';
import UpdatePasswordForm from './partials/UpdatePasswordForm';
import UpdateProfileInformation from './partials/UpdateProfileInformationForm';
import UserAvatar from './partials/UserAvatar';

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

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
        <UpdatePasswordForm />
        </div>
        <div className="md:col-span-1">
        <DeleteUserForm />
        </div>
      </div> */}


    </div>
  );
}

export default EditProfile;
