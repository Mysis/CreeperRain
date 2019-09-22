var system = server.registerSystem(0, 0);

var TweakData = {};
TweakData.spawnRange = 8;
TweakData.spawnHeight = 5;
TweakData.spawnTicks = 50;

var ticksSinceLastSpawn = 0;

var entityQuery;

system.initialize = function () {
    this.listenForEvent("minecraft:player_attacked_entity", (eventData) => this.OnPlayerAttackedEntity(eventData));

    this.registerEventData("creeperrain:custom_event", {});

    entityQuery = this.registerQuery();
}

system.update = function () {
    ticksSinceLastSpawn++;
    if (ticksSinceLastSpawn >= TweakData.spawnTicks) {
        let players = this.GetPlayers();
        for (let i = 0; i < players.length; i++) {
            let creeper = this.createEntity("entity", "minecraft:creeper");
            let creeperPosition = this.getComponent(creeper, "minecraft:position");
            let playerPosition = this.getComponent(players[i], "minecraft:position");
            creeperPosition.data.x = playerPosition.data.x + Math.random() * 2 * TweakData.spawnRange - TweakData.spawnRange;
            creeperPosition.data.z = playerPosition.data.z + Math.random() * 2 * TweakData.spawnRange - TweakData.spawnRange;
            creeperPosition.data.y = playerPosition.data.y + TweakData.spawnHeight;
            this.applyComponentChanges(creeper, creeperPosition);
        }
        this.DisplayChat("reset timer");
        ticksSinceLastSpawn = 0;
    }
}

system.DisplayChat = function (message) {
    let eventData = this.createEventData("minecraft:display_chat_event");
    eventData.data.message = message;
    this.broadcastEvent("minecraft:display_chat_event", eventData);
}

system.GetPlayers = function () {
    let entities = this.getEntitiesFromQuery(entityQuery);
    let players = [];
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].__identifier__ == "minecraft:player") {
            players.push(entities[i]);
        }
    }
    return players;
}