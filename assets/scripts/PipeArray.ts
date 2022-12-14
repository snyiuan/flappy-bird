import { _decorator, Component, Node, UITransform, Vec3, RigidBody2D, director, RigidBody, Collider2D, Contact2DType, BoxCollider2D } from 'cc';
import { PipeCP } from './PipeCP';
const { ccclass, property } = _decorator;

@ccclass('PipeArray')
export class PipeArray extends Component {
    @property({ type: Node })
    private pipe0: Node | null = null;
    @property({ type: Node })
    private pipe1: Node | null = null;
    @property({ type: Node })
    private pipe2: Node | null = null;
    @property({ type: Node })
    private pipe3: Node | null = null;

    @property({ type: PipeCP })
    private pipe00: PipeCP | null = null
    @property({ type: PipeCP })
    private pipe01: PipeCP | null = null
    @property({ type: PipeCP })
    private pipe02: PipeCP | null = null
    @property({ type: PipeCP })
    private pipe03: PipeCP | null = null

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
        console.log("Array start")
    }
    onLoad() {
        console.log("Array onload")
    }

    onEnable() { }
    onDestroy() { }
    onDisable() { }


    pipeStart() {
        if (!this.node.active) {
            this.node.active = true;
        }
        this.init();
    }

    moveStop() {
        setTimeout(() => {
            this.node.active = false;
        }, 0.1);
    }

    init() {
        this.node.setPosition(0, 0);
        this.pipe00.setChildrenPosition(this.width, this.random(this.minH, this.maxH))
        this.pipe01.setChildrenPosition(this.width + this.space, this.random(this.minH, this.maxH))
        this.pipe02.setChildrenPosition(this.width + 2 * this.space, this.random(this.minH, this.maxH))
        this.pipe03.setChildrenPosition(this.width + 3 * this.space, this.random(this.minH, this.maxH))
        /*  this.pipe0.setPosition(this.width, this.random(this.minH, this.maxH))
            this.pipe1.setPosition(this.width + this.space, this.random(this.minH, this.maxH))
            this.pipe2.setPosition(this.width + 2 * this.space, this.random(this.minH, this.maxH))
            this.pipe3.setPosition(this.width + 3 * this.space, this.random(this.minH, this.maxH)) */

    }

    random(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }



    update(deltaTime: number) {
        /* let position = this.node.getWorldPosition();
        position.x -= deltaTime * this.speed;
        this.node.setWorldPosition(position);
        
        let pipe0x = this.pipe0.getWorldPosition().x;
        // let width = this.pipe0.getComponent(UITransform).width;
        if (pipe0x <= -this.width / 2) {
            var temp = this.pipe0;
            this.pipe0 = this.pipe1;
            this.pipe1 = this.pipe2;
            this.pipe2 = this.pipe3;
            this.pipe3 = temp;
            this.pipe3.setPosition(this.pipe2.getPosition().x + this.space, this.random(this.minH, this.maxH));
        } */
        let children = this.node.children
        let deltaX = deltaTime * this.speed;
        children.forEach((child) => {
            child.children.forEach((child2) => {
                let upP = child2.getPosition()
                upP.x -= deltaX;
                child2.setPosition(upP);
            })
        })

        if (this.pipe0.children[0].getWorldPosition().x <= -this.width / 2) {
            let temp = this.pipe0;
            this.pipe0 = this.pipe1;
            this.pipe1 = this.pipe2;
            this.pipe2 = this.pipe3;
            this.pipe3 = temp;
            let pipe2P = this.pipe2.getPosition();
            pipe2P.x += this.space;
            pipe2P.y = this.random(this.minH, this.maxH);

            this.pipe3.setPosition(pipe2P);
            let position = this.pipe2.children[0].getPosition();
            this.pipe3.children[0].setPosition(position.x, this.pipe3.children[0].getPosition().y)
            this.pipe3.children[1].setPosition(position.x, this.pipe3.children[1].getPosition().y)
            this.pipe3.children[2].setPosition(position.x, this.pipe3.children[2].getPosition().y)
        }

    }
}

