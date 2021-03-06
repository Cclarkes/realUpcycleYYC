import React, {Component} from 'react';
import "antd/dist/antd.css";
import {Avatar, Button} from 'antd';
import axios from 'axios'
import Footing from './Footer.jsx'
import Ranking from './Rankings.jsx'
import UserRanking from './User_Rankings.jsx'

class Leaderboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wards: [],
      users: [],
      toggleButton: true,
      text: 'User Ranking'
    }
    this.toggleButton = this.toggleButton.bind(this);
    }

  componentDidMount() {
    axios.get('api/v1/wards')
      .then(wards => {
        this.setState({
          wards: wards.data
        })
      })
      .catch(error => console.log(error))

    axios.get('api/vi/users')
      .then(users => {
        this.setState({
          users: users.data
        })
      })
      .catch(error => console.log(error))
  }

  toggleButton(){
    this.setState({toggleButton: !this.state.toggleButton})
  }

  render() {
    return(
      <div className="leaderboard">
        <div className="logo-header">
          <h1 className="reg-header">Upcycle</h1>
        </div>
        {this.state.wards.map(ward => {
          if (ward.id === 1 && this.state.toggleButton === true) {
            return(
              <div className="top-ward">
                <Avatar id='leaderIcon' style={{ backgroundColor: '#66b9ea' }} size={150} icon="user" src="/avatars/50-1.png" alt="ward 5 councillor"/>
                <br/>
                <p className="leader-statement">
                Councillor George Cahal's Ward {this.state.wards[0].name} leads the city!</p>
                <div className="column-lead">
                  <p className="db-level">YOUR WARD: 1</p>
                  <p className="user-level">#5 out of 14</p>
                </div>
              </div>
            )
          } else if(ward.id === 1 && this.state.toggleButton === false) {
            return(
              <div className="top-ward">
                <center><Avatar style={{ backgroundColor: '#66b9ea' }} size={150} icon="user" src='/avatars/1.png' alt="user-pic"/></center>
                <br/>
                <p className="leader-statement"> The TOP Player is Hafiz!</p>
                <div className="column-lead">
                  <p className="db-level">YOUR RANK</p>
                  <p className="user-level">#12 out of 42</p>
                </div>
                </div>
            )
          }
        })
        }
      <Button 
        id="toggleButton"
        type='primary' 
        onClick={this.toggleButton}>{this.state.toggleButton ? 'User Ranking' : 'Ward Ranking'}
      </Button>
      {(this.state.toggleButton) ?
        <Ranking />
          :
        <UserRanking />
      }
      <Footing />
      </div>
    )
  }
}


export default Leaderboard;