import { Behaviour, serializable} from "@needle-tools/engine";
import { Object3D } from "three";

// This script is for checking the models that are on the model list,
// making them invisible when the game starts.
export class MonsterState extends Behaviour{
    
    @serializable(Object3D)
    public monsterModelList : Object3D[] = [];

    start(){
        this.monsterModelList.forEach((monsterModel) => {
            monsterModel.visible = false;
        });
    }
}
