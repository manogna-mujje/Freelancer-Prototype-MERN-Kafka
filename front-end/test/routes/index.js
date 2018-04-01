
    // In this test it's expected a project list of three projects
    describe('GET /showProjects', function() {
        it('returns a list of projects', function(done) {
            request.get('/showProjects')
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.lengthOf(3);
                    done(err);
                });
        });
    });

    // Testing the post project expecting status 200 of success
    describe('POST /postProject', function() {
        it('saves a new task', function(done) {
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
                    done(err);
                });
        });
    });

    // Testing the show bids expecting status 200 of success
    describe('POST /showBids', function() {
        it('displays all related bids', function(done) {
            request.post('/showBids')
                .send({
                    project: 'Launch a website on AWS'
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
    });

    // Check Login
    describe('POST /login', function() {
        it('displays all related bids', function(done) {
            request.post('/login')
                .send({
                    username: 'mango',
                    password: 'secret'
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
    });

     // Check Login
     describe('POST /validateUsername', function() {
        it('displays all related bids', function(done) {
            request.post('/validateUsername')
                .send({
                    username: 'apple'
                })
                .expect(200)
                .end(function(err, res) {
                    done(err);
                });
        });
    });