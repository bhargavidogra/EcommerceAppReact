import React from 'react'
import '../css/App.css';

export const MyOrder=(props)=> {
    console.log('props',props)

    let grand_total=0;
    // console.log(props.location.state);
    if(typeof props.location.state.price==='string'){
      grand_total=parseInt(props.location.state.price)
    }else {
    grand_total=props.location.state.reduce(function(tot, item) { 
      let val = item.price?parseInt(item.price):0;
      return tot + val
      },0);
    }
    let ob=props.location.state;
    // console.log(ob.length);


    const articleValue = ob.length===undefined?
    <>
    <tr data-testid="article" key={0}>
      <td data-testid="article-title">{props.location.state.aptId}</td>
  <td data-testid="article-upvotes">{props.location.state.bookName}</td>
      <td data-testid="article-date" > {props.location.state.price?props.location.state.price:'item unavailable'}</td>
    </tr>
    </>
    :
    ( props.location.state.map((article, index) => {
      return (
        <tr data-testid="article" key={index}>
          <td data-testid="article-title">{article.aptId}</td>
      <td data-testid="article-upvotes">{article.bookName}</td>
          <td data-testid="article-date" > {article.price?article.price:'item unavailable'}</td>
        </tr>
      );
    }));
  
    return (
      <>
        <div className="card w-50 mx-auto, App">
          <h4>Your Order</h4>
          <table>
            <thead>
              <tr>
                <th>Book Code</th>
                <th>Book Name</th>
                <th>Book Price</th>
              </tr>
            </thead>
            <tbody>{articleValue}</tbody>
            <tr>
            <th>Total</th>
            <td>{grand_total}</td>
            <td> <button className="apt-addheading card-header bg-primary text-white cartview"
             onClick={()=>alert('redirecting to payment Gateway')}>&#43;Pay Now</button> </td>
            </tr>
          </table>
        </div>
      </>
    );
}

