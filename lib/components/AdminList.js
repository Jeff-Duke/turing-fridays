import React from 'react';

const AdminList = ({ toggleList, allAdmins, newAdmin, user }) => {
  return (
    <section className='AdminsList'>
      <button className='CloseListButton' onClick={() => toggleList()}>Close</button>
      <section className='AdminEmails'>{allAdmins}</section>
      <form className='AddAdminForm' onSubmit={(e) => newAdmin(e)}>
        <input
          hidden={user.email !== 'peterspringer829@gmail.com'}
          id='newAdmin'
          name='email'
          placeholder='name@email.com'
        />
        <input
          hidden={user.email !== 'peterspringer829@gmail.com'}
          className='AdminSubmitButton'
          type='submit'
        />
      </form>
    </section>
  )
}

export default AdminList;
