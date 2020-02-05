import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEnterInfo } from '../enter-info-provider';
import { emailIsValid } from '../utils';

export const LoginModal: React.SFC<{
  show: boolean;
  handleSetEmail: (email: string) => any;
  handleClose: () => any;
}> = ({ show, handleClose, handleSetEmail }) => {
  const { setEmail, email, setPhone, phone, setName, name } = useEnterInfo();

  const [typedName, setTypedName] = useState<string>(name);
  const [typedEmail, setTypedEmail] = useState<string>(email);
  const [typedPhone, setTypedPhone] = useState<string>(phone);

  const submitEnabled =
    (!typedEmail || emailIsValid(typedEmail)) && (!!typedEmail || !!typedPhone);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Sign In or Enter Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="form-control"
                onChange={e => setTypedName(e.target.value)}
                value={typedName}
              />
            </div>
            <small>Please provide either phone or email</small>
            <br />
            <div className="form-group">
              <label htmlFor="email">Phone</label>
              <input
                id="phone"
                className="form-control"
                onChange={e => setTypedPhone(e.target.value)}
                value={typedPhone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="form-control"
                type="email"
                onChange={e => setTypedEmail(e.target.value)}
                value={typedEmail}
              />
            </div>
            <div>
              <Button
                disabled={!submitEnabled}
                variant="info"
                type="submit"
                style={{ marginRight: 50 }}
                onClick={(e: any) => {
                  e.preventDefault();
                  setEmail(typedEmail);
                  setPhone(typedPhone);
                  setName(typedName);
                  handleSetEmail(e.target.value);
                }}
              >
                Save
              </Button>
              <Button
                variant="outline-secondary"
                onClick={(e: any) => {
                  e.preventDefault();
                  setEmail('');
                  setPhone('');
                  setName('');
                  handleSetEmail(e.target.value);
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
