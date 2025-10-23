import React, { useEffect, useState } from 'react';
import { useAthletes } from '../context/AthleteContext';

const empty = {
  first_name: '', last_name: '', nick_name:'', birth_date:'', weight:'', image_url:'', sport:'', achievements:''
};

export default function AthleteForm(){
  const { create, update, athletes } = useAthletes();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // if editingId changes, load values
    if (editingId) {
      const item = athletes.find(a => a.id === editingId);
      if (item) setForm({
        first_name: item.first_name||'',
        last_name: item.last_name||'',
        nick_name: item.nick_name||'',
        birth_date: item.birth_date ? item.birth_date.slice(0,10) : '',
        weight: item.weight||'',
        image_url: item.image_url||'',
        sport: item.sport||'',
        achievements: item.achievements||''
      });
    }
  }, [editingId, athletes]);

  // for simple demo: clicking on thumbnail sets editing
  useEffect(() => {
    // listens to custom event "edit-athlete"
    const handler = (e) => setEditingId(e.detail);
    window.addEventListener('edit-athlete', handler);
    return () => window.removeEventListener('edit-athlete', handler);
  }, []);

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, form);
      setEditingId(null);
    } else {
      await create(form);
    }
    setForm(empty);
  };

  const cancelEdit = () => { setEditingId(null); setForm(empty); };

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <input name="first_name" required className="form-control" placeholder="First name" value={form.first_name} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="last_name" required className="form-control" placeholder="Last name" value={form.last_name} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="nick_name" className="form-control" placeholder="Nickname" value={form.nick_name} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="birth_date" type="date" className="form-control" value={form.birth_date} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="weight" type="number" step="0.1" className="form-control" placeholder="Weight (kg)" value={form.weight} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="image_url" className="form-control" placeholder="Image URL" value={form.image_url} onChange={handle}/>
      </div>
      <div className="mb-2">
        <input name="sport" className="form-control" placeholder="Sport" value={form.sport} onChange={handle}/>
      </div>
      <div className="mb-2">
        <textarea name="achievements" className="form-control" placeholder="Achievements" value={form.achievements} onChange={handle}/>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
        {editingId && <button type="button" onClick={cancelEdit} className="btn btn-secondary">Cancel</button>}
      </div>
    </form>
  );
}
