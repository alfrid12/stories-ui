import React from 'react';

// Local imports
import StoriesApiService from '../services/StoriesApiService';
import StoryForm from '../components/StoryForm';

export default class NewStory extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            story: {

                // Setting the below three fields serves no purpose other than preventing a console error
                title: '',
                notes: '',
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
        const story = this.state.story;
        story.createdBy = 'n0350204';
        StoriesApiService.createStory(story, response => console.log(response));
    }

    render() {
        return (
            <div>
                <h2>Create a New Story</h2>
                <StoryForm story={this.state.story} updateStory={this.updateStory}
                    buttonText='Submit' buttonOnClick={this.submitStory} />
            </div>
            
        );
    }
}