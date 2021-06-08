export const constants = {
    socketUrl: 'http://localhost:3000',
    // socketUrl: 'https://lf-socket-server.herokuapp.com/', 
    socketNamespaces: {
        room: 'room',
        lobby: 'lobby'
    },
    peerConfig: Object.values({
        id: undefined,
        config: { 
            // host: 'lf-peerjs-server.herokuapp.com',
            // secure: true,
            // path: '/'
            // port: 9000,
            // host: 'localhost',
            // path: '/'
        }
    }),
    pages: {
        lobby: '/pages/lobby',
        login: '/pages/login',
    },
    events: {
        USER_CONNECTED: 'userConnection',
        USER_DISCONNECTED: 'userDisconnection',

        JOIN_ROOM: 'joinRoom',
        LOBBY_UPDATED: 'lobbyUpdated',
        UPGRADE_USER_PERMISSION: 'upgradeUserPermission',

        SPEAK_REQUEST: 'speakRequest',
        SPEAK_ANSWER: 'speakAnswer'
    },
    firebaseConfig : {
        apiKey: "AIzaSyB7g71XkS8xzm7oinCOe60zZc34gGsf6vA",
        authDomain: "semanajs-expert-bd5e0.firebaseapp.com",
        projectId: "semanajs-expert-bd5e0",
        storageBucket: "semanajs-expert-bd5e0.appspot.com",
        messagingSenderId: "89181631699",
        appId: "1:89181631699:web:2d875aed57bbf7e9311026",
        measurementId: "G-HT8KS42PCB"
    },
    storageKey: "jsexpert:storage:user"
}