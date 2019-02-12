import React from 'react';
import { Alert, Button, FormGroup, Label, InputGroup, Input } from 'reactstrap';

const TeamPicker = (props) => {

    const compare = function(a,b){
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
    }

    return (
        <FormGroup>
            {props.teams && 
                <div className='teamPicker__Wrapper'>
                    <Label for="teamSelect">Select an NHL Team</Label>
                    <InputGroup>
                        <Input type="select" name="teamSelect" id='teamSelect'>
                            {props.teams.sort(compare).map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                        </Input>
                        <Button className='btn-submit' color='info' onClick={props.getRoster}>Submit</Button>
                    </InputGroup>
                </div>
            }
            {props.error && 
                <Alert className='teamPicker__Warning' color='danger'>
                    {props.error}
                </Alert>
            }
        </FormGroup>
    );
}

export default TeamPicker;