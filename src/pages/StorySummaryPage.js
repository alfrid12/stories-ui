import React from 'react';

// Local imports
import Page from './Page';
import StoryForm from '../components/StoryForm';

import StoriesApiService from '../services/StoriesApiService';

export default class StorySummaryPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            story: {
                title: '',
                notes: '',
                acceptanceCriteria: ''
            },
            sprints: []
        }

        this.updateStoryInState = this.updateStoryInState.bind(this);
        this.saveStory = this.saveStory.bind(this);
    }

    componentDidMount(){
        // Pull story name from URL
        const storyId = this.props.match.params.storyId;

        // Request corresponding story info from backend, save in state
        StoriesApiService.getStoryById(storyId, story => {
            this.setState({ story });
        });
    }

    updateStoryInState(story) {
        this.setState({
            ...story
        });
    }

    saveStory() {
        StoriesApiService.updateStory(this.state.story, response => console.log(response));
    }

    render() {
        return (
            <Page history={this.props.history}>
                <StoryForm story={this.state.story} sprints={this.state.sprints} updateStory={this.updateStoryInState}
                    buttonText='Save' buttonOnClick={this.saveStory} />
            </Page>
        );
    }     
}
