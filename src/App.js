import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import StorySummaryPage from './pages/StorySummaryPage';
import HomePage from './pages/HomePage';
import NewStoryPage from './pages/NewStoryPage';
import StoryFinderPage from './pages/StoryFinderPage';
import NewSprintPage from './pages/NewSprintPage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/stories/find' component={StoryFinderPage} />
          <Route exact path='/stories/new' component={NewStoryPage} />
          <Route path='/stories/:storyId' component={StorySummaryPage} />
          <Route path='/sprints/new' component={NewSprintPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
