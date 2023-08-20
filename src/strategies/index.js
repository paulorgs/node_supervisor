const replace_based_on_gap = ({ number_of_cpus, current_available_processes, cluster_context }) => {
    const gap = number_of_cpus - current_available_processes;

    console.log(`Number of available processes: ${current_available_processes}`);

    console.log(`Number of CPUs: ${number_of_cpus}`);

    console.log(`Gap of ${gap} processes`)

    if (current_available_processes < number_of_cpus) {
        console.log(`Forking ${gap} new worker`);

        for (let i = 0; i < gap; i++) {
            cluster_context.fork();

        }
    }
};

const replace_all = ({ number_of_cpus, current_available_processes, cluster_context }) => {
    console.log(`Number of available processes: ${current_available_processes}`);
    console.log("Replacing all workers...")
   Object.keys(cluster_context.workers).forEach(worker_id => {
        console.log(`Killing worker ${worker_id}`);
         cluster_context.workers[worker_id].kill();
    }
    );

    for (let i = 0; i < number_of_cpus; i++) {
        cluster_context.fork();
    }
    
};

const replace_one_by_one = ({ number_of_cpus, current_available_processes, cluster_context }) => {
    console.log(`Number of available processes: ${current_available_processes}`);

    console.log("Replacing one by one...")

    cluster_context.fork();    
}


module.exports = {
    replace_all,
    replace_based_on_gap,
    replace_one_by_one
}