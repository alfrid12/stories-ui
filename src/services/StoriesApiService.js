const backendBaseUrl = 'http://localhost:5000';

export const getAllStories = callback => {
    fetch(backendBaseUrl + '/stories').then(response => {
        response.json().then(callback);
    }).catch(handleError);
}

export const getAllTeams = callback => {
    performGet(backendBaseUrl + '/teams', callback);
}

export const getAllSprints = callback => {
    performGet(backendBaseUrl + '/sprints', callback);
}

export const getSprintsByTeamId = (teamId, callback) => {
    performGet(backendBaseUrl + '/sprints?teamId=' + teamId, callback);
}

export const getStoriesByTeam = (teamId, callback) => {
    performGet(backendBaseUrl + '/stories?teamId=' + teamId, callback);
}

export const getStoryById = (storyId, callback) => {
    performGet(backendBaseUrl + '/stories/' + storyId, callback);
}

export const submitNewStory = (story, callback) => {
    performPost(backendBaseUrl + '/stories/new', story, callback);
}

export const submitNewSprint = (sprint, callback) => {
    performPost(backendBaseUrl + '/sprints/new', sprint, callback);
}

export const saveStory = (story, callback) => {
    performPost(backendBaseUrl + '/stories/' + story.id, story, callback);
}

export const getAllStoryStatuses = callback => {
    performGet(backendBaseUrl + '/statuses', callback);
}


//////////////////////
// HELPER FUNCTIONS //
//////////////////////

const performGet = (url, callback) => {
    fetch(url).then(response => {
        response.json().then(callback);
    }).catch(handleError);
}

const performPost = (url, body, callback) => {
    fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then(callback).catch(handleError);
}

const handleError = error => console.log(error);
