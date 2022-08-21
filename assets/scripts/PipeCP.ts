import { _decorator, Component, Node, Collider2D, Contact2DType, BoxCollider2D, director, Collider2D_base, ICollisionEvent, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeCP')
export class PipeCP extends Component {

    start() {
        console.log("pipecp start")
    }
    onLoad() {
        console.log("pipecp onload")
    }
    setChildrenPosition(x: number, y: number) {
        this.node.setPosition(x, y);
        this.node.children.forEach(child => {
            let position = child.getPosition();
            position.x = 0;
            child.setPosition(position);
        })


    }



    update(deltaTime: number) {
    }
}

