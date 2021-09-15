
var EnvironmentStore = {
    getApiHost: function (name) {
        switch (name) {

            // place your baseURL according it's environment
            case 'test':
                return 'https://fcm.googleapis.com';
            case 'live':
                return 'https://fcm.googleapis.com';
            default:
                throw ("Unknown Environment.getApiHost: " + name)
        }
    }
}

export default EnvironmentStore;