
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;

    } catch (error) {
        console.log(error.message)

    }
}

//for send mail

const sendVerifyEmail = async (name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Note: Corrected the host to Gmail's SMTP
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'hussainmahmood952@gmail.com',
                pass: 'bxpa ghpf nfox dzxl'
            }
        });
        const mailOptions = {
            from: 'hussainmahmood952@gmail.com',
            to: email, // Passed email correctly
            subject: "for verification mail",
            html: '<p>Hi ' + name + ' ,please click here to <a href="http://localhost:4000/verify?id=' + user_id + '"> Verify </a> your mail. </p>'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email has been sent", info.response);
            }
        });

    } catch (error) {
        console.log(error.message);
    }
};



const loadRegister = async (req, res) => {
    try {
        res.render('registration');

    } catch (error) {
        console.log(error.message)
    };

}
const insertUser = async (req, res) => {
    try {
        const spassword = await securePassword(req.body.password)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            image: req.file.filename,
            password: spassword,
            is_admin: 0,
        })

        const userData = await user.save();

        if (userData) {
            sendVerifyEmail(req.body.name, req.body.email, userData._id);

            res.render('registration', { message: "your registration has been sucessfully,please verify your mail" })
        } else {
            res.render('registration', { message: "your registration has been failed" })
        }


    } catch (error) {
        console.log(error.message)

    }
}

const verifyMail = async (req, res) => {
    try {
        const updated = await User.updateOne({ _id: req.query.id }, { $set: { is_verified: 1 } })
        console.log(updated);
        res.render('email-verified')

    } catch (error) {
        console.log(error.message)

    }
}

module.exports = {
    loadRegister, insertUser, securePassword,verifyMail
}