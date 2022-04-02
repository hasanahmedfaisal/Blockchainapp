const execSync = require("child_process").execSync

const installDockerCommand = "sudo apt-get update && sudo apt-get install -qy docker.io"
const startDockerDaemonCommand = "sudo systemctl start docker"
const startFabricCommand = "sh startFabric.sh"
const enrollAdminCommand = "node enrollAdmin.js"
const registerUserCommand = "node registerUser.js"
const runServerCommand = "node server-boilerplate.js"

const arr = [startFabricCommand,enrollAdminCommand,registerUserCommand,runServerCommand]

arr.map(command => execSync(command, { stdio: 'inherit' } ))





