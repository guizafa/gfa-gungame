import { Weapon } from '../interface/weapons.interface';

export class Weapons {
    private weapons:Weapon[] = [
        {name :"WEAPON_PISTOL_MK2", hash:"-1075685676",img:"mk2.png", pontos : 0},
        {name :"WEAPON_APPISTOL", hash:"584646201",img:"appistol.png", pontos : 10},
        {name :"WEAPON_REVOLVER", hash:"-1045183535",img:"revolver.png", pontos : 20},
        {name :"WEAPON_MINISMG", hash:"-1121678507",img:"minismg.png", pontos : 30},
        {name :"WEAPON_MICROSMG", hash:"324215364",img:"microsmg.png", pontos : 40},
        {name :"WEAPON_PUMPSHOTGUN", hash:"487013001",img:"shotgun.png", pontos : 50},
        {name :"WEAPON_SMG", hash:"736523883",img:"smg.png", pontos : 60},
        {name :"WEAPON_ASSAULTRIFLE", hash:"-1074790547",img:"assaultrifle.png", pontos : 70},
        {name :"WEAPON_SPECIALCARBINE", hash:"-1063057011",img:"specialcarbine.png", pontos : 80},
        {name :"WEAPON_HEAVYSNIPER_MK2", hash:"177293209",img:"riflemk2.png", pontos : 90}
    ];
    private static instance: Weapons;

    static getInstance(): any {
        if (this.instance) {
          return this.instance;
        }
    
        this.instance = new Weapons();
        return this.instance;
    }

    syncWeaponPlayer (source:number,pontos:number) {
        const filterweapon = [...this.weapons].find (weapon => {
            if (pontos > 90) {
                return weapon.pontos == 90
            }else{
                return weapon.pontos == pontos
            }
        }) as unknown as Weapon
        emitNet('setWeapon',source,filterweapon.name)
    }

    getWeaponByHash (weaponHash:any) {
        const weaponvalues = [...this.weapons].find (weapon => {
            return weapon.hash == weaponHash
        }) as unknown as Weapons
        return weaponvalues
    }
}
