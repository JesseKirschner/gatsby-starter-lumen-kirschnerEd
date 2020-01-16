// @flow strict
import React from 'react';
import { navigate } from 'gatsby-link';
import styles from './ContactForm.module.scss';

type Props = {
  options: Object
};

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const ContactForm = ({ options }: Props) => {
  const [state, setState] = React.useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      // .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  return (
    <div className={styles['contactForm']}>
      <form
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}>

        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>

        <label>
          {options.name}
          <input
            type="text"
            name="name"
            className={styles['contactForm__inputField']}
            required
            onChange={handleChange}/>
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            className={styles['contactForm__inputField']}
            required
            onChange={handleChange}/>
        </label>
        <label>
          Message
          <textarea
            name="message"
            className={styles['contactForm__inputField']}
            rows="5"
            required
            onChange={handleChange} />
        </label>
        <button
          type="submit"
          className={styles['contactForm__button']}>Send</button>
        <input type="reset" value="Clear"
          className={styles['contactForm__button']} />
      </form>
    </div>
  );
};

export default ContactForm;
