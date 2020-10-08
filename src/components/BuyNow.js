import React from 'react';
import {articalcontent} from '../Pages/Artical-Content';
import '../css/BuyNow.css';

export const BuyNow=({match}) =>{
    const name = match.params.name;
    const artical =  articalcontent.find(artical=>artical.bookName === name);
    if(!artical) return <h1>Artical does not exist!</h1>
    return (
    <div>
        <h1>Your Order</h1>
    <br/>
    <article>

  <div className="container">
    <div className="row">
      <div className="col-md-10 ">
        <div className="card">

          <div className="image">
            <img src="https://cdn3.iconfinder.com/data/icons/education-268/232/50-512.png" width="100%" height="100%"/>
          </div>

          <div className="text">
            
            <div className="fab" onClick={()=>alert('redirecting to payment Gateway')}>&#43;Pay Now</div>

            <h3>{artical.bookName}</h3>
            <p>{artical.aptNotes}</p>
            <p>Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis. Paisis, filhis, espiritis santis. Mé faiz elementum girarzis, nisi eros vermeio, in elementis mé pra quem é amistosis quis leo.</p>
             <h4>Price : {artical.price}</h4>
          </div>

        </div>
      </div>
    </div>
  </div>

</article>
    </div>
)
}