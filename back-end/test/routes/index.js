describe('GET /', function() {
    it('returns a list of tasks', function() {
        request.get('/')
            .expect(200)
            .end(function(err, res) {
                console.log(err);
            });
        });
});



    // In this test it's expected a project list of three projects
    describe('GET /showProjects', function() {
        it('returns a list of projects', function() {
            request.get('/showProjects')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.lengthOf(3);
                    console.log(err);
                });
        });
    });

    // Testing the post project expecting status 200 of success
    describe('POST /postProject', function() {
        it('saves a new task', function() {
            request.post('/postProject')
                .send({
                    title: 'New Project Test',
                    description: 'Just a simple description',
                    skills: 'testing',
                    owner: 'apple',
                    budget: 30
                })
                .expect(200)
                .end(function(err, res) {
                    console.log(err);
                });
        });
    });

    // Testing the show bids expecting status 200 of success
    describe('POST /showBids', function() {
        it('displays all related bids', function() {
            request.post('/showBids')
                .send({
                    project: 'Launch a website on AWS'
                })
                .expect(200)
                .end(function(err, res) {
                    console.log(err);
                });
        });
    });

    // Check Login
    describe('POST /login', function() {
        it('checks login', function() {
            request.post('/login')
                .send({
                    username: 'mango',
                    password: 'secret'
                })
                .expect(200)
                .end(function(err, res) {
                    console.log(err);
                });
        });
    });

     // Check Login
     describe('POST /validateUsername', function() {
        it('displays all related bids', function() {
            request.post('/validateUsername')
                .send({
                    username: 'apple'
                })
                .expect(200)
                .end(function(err, res) {
                    console.log(err);
                });
        });
    });