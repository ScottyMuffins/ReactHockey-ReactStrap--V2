import React from 'react';
import { Alert, Button, FormGroup, Label, InputGroup, Input } from 'reactstrap';

const RosterPicker = (props) => {

    const compare = function(a,b){
        if(a.person.fullName < b.person.fullName) return -1;
        if(a.person.fullName > b.person.fullName) return 1;
        return 0;
    }

    return (
        <FormGroup>
            {props.roster &&
                <div className='playerPicker__Wrapper'>
                    <Label for="playerSelect">Select a Player</Label>
                    <InputGroup>
                        <Input type="select" name="playerSelect" id='playerSelect'>
                            {props.roster && props.roster.sort(compare).map((player) => <option key={player.person.id} value={player.person.id}>{player.person.fullName}</option>)}
                        </Input>
                        <Button className='btn-submit' color='info' onClick={props.getPlayer}>Submit</Button>
                    </InputGroup>
                </div>
            }
            {props.error && 
                <Alert className='playerPicker__Warning' color='danger'>
                    {props.error}
                </Alert>
            }
        </FormGroup>
    );
}

export default RosterPicker;