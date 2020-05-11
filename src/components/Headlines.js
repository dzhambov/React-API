import React from 'react';
// We need to import connect from React Redux.
import { connect } from 'react-redux';
// We also need to import our ApiCall as well.
import { makeApiCall } from './../actions';


class Headlines extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   error: null,
    //   isLoaded: false,
    //   headlines: []
    // };
  }

  // makeApiCall = () => {
  //   fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
  //     .then(response => response.json())
  //     .then(
  //       (jsonifiedResponse) => {
  //         this.setState({
  //           isLoaded: true,
  //           headlines: jsonifiedResponse.results
  //         });
  //       })
  //       .catch((error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       });
  // }

  componentDidMount() {
    // Now we'll use dispatch() to make our API call.
    const { dispatch } = this.props;
    dispatch(makeApiCall());
  }
  
  render() {
    // We deconstruct the mapped Redux properties from this.props.
    const { error, isLoading, headlines } = this.props;
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) =>
              <li key={index}>
                <h3>{headline.title}</h3>
                <p>{headline.abstract}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}

// We'll also need to add mapStateToProps() as well.

const mapStateToProps = state => {
  return {
    headlines: state.headlines,
    isLoading: state.isLoading,
    error: state.error
  }
}

export default connect(mapStateToProps)(Headlines);