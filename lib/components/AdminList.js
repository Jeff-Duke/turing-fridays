import React from 'react';

const AdminList = ({ toggleList, allAdmins }) => {
  return (
    <section className='AdminsList'>
      <button className='CloseListButton' onClick={() => toggleList()}>Close</button>
      <section className='AdminEmails'>{allAdmins}</section>
      <form className='AddAdminForm' onSubmit={(e) => newAdmin(e)}>
        <input id='newAdmin' name='email' placeholder='name@email.com'/>
        <input className='AdminSubmitButton' type='submit'/>
      </form>
    </section>
  )
}

export default AdminList;
