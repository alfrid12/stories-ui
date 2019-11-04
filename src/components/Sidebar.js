import React from 'react';
import { withRouter } from "react-router";
import '../css/Sidebar.css';

const Sidebar = props => {

    const redirectToUrl = url => {
        props.history.push(url);
    }

    const renderSidebarContent = () => {

        const renderedSidebarContent = [];

        // Check if necessary data is non-empty and in array form
        if (props.sidebarData && props.sidebarData.length) {

            // Iterate through each sidebar section
            props.sidebarData.forEach((sidebarSection, i) => {

                // Only display a sidebar section if it has at least one link
                if (sidebarSection.sidebarSectionLinks.length) {

                    renderedSidebarContent.push(
                        <div key={i}>
                            <b>{sidebarSection.sidebarSectionHeaderText}</b>

                            {sidebarSection.sidebarSectionLinks.map((link, j) => {
                                return <div className='link' key={j} onClick={() => redirectToUrl(link.url)}>{link.displayText}</div>;
                            })}
                        </div>
                    );
                }
            });
        }

        return renderedSidebarContent;
    }

    return (
        <div className='sidebar'>
            {renderSidebarContent()}
        </div>
    );
}

export default withRouter(Sidebar);