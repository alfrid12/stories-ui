

const convertStoryIdToUrl = storyId => `/stories/${storyId}`;

const createSidebarLinkFromStoryId = storyId => {
    return {
        url: convertStoryIdToUrl(storyId),
        displayText: storyId
    }
}

const SidebarService = {
    processSidebarData: (createdByMeStories, assignedToMeStories, favorites) => {

        /** Some stories might have been created by the same person they're assigned to.
       * I'm going to remove those stories from createdByMe, so that they don't appear twice in the sidebar.
       * My assumption is that it's more important to see that a story is assigned to you than
       *  that it was created by you, in the case where both are true  */

        const newCreatedByMeStories = [];

        // Loop through both sets of stories; only add to newCreatedByMeStories if the story is not in assignedToMeStories
        createdByMeStories.forEach(createdByMeStory => {

            let storyIsAssignedToMe = false;

            assignedToMeStories.forEach(assignedToMeStory => {
                if (createdByMeStory.id === assignedToMeStory.id) storyIsAssignedToMe = true;
            });

            if (!storyIsAssignedToMe) newCreatedByMeStories.push(createdByMeStory);
        });

        createdByMeStories = newCreatedByMeStories;


        // const createdByMeLinks = convertStoriesToLinks(createdByMeStories);
        const createdByMeLinks = createdByMeStories.map(story => createSidebarLinkFromStoryId(story.id));
        const assignedToMeLinks = assignedToMeStories.map(story => createSidebarLinkFromStoryId(story.id));
        const favoriteLinks = favorites.map(favorite => createSidebarLinkFromStoryId(favorite.storyId));

        const processedSidebarData = [{
            sidebarSectionHeaderText: 'Created by me',
            sidebarSectionLinks: createdByMeLinks
        }, {
            sidebarSectionHeaderText: 'Assigned to me',
            sidebarSectionLinks: assignedToMeLinks
        }, {
            sidebarSectionHeaderText: 'Favorites',
            sidebarSectionLinks: favoriteLinks
        }];

        return processedSidebarData;
    }
}


export default SidebarService;