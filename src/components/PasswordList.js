import React from 'react';
import { Link } from 'react-router-dom';

const PasswordList = ({ passwords }) => {
  return (
    <div className="password-list">
      <h2>Passwords</h2>
      {passwords.map((password) => (
        <div className="password-item" key={password.id}>
          <Link to={`/passwords/${password.id}`}>
            <h3>{password.website}</h3>
          </Link>
          <p>
            Username: {password.username}
            <br />
            Password: {password.password}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PasswordList;
