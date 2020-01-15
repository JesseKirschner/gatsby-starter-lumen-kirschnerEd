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
    console.log(e.target.value);
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    console.log(state);

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
          <input type="text" name="name" id="name" required onChange={handleChange}/>
        </label>
        <label>
          Email
        <input type="email" name="email" id="email" required onChange={handleChange}/>
        </label>
        <label>
          Message
        <textarea name="message" id="message" rows="5" required onChange={handleChange} />
        </label>
        <button type="submit">Send</button>
        <input type="reset" value="Clear" />
      </form>
    </div>
  );
};

export default ContactForm;
