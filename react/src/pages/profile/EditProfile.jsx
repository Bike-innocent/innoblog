import React from 'react'
import DeleteUserForm from './partials/DeleteUserForm'

import UpdatePasswordForm from './partials/UpdatePasswordForm'
import UpdateProfileInformation from './partials/UpdateProfileInformationForm'

function EditProfile() {
  return (
    <div className='p-2 md:p-4 lg:p-5'>
     
     
 
     <UpdateProfileInformation/>
     <UpdatePasswordForm/>
     <DeleteUserForm />
    </div>
  )
}

export default EditProfile
