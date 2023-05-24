import '../assets/css/faqjaKryesore.css'

export default function faqjaKryesore(){
    return(
        
        <div>
            <div id="section1" >
                <div className="image">
                    <img src="./src/assets/images/studentat.jpg" className="gjimnaziImg" alt="Gjimnazi Bedri Pejani" />
                    <div className="overlay"></div>
                </div>
                <div className="teksti">
                    <h2>Gjimnazi "Bedri Pejani"</h2>
                    <h4>Edukimii per te gjithë!</h4>
                </div>
            </div>
            <br/>

            <div id="section2">
                <div className="content1">
                    <h3 className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempore illum provident</h3>
                </div>
                <div className="content2 d-flex flex-wrap justify-content-center">
                    <div className="img1" >
                        <img  src="./src/assets/images/logo.png" alt="logo" />
                    </div>
                    <div className="img2">
                        <img  src="./src/assets/images/gjimnazi.jpg" alt="Gjimnazi Bedri Pejani" />
                    </div>
                </div>
            </div>

            <div id="section3" className=' d-flex flex-wrap justify-content-center align-items-center fs-4 '>
                <div className="trofeu m-3">
                    <p>20000</p>
                    <p>Student te diplomuar</p>
                </div>
                <div className="trofeu m-3">
                    <p>20000</p>
                    <p>Student Aktiv</p>
                </div>
                <div className="trofeu m-3">
                    <p>20000</p>
                    <p>Mesimdhenes</p>
                </div>
                <div className="trofeu m-3">
                    <p>200</p>
                    <p>Trofe ne gara nderkombatre</p>
                </div>
                <div className="trofeu m-3">
                    <p>300</p>
                    <p>Trofe ne gara kombetare</p>
                </div>
                <div className="trofeu m-3">
                    <p>Nga 1950</p>
                    <p>Duke shkruar histori</p>
                </div>
            </div>

            <div id="section4">
                <div className="content1">
                    <h3 className='fs-1 m-3'><b>Drejtimet</b></h3>
                    <hr/>
                </div>
                <div className="content2 d-flex flex-wrap justify-content-center align-items-center">
                    
                    <div className="w-25 m-5 card1 d-flex flex-column flex-wrap align-items-center bg-primary my-5 mx-10 rounded">
                        <img className='w-100 rounded' src="./src/assets/images/drejtimi1.jpg" alt="" />
                        <h2>Shkenca Natyrore</h2>                     
                    </div>
                    <div className="w-25 m-5 card1 d-flex flex-column flex-wrap align-items-center bg-primary my-5 mx-10 rounded">
                    <img className='w-100 rounded' src="./src/assets/images/drejtimi2.jpg" alt="" />
                        <h2>Shkenca Shoqerore</h2>      
                    </div>
                </div>
            </div>

            <div id="section5">
            <iframe className='w-100 h-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46941.854190167585!2d20.237740462774116!3d42.66419733399847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1352fc4a6b6d251b%3A0x8c076f05120c5c62!2sHigh%20School%20%22Bedri%20Pejani%22!5e0!3m2!1sen!2s!4v1682717985983!5m2!1sen!2s"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}