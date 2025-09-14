import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className='p-6 space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-white'>Welcome to paradise brother</h1>
      </div>
    </div>
  )
}

export default Admin
