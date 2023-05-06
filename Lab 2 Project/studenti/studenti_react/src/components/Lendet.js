import '../assets/css/lendet.css'
export default function Lendet(){
    return(
        <div>
            <div id="lendetContent1" className="d-flex flex-row flex-wrap justify-content-center align-items-center p-5">
                <div id="list1" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 1</h1>
                    <ol>
                        <li><a>Lenda 1</a></li>
                        <li><a>Lenda 1</a></li>
                    </ol>
                </div>
                <div id="list2" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 2</h1>
                    <ol>
                        <li><a>Lenda 1</a></li>
                        <li><a>Lenda 1</a></li>
                    </ol>
                </div>
                <div id="list3" className="d-flex flex-wrap flex-column m-5">
                    <h1 className="border-bottom">VITI 3</h1>
                    <ol>
                        <li><a>Lenda 1</a></li>
                        <li><a>Lenda 1</a></li>
                    </ol>
                </div>
            </div>
        </div>
    )
}