const apiBaseUrl = 'http://localhost:5000';

// Public methods go here
const StoriesApiService = {
    getAllStories: callback => {
        fetch(apiBaseUrl + '/stories').then(response => {
            response.json().then(callback);
        }).catch(handleError);
    },

    getAllStoryStatuses: callback => {
        performGetRequest(apiBaseUrl + '/statuses', callback);
    },

    getStoriesByTeamId: (teamId, callback) => {
        performGetRequest(apiBaseUrl + '/stories?teamId=' + teamId, callback);
    },

    getStoriesByCreatorId: (creatorId, callback) => {
        performGetRequest(apiBaseUrl + '/stories?creatorId=' + creatorId, callback);
    },

    getStoriesByAssigneeId: (assigneeId, callback) => {
        performGetRequest(apiBaseUrl + '/stories?assigneeId=' + assigneeId, callback);
    },

    getStoryById: (storyId, callback) => {
        performGetRequest(`${apiBaseUrl}/stories/${storyId}`, callback);
    },

    getStoryByIdForUser: (storyId, userId, callback) => {
        performGetRequest(`${apiBaseUrl}/stories/${storyId}?userId=${userId}`, callback);
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
    },

    getFavoritesByUserId: (userId, callback) => {
        performGetRequest(apiBaseUrl + `/favorites/${userId}`, callback);
    },

    addFavorite: (storyId, userId, callback) => {
        performPostRequest(`${apiBaseUrl}/favorites`, {storyId, userId}, callback);
    },

    removeFavorite: (storyId, userId, callback) => {
        performDeleteRequest(`${apiBaseUrl}/favorites?storyId=${storyId}&userId=${userId}`, callback);
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

const performDeleteRequest = (url, callback) => {
    fetch(url, {
        method: 'DELETE'
    }).then(response => {
        response.json().then(callback);
    }).catch(handleError);
}

const handleError = error => console.log(error);

export default StoriesApiService;