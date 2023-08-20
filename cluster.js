const cluster = require('node:cluster');

const { app, instances } = require("./argv.js").get_args();


const spawn_needed_workers = ({number_of_cpus, current_available_processes}) => {
    const gap = number_of_cpus - current_available_processes;

    console.log(`Number of available processes: ${current_available_processes}`);

    console.log(`Number of CPUs: ${number_of_cpus}`);

    console.log(`Gap of ${gap} processes`)

    if(current_available_processes < number_of_cpus) {
        console.log(`Forking ${gap} new worker`);

        for(let i = 0; i < gap; i++){
            cluster.fork();

        }
    }
}

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const number_of_cpus = instances;
    console.log(`Number of CPUs: ${number_of_cpus}`);

    for (let i = 0; i < number_of_cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {

        console.log(`worker ${worker.process.pid} died with following code ${code} and signal ${signal}`);

        const current_available_processes =  Object.keys(cluster.workers).length;
        
        spawn_needed_workers({number_of_cpus, current_available_processes});
    });

}
if(cluster.isWorker) {

    console.log(`Worker ${process.pid} started`);

    require("./"+ app);

}