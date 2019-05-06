import React, { Component } from 'react';
import ESI from '../ESI';
import { Image, Table, Jumbotron } from 'react-bootstrap';
import './CharacterDetail.css';

class CharacterDetail extends Component {
  constructor() {
    super();
    this.state = { 
      character: {},
      race: {},
      bloodline: {},
      ancestry: {},
      corporation: {},
      portraits: {},
      metaData: {},
      locations: [ { date_issued: '', info: { end_location_name: '' } }]
    };
  }

  async componentDidMount() {
    let characterId = this.props.match.params.id;
    let character = await ESI.getCharacter(characterId);
    let races = await ESI.getRaces();
    let race = races.find( (element) => { 
        return element.race_id === character.race_id; 
      });
    let bloodlines = await ESI.getBloodlines();
    let bloodline = bloodlines.find( (element) => { 
        return element.bloodline_id === character.bloodline_id; 
      });
    let ancestries = await ESI.getAncestries();
    let ancestry = ancestries.find( (element) => { 
        return element.id === character.ancestry_id; 
      });
    let corporation = await ESI.getCorporation(character.corporation_id);
    let portraits = await ESI.getPortraits(characterId);

    let metaData = await ESI.getCharacterMetaData(characterId);
    if (metaData === undefined) {
      metaData = {
        alts: 'Unknown',
        last_seen_location: 'Unknown',
        bounty: '0',
        ship_types: 'Unknown'
      }
    }

    let locations = await ESI.getCharacterLocations(characterId);

    this.setState({ character, race, bloodline, ancestry, corporation, portraits, metaData, locations });
  }

  render() {
    let locations = this.state.locations.map(
      (location,index) =>  
        <tr key={index}>
          <td>{ location.date_issued }</td>
          <td>{ location.info.end_location_name }</td>
        </tr>
      )

      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Birthdate</th>
                <th>Security Status</th>
                <th>Corporation</th>
                <th>Alts</th>
                <th>Last Seen</th>
                <th>Bounty</th>
                <th>Ship Types</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ this.state.character.name }</td>
                <td>{ this.state.character.gender }</td>
                <td>{ this.state.character.birthday }</td>
                <td>{ this.state.character.security_status }</td>
                <td>{ this.state.corporation.name }</td>
                <td>{ this.state.metaData.alts }</td>
                <td>{ this.state.metaData.last_seen_location }</td>
                <td>{ this.state.metaData.bounty }</td>
                <td>{ this.state.metaData.ship_types }</td>
              </tr>
            </tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              { locations }
            </tbody>
          </Table>


          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><Image src={this.state.portraits.px256x256} /></td>
                <td>
                  <Jumbotron id='my_jumbotron'>
                    <h4>{ this.state.race.name }</h4>
                    <p>{ this.state.race.description }</p>
                    <p>{ this.state.bloodline.description }</p>
                    <h4>{ this.state.ancestry.name }</h4>
                    <p>{ this.state.ancestry.description }</p>
                  </Jumbotron>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
  }
}

export default CharacterDetail;
