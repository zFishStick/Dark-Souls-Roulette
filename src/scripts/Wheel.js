import { switchButtons } from './SectionBuilder.js';
import { isMuted } from './SettingsBuilder.js';

export let audio = new Audio('assets/sfx/tick.wav');

const THIN_SPACE = ' ';

export class Wheel {
    constructor({ segments, canvasId, winRate, onResult, repeat = 1, type = 'default' }) {
        this.segments = segments;
        this.canvasId = canvasId;
        this.winRate = winRate;
        this.repeat = repeat;
        this.type = type;
        this.callback = onResult;
        this.wheel = null;
        this.spinBtn = document.getElementById('spinBtn');
    }

    _spaceText(text) {
        if (text == null) return '';
        return text.split(' ').map(word => word.split('').join(THIN_SPACE)).join(' ');
    }

    _buildSegments() {
        const count = this.segments.length;
        let base;
        if (typeof this.winRate === 'number' && count >= 2) { // BossFight wheel
            const favorableSize = (this.winRate * 360) / this.repeat;
            const otherSize = ((1 - this.winRate) * 360) / ((count - 1) * this.repeat);
            base = this.segments.map((text, index) => ({
                'textFontFamily' : 'Georgia',
                'text'           : this._spaceText(text),
                'size'           : index === count - 1 ? favorableSize : otherSize
            }));
        } else {
            base = this.segments.map((text) => ({
                'textFontFamily' : 'Georgia',
                'text'           : this._spaceText(text),
                'size'           : 360 / (count * this.repeat)
            }));
        }

        const result = [];
        for (let r = 0; r < this.repeat; r++) {
            for (let i = 0; i < base.length; i++) {
                result.push({
                    ...base[i],
                    'fillStyle'      : (r * base.length + i) % 2 === 0 ? '#2a1d10' : '#110e08',
                    'textFillStyle'  : '#c9a227',
                    'textFontWeight' : 'bold',
                });
            }
        }
        return result;
    }

    create() {
        const segments = this._buildSegments();
        this.wheel = new Winwheel({
            'canvasId'      : this.canvasId,
            'numSegments'   : segments.length,
            'textFontSize'  : segments.length <= 7 ? 18 : 13,
            'textFontFamily': 'Georgia',
            'strokeStyle'   : '#c9a227',
            'lineWidth'     : 1.5,
            'segments'      : segments,
            'pointerAngle'  : 90,
            'responsive'    : true,
            'animation': {
                'type'             : 'spinToStop',
                'duration'         : 1.5,
                'spins'            : 4,
                'callbackFinished' : () => this._onSpinFinished(),
                'callbackSound'    : () => this._playSound(),
                'soundTrigger'     : 'segment'
            }
        });

        this.spinBtn.onclick = () => this.spin(this.type);
        document.body.onkeyup = (e) => {
            if (e.keyCode === 32 && !this.spinBtn.disabled) this.spin();
        };

        return this;
    }

    spin(type) {
        this.wheel.stopAnimation(false);
        this.wheel.rotationAngle = 0;
        this.wheel.draw();
        this.wheel.startAnimation();
        this.spinBtn.disabled = true;
        this.spinBtn.innerText = 'Spinning...';
        switchButtons(true, type);
    }

    updateSegments(newSegments) {
        this.segments = newSegments;
        this.create();
    }

    _onSpinFinished() {
        this.spinBtn.disabled = false;
        this.spinBtn.innerText = 'SPIN';
        switchButtons(false, this.type);
        const winningSegment = this.wheel.getIndicatedSegment();
        const originalText = winningSegment.text.replaceAll(THIN_SPACE, '');
        this.callback(originalText);
    }

    _playSound() {
        if (!isMuted) {
            audio.play();
        }
    }
}
