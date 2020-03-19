const { Command, flags } = require("@oclif/command")
const axios = require("axios")
const FormData = require("form-data")
const fs = require("fs");
const netrc = require("netrc-rw")

const validateFiles = (argv, file) => {
  fs.access("./" + argv[file], fs.F_OK, (err) => {
    if (err) {
      console.error(`${argv[file]} does not exist`)
      process.exit()
    }
  })
}

const validateUser = (formData) => {
  try {
    const username = netrc.host("bitproject.com").login
    const password = netrc.host("bitproject.com").password

    formData.append("username", username)
    formData.append("token", password)
  } catch (error) {
    error.code == "NOMACHINE" ? (
      console.error("You are not logged in. Run bit_autograder login to login"),
      process.exit()
    ) : console.error(error)
  }
}

class SubmitCommand extends Command {
  static strict = false

  async run() {
    const url = "https://darlene-autograder.herokuapp.com/uploader/cli"
    const { argv } = this.parse(SubmitCommand)
    const { flags } = this.parse(SubmitCommand)
    let formData = new FormData()

    validateUser(formData)
    formData.append("checkpoint_id", flags.checkpoint)
    formData.append("activity_id", flags.activity)

    for (const file in argv) {
      validateFiles(argv, file)
      formData.append(`${argv[file]}`, fs.createReadStream("./" + argv[file]))
    }

    const formHeaders = formData.getHeaders();
    axios.post(url, formData, {
      headers: {
        ...formHeaders,
      },
    })
    .then(response => console.log(response) )
    .catch(error => console.log(error.response.data.message))
  }
}

SubmitCommand.description = `This is the command to submit files to our autograder. 
The -c flag is used to indicate the checkpoint you are submitting to. The -a flag is used to indicate the activity that you are submitting to.
Right after that type in the files you want to send. After that the result should be displayed on the LMS and terminal.`

SubmitCommand.flags = {
  checkpoint: flags.integer({ char: "c", required: true, description: "ID of the checkpoint" }),
  activity: flags.integer({ char: "a", required: true, description: "ID of the activity" }),
}

module.exports = SubmitCommand
