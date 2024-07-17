import { Behaviour, PointerEventData, IPointerClickHandler, serializable, Animator, GameObject, PlayableDirector, AnimatorController} from "@needle-tools/engine";
import { Object3D, AnimationClip, AnimationMixer } from "three";

export class ModelVisibleState extends Behaviour implements IPointerClickHandler{

    @serializable(Object3D)
    public monsterModel: Object3D | null = null;

    @serializable(Animator)
    public cardAnimator: Animator | null = null;
    
    @serializable(Animator)
    public monsterAnimator: Animator | null = null;

    @serializable(AnimationMixer)
    public monsterAnimMixer: AnimationMixer | null = null;
    
    public cardAnimName: string = "";
    public monsterAnimName: string = "";

    // check if the animation has been played
    private hasPlayedAnimation: boolean = false;
    private isCardClicked: boolean = false;

    update(){
        if (this.cardAnimator != null && this.isCardClicked && !this.hasPlayedAnimation) {
            this.cardAnimator.play(this.cardAnimName, 0, 0, 0.1); // Flip the card after it is clicked
            this.hasPlayedAnimation = true; // Set the flag to prevent re-playing the 'flip' animation
        }
    }

    onPointerClick(_args: PointerEventData) {
        _args.use();
        this.isCardClicked = true;

        setTimeout(() => {
            console.log("Card is Clicked" + this.name);

            // Slight delay to show the monster to make it more natural
            if(this.isCardClicked && this.monsterModel != null && this.monsterAnimator != null){
                this.monsterModel.visible = true;
                this.monsterAnimator.play(this.monsterAnimName, 0, 0, 0.1);
                console.log("Hello Screaming Monster!");
            }

        }, 500);

    }
    
}