import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'


// Local imports
import StoryForm from '../components/StoryForm';
import StoriesApiService from '../services/StoriesApiService';

export default class StorySummaryPage extends React.Component {

    constructor(props) {
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
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    componentDidMount() {

        // Pull story name from URL
        const storyId = this.props.match.params.storyId;

        // Request corresponding story info from backend, save in state
        StoriesApiService.getStoryByIdForUser(storyId, 'n0350204', story => {
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

    toggleFavorite(shouldFavorite) {

        const newState = this.state;
        newState.story.isFavoritedByUser = shouldFavorite;

        this.setState(newState);

        if (shouldFavorite) {
            StoriesApiService.addFavorite(this.state.story.id, 'n0350204', this.props.refreshSidebar);
        } else {
            StoriesApiService.removeFavorite(this.state.story.id, 'n0350204', this.props.refreshSidebar);
        }
    }

    render() {

        const solidStarIcon = <FontAwesomeIcon icon={faStarSolid} onClick={() => this.toggleFavorite(false)}/>;
        const emptyStarIcon = <FontAwesomeIcon icon={faStarRegular} onClick={() => this.toggleFavorite(true)}/>;

        return (
            <div>
                <div style={{position: 'relative'}}>
                    <div style={{display: 'inline-block'}}>

                        {/* I'm doing this because putting an empty <h2> as the false condition of this ternary operator 
                        causes everything to shift a little bit on page load. Visible when repeatedly clicking the sidebar 
                        link for a story */}
                        {this.state.story.id ? <h2>{this.state.story.id}</h2> : <h2 style={{ color: '#e8edf0' }}>_</h2>}
                    </div>
                    
                    <div style={{display: 'inline-block', float: 'right'}}>

                        {/* This ternary operator adds a filled-in star icon if this story 
                            has been favorited by the currently logged-in user, or an empty star if not */}
                        {this.state.story.isFavoritedByUser ? solidStarIcon : emptyStarIcon}
                    </div>
                </div>
                
                <StoryForm story={this.state.story} sprints={this.state.sprints} updateStory={this.updateStoryInState}
                    buttonText='Save' buttonOnClick={this.saveStory} />
            </div>
            
        );
    }
}
