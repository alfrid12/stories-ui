import React from 'react';
import Table from 'react-bootstrap/Table';

// Local files
import Page from './Page';

import StoriesApiService from '../services/StoriesApiService';

export default class StoryFinderPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            storyStatuses: []
        }
    }

    componentDidMount() {
        StoriesApiService.getAllStories(stories => this.setState({ stories }));
        StoriesApiService.getAllStoryStatuses(storyStatuses => this.setState({ storyStatuses }));
    }

    redirectToStorySummaryPage(story){
        const redirectUrl = '/stories/' + story.id;
        this.props.history.push(redirectUrl);
    }

    render() {
        const tableRows = this.state.stories.map(story => {
            return <tr key={story.id} onClick={() => this.redirectToStorySummaryPage(story)}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{story.statusName}</td>
                <td>{story.storyPoints}</td>
            </tr>;
        });

        return (
            <Page history={this.props.history}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Story Points</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </Table>
            </Page>
        );
    }
}