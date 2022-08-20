import { _decorator, Component, Node } from 'cc';
import { Background } from './Background';
import { Pipe } from './Pipe';
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

    @property({ type: Pipe })
    public pipe: Pipe | null = null;

    @property({ type: Background })
    public background: Background = null;


    onStartButtonClick() {
        this._curState = GAME_STATE.GS_PLAYING;
    }

    start() {
        this._curState = GAME_STATE.GS_INIT;
    }

    init() {
        if (this.startMenu) {
            this.startMenu.active = true;
        }
        if (this.playerCtrl) {
            this.playerCtrl.setInputActive(false);
            this.playerCtrl.reset();
        }
    }

    onLoad() {
        this.pipe.width = this.background.width;
    }

    onStopButtonClicked() {
        this._curState = GAME_STATE.GS_END;
    }

    set _curState(state: GAME_STATE) {
        switch (state) {
            case GAME_STATE.GS_INIT:
                this.init();
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
                this.pipe.moveStop();
                if (this.startMenu) {
                    this.startMenu.active = true;
                }
                this._curState = GAME_STATE.GS_INIT;
                break;
        }
    }

    update(deltaTime: number) { }
}

