

module.exports = {
    init: function(config) {
        var firebase = require('firebase'); 



        var url = 'https://ancientfirefly-af546.firebaseio.com/';
        config.databaseURL = url; 
        //var app = firebase.initializeApp(config, url);

        var app = firebase.initializeApp({
          serviceAccount: {
            projectId: config.project_id,
            clientEmail: config.client_email,
            privateKey: config.private_key
          },
          databaseURL: url
        });

        var path = '../AncientFirefly-227bbd8dd573.json';

        // var app = firebase.initializeApp({
        //     serviceAccount: path,
        //     databaseURL: url 
        // });


        var rootRef = app.database(url).ref(); 
        return rootRef; 
    }


}; 