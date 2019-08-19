import React from 'react';
import '../css/Sidebar.css';

export default class Sidebar extends React.Component{

    constructor(props){
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

    renderSidebarContent(){

        const linkStyles = {
            marginLeft: '10%'
        }

        return this.state.sidebarSections.map((sidebarSection, i) => {
            return (
                <div key={i}>
                    {sidebarSection.headerText}
                    {sidebarSection.links.map((link, j) => {
                        return <div style={linkStyles} key={j} onClick={() => this.redirectToUrl(link.url)}>{link.text}</div>;
                    })}
                </div>
            );
        });
    }

    render(){
        return (
            <div className='sidebar'>
                {this.renderSidebarContent()}
            </div>
        );
    }
}