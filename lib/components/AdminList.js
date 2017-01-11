import React from 'react';

const AdminList = ({ toggleList, allAdmins, newAdmin, user }) => {
  return (
    <section className='AdminsList'>
      <button className='CloseListButton' onClick={() => toggleList()}>Close</button>
      <section className='AdminEmails'>{allAdmins}</section>
      <form className='AddAdminForm' onSubmit={(e) => newAdmin(e)}>
        <label htmlFor='newAdmin' aria-label='email' title='email'>
          <input
            hidden={user.email !== 'peterspringer829@gmail.com'}
            id='newAdmin'
            name='email'
            placeholder='name@email.com'
            type='email'
          />
        </label>
        <label htmlFor='AdminSubmitButton' aria-label='submit button' title='submit'>
          <input
            hidden={user.email !== 'peterspringer829@gmail.com'}
            className='AdminSubmitButton'
            type='submit'
          />
        </label>
      </form>
    </section>
  )
}

export default AdminList;
