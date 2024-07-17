import { Behaviour, GameObject, serializable} from "@needle-tools/engine";
import { Object3D } from "three";

export class PlayerInfo extends Behaviour{
    @serializable(Object3D)
    public cardPrefab: Object3D | null = null;

    public deck: number[] = [];
    
    @serializable(Object3D)
    public deckCards: Object3D[] = [];  // Initialize the cards in the deck

    @serializable(Object3D)
    public fieldPosition: Object3D [] = []; 

    @serializable(Object3D)
    public fieldCards: Object3D [] = []; 

    @serializable(Object3D)
    public handCards: Object3D [] = []; // Draw cards from the deck and removes it but add to our hand card.

    public deckCount: number = 0;
    public handCount: number = 0 ;
    public discardCount: number = 0;

    start(){
        
    }

}