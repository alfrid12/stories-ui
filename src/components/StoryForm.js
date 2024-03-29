import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Local files
import DropdownMenu from './DropdownMenu';
import StoriesApiService from '../services/StoriesApiService';
import '../css/StoryForm.css';

export default class StoryForm extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            storyStatuses: [],
            teams: [],
            sprints: [],
            parentStories: [],
            selectedSprintId: undefined,
            isSprintDropdownDisabled: true,
            isParentStoryDropdownDisabled: true,
            storyPointPossibilities: [0, 1, 2, 3, 5, 8, 13, 20, 40]
        }

        this.updateStoryField = this.updateStoryField.bind(this);
        this.updateTeamId = this.updateTeamId.bind(this);
    }

    componentDidMount() {
        StoriesApiService.getAllTeams(teams => this.setState({ teams }));
        StoriesApiService.getAllStoryStatuses(statuses => this.setState({ storyStatuses: statuses }));
    }

    updateStoryField = (field, value) => {

        if (this.props.story[field] !== value) {
            const story = this.props.story;
            story[field] = value;
            this.props.updateStory({ story });
        }
    };

    updateTeamId(newTeamId) {
        if (this.props.story.teamId !== newTeamId) {

            // Get all sprints and stories under the selected team from the backend
            StoriesApiService.getSprintsByTeamId(newTeamId, sprints => this.setState({ sprints }));
            StoriesApiService.getStoriesByTeamId(newTeamId, stories => this.setState({ parentStories: stories }));

            // Update story with new teamId
            const story = this.props.story;
            story.teamId = newTeamId;

            // Reset parent story ID to undefined, since different teams have different potential parent stories
            story.parentId = undefined;
            this.props.updateStory({ story });

            // Enable sprint and parent story dropdowns
            this.setState({
                isSprintDropdownDisabled: false,
                isParentStoryDropdownDisabled: false,
            });
        }
    }

    render(){
        const storyPointEntities = this.state.storyPointPossibilities.map(points => {
            return {
                id: points
            };
        });

        return (
            <div>                
                <Form>
                    <Form.Group controlId="storyTitle">
                        <Form.Label>Story Title</Form.Label>
                        <Form.Control type="text" className='input-text-box' placeholder="Enter title"
                            onChange={event => this.updateStoryField('title', event.target.value)}
                            value={this.props.story.title} />
                    </Form.Group>

                    <Form.Group controlId="storyAcceptanceCriteria">
                        <Form.Label>Acceptance Criteria</Form.Label>
                        <Form.Control as="textarea" rows="3" className='input-text-box'
                            placeholder="Enter acceptance criteria"
                            onChange={event => this.updateStoryField('acceptanceCriteria', event.target.value)}
                            value={this.props.story.acceptanceCriteria}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="storyNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control as="textarea" rows="3" className='input-text-box'
                            placeholder="Enter any notes here"
                            onChange={event => this.updateStoryField('notes', event.target.value)}
                            value={this.props.story.notes}>
                        </Form.Control>
                    </Form.Group>

                    <Row>
                        <Col>
                            {/* Teams dropdown menu */}
                            <DropdownMenu entities={this.state.teams} displayAttribute='name' placeholder='Select a Team' label='Team'
                                onChange={this.updateTeamId}
                                selectedEntityId={this.props.story.teamId} />
                            <br />
                        </Col>
                        <Col>
                            {/* Story Points dropdown menu */}
                            <DropdownMenu entities={storyPointEntities} displayAttribute='id' placeholder='Select Story Points' label='Story points'
                                onChange={event => this.updateStoryField('storyPoints', event)}
                                selectedEntityId={this.props.story.storyPoints} />
                            <br />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {/* Sprints dropdown menu */}
                            <DropdownMenu entities={this.state.sprints} displayAttribute='name' placeholder='Select a Sprint' label='Sprint'
                                onChange={event => this.updateStoryField('sprintId', event)}
                                disabled={this.state.isSprintDropdownDisabled}
                                selectedEntityId={this.props.story.sprintId} />
                            <br />
                        </Col>
                        <Col>
                            {/* Story Status dropdown menu */}
                            <DropdownMenu entities={this.state.storyStatuses} displayAttribute='name' placeholder='Select Status' label='Status'
                                onChange={event => this.updateStoryField('statusId', event)}
                                selectedEntityId={this.props.story.statusId ? this.props.story.statusId : 1} />
                            <br />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {/* Parent Stories dropdown menu */}
                            <DropdownMenu entities={this.state.parentStories} displayAttribute='id' placeholder='Select a Parent Story' label='Parent story'
                                onChange={event => this.updateStoryField('parentId', event)}
                                selectedEntityId={this.props.story.parentId}
                                disabled={this.state.isParentStoryDropdownDisabled} />
                        </Col>
                        <Col></Col>
                    </Row>
                    
                    <br /><br />
                    <Button variant="primary" style={{width: '20%'}} onClick={this.props.buttonOnClick}>{this.props.buttonText}</Button>
                </Form>
            </div>
        );
    }
}