import React, { Component } from 'react';
import TeamPicker from './FormComponents/TeamPicker'
import RosterPicker from './FormComponents/RosterPicker'
import StatsTable from './FormComponents/StatsTable'
import PlayerInfo from './FormComponents/PlayerInfo'

const nhlAPI_URL = 'https://statsapi.web.nhl.com/api/v1/';

class MainForm extends Component {

    state = {
        playerData: undefined,
        teamData: undefined,
        rosterData: undefined,
        careerData: undefined,
        error: undefined
    }

    componentDidMount = async (e) => {
        try{
            const playerAPI_URL = nhlAPI_URL+`teams`;
            const api_Call = await fetch(playerAPI_URL);
            const data = await api_Call.json();
        
            if(data.teams){
              this.setState({
                    teamData: data.teams,
                    rosterData: undefined,
                    playerData: undefined,
                    careerData: undefined
                }, () => console.log('setState has finished on componentDidMount and the component has re-rendered.'));
            }
            console.log(data.teams);
        }catch(error){
            this.setState({
                error: 'Team Data Error - Check Internet Connection or NHL API connection URL'
            }, () => console.log(this.state.error));
        }
    }

    getRoster = async (e) => {
        e.preventDefault();
        const teamList = document.getElementById('teamSelect');
        const id = teamList.options[teamList.selectedIndex].value;
        const playerAPI_URL = nhlAPI_URL+`teams/${id}/roster/`;
        const api_Call = await fetch(playerAPI_URL);
        const data = await api_Call.json();

        if(data.roster){
            this.setState({
                rosterData: data.roster,
                playerData:undefined,
                careerData: undefined
            },() => console.log('setState has finished on getRoster and the component has re-rendered.'));
        }else{
            this.setState({
                rosterData: undefined,
                playerData: undefined,
                careerData: undefined,
                error: 'Some specific error'
            },() => console.log(this.state.error));
        }
        console.log(data.roster);
    }

    getPlayerInfo = async (e) => {
        e.preventDefault();
        const rosterList = document.getElementById('playerSelect');
        const id = rosterList.options[rosterList.selectedIndex].value;
        const playerAPI_URL = nhlAPI_URL+`people/${id}`;
        const api_Call = await fetch (playerAPI_URL);
        const data = await api_Call.json();
        
        if(data){
          this.setState({
              playerData: data.people[0],
              error: undefined
            },() => console.log('setState has finished on getPlayerInfo and the component has re-rendered.'));
        }else{
          this.setState({
              playerData: undefined,
              error: undefined
            },() => console.log('setState has finished on getPlayerInfo with no data, so the component has re-rendered with empty player info.'));
        }
        this.getCareerData();
        console.log(data);
    }

    getCareerData = async () => {
        const rosterList = document.getElementById('playerSelect');
        const id = rosterList.options[rosterList.selectedIndex].value;
        const careerStats_APIURL = `${nhlAPI_URL}people/${id}//?expand=person.stats&stats=yearByYear`;
        const api_Call = await fetch (careerStats_APIURL);
        const data = await api_Call.json();

        if(data){
            this.setState({
                careerData: data.people[0].stats[0].splits
            },()=>console.log(data.people[0].stats[0].splits));
        }
    }

    render(){
        return (
            <div className='form__container'>
                 <TeamPicker 
                    teams={this.state.teamData}
                    getRoster={this.getRoster}
                    error={this.state.error}/>
                <RosterPicker 
                    roster={this.state.rosterData}
                    getPlayer={this.getPlayerInfo}/>
                <PlayerInfo
                    playerData = {this.state.playerData}
                    error = {this.state.error}/>
                <StatsTable 
                    playerData = {this.state.playerData}
                    careerData = {this.state.careerData}/>
            </div>
        );
    }
   
}

export default MainForm;