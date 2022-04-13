import { Spawns } from '../interface/spawns.interface';

export class Spawn {
    private spawns:Spawns[] = [
        {x:-975.96,y:-2938.77,z:15.04,h:122.00},
        {x:-943.11,y:-2957.13,z:15.04,h:122.00},
        {x:-925.89,y:-2980.35,z:15.04,h:122.00},
        {x:-925.91,y:-3009.44,z:15.04,h:122.00},
        {x:-927.85,y:-3036.02,z:15.04,h:122.00},
        {x:-955.36,y:-3044.67,z:15.04,h:122.00},
        {x:-981.39,y:-3037.66,z:15.04,h:122.00},
        {x:-1002.65,y:-3022.51,z:15.04,h:122.00},
        {x:-1000.35,y:-2991.77,z:15.04,h:122.00},
        {x:-976.84,y:-2993.55,z:15.04,h:122.00}
    ];
    private static instance: Spawn;

    static getInstance(): any {
        if (this.instance) {
          return this.instance;
        }
    
        this.instance = new Spawn();
        return this.instance;
    }

    getRandomSpawn () {
        const spawnid = getRandomInt(0,9)
        const sp = this.spawns[spawnid]
        return {x:sp.x,y:sp.y,z:sp.z,h:sp.h}
    }
    
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}