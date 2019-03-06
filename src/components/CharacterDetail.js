import React, { Component } from 'react';
import ESI from '../ESI';

class CharacterDetail extends Component {
  constructor() {
    super();
    this.state = { 
      character: {},
      race: {},
      bloodline: {},
      ancestry: {},
      corporation: {},
      portraits: {}
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
    this.setState({ character, race, bloodline, ancestry, corporation, portraits });
  }

  render() {
      return (
        <div>
          <img alt='' src={this.state.portraits.px256x256}></img>
          <div>Character ID: {this.props.match.params.id}</div>
          <div>Name: { this.state.character.name }</div>
          <div>Gender: { this.state.character.gender }</div>
          <div>Birthday: { this.state.character.birthday }</div>
          <div>Security Status: { this.state.character.security_status }</div>
          <div>Corporation Name: { this.state.corporation.name }</div>
          <div>Race: { this.state.race.name } </div>
          <div>Race Description: { this.state.race.description } </div>
          <div>Bloodline: { this.state.bloodline.name } </div>
          <div>Bloodline Description: { this.state.bloodline.description } </div>
          <div>Ancestry: { this.state.ancestry.name } </div>
          <div>Ancestry Short Description: { this.state.ancestry.short_description } </div>
          <div>Ancestry Description: { this.state.ancestry.description } </div>
        </div>
      );
  }
}

export default CharacterDetail;
