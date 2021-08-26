"use strict";

var express = require("express");
var request = require("request");
var childProcess = require("child_process");
var uuid = require("node-uuid");
var router = express.Router();


var gProcesses = {};
var gProcessCount = 0;
var gProcessPath = process.env.HOME;
var gMaxProcessCount = process.env.MAX_PROCESS_COUNT;
var gSequenceIndex = 0;

var eMachineState = {
    empty: "empty",
    partial: "partial",
    full: "full",
    shuttingDown: "shuttingDown",
};

var gMachineState = eMachineState.empty;
var gSequenceIndex = 0;

router.post('/processes/', (req, res) => {
    if(gMachineState === eMachineState.full){
        res.send(
            {
                msg: "Already Full",
                machineState: gMachineState,
                sequenceIdex: ++gSequenceIndex
            }
        );
    }
    else if(gMachineState === eMachineState.shuttingDown){
        res.send(
            {
                msg: "Already Shutting Down",
                machineState: gMachineState,
                sequenceIdex: ++gSequenceIndex
            }
        );
    }
    else{
        var processUUID = uuid.v1();
        var params = req.body.params;
        var child = childProcess.spawn(gProcessPath,
            [
                '--processIIOD', processUUID,
                '--lspmURL', "http://127.0.0.1:" + gListenPort,
                '--json', JSON.stringify(params)
            ]);
        gprocess[processUUID] =
        {
            child: child,
            params: params,
            state: 'starting',
            lastHeartbeat: getUTCSecondsSinde1970()
        };
        ++gProcessCount;
        gMachineState = 
            gProcessCount === gMaxProcessCount ? eMachineState.full : eMachineState.partial;
        child.stdout.on('data', (data)=>{
            console.log('stdout' + data);
        });
        child.stderr.on('data', (data)=>{
            console.error('stderr' + data);
        });
    
        child.on('close', (code, signal)=> {
            console.log('child terminated by signal ' + signal);
            // 허용 프로세스가 개수 한도에 도달했는지 검사
            var oldMachineState = gMachineState;
            --gProcessCount;
            gMachineState = gProcessCount > 0 ?
                eMachineState.partial : eMachineState.empty;
            if(oldMachineState !== gMachineState){
                console.log("Machine state changed to " + gMachineState);
            }
            delete gProcesses[processUUID];
        });

        res.send(
            {
                msg: "OK",
                processUUID: processUUID,
                machineState: gMachineState,
                sequenceIdex: ++gSequenceIndex
            }
        );
    }  
});

router.post('/processes/:processUUID/kill', (req, res) => {
    var processUUID = req.params.processUUID;
    console.log("attempting to kill process: " + processUUID);
    var process = gProcesses[processUUID];
    if(process){
        // 프로세스를 죽이면 close 이벤트가 발생해 프로세스 목록에서 삭제됨
        process.child.kill();
        res.sendStatus(200);
    }
    else{
        res.sendStatus(404);
    }
});