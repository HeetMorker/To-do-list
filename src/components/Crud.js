import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import '../crud.css';
import { doc, addDoc, collection, updateDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';

const Crud = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const [id, setId] = useState('');

  const dbref = collection(db, 'CRUD');
  const add = async () => {
    if (name && email && phone) {
      const adddata = await addDoc(dbref, { Name: name, Email: email, Phone: phone });
      if (adddata) {
        console.log('Add Success');
        resetForm();
      } 
      else {console.log('Add Failed');}
    } 
    else {alert('Please fill in all fields for adding.');}
  };
  
  const passData = (selectedId) => {
    const matchId = fetchData.find((data) => data.id === selectedId);
    setName(matchId.Name);
    setEmail(matchId.Email);
    setPhone(matchId.Phone);
    setId(matchId.id);
  };

  const update = async () => {
    if (id && name && email && phone) {
      const updateref = doc(dbref, id);
      try {
        await updateDoc(updateref, { Name: name, Email: email, Phone: phone });
        console.log('Update Success');
        resetForm();
      }
      catch (error) {console.log(error);}
    } 
    else {alert('Please fill in all fields for updating.');}
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setId('');
  };

  const fetch = () => {
    const unsubscribe = onSnapshot(dbref, (snapshot) => {
      const fetchdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchData(fetchdata);
    });
    return unsubscribe;
  };

  const del = async (selectedId) => {
    const delref = doc(dbref, selectedId);
    try {
      await deleteDoc(delref);
      console.log('Delete Success');
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = fetch();
    return () => unsubscribe();
  }, []);


  return (
    <>
      <div className="form-container">
        <h2 className='fw-bold f-family'>CRUD FORM</h2>
        <div className="box">
          <input type="text" name="name" className='f-family2 fs-5' placeholder="Full Name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="box">
          <input type="email" name="email" className='f-family2 fs-5' placeholder="Enter Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="box">
          <input type="number" name="number" className='f-family2 fs-5' placeholder="Enter Number" value={phone} autoComplete="off" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button className="btn me-2 mt-3 btn-primary" onClick={add}>Add </button>
        <button className="btn mt-3 btn-primary" onClick={update} disabled={!id}>Update </button>
      </div>

      <div className="database mt-3">
        <h2 className="fs-1 fw-bold text-center f-family">CRUD DATABASE</h2>
        <div className="container-fluid">
          <div className="row flex-wrap">
            {fetchData.map((data, index) => (
              <div className="col-2" key={index}>
                <div className="boxes">
                  <h4 className="fs-5 fw-normal fw-semibold">Name: <span className="fs-6">{data.Name}</span> </h4>
                  <h4 className="fs-5 fw-normal fw-semibold">Email: <span className="fs-6">{data.Email}</span> </h4>
                  <h4 className="fs-5 fw-normal fw-semibold">Phone: <span className="fs-6">{data.Phone}</span> </h4>
                  <button className="btn btn-primary me-3" onClick={() => passData(data.id)} >Update</button>
                  <button className="btn btn-danger" onClick={() => del(data.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Crud;
