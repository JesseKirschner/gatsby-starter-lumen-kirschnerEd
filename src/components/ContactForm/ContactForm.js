// @flow strict
import React from 'react';
import styles from './ContactForm.module.scss';

type Props = {
  options: Object
};

const ContactForm = ({ options }: Props) => (
  <div className={styles['contactForm']}>
    <form method="post" action="#">
      <label>
        {options.name}
        <input type="text" name="name" id="name" required/>
      </label>
      <label>
        Email
        <input type="email" name="email" id="email" required/>
      </label>
      <label>
        Message
        <textarea name="message" id="message" rows="5" required/>
      </label>
      <button type="submit">Send</button>
      <input type="reset" value="Clear" />
    </form>
  </div>
);

export default ContactForm;
