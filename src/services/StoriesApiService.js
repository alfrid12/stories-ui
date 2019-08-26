const apiBaseUrl = 'http://localhost:5000';

const storiesApiService = {
    getAllStories: callback => {
        fetch(apiBaseUrl + '/stories').then(response => {
            response.json().then(callback);
        }).catch(handleError);
    },

    getAllStoryStatuses: callback => {
        performGetRequest(apiBaseUrl + '/statuses', callback);
    },

    getStoriesByTeam: (teamId, callback) => {
        performGetRequest(apiBaseUrl + '/stories?teamId=' + teamId, callback);
    },

    getStoryById: (storyId, callback) => {
        performGetRequest(apiBaseUrl + '/stories/' + storyId, callback);
    },

    createStory: (story, callback) => {
        performPostRequest(apiBaseUrl + '/stories', story, callback);
    },

    updateStory: (story, callback) => {
        performPostRequest(apiBaseUrl + '/stories/' + story.id, story, callback);
    },

    getAllTeams: callback => {
        performGetRequest(apiBaseUrl + '/teams', callback);
    },

    getAllSprints: callback => {
        performGetRequest(apiBaseUrl + '/sprints', callback);
    },

    getSprintsByTeamId: (teamId, callback) => {
        performGetRequest(apiBaseUrl + '/sprints?teamId=' + teamId, callback);
    },

    createSprint: (sprint, callback) => {
        performPostRequest(apiBaseUrl + '/sprints', sprint, callback);
    }
}
  

// //////////////////////
// // HELPER FUNCTIONS //
// //////////////////////

const performGetRequest = (url, callback) => {
    fetch(url).then(response => {
        response.json().then(callback);
    }).catch(handleError);
}

const performPostRequest = (url, body, callback) => {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(callback).catch(handleError);
}

const handleError = error => console.log(error);

export default storiesApiService;