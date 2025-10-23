import React from 'react';
import { useAthletes } from '../context/AthleteContext';

export default function AthleteItem({ athlete }){
  const { remove } = useAthletes();
  const edit = () => {
    // dispatch simple event so form can pick id
    window.dispatchEvent(new CustomEvent('edit-athlete', { detail: athlete.id }));
  };

  return (
    <div className="list-group-item d-flex align-items-start">
      <img src={athlete.image_url || 'https://via.placeholder.com/100'} alt="" style={{width:90,height:90,objectFit:'cover'}} className="me-3 rounded"/>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <div>
            <h5 className="mb-1">{athlete.first_name} {athlete.last_name} {athlete.nick_name ? `(${athlete.nick_name})` : ''}</h5>
            <small>Sport: {athlete.sport} • Birth: {athlete.birth_date ? athlete.birth_date.slice(0,10) : '—'}</small>
          </div>
          <div className="text-end">
            <button className="btn btn-sm btn-outline-primary me-1" onClick={edit}>Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => { if(confirm('Delete?')) remove(athlete.id); }}>Delete</button>
          </div>
        </div>
        <p className="mb-1">{athlete.achievements}</p>
        <small>Weight: {athlete.weight || '-'}</small>
      </div>
    </div>
  );
}
