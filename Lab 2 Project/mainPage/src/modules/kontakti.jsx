import { Button } from "react-bootstrap";

export default function kontakti(){
    return(
        <div>
            <div id="ksection1" className="d-flex justify-content-center">
                <form className=" w-75 d-flex flex-row flex-wrap align-items-center justify-content-center m-custom p-5 bg-warning rounded">
                    <div className="inputs d-flex flex-column flex-wrap   w-50  ">
                        <label className="my-2" htmlFor="name" placeholder="Emri dhe Mbiemri juaj">Emri dhe Mbiemri:</label>
                        <input className="w-100" type="text" name="name" />
                        <label className="my-2" htmlFor="email">Email:</label>
                        <input className="w-100" type="email" required placeholder="Shkruani emailin tuaj..."/>
                        <label className="my-2" htmlFor="msg">Mesazhi:</label>
                        <textarea className="w-100" name="msg" placeholder="Shkruani mesazhin tuaj..."></textarea>
                        <Button className="mt-3">Dergo</Button>
                    </div>
                    <div className="kontaktet px-5 w-50 ">
                        <h3>Rruga Tepelena, 30000, Pejë</h3>
                        <h3>+383 49-666-777 // 038-600-600</h3>
                        <h3>gjimnaziinfo@bedripejani.net</h3>
                        <iframe className='w-75' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46941.854190167585!2d20.237740462774116!3d42.66419733399847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1352fc4a6b6d251b%3A0x8c076f05120c5c62!2sHigh%20School%20%22Bedri%20Pejani%22!5e0!3m2!1sen!2s!4v1682717985983!5m2!1sen!2s"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </form>
            </div>
        </div>
    )
}