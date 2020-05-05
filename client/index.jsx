/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReviewList from './components/ReviewList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      displayed: [],
      sIndex: 0,
      eIndex: 4,
      shopReviews: [],
      prodReviews: [],
      len: 0,
      current: '',
      numProdRev: 0,
      avgShopRating: 0,
    }
    this.filterProductReviews = this.filterProductReviews.bind(this);
    this.filterShopReviews = this.filterShopReviews.bind(this);
    this.onNextReviews = this.onNextReviews.bind(this);
  }

  componentDidMount() {
    const uniqueID = window.location.pathname.substring(1,2);
    this.setState({
      current: uniqueID
    }, () => {
      this.getReviews();
    });

  }

  getReviews() {
    axios.get(`/reviews/${this.state.current}`)
      .then(res => {
        this.setState({
          reviews: res.data,
          shopReviews: res.data,
        })
      }).catch((err) => {
        console.log("There was an error fetching data");
      }).then(() => {
        this.getShopReviewCount();
      }).then(() => {
        this.filterProductReviews();
      }).then(() => {
        this.getAverageShopReview();
      }).then(() => {
        let slice = this.state.reviews.slice(0,4);
        this.setState({
          displayed: slice
        })
      })
  }

  getShopReviewCount () {
    const len = this.state.shopReviews.length;
    this.setState({
      len: len
    })
  }

  filterProductReviews() {
    const prodRevs = [];
    const allRevs = this.state.reviews;
    const curr = this.state.current;
    allRevs.forEach(rev => {
      if (rev.productID == curr) {
        prodRevs.push(rev);
      }
    });
    this.setState({
      reviews: prodRevs,
      numProdRev: prodRevs.length,
      displayed: prodRevs.slice(0,4),
      sIndex: 0,
      eIndex: 4,
      prodReviews: prodRevs
    })
  }

  filterShopReviews() {
    const shopRevs = this.state.shopReviews;
    this.setState({
      displayed: shopRevs.slice(0,4),
      sIndex: 0,
      eIndex: 4,
    })
  }

  getAverageShopReview() {
    const shopRevs = this.state.shopReviews;
    let total = 0;
    shopRevs.forEach((rev) => {
      total += rev.rating;
    })
    let avg = total/this.state.len;
    this.setState({
      avgShopRating: avg
    })
  }

  onNextReviews() {
    let allRevs = this.state.reviews;
    let start = this.state.eIndex;
    let end = this.state.eIndex + 4;
    console.log("this is start: ", start);
    console.log("this is end: ", end);
    // if(end > )
    const newSlice = allRevs.slice(start,end);
    if(end < this.state.prodReviews.length) {
      this.setState({
        sIndex: start,
        eIndex: end,
        displayed: newSlice,
      })
    } else {
      start ++;
      let end = this.state.prodReviews.length;
      this.setState({
        sIndex: start,
        eIndex: end,
        displayed: newSlice,
      })
    }
  }





  render() {
    return (<div>
      <h1>Review List Component</h1>
      <ReviewList
      reviews={this.state.displayed}
      current={this.state.current}
      total={this.state.len}
      shop={this.state.numProdRev}
      filterProductReviews={this.filterProductReviews}
      filterShopReviews={this.filterShopReviews}
      avg={this.state.avgShopRating}
      next={this.onNextReviews}
      />
    </div>)
  }

};

ReactDOM.render(<App />, document.getElementById('app'));
