import transporter from "#config/mailer.js"

export function sendWelcomeEmail(user, token){
    if(!user || !token) throw new Error('User or validation token missing')
    const messageToUser={
        from:process.env.EMAIL_SENDER,
        to: user.email,
        subject:'Welcome to todo App',
        html:`<h1>Welcome to our wonderful todoapplication </h1><br/><p>Here your validation token: <span style="font-weight:bold; color:red">${token}</span></p>`
    }
    return transporter.sendMail(messageToUser)
}