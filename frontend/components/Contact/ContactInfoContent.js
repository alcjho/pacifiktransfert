import React, { Component } from "react";

export default function ContactInfoContent({ contact }) {
  return (
    <div className="contact-info">
      <ul>
        <li>
          <div className="icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <span>{contact.contact_address_title}</span>
          {contact.contact_address}
        </li>

        <li>
          <div className="icon">
            <i className="fas fa-envelope"></i>
          </div>
          <span>{contact.contact_email_title}</span>
          <a href={"mailto:".concat(contact.contact_email)}>{contact.contact_email}</a>
        </li>

        <li>
          <div className="icon">
            <i className="fas fa-phone-volume"></i>
          </div>
          <span>{contact.contact_phone_title}</span>
          <a href={"tel:".concat(contact.contact_phone)}>{contact.contact_phone}</a>
        </li>
      </ul>
    </div>
  );
}
