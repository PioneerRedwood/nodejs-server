const {spawn} = require('child_process');
/**
 * spawn(실행시킬 프로세스(exe파일 등)의 경로, [
 *  options: ex) '-m', "#1 Add something", 
 *  ...
 * ])
 *  */ 
cmds = [
    'netstat',
    'git log',
];

function execute_cmd(cmds){
    cmds.forEach(cmd => {
        var proc = spawn(cmd.split(' ')[0], cmd.split(' ').slice(1));
        print_cmd_results(proc);
    });
}

function print_cmd_results(cmd){
    cmd.stdout.on('data',(data)=> {
        console.log('stdout' + data);
    });

    cmd.stderr.on('data', (data)=>{
        console.error('stderr' + data);
    });

    cmd.on('close', (code)=> {
        console.log('child process exited with code. ' + code);
    });

    setTimeout(() => {
        
    }, 500);
}

execute_cmd(cmds);
