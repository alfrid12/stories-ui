import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import StorySummaryPage from './pages/StorySummaryPage';
import NewStoryPage from './pages/NewStoryPage';
import StoryFinderPage from './pages/StoryFinderPage';
import NewSprintPage from './pages/NewSprintPage';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';

import { withRouter } from "react-router";


import './App.css';
import SidebarService from './services/SidebarService';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: 'n0350204',
      showSidebar: true,
      showToast: true,
      sidebarData: {
        favorites: [],
        createdByMeStories: [],
        assignedToMeStories: []
      }
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.fetchAndDisplaySidebarData = this.fetchAndDisplaySidebarData.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  componentDidMount() {
    this.fetchAndDisplaySidebarData();
  }

  fetchAndDisplaySidebarData() {

    // Fetch sidebar data from Stories API
    SidebarService.fetchSidebarData(this.state.userId, (createdByMeStories, assignedToMeStories, favorites) => {

      // Process retrieved data into format suitable for Sidebar component
      const processedSidebarData = SidebarService.processSidebarData(createdByMeStories, assignedToMeStories, favorites);

      // Save processed data in component state for rendering
      this.setState({ sidebarData: processedSidebarData });
    });
  }

  render() {

    const ModifiedStorySummaryPage = withRouter(StorySummaryPage);

    return (
      <div className='main-container'>
        <NavBar toggleSidebar={this.toggleSidebar} showSidebar={this.state.showSidebar} />

        {this.state.showSidebar && <div className='sidebar-container inline-container'>
          <Sidebar sidebarData={this.state.sidebarData} />
        </div>}
        <div className='central-content-container inline-container'>
          <Switch>
            <Route exact path='/stories' component={StoryFinderPage} />
            <Route exact path='/stories/new' component={NewStoryPage} />

            {/* This route is different because when going in between Story Summary Pages for two 
                different stories, React Router won't remount the component, so we need to force it to. */}



            {/* <Route path='/stories/:storyId' component={withRouter(StorySummaryPage)} /> */}
            <Route path='/stories/:storyId' render={props => {
              return <ModifiedStorySummaryPage {...props} refreshSidebar={this.fetchAndDisplaySidebarData}/>;
            }}/>


            <Route path='/sprints/new' component={NewSprintPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
