import React, { useState } from 'react';
import { emailIsValid } from './utils';

export interface InviteVal {
  emails: string[];
  message: string;
}

export const InviteEmails = ({
  handleInvite,
}: {
  handleInvite: (a: InviteVal) => any;
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newEmailError, setNewEmailError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = [...emails];
    newVal[i] = e.target.value;
    setEmails(newVal);
  };

  const handleNewEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    setNewEmailError('');
  };

  const handleAdd = () => {
    if (newEmail && emailIsValid(newEmail)) {
      const newVal = [...emails, newEmail];
      setEmails(newVal);
      setNewEmail('');
    } else {
      setNewEmailError('Please type a valid email');
    }
  };

  const handleRemove = (i: number) => {
    const newVal = [...emails];
    newVal.splice(i, 1);
    setEmails(newVal);
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    handleInvite({ emails, message });
  };

  console.log('state', { emails, message });

  return (
    <div>
      <form className="form" onSubmit={e => e.preventDefault()}>
        {emails.map((email, i) => (
          <div key={'email_' + i} className="mb-1">
            <div className="input-group">
              <input
                id={'email_' + i}
                className="form-control"
                type="email"
                placeholder="Type email..."
                value={email}
                onChange={e => handleChange(i, e)}
              />
              <button
                type="button"
                aria-label="Close"
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingBottom: 10,
                  outline: 'none',
                }}
                onClick={() => handleRemove(i)}
                className="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        ))}
        <div className="form-group">
          <div className="input-group">
            <input
              id="new_email"
              className="form-control"
              type="email"
              placeholder="Type email..."
              value={newEmail}
              onChange={handleNewEmail}
            />
            <button
              type="button"
              style={{
                outline: 'none',
              }}
              className="input-group-append btn btn-secondary"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          {newEmailError && (
            <p className="help-block text-danger">{newEmailError}</p>
          )}
        </div>
      </form>
      <p>
        <textarea
          style={{ width: '100%' }}
          placeholder="Type message..."
          onChange={handleMessage}
          value={message}
        />
      </p>
      <button className="btn btn-primary" onClick={handleSend}>
        Send Invite
      </button>
    </div>
  );
};
