import '../assets/css/faqjaKryesore.css'

export default function faqjaKryesore(){
    return(
        
        <div>
            <div id="section1" >
                <div className="image text-center">
                    <img src="./src/assets/images/content.gif" className="gjimnaziImg" alt="Gjimnazi Bedri Pejani" />
                    <div className="overlay"></div>
                </div>
                
            </div>
            <br/>

            <div id="section2">
                <div className="content1 m-4">
                    <h3 className="text-center">"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio tempore illum provident"</h3>
                    <h2>-Lorem Ipsum</h2>
                </div>

                <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 mt-4 mb-5">
          <div className="card">
            <img src='./src/assets/images/gjimnazi.jpg' className="card-img-top" alt="gjimnazi" />
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mt-4 mb-5">
          <div className="card">
            <img src='./src/assets/images/gjimnazi.jpg' className="card-img-top" alt="gjimnazi" />
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mt-4 mb-5">
          <div className="card">
            <img src='./src/assets/images/gjimnazi.jpg' className="card-img-top" alt="gjimnazi" />
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mt-4 mb-5">
          <div className="card">
            <img src='./src/assets/images/gjimnazi.jpg' className="card-img-top" alt="gjimnazi" />
          </div>
        </div>
      </div>
    </div>         
            </div>

            <div id="section3" >
                <div className="image text-center">
                    <img src="./src/assets/images/table.gif" className="table" alt="table" />
                    <div className="overlay"></div>
                </div>
                
            </div>

            <div id="section4">
                <section className="light">
	<div className="container py-4">
		<h1 className="h1 text-center" id="pageHeaderTitle">Drejtimet</h1>

		<article className="postcard dark red">
			<a className="postcard__img_link">
				<img className="postcard__img" src="./src/assets/images/drejtimi1.jpg" alt="Image Title" />	
			</a>
			<div className="postcard__text">
				<h1 className="postcard__title"><a href="#">Shkenca Natyrore</a></h1>
				<div className="postcard__bar"></div>
				<div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
			</div>
		</article>


		<article className="postcard dark red">
			<a className="postcard__img_link" >
				<img className="postcard__img" src="./src/assets/images/drejtimi.jpg" alt="Image Title" />	
			</a>
			<div className="postcard__text">
				<h1 className="postcard__title"><a href="#">Shkenca Shoqërore</a></h1>
				<div className="postcard__bar"></div>
				<div className="postcard__preview-txt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!</div>
			</div>
		</article>

	</div>
</section>
</div>

            <div id="section5">
            <iframe className='w-100 h-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46941.854190167585!2d20.237740462774116!3d42.66419733399847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1352fc4a6b6d251b%3A0x8c076f05120c5c62!2sHigh%20School%20%22Bedri%20Pejani%22!5e0!3m2!1sen!2s!4v1682717985983!5m2!1sen!2s"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )
}