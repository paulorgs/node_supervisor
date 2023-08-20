const yargs = require('yargs')
const os = require('node:os')

const get_args = () => {

    const argv = yargs
        .option('app', {
            describe: 'Path of the file to be processed',
            demandOption: true,
            type: 'string',
        })
        .option('instances', {
            describe: 'Number of processes to run',
            type: 'number',
            default: os.cpus().length,
        }).option('strategy', {
            describe: 'Strategy to use',
            type: 'string',
            default: 'replace_based_on_gap',
            choices: ['replace_all', 'replace_one_by_one', 'replace_based_on_gap']
        })
        .argv;

    return argv
}

module.exports={
    get_args
}