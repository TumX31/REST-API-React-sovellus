import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:4000/api/athletes';

const AthleteContext = createContext();

export const useAthletes = () => useContext(AthleteContext);

export function AthleteProvider({ children }) {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setAthletes(res.data);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  const create = async (data) => {
    const res = await axios.post(API, data);
    setAthletes(prev => [res.data, ...prev]);
    return res.data;
  };

  const update = async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);
    setAthletes(prev => prev.map(a => a.id === id ? res.data : a));
    return res.data;
  };

  const remove = async (id) => {
    await axios.delete(`${API}/${id}`);
    setAthletes(prev => prev.filter(a => a.id !== id));
  };

  useEffect(() => { fetchAll(); }, []);

  return (
    <AthleteContext.Provider value={{ athletes, loading, fetchAll, create, update, remove }}>
      {children}
    </AthleteContext.Provider>
  );
}
