import React from 'react';

// Local imports
import Page from './Page';
import { saveStory, getStoryById } from '../services/StoriesApiService';
import StoryForm from '../components/StoryForm';

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

        this.updateStory = this.updateStory.bind(this);
        this.saveStory = this.saveStory.bind(this);
    }

    componentDidMount(){
        // Pull story name from URL
        const storyId = this.props.match.params.storyId;

        // Request corresponding story info from backend, save in state
        getStoryById(storyId, story => {
            this.setState({ story });
        });
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
