import React, { useRef, useEffect } from "react";
import { Event } from "./Event";
import { ModalLegend } from "./ModalLegend";

export const Modal = ({ isOpen, dayEvents, hideModal, dayClicked }) => {
  const modalRef = useRef(null);

  const formatEventTime = (eventTime) => {
    // 2021-01-01T18:00:00.000+0000
    let formattedEventTime = eventTime.split("T")[1];
    formattedEventTime = formattedEventTime.slice(0, 5);
    return formattedEventTime;
  };

  const formatEventInfo = (info) => {
    return info.length > 100 ? `${info.slice(0, 100)}...` : info;
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      hideModal();
    }
  };

  useEffect(() => {
    // console.log("MODAL REF", modalRef);
    // console.log("MODAL REF", modalRef.current);
    isOpen && modalRef.current.focus();
  }, [isOpen]);
  return (
    <>
      {isOpen ? (
        <div
          ref={modalRef}
          onKeyDown={handleKeyDown}
          className="modal-container"
          tabIndex={-1}
        >
          <button onClick={hideModal}>CLOSE EVENTS</button>
          <div className="modal">
            <ModalLegend dayClicked={dayClicked} />

            {/* eslint-disable-next-line */}
            {dayEvents.map((event) => {
              return (
                <a href={event.websiteUrl} target="_blank" rel="noreferrer">
                  <Event
                    eventImage={event.coverPhotoUrl}
                    eventName={formatEventInfo(event.name)}
                    eventTime={formatEventTime(event.startDate)}
                    eventLocation={
                      event.hasOwnProperty("venue") &&
                      formatEventInfo(event.venue.displayAddress)
                    }
                  />
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};
