import React from 'react';
import { AthleteProvider } from './context/AthleteContext';
import AthleteList from './components/AthleteList';
import AthleteForm from './components/AthleteForm';

export default function App(){
  return (
    <AthleteProvider>
      <div className="container my-4">
        <h1 className="mb-4">Athletes Manager</h1>
        <div className="row">
          <div className="col-md-5">
            <h4>Add / Edit Athlete</h4>
            <AthleteForm />
          </div>
          <div className="col-md-7">
            <h4>All Athletes</h4>
            <AthleteList />
          </div>
        </div>
      </div>
    </AthleteProvider>
  );
}
