import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';


const Result =() => 
{
  return(
    <p>Mesazhi është dërguar me sukses! </p>
  );
};
function kontakti (props) {
    const [result, showResult] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_l9zxy8q', e.target, 'Y1d226W-9ayyZtGET')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      showResult(true);
  };
  return (
      <div>
      <div id="ksection1" className="d-flex justify-content-center">
        <div className="kontakti mt-5">
          <h1 className="text-center mt-4">Kontakti</h1>
          <hr />
          <p className="text-center m-4">
            A keni ndonjë pyetje? Ju lutemi mos hezitoni të na kontaktoni drejtpërdrejt. Ekipi ynë do të kthehet tek ju
            brenda pak orësh për tju ndihmuar.
          </p>

          <div className="row m-5">
            <div className="col-md-9 mb-md-0 mb-5">
              <form id="contact-form" name="contact-form" onSubmit={sendEmail}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={result.name}
                        required
                      />
                      <label htmlFor="name">Emri</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        className="form-control"
                        value={result.surname}
                        required
                      />
                      <label htmlFor="surname">Mbiemri</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={result.email}
                        required
                      />
                      <label htmlFor="subject">Email</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        className="form-control md-textarea"
                        value={result.message}
                        required
                      ></textarea>
                      <label htmlFor="message">Mesazhi</label>
                    </div>
                  </div>
                </div>
                <div className="text-center text-md-left">
                  <button type="submit" className="btn btn-primary" onClick={SubmitEvent}>
                    Dërgo
                  </button>
                  <div className='row'>{result ? <Result />:null}</div>
                </div>
              </form>
              <div className="status"></div>
            </div>
            <div className="col-md-3 text-center ">
              <ul className="list-unstyled mb-0">
                <li>
                  <FaMapMarkerAlt className="fa-2x mt-8" />
                  <p>Rruga Tepelena, 30000, Pejë</p>
                </li>
                <li>
                  <FaPhone className="fa-2x mt-2" />
                  <p>+383 49-666-777</p>
                </li>
                <li>
                  <FaEnvelope className="fa-2x mt-2" />
                  <p>gjimnaziinfo@bedripejani.net</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 export default kontakti;