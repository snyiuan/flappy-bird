import { _decorator, Component, Node, sp, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {
    @property({ type: Node })
    private bg1: Node | null = null;
    @property({ type: Node })
    private bg2: Node | null = null;
    @property({ type: Node })
    private bg3: Node | null = null;
    @property
    private speed: number | null = 10;
    public width: number = 0;

    start() { }

    onLoad() {
        this.width = this.bg1.getComponent(UITransform).width;
    }

    update(deltaTime: number) {
        let position = this.node.getWorldPosition();
        position.x -= deltaTime * this.speed;
        // this.node.setPosition(this.node.position.x - deltaTime * this.speed, 0);
        this.node.setWorldPosition(position);
        let bg1x = this.bg1.getWorldPosition().x;
        if (bg1x <= -this.width / 2) {
            var temp = this.bg1;
            this.bg1 = this.bg2;
            this.bg2 = this.bg3;
            this.bg3 = temp;
            this.bg3.setPosition(this.bg2.position.x + this.width, 0);
        }
    }
}

