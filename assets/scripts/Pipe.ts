import { _decorator, Component, Node, UITransform, Vec3, RigidBody2D, director, RigidBody, Collider2D, Contact2DType, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {
    @property({ type: Node })
    private pipe0: Node | null = null;
    @property({ type: Node })
    private pipe1: Node | null = null;
    @property({ type: Node })
    private pipe2: Node | null = null;
    @property({ type: Node })
    private pipe3: Node | null = null;
    @property
    private gap: number = 100;
    //each pipe couple x space 150
    @property
    private space: number = 150;
    //min y -70 max y 100
    @property
    private minH: number = -70;
    @property
    private maxH: number = 100;
    //pipi move speed
    @property
    private speed: number = 50;
    public width: number = 288;

    start() {
        console.log("pip start");
        console.log("register collider");
        let collider = this.node.children[0].children[0].getComponent(BoxCollider2D);
        let collider2 = this.node.children[0].children[0].getComponent(Collider2D);
        console.log("BoxCollider2D", collider);
        console.log("Collider2D", collider2);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.pipeOnBeginContact, this);
        }
    }

    pipeOnBeginContact() {
        console.log("pipeOnbeginContact");
    }


    onEnable() {
        // console.log("onenable..........")
    }
    onDestroy() { }
    onDisable() { }


    pipeStart() {
        this.node.active = true;
        this.init();
    }

    moveStop() {
        this.node.active = false;
    }

    init() {
        this.node.setPosition(0, 0);
        console.log("init width", this.width)
        this.pipe0.setPosition(this.width, this.random(this.minH, this.maxH))
        this.pipe1.setPosition(this.width + this.space, this.random(this.minH, this.maxH))
        this.pipe2.setPosition(this.width + 2 * this.space, this.random(this.minH, this.maxH))
        this.pipe3.setPosition(this.width + 3 * this.space, this.random(this.minH, this.maxH))
    }

    random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
    update(deltaTime: number) {
        let position = this.node.getWorldPosition();
        position.x -= deltaTime * this.speed;
        this.node.setWorldPosition(position);



        let pipe0x = this.pipe0.getWorldPosition().x;
        let width = this.pipe0.getComponent(UITransform).width;
        if (pipe0x <= -width / 2) {
            var temp = this.pipe0;
            this.pipe0 = this.pipe1;
            this.pipe1 = this.pipe2;
            this.pipe2 = this.pipe3;
            this.pipe3 = temp;
            this.pipe3.setPosition(this.pipe2.getPosition().x + this.space, this.random(this.minH, this.maxH));
        }

    }
}
