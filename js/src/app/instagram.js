var feed = new Instafeed({
    get: 'user',
    // userId: 4336590343,
    userId: 590563274,
    clientId: 'e69dc5d429644873976199b5ee9ff8f5',
    accessToken: '590563274.e69dc5d.d24b4284737a4a68ab70183ceaa77de9',
    target: 'gallery',
    limit: 6,
    sortBy: 'most-liked',
    resolution: 'standard_resolution',
    after: function() {
      $("#gallery a").attr("target","_blank");
    }
});
feed.run();