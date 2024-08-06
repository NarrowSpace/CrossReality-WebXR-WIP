import { Behaviour, GameObject, Gizmos, RaycastOptions, getParam, serializable, syncField } from "@needle-tools/engine";
import { Euler, Layers, Object3D, Ray, Vector3 } from "three";

export class SpawnPointHandler extends Behaviour {

    @serializable(Object3D)
    spawnPoints: Object3D[] = [];

    private downVector = new Vector3(0, -1, 0);
    private playerCount: number = 0;

    // https://engine.needle.tools/docs/api/@needle-tools/engine/3.45.1-beta.7/classes/engine_api.RaycastOptions.html
    handlePlayerSpawn(obj: GameObject) {
        if (this.playerCount >= this.spawnPoints.length) {
            console.error("No more spawn points available");
            return;
        }

        const options = new RaycastOptions();
        options.layerMask = new Layers();
        options.layerMask.enableAll();
        options.ray = new Ray(new Vector3(), this.downVector.clone());
        options.maxDistance = 2;

        // Choose a random spawn point that is not occupied
        let spot: Object3D | undefined = undefined;

        // Select the spawn point for the current player based on the playerCount.
        // const spot = this.spawnPoints[this.playerCount];
        // this.playerCount++;

        for (let i = 0; i < this.spawnPoints.length; i++) {
            const element = this.spawnPoints[i];

            element.getWorldPosition(options.ray.origin);
            options.ray.origin.y += 3;

            options.ray.direction.copy(this.downVector);

            const result = this.context.physics.raycast(options);

            if (result.length == 0) {
                spot = element;
                break;
            }
        }

         // If there is no valid spawn point, set world 0,0,0
         const pos = spot?.position.clone() || new Vector3();
         const rot = spot?.rotation.clone() || new Euler(); 

        if (obj instanceof Object3D) {
            obj.worldToLocal(pos);

            obj.position.copy(pos);
            obj.rotation.copy(rot);
        }

    }
}