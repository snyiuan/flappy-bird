import { _decorator, Component, Node, input, Input, EventTouch, RigidBody2D, Vec3, IPhysics2DContact, Collider2D, Contact2DType, PhysicsSystem2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private initPosition: Vec3 | null = null;

    start() {
        // let colider = this.getComponent(Collider2D);
        // if (colider) {
        //     colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // }

        // // 注册全局碰撞回调函数
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     // PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     // PhysicsSystem2D.instance.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     // PhysicsSystem2D.instance.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }
    }




    reset() {
        if (this.initPosition) {
            this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
            this.node.setWorldPosition(this.initPosition);
            this.node.getComponent(RigidBody2D).sleep();
            console.log("sleep");
        }
    }

    setInputActive(active: boolean) {
        if (active) {
            input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
            this.node.getComponent(RigidBody2D).wakeUp();
        } else {
            input.off(Input.EventType.TOUCH_START, this.onTouchStart, this)
        }
    }

    onTouchStart(e: EventTouch) {
        let v = this.node.getComponent(RigidBody2D).linearVelocity;
        v.x = 0;
        v.y = 5;
        this.node.getComponent(RigidBody2D).linearVelocity = v;
    }


    onLoad() {
        if (!this.initPosition) {
            this.initPosition = this.node.getWorldPosition();
        }
    }

    update(deltaTime: number) {

    }
}

