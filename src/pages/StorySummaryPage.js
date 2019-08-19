import React from 'react';

// Local imports
import Page from './Page';
import { saveStory, getStoryByStoryName, getSprintsByTeamAbbr } from '../services/BackendService';
import StoryForm from '../components/StoryForm';

export default class StorySummaryPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            story: {
                title: '',
                description: '',
                acceptanceCriteria: ''
            },
            sprints: []
        }

        this.getTeamAbbrFromStoryName = this.getTeamAbbrFromStoryName.bind(this);
        this.updateStory = this.updateStory.bind(this);
        this.saveStory = this.saveStory.bind(this);
    }

    componentDidMount(){
        // Pull story name from URL
        const storyName = this.props.match.params.storyName;

        // Request corresponding story info from backend, save in state
        getStoryByStoryName(storyName, story => {
            story.storyName = storyName;
            this.setState({ story });
        });

        // getSprintsByTeamAbbr()
        const teamAbbr = this.getTeamAbbrFromStoryName(storyName);
        getSprintsByTeamAbbr(teamAbbr, sprints => this.setState({ sprints }))
    }

    getTeamAbbrFromStoryName(storyName){
        const indexOfHyphen = storyName.indexOf('-');
        const teamAbbr = storyName.substring(0, indexOfHyphen);
        return teamAbbr;
    }

    updateStory(story) {
        this.setState({
            ...story
        });
    }

    saveStory() {
        //CHANGE ME
        saveStory(this.state.story, response => console.log(response));
    }

    render() {
        return (
            <Page history={this.props.history}>
                <StoryForm story={this.state.story} sprints={this.state.sprints} updateStory={this.updateStory}
                    buttonText='Save' buttonOnClick={this.saveStory} />
            </Page>
        );
    }     
}
