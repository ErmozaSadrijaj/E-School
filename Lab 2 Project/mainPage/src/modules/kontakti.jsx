import { Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Kontakti() {
  return (
    <div>
      <div id="ksection1" className="d-flex justify-content-center">
        <div className="kontakti mt-5">
          <h1 className="text-center mt-4">Kontakti</h1>
          <hr />
          <p className="text-center m-4">
            A keni ndonjë pyetje? Ju lutemi mos hezitoni të na kontaktoni drejtpërdrejt. Ekipi ynë do të kthehet tek ju brenda pak orësh për t'ju ndihmuar.
          </p>

          <div className="row m-5">
            <div className="col-md-9 mb-md-0 mb-5">
              <form id="contact-form" name="contact-form" action="mail.php" method="POST">
                <div className="row">
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">Emri</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="md-form mb-0">
                      <input type="text" id="email" name="email" className="form-control" />
                      <label htmlFor="email">Mbiemri</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input type="text" id="subject" name="subject" className="form-control" />
                      <label htmlFor="subject">Email</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                      <label htmlFor="message">Mesazhi</label>
                    </div>
                  </div>
                </div>
              </form>
              <div className="text-center text-md-left">
                <a className="btn btn-primary" onClick="submit">
                  <Button>Dërgo</Button>
                </a>
              </div>
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
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
