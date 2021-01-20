import { isInteger } from 'lodash';
import React from 'react';
import { FaArrowCircleRight,FaCartPlus,FaBook } from 'react-icons/fa';
import {Link} from 'react-router-dom';

export const ListItems =(props)=>{

  let grand_total=0;
  console.log(props.appointments);
  grand_total=props.appointments.reduce(function(tot, item) { 
    return tot + parseInt(item.price)
    },0);
  console.log(grand_total);
    return (
      <div className="appointment-list item-list mb-3">
        {props.appointments.map(item => (
          <div className="pet-item col media py-3" key={item.aptId}>
            
            <div className="pet-info media-body">
          
              <div className="pet-head d-flex">
              <FaBook/>
                <span
                  className="pet-name"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e =>
                    props.updateInfo(
                      'bookName',
                      e.target.innerText,
                      item.aptId
                    )
                  }
                >
                  {item.aptId}--{item.bookName}
                </span>
                <span className="apt-date ml-auto">
                 
                </span>

                <div className="mr-3">
              <button
                className="pet-delete btn btn-sm btn-danger"
              >
                <FaArrowCircleRight />
                <Link 
                //  to={`/buynow/${item.bookName}`}
                to={{
                  pathname: `/buynow/${item.bookName}`,
                  state: item,
                }}
                > View Detail</Link>  
              </button>
              </div>
              <div className="mr-3">
                { props.isCart? 
                <button
                className="pet-delete btn btn-sm btn-info"
                onClick={() =>{ 
                  return props.deleteAppointment(item)}}
              >
                
                <FaCartPlus />
                Add To Cart
              </button>:
              null}
              
            </div>
              </div>

              <div className="owner-name">
                <span className="label-item">Author: </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e =>
                    props.updateInfo(
                      'authorName',
                      e.target.innerText,
                      item.aptId
                    )
                  }
                >
                  {item.authorName}
                </span>
              </div>
              <div
                className="apt-notes"
                contentEditable
                suppressContentEditableWarning
                onBlur={e =>
                  props.updateInfo(
                    'aptNotes',
                    e.target.innerText,
                    item.aptId
                  )
                }
              >
                {item.aptNotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}
