import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nat, setNat] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate(name, age, email, pass, nat) {
    // Validation logic here...
  }

  function handleRadio(value) {
    setNat(value);
  }

  function handleEdit(index) {
    const user = users[index];
    setName(user.name);
    setAge(user.age);
    setEmail(user.email);
    setPass(user.pass);
    setNat(user.nat);
    setIsEditing(true);
    setEditIndex(index);
    document.getElementById('name').focus();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate(name, age, email, pass, nat)) {
      const newUser = {
        name: name,
        age: age,
        email: email,
        pass: pass,
        nat: nat,
      };
      if (isEditing && editIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = newUser;
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setUsers(updatedUsers);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        const newUsers = JSON.parse(localStorage.getItem('users')) || [];
        newUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(newUsers));
        setUsers(newUsers);
      }
      setName('');
      setAge('');
      setEmail('');
      setPass('');
      setNat('');
    }
  }


  function handleDelete(index) {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  }

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Users</h2>
        <form className="w-50 mx-auto" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="number"
            className="form-control mt-3"
            placeholder="Enter age..."
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />

          <input
            type="email"
            className="form-control mt-3"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type="password"
            className="form-control mt-3"
            placeholder="Enter password..."
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />

          <div className="radio mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="uzbek"
                value="Uzbek"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="uzbek">
                Uzbek
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="english"
                value="English"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="english">
                English
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="russia"
                value="Russia"
                onChange={(e) => {
                  handleRadio(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="russia">
                Russia
              </label>
            </div>
          </div>

          <button className={`btn ${isEditing ? 'btn-success' : 'btn-primary'} w-100 mt-4`}>
            {isEditing ? 'UPDATE' : 'SAVE'}
          </button>
        </form>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Password</th>
              <th>Nationality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.pass}</td>
                <td>{user.nat}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(index)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
