import React from 'react';
import { withRouter } from "react-router";
import '../css/Sidebar.css';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sidebarSections: [{
                headerText: 'Favorites',
                links: [{
                    text: 'Favorite 1',
                    url: '/asdf'
                }, {
                    text: 'Favorite 2',
                    url: '/fdsa'
                }]
            }, {
                headerText: 'Created by Me',
                links: []
            }, {
                headerText: 'Assigned to Me',
                links: [{
                    text: 'ABF-1',
                    url: '/stories/ABF-1'
                }, {
                    text: 'My Story 2',
                    url: '/bb'
                }, {
                    text: 'My Story 3',
                    url: '/cc'
                }]
            }]
        }

        this.redirectToUrl = this.redirectToUrl.bind(this);
        this.renderSidebarContent = this.renderSidebarContent.bind(this);
    }

    redirectToUrl(url) {
        this.props.history.push(url);
    }

    renderSidebarContent() {
        const createdByMeStories = this.props.sidebarData.createdByMeStories;
        const assignedToMeStories = this.props.sidebarData.assignedToMeStories;
        

        /** Some stories might have been created by the same person they're assigned to.
       * I'm going to remove those stories from createdByMe, so that they don't appear twice in the sidebar.
       * My assumption is that it's more important to see that a story is assigned to you than
       *  that it was created by you, in the case where both are true  */
        const newCreatedByMeStories = [];

        // Loop through both sets of stories; only add to newCreatedByMeStories if the story is not in assignedToMeStories
        createdByMeStories.forEach(createdByMeStory => {

            let isDuplicateStory = false;

            assignedToMeStories.forEach(assignedToMeStory => {
                if (assignedToMeStory.id === createdByMeStory.id) {
                    isDuplicateStory = true;
                }
            });

            if (!isDuplicateStory) {
                newCreatedByMeStories.push(createdByMeStory);
            }
        });

        const createdByMeLinks = this.convertStoriesToLinks(newCreatedByMeStories);
        const assignedToMeLinks = this.convertStoriesToLinks(assignedToMeStories);

        return (
            <div>
                {this.renderSidebarSection('Favorites', this.props.sidebarData.favorites)}
                {this.renderSidebarSection('Created by me', createdByMeLinks)}
                {this.renderSidebarSection('Assigned to me', assignedToMeLinks)}
            </div>
        );
    }

    renderSidebarSection(headerText, links) {
        const linkStyles = {
            marginLeft: '10%'
        }

        return (
            <div>
                <b>{headerText}</b>
                {links.map((link, i) => {
                    return <div style={linkStyles} key={i} onClick={() => this.redirectToUrl(link.url)}>{link.displayText}</div>;
                })}
            </div>
        )
    }

    convertStoriesToLinks(stories) {
        return stories.map(story => {
            return {
                url: `/stories/${story.id}`,
                displayText: story.id
            }
        });
    }

    render() {
        return (
            <div className='sidebar'>
                {this.renderSidebarContent()}
            </div>
        );
    }
}

export default withRouter(Sidebar);