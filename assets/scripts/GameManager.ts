import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { Background } from './Background';
import { PipeArray } from './PipeArray';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;


enum GAME_STATE {
    GS_INIT,
    GS_PLAYING,
    GS_END
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property({ type: Node })
    public startMenu: Node | null = null;

    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null;

    @property({ type: Node })
    public score: Node | null = null;

    @property({ type: PipeArray })
    public pipe: PipeArray | null = null;

    @property({ type: Background })
    public background: Background = null;


    onStartButtonClick() {
        this._curState = GAME_STATE.GS_PLAYING;
    }

    start() {
        let colider = this.playerCtrl.node.getComponent(Collider2D);
        if (colider) {
            colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        this._curState = GAME_STATE.GS_INIT;
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name == "SKY") {
            return;
        } else {
            this.gameOver();
        }
    }


    gameOver() {
        this.onStopButtonClicked();
    }


    init() {
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false);
            setTimeout(() => {
                this.playerCtrl.reset();
            }, 1);
        }
        if (this.startMenu) {
            this.startMenu.active = true;
        }
    }

    onLoad() {
        this.pipe.width = this.background.width;
    }

    onStopButtonClicked() {
        this._curState = GAME_STATE.GS_INIT;
    }

    set _curState(state: GAME_STATE) {
        switch (state) {
            case GAME_STATE.GS_INIT:
                this.init();
                this.pipe.moveStop();
                break;
            case GAME_STATE.GS_PLAYING:
                if (this.startMenu) {
                    this.startMenu.active = false;
                }
                if (this.pipe) {
                    this.pipe.pipeStart();
                }
                setTimeout(() => {
                    if (this.playerCtrl) {
                        this.playerCtrl.setInputActive(true);
                    }
                }, 0.1);
                break;
            case GAME_STATE.GS_END:
                // this.pipe.moveStop();
                this._curState = GAME_STATE.GS_INIT;
                break;
        }
    }

    update(deltaTime: number) { }
}

