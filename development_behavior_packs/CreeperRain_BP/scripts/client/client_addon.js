var system = client.registerSystem(0, 0);

system.initialize = function () {
    this.listenForEvent("minecraft:client_entered_world", (eventData) => this.OnClientEnteredWorld(eventData));
    this.listenForEvent("creeperrain:custom_event", (eventData) => this.ClientEventFunction(eventData));
}

system.OnClientEnteredWorld = function (eventData) {
    let testData = this.createEventData("minecraft:display_chat_event");
    testData.data.message = "OnClientEnteredWorld";
    this.broadcastEvent("minecraft:display_chat_event", testData);
}

system.ClientEventFunction = function (eventData) {
    let testData = this.createEventData("minecraft:display_chat_event");
    testData.data.message = "ClientEventFunction";
    this.broadcastEvent("minecraft:display_chat_event", testData);
}