// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var kafka = require('./kafka/client');

// module.exports = function(passport) {
//     passport.use('login', new LocalStrategy(function(username , password, done) {
//         console.log('in passport-login');
//         let action = 'login';
//         kafka.make_request('Authentication',{"action": action, "username":username,"password":password}, function(err,results){
//             console.log('In Kafka: %o', results);
//             if(err){
//                 done(err,{});
//             }
//             else
//             {
//                 if(results.code == 200){
//                     console.log(results)
//                     done(
//                         null,
//                         {
//                             username,
//                             password
//                         }
//                     );
//                 }
//                 else {
//                     done(null,false);
//                 }
//             }
//         });
//     }));
// };

//------------------------------------------------ new-login -----------------------------------------//

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in latest passport-login');
        let action = 'login';
        kafka.make_request('Authentication',{"action": action, "username":username,"password":password}, function(err,results){
            console.log('In Kafka: %o', results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    console.log(`LOGIN results.user: ${JSON.stringify(results.user._id)}`)
                    const user_id = results.user._id;
                    done(null, results.user);
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
    
    passport.serializeUser((user_id, done) => {
        console.log('Passport Serializing by Rick');
        done(null, user_id);
      });
      
      passport.deserializeUser((id, done) => {
        kafka.make_request('Authentication',{"action": 'persisted_login', "id":id}, function(err,results){
            console.log('Deserialize User by Rick: %o', results);
            done(err, results.value);
        });
      });

};
