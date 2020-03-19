const { Command } = require("@oclif/command")
const axios = require("axios")
const { cli } = require("cli-ux")
const netrc = require("netrc-rw");

const createNetrc = (response) => {
    netrc.addHost("bitproject.com").login = response.data["username"]
    netrc.write()
    netrc.host("bitproject.com").password = response.data["token"]
    netrc.write()
}

const saveNetrc = (response) => {
    if (response.data["token"]) {
        netrc.host("bitproject.com").login = response.data["username"]
        netrc.host("bitproject.com").password = response.data["token"]
        netrc.write()
    }
}

class LoginCommand extends Command {
    async run() {
        const url = "https://darlene-autograder.herokuapp.com/login"
        const username = await cli.prompt("Username")
        const password = await cli.prompt("Password", { type: "hide" })
        const login = { "username": username, "password": password }
        let response = null;

        try {
            response = await axios.post(url, login)
            saveNetrc(response)
        } catch (error) {
            error.code == "NOMACHINE" ? createNetrc(response) : console.error("Incorrect credentials. Please double check your username and password")
        }
    }
}

LoginCommand.description = `This command is used to login users into our LMS to submit files. 
This command is used to login users into our LMS to submit files. You must login in before submitting.`

module.exports = LoginCommand
