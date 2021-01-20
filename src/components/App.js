import React, { Component } from 'react';
import '../css/App.css';
import AddBooks from './AddBooks';
import SearchBooks from './SearchBooks';
import {ListItems} from './ListItems';
import { Link } from 'react-router-dom';

import { findIndex, noop, without } from 'lodash';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      cartItems:[],
      formDisplay: false,
      cartDisplay:false,
      orderBy: 'bookName',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0,
      cartIndex:0
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);   
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleCartDisplay = this.toggleCartDisplay.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.addcartItem = this.addcartItem.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  toggleCartDisplay() {
    this.setState({
      cartDisplay: !this.state.cartDisplay
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  searchApts(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts
    });
  }

  updateBook(name, value, id) {
    let tempApts = this.state.cartItems;
    let aptIndex = findIndex(this.state.cartItems, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      cartItems: tempApts
    });
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
   
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  addcartItem(apt) {
    let tempcartItems = this.state.cartItems;
    apt.aptId = this.state.cartItems;
    tempcartItems.unshift(apt);
    this.setState({
      cartItems: tempcartItems,
      cartIndex: this.state.cartIndex + 1
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    let tempcartItems = this.state.cartItems;
    tempApts = without(tempApts, apt);
    tempcartItems.unshift(apt);
    console.log(tempcartItems);
    this.setState({
      myAppointments: tempApts,
      cartItems: tempcartItems,
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts
        });
      });
  }

  render() {
    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }
let cartItemslist = this.state.cartItems
    filteredApts = filteredApts
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['bookName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['authorName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });
const viewCart = "View my Cart";
const viewbookstore = "View Book Store";
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddBooks
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment}
                />
                <button className="apt-addheading card-header bg-primary text-white cartview"
                  onClick={this.toggleCartDisplay} >
                   {this.state.cartDisplay?viewbookstore:viewCart}
                </button>
                { this.state.cartDisplay?
                <button className="apt-addheading card-header bg-primary text-white cartview"
                style={{marginLeft:'10px'}}
                onClick={this.toggleCartDisplay} >
                 <Link
      to={{
        pathname: "/view-myorder",
        state: cartItemslist,
      }}
      style={{ color: 'white'}}
    >Buy Now</Link>
              </button>:null 
                }
                
                <SearchBooks
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                {this.state.cartDisplay? 
                <ListItems
                  appointments={cartItemslist}                 
                  addcartItem={this.addcartItem}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                  updateBook={this.updateBook}
                />:
                <ListItems
                appointments={filteredApts}
                addcartItem={this.addcartItem}
                deleteAppointment={this.deleteAppointment}
                updateInfo={this.updateInfo}
                updateBook={this.updateBook}
                isCart={true}
              />
  }
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


