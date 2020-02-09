import React, { useEffect, useCallback, useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import { useGapi } from "../gapi/GapiProvider";
import { useAsyncHandler } from '../hooks';
// import { Services } from './Services';
import { services } from '../models';
import { LoginModal } from './EnterInfoModal';
import { useEnterInfo } from '../enter-info-provider';

import moment from 'moment';
import { AvailabilityEvent, createUtils } from 'react-availability-calendar';
import { confirmPrompt } from '../utils';
import { api } from '../api';
const { formatAsDateWithTime } = createUtils(moment);

function selectedServicesIdsToEventDescription(selected: {
  [id: string]: boolean;
}) {
  const labels = [];
  for (const id in selected) {
    if (!selected[id]) continue;
    const service = services.find(s => s.id === id);
    if (!service) continue;
    labels.push(service.label);
  }
  return labels.length > 0 ? labels.join(', ') : '';
}

export const RequestModal = ({
  calId,
  show,
  handleClose,
  availability,
  onRequested,
}: {
  calId: string;
  show: boolean;
  handleClose: () => any;
  availability: AvailabilityEvent | null;
  onRequested: () => any;
}) => {
  // const {
  //   isSignedIn: googleIsSignedIn,
  // signIn,
  // requestBooking,
  //   currentUser
  // } = useGapi();

  const [showingConfirmation, setShowingConfirmation] = useState<boolean>(
    false
  );

  const [selectedServiceIds, setSelectedServiceIds] = useState<{
    [id: string]: boolean;
  }>({});

  const { email, phone, name } = useEnterInfo();

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');

  const needLoginModal = !email && !phone;

  const requestBooking = useCallback(async () => {
    if (!availability) return;
    if (needLoginModal) {
      setShowLoginModal(true);
      return;
    }
    confirmPrompt({
      promptMessage: 'Are you sure you want to request this appointment?',
      onConfirm: async () => {
        const startDate = availability.startDate;
        const endDate = availability.endDate;
        await api.requestBooking({
          calId,
          startDate,
          endDate,
          email /*default email - let api use it if not logged in*/,
          description: selectedServicesIdsToEventDescription(
            selectedServiceIds
          ),
          phone,
          name,
          message,
        });
        setShowingConfirmation(true);
      },
    });
  }, [
    calId,
    email,
    message,
    phone,
    name,
    needLoginModal,
    availability,
    selectedServiceIds,
    setShowingConfirmation,
  ]);

  const {
    handlerWrapper: requestBookingWrapper,
    loading,
    error,
  } = useAsyncHandler(requestBooking);

  useEffect(() => {
    if (error) {
      alert('Error adding booking: ' + error);
    }
  }, [error]);

  if (availability && showingConfirmation) {
    return (
      <ConfirmationModal
        show={true}
        handleClose={() => {
          setShowingConfirmation(false);
          setMessage('');
          onRequested();
        }}
        date={availability.startDate}
      />
    );
  }

  if (!availability) return null;

  const onSelectedServiceId = (serviceId: string) => {
    if (selectedServiceIds[serviceId]) {
      setSelectedServiceIds({ ...selectedServiceIds, [serviceId]: false });
    } else {
      setSelectedServiceIds({ ...selectedServiceIds, [serviceId]: true });
    }
  };

  if (showLoginModal) {
    return (
      <LoginModal
        show={true}
        handleSetEmail={() => {
          setShowLoginModal(false);
        }}
        handleClose={() => {
          setShowLoginModal(false);
        }}
      />
    );
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>{formatAsDateWithTime(availability.startDate)}</h3>
        {/* <Services
          selected={selectedServiceIds}
          onSelected={onSelectedServiceId}
        /> */}
        <textarea
          onChange={e => setMessage(e.target.value)}
          style={{ width: '100%' }}
          value={message}
          placeholder="Type optional request message here..."
        />
      </Modal.Body>

      {(email || phone) && (
        <Modal.Footer>
          {name && (
            <>
              <small>
                Your Name: <b>{name}</b>
              </small>
              <br />
            </>
          )}
          {email && (
            <>
              <small>
                Your Email: <b>{email}</b>
              </small>
              <br />
            </>
          )}
          {phone && (
            <>
              <small>
                Your Phone: <b>{phone}</b>
              </small>
            </>
          )}

          <Button
            size="sm"
            variant="outline-secondary"
            onClick={(e: any) => {
              setShowLoginModal(true);
            }}
          >
            Change
          </Button>
        </Modal.Footer>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          disabled={loading}
          variant="primary"
          onClick={() => requestBookingWrapper()}
        >
          {needLoginModal ? 'Next' : 'Request'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ConfirmationModal = ({
  show,
  handleClose,
  date,
}: {
  show: boolean;
  handleClose: () => any;
  date: Date;
}) => {
  const { email, phone, name } = useEnterInfo();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Your appointment request for {formatAsDateWithTime(date)}</h3>
        Thank you for your appointment request! I will get back to you shortly
        with confirmation.
      </Modal.Body>

      {(email || phone) && (
        <Modal.Footer>
          {name && (
            <>
              <small>
                Your Name: <b>{name}</b>
              </small>
              <br />
            </>
          )}
          {email && (
            <>
              <small>
                Your Email: <b>{email}</b>
              </small>
              <br />
            </>
          )}
          {phone && (
            <>
              <small>
                Your Phone: <b>{phone}</b>
              </small>
            </>
          )}
        </Modal.Footer>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
