const cluster = require('node:cluster');
const { app, instances, strategy } = require("./argv.js").get_args();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const number_of_cpus = instances;
    console.log(`Number of CPUs: ${number_of_cpus}`);

    for (let i = 0; i < number_of_cpus; i++) {
        cluster.fork();
    }
    
    const strategies = {
        replace_all: require('./strategies/index.js').replace_all,
        replace_based_on_gap: require('./strategies/index.js').replace_based_on_gap,
        replace_one_by_one: require('./strategies/index.js').replace_one_by_one
    }

    cluster.on('exit', (worker, code, signal) => {


        if(code !== 1 && strategy === 'replace_all') return;

        console.log(`worker ${worker.process.pid} died with following code ${code} and signal ${signal}`);

        const current_available_processes =  Object.keys(cluster.workers).length;
        
        strategies[strategy]({number_of_cpus, current_available_processes, cluster_context: cluster});
    });

}
if(cluster.isWorker) {

    console.log(`Worker ${process.pid} started`);

    require(app);

}