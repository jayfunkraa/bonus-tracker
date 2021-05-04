import React, { Component } from 'react';
import {Container} from 'react-bootstrap';
import BonusCalculator from '../BonusCalculator';
class Home extends Component {
    state = {  }
    render() { 
        return ( <Container>
            <BonusCalculator />
        </Container> );
    }
}
 
export default Home;