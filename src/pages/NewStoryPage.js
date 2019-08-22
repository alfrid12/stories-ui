import React from 'react';

// Local imports
import Page from './Page';
import { submitNewStory } from '../services/StoriesApiService';
import StoryForm from '../components/StoryForm';

export default class NewStory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            story: {

                // Setting the below three fields serves no purpose other than preventing a console error
                title: '',
                description: '',
                acceptanceCriteria: '',

                // This defaults a new story to have a statusId of 1 (Ready for Refinement)
                statusId: 1
            }
        }

        this.updateStory = this.updateStory.bind(this);
        this.submitStory = this.submitStory.bind(this);
    }

    updateStory(story){
        this.setState({
            ...story
        });
    }

    submitStory() {
        console.log(this.state.story);
        const story = this.state.story;
        story.createdBy = 'n0350204';
        submitNewStory(story, response => console.log(response));
    }

    render() {
        return (
            <Page history={this.props.history}>
                <StoryForm story={this.state.story} updateStory={this.updateStory}
                        buttonText='Submit' buttonOnClick={this.submitStory} />
            </Page>
        );
    }
}