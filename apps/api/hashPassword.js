const bcrypt = require('bcryptjs');
const plainPassword = '123456a'; // Replace with the password you want to hash

const saltRounds = 10; // Or 12 for more security
bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) throw err;
    bcrypt.hash(plainPassword, salt, function(err, hash) {
        if (err) throw err;
        console.log('Password:', plainPassword);
        console.log('Hashed Password:', hash);
    });
}); 