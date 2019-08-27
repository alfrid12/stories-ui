import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import StorySummaryPage from './pages/StorySummaryPage';
import HomePage from './pages/HomePage';
import NewStoryPage from './pages/NewStoryPage';
import StoryFinderPage from './pages/StoryFinderPage';
import NewSprintPage from './pages/NewSprintPage';
import StoriesApiService from './services/StoriesApiService';

import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';

import { withRouter } from "react-router";


import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: 'n0350204',
      showSidebar: true,
      showToast: true,
      sidebarData: {
        favorites: [],
        createdByMeStories: [],
        assignedToMeStories: []
      }
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  getStoriesByAssigneeIdPromise() {
    return new Promise((resolve, reject) => {
      StoriesApiService.getStoriesByAssigneeId(this.state.user, stories => resolve(stories));
    });
  }

  getStoriesByCreatorIdPromise() {
    return new Promise((resolve, reject) => {
      StoriesApiService.getStoriesByCreatorId(this.state.user, stories => resolve(stories));
    });
  }

  getFavoritesByUserIdPromise() {
    return new Promise((resolve, reject) => {
      StoriesApiService.getFavoritesByUserId(this.state.user, favorites => resolve(favorites));
    });
  }

  componentDidMount() {

    Promise.all([this.getStoriesByCreatorIdPromise(), this.getStoriesByAssigneeIdPromise(), this.getFavoritesByUserIdPromise()]).then(values => {
      const [createdByMeStories, assignedToMeStories, favorites] = values;

      this.setState({
        ...this.state,
        sidebarData: {
          favorites,
          createdByMeStories,
          assignedToMeStories
        }
      });
    });
  }

  render() {
    return (
      <div className='main-container'>
        <NavBar toggleSidebar={this.toggleSidebar} showSidebar={this.state.showSidebar} />

        {this.state.showSidebar && <div className='sidebar-container inline-container'>
          <Sidebar sidebarData={this.state.sidebarData} />
        </div>}
        <div className='central-content-container inline-container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/stories' component={StoryFinderPage} />
            <Route exact path='/stories/new' component={NewStoryPage} />

            {/* This route is different because when going in between Story Summary Pages
                for two different stories, React Router won't remount the component, so  */}
            <Route path='/stories/:storyId' component={withRouter(StorySummaryPage)} />

            {/* This kinda works too */}
            {/* <Route path='/stories/:storyId' render={props => {
              return <StorySummaryPage match={props.match} key={ props.match.params.storyId } />;
            }} /> */}

            <Route path='/sprints/new' component={NewSprintPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
