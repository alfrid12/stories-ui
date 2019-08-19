import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import DateTimePicker from 'react-datetime-picker';

// Local files
import Page from './Page';
import DropdownMenu from '../components/DropdownMenu';
import { getAllTeams, submitNewSprint } from '../services/BackendService';

export default class NewSprintPage extends React.Component {

    constructor(props){
        super(props);

        let twoWeeksAheadDate = new Date();
        twoWeeksAheadDate.setDate(twoWeeksAheadDate.getDate() + 14);

        this.state = {
            teams: [],
            newSprint: {
                name: '',
                startTimestamp: new Date(),
                endTimestamp: twoWeeksAheadDate,
                teamId: undefined
            }
        }

        this.updateSprintField = this.updateSprintField.bind(this);
        this.submitSprint = this.submitSprint.bind(this);
    }

    componentDidMount() {
        getAllTeams(teams => this.setState({ teams }));
    }

    updateSprintField(field, value){
        const newSprint = this.state.newSprint;
        newSprint[field] = value;
        this.setState({ newSprint });
    }

    convertDateToUnixTimestamp(date){
        return (date.getTime() / 1000).toFixed(0);
    }

    submitSprint(){
        const newSprint = this.state.newSprint;
        newSprint.startTimestamp = this.convertDateToUnixTimestamp(newSprint.startTimestamp);
        newSprint.endTimestamp = this.convertDateToUnixTimestamp(newSprint.endTimestamp);
        submitNewSprint(this.state.newSprint, response => console.log(response));
    }

    render() {
        return (
            <Page history={this.props.history}>
                <Form>
                    <h2>Create a new sprint</h2>
                    <br/>

                    <Form.Group controlId="sprintName">
                        <Form.Label>Sprint Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter sprint name"
                            onChange={event => this.updateSprintField('name', event.target.value)}
                            value={this.state.newSprint.name} />
                    </Form.Group>

                    {/* Teams dropdown menu */}
                    <DropdownMenu entities={this.state.teams} placeholder='Select a Team' label='Team'
                        onChange={event => this.updateSprintField('teamId', event)}
                        selectedEntityId={this.state.newSprint.teamId} />
                    <br />

                    {/* Sprint start date date-time picker */}
                    <h4>Sprint start date</h4>
                    <DateTimePicker value={this.state.newSprint.startTimestamp}
                        onChange={newDate => this.updateSprintField('startTimestamp', newDate)} />

                    {/* Sprint end date date-time picker */}
                    <h4>Sprint end date</h4>
                    <DateTimePicker value={this.state.newSprint.endTimestamp}
                        onChange={newDate => this.updateSprintField('endTimestamp', newDate)} />



                    <p>INPUT FIELD FOR LENGTH OF SPRINT</p>
                    {/** User can use either end date datepicker or length of sprint field
                                - last one updated updates end of sprint */}
                    <br />

                    <h2>Recurring sprint form</h2>


                    <Button variant="primary" onClick={this.submitSprint}>Submit</Button>
                </Form>


                {/*
                One enclosing form (?)
                Radio button for one vs multiple sprints

                USER IS SELECTING SPRINT LENGTH:
                    - User inputs number of days OR weeks
                    - User selects end time

                USER IS SELECTING END DATE/TIME:
                    - Datepicker for date
                    - Clock for time


                    - Create individual sprint
                        - Select team ID
                        - Start date and end date OR length of sprint
                        - Start time
                        - End time
                    - Create recurring sprints
                        - Select team ID
                        - Start date
                        - Length of sprint
                        - Number of sprints
                        - Start time
                        - End time

                
                */}
            </Page>
        );
    }
}