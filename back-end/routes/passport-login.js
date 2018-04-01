var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport-login');
        let action = 'login';
        kafka.make_request('Admission',{"action": action, "username":username,"password":password}, function(err,results){
            console.log('In Kafka: %o', results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(
                        null,
                        {
                            username,
                            password
                        }
                    );
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
};
