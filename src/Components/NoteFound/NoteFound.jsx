import React from 'react'
import imgError from '../../images/server-error.png';
import style from './NoteFound.module.css';
function NoteFound() {
  return (
    <div className='vh-100 d-flex flex-wrap  justify-content-center align-items-center'>
        <div className={`col-md-4 ${style.ahmed}`}>
          <h1 className='text-center fw-bolder mb-3 text-danger'>Error 404</h1>
          <h2 className={`${style.mashee} text-black text-center fw-bold`}>Page Not Found</h2>
          <h3 className='text-center text-muted  fw-bold'>There are Error in Your Link (Path), Please make Sure From it.</h3>
          <div className={`d-flex  ${style.lough}`}>
          <h1 className='text-center fst-italic fw-bold'>السيرفر بيقولك ارحمنى بقا</h1>
        </div>
        </div>
        <div className={`col-md-7 text-center ${style.motion}`}>
          <img className='w-100' src={imgError} alt="Error Load" />
        </div>
      </div>
  )
}

export default NoteFound