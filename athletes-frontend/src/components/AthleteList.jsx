import React from 'react';
import { useAthletes } from '../context/AthleteContext';
import AthleteItem from './AthleteItem';

export default function AthleteList(){
  const { athletes, loading } = useAthletes();
  if (loading) return <div>Loading...</div>;
  if (!athletes.length) return <div>No athletes yet</div>;
  return (
    <div className="list-group">
      {athletes.map(a => <AthleteItem key={a.id} athlete={a} />)}
    </div>
  );
}
