import { AddPointsOnKill } from './config/config';
import { Players } from './classes/Players';
import { Weapons } from './classes/Weapons';

// Instance Class Players
const players = Players.getInstance();
const playerslist = players.getPlayers(); // Get All Players

// Instance Class Weapons
const weapons = Weapons.getInstance();

//Events
onNet('JoinServer', () => {
    const _source: any = +source
    const plyname: string = GetPlayerName(_source)
    const player = {source:_source,name:plyname,pontos:0}
    
    playerslist.push(player)
    emitNet('ServerSpawn',_source)
    weapons.syncWeaponPlayer(_source,0)
    emitNet('receiverPlayers',-1, JSON.stringify(playerslist));
});

on("playerDropped", (reason:string) => {
    const _source: any = +source
    players.delPlayerBySource(_source)
    emitNet('receiverPlayers',-1, JSON.stringify(playerslist));
});

onNet('SyncPlayerDead', () => {
    const _source: any = +source;
    players.updatePlayersPoints(_source,0)
    weapons.syncWeaponPlayer(_source,0)
    emitNet('receiverPlayers',-1, JSON.stringify(playerslist));
});


onNet('SyncPlayerKill', (idAttacker:any,idVictim:any,weaponHash:any) => {
    const playername: string = GetPlayerName(idAttacker)
    const victimName: string = GetPlayerName(idVictim)
    const playerbyname = players.getPlayerByName(playername);
    const newpoint = playerbyname.pontos + AddPointsOnKill
    const retvalweapon = weapons.getWeaponByHash(weaponHash)
    
    players.updatePlayersPoints(idAttacker,newpoint)
    weapons.syncWeaponPlayer(idAttacker,newpoint)
    emitNet('receiverPlayers',-1, JSON.stringify(playerslist));
    emitNet('DeathNotify',-1,playername,victimName,retvalweapon.img)
});

onNet('kickAllPlayersAfterWin',() => {
   players.kickAllPlayers()
});








