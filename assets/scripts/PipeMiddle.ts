import { _decorator, Component, Node, RigidBody, Collider2D, PipelineEventType, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeMiddle')
export class PipeMiddle extends Component {
    start() {
        let collider = this.node.getComponent(Collider2D);
        console.log("start get collider", collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.endContact, this);
            
        }
    }
    onBeginContact(BEGIN_CONTACT: string, onBeginContact: any, arg2: this) {
        console.log("begin contact")
    }
   
    endContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("selfCollider", selfCollider)
        console.log("otherCollider", otherCollider)
        /* if (otherCollider.node.name == "SKY" || otherCollider.node.name == "middle") {
            return;
        } else {
            console.log("game over")
            // this.gameOver();
        } */
    }

    update(deltaTime: number) {

    }
}

