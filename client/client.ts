import { Spawn } from './classes/Spawns';

// Variables
let deadPlayer = false
let winner = false
let deathtimer = 0
let players
const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Instance Class Players
const spawns = Spawn.getInstance();

// Threads 
setTick(async () => {
	if (deadPlayer) {
		updateHud(deathtimer)
	}
	await Delay(1000)
});

setTick(async () => {
	let sleep = 200;
	const ped = PlayerPedId();
	if (!winner) {
		if (GetEntityHealth(ped) <= 101 && deathtimer >= 0 ) {
			if (!deadPlayer) {
				sleep = 200
				deadPlayer = true
				const [playerX, playerY, playerZ] = GetEntityCoords(ped, false);
				const h = GetEntityHeading(ped);
				NetworkResurrectLocalPlayer(playerX,playerY,playerZ,h,true,false)
				deathtimer = 15
				FreezeEntityPosition(ped, true)
				SetEntityVisible(PlayerPedId(), false,false)
				SetEntityHealth(ped,101)
				SetEntityInvincible(ped,true)
			}else{
				if(deathtimer > 0) {
					sleep = 4
					SetEntityHealth(ped,101)
					FreezeEntityPosition(ped, true)
					SetEntityVisible(PlayerPedId(), false,false)
				}else{
					sleep = 4
					respawnPlayer()
				}
			}
		}
	}
	await Delay(sleep);
});

setTick(async () => {
	const ped = PlayerPedId()
	let sleep = 100;
	if (deadPlayer){
		sleep = 4
		DisablePlayerFiring(ped,true)
		BlockWeaponWheelThisFrame()
		DisableControlAction(2,37,true)
		DisableControlAction(2,21,true)
        DisableControlAction(2,24,true)
        DisableControlAction(2,25,true)
        DisableControlAction(2,47,true)
        DisableControlAction(2,58,true)
        DisableControlAction(2,263,true)
        DisableControlAction(2,264,true)
        DisableControlAction(2,257,true)
        DisableControlAction(2,140,true)
        DisableControlAction(2,141,true)
        DisableControlAction(2,142,true)
        DisableControlAction(2,143,true)
	}
	await Delay(sleep);		
});

setTick(async () => {
	while (true) {
		await Delay(1000);
		if (deadPlayer && deathtimer > 0 ) {
			deathtimer = deathtimer - 1
		}
	}
});

onNet('receiverPlayers', (ServerPlayers) => {
    players = ServerPlayers;
    SendNuiMessage(JSON.stringify({action: 'open',players: players}));
});

onNet('PlayerWinner', async (playerName) => {
	winner = true
	WinnerFunction()
    SendNuiMessage(JSON.stringify({winner: true,plyname: playerName}));
	await Delay(5000)
	emitNet('kickAllPlayersAfterWin')
});


onNet('setWeapon', (weapon) => {
    giveWeapons(weapon)
});

onNet('ServerSpawn', () => {
    spawnPed ()
});

onNet("DeathNotify", (attacker:string,victim:string,weaponImg:string) => {
    SendNuiMessage(JSON.stringify({ notify : true,attacker:attacker,victim:victim,img:weaponImg }))
});

on("gameEventTriggered", (event, args) => {
  switch (event) {
    case "CEventNetworkEntityDamage": {
      const victim = args[0];
      const attacker = args[1];
	  const isFatal = args[5];
	  const weaponHash = args[6];
    
      const PlyPed = PlayerPedId();
	  const VictimSID: number = GetPlayerServerId(NetworkGetPlayerIndexFromPed(victim))
	  const AttackerSID: number = GetPlayerServerId(NetworkGetPlayerIndexFromPed(attacker))
	  
	  if (victim == PlyPed && isFatal) {
		emitNet('SyncPlayerDead')
	  }
	  if (attacker == PlyPed && isFatal && IsPedAPlayer(victim)) {
		emitNet('SyncPlayerKill',JSON.stringify(AttackerSID),JSON.stringify(VictimSID),JSON.stringify(weaponHash))
	  }
      break;
    }
  }
})


// Function
function spawnPed () {
	const {x,y,z,h} = spawns.getRandomSpawn()
	const ped = PlayerPedId();
	SetEntityCoords(ped, x + 0.0001,y + 0.0001,z + 0.0001, false, false, false, true);
    ClearPedTasksImmediately(ped)
} 

function respawnPlayer () {
	const ped = PlayerPedId();
	if (GetEntityHealth(ped) <= 101) {
		spawnPed()
		deadPlayer = false
		ClearPedBloodDamage(ped);
		SetEntityHealth(ped,200);
		FreezeEntityPosition(ped, false)
		SetEntityVisible(PlayerPedId(), true,false)
		SetEntityInvincible(ped,false);
		RemoveAllPedWeapons(ped, true);
		GiveWeaponToPed(ped,"WEAPON_PISTOL_MK2",250,false,true)
	}
}

function giveWeapons(weapon) {
	const ped = PlayerPedId();
	RemoveAllPedWeapons(ped,true)
	GiveWeaponToPed(ped,weapon,250,false,true)
}


function updateHud (deathtimer){
	SendNuiMessage(JSON.stringify({
		update : true,
		time : deathtimer
	}));
}

function WinnerFunction() {
	const ped = PlayerPedId();
	SetEntityHealth(ped,200);
	FreezeEntityPosition(ped, true)
	SetEntityVisible(PlayerPedId(), false,false)
	SetEntityInvincible(ped,true);
	RemoveAllPedWeapons(ped, true);
}







