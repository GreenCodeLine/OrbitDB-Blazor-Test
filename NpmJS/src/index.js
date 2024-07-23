import { createLibp2p } from 'libp2p'
import { gossipsub } from '@chainsafe/libp2p-gossipsub'
import { identify } from '@libp2p/identify'
import { createHelia } from 'helia'
import { createOrbitDB, IPFSAccessController } from '@orbitdb/core'
import { webRTCStar } from '@libp2p/webrtc-star'
import { webRTC } from '@libp2p/webrtc'
import { noise } from '@chainsafe/libp2p-noise'
import { webSockets } from '@libp2p/websockets'
import { all } from '@libp2p/websockets/filters'
import { yamux } from '@chainsafe/libp2p-yamux'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { bootstrap } from '@libp2p/bootstrap'
import { webTransport } from '@libp2p/webtransport'
import { IDBBlockstore } from 'blockstore-idb'

import { create } from 'ipfs-http-client';

function libp2pConfig() {
    const options = {
        transports: [
            webSockets(),
            circuitRelayTransport(),
            webRTC(),
            webTransport()
        ],
        peerDiscovery: [
            bootstrap({
                list: [
                    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                    '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                    '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
                    '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                    '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
                    '/dns4/node0.preload.ipfs.io/tcp/443/wss/p2p/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
                    '/dns4/node1.preload.ipfs.io/tcp/443/wss/p2p/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
                    '/dns4/node2.preload.ipfs.io/tcp/443/wss/p2p/QmV7gnbW5VTcJ3oyM2Xk1rdFBJ3kTkvxc87UFGsun29STS',
                    '/dns4/node3.preload.ipfs.io/tcp/443/wss/p2p/QmY7JB6MQXhxHvq7dBDh4HpbH29v4yE9JRadAVpndvzySN',
                    "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
                    "/ip4/104.131.131.82/udp/4001/quic-v1/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
                    "/ip4/192.168.245.68/tcp/4001/p2p/12D3KooWFm1i5kWF3HEPKwb2sneuctRD6rumVFCDBQNVdTVocWBq"
                ]
            }),

        ],
        //connectionManager: {
        //    maxParallelDials: 150, // 150 total parallel multiaddr dials
        //    maxDialsPerPeer: 4, // Allow 4 multiaddrs to be dialed per peer in parallel
        //    dialTimeout: 10e3, // 10 second dial timeout per peer dial
        //    autoDial: true
        //},
        nat: {
            enabled: false
        },
        services: {
            identify: identify(),
            pubsub: gossipsub({ allowPublishToZeroTopicPeers: true })
        }
    }

    return options;
};

window.createLibp2p = async function () {
    console.log('createLibp2p');
    try {
        return await createLibp2p(libp2pConfig());//

    } catch (e) {
        console.log('createLibp2p', e);
    }
}

window.createHelia = async function (libp2p) {
    const store = new IDBBlockstore()
    console.log('createHelia');
    try {

        var heliaNode = createHelia({ libp2p, store });

        return heliaNode;
    } catch (e) {
        console.log('createHelia', e);
    }
}

window.createOrbitDB = async function (ipfs) {
    console.log('createOrbitDB');
    try {

        return await createOrbitDB({ ipfs });

    } catch (e) {
        console.log('createOrbitDB', e);
    }
}

window.createDB = async function (orbit, name) {
    console.log('createDB: ' + name);
    try {
        return await orbit.open(name, { AccessController: IPFSAccessController({ write: ['*'] }) });

    } catch (e) {
        console.log('createDB' + e);
    }
}

window.openDB = async function (orbit, address) {
    console.log('createDB: ' + address);
    try {
        return await orbit.open(address);

    } catch (e) {
        console.log('createDB' + e);
    }
}


window.getAllValues = async function (db) {
    try {
        return await db.all();

    } catch (e) {
        console.log("getAllValues" + e);
    }
}

window.getDbAddress = async function (db) {
    try {
        return db.address;

    } catch (e) {
        console.log("getDbAddress" + e);
    }
}