import { Player } from '../interface/players.interface';

export class Players {
    private players:Player[] = [
    ];
    
    private static instance: Players;

    static getInstance(): any {
        if (this.instance) {
          return this.instance;
        }
    
        this.instance = new Players();
        return this.instance;
    }

    getPlayerByName (name:string) {
        return this.players.find(player => player.name == name)
    }

    getPlayers () {
        return this.players
    }

    delPlayerBySource (source:any) {
        this.players.forEach((value,index)=>{
            if(value.source == source) this.players.splice(index,1)
        });
    }

    updatePlayersPoints (source:any,pontos:number) {
        this.players = this.players.map(player => {
            if(player.source == source) {
                player.pontos = pontos
                if (player.pontos > 90) {
                    emitNet('PlayerWinner',-1,player.name);
                }
            }
            return player
        })
    }

    kickAllPlayers () {
        this.players.forEach((value,index)=>{
            if(value.pontos > 90) {
                DropPlayer(value.source,"You WIN !!" );
            }else{
                DropPlayer(value.source,"Game Over !!" );
            }  
        });
    }
}