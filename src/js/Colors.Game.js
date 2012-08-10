/** 
 * Guess the Color Game backbone model
 * 
 * @class Game
 *
 * @author Javi Manzano Oller <javi.manzano.oller@gmail.com> || @jgasteiz
 */

COLORS.Game = Backbone.Model.extend({

    /**
     * Sets the object defaults attributes
     *
     * @method defaults
     */
    defaults: function() {
        return {
            color: this.randomColor(),
            score: 0,
            numChanges: 0
        };
    },

    /**
     * Reloads the window and lets the user play again
     *
     * @method getScore
     */
    getScore: function (answer) {
        var answerPoints = this.getAnswerPoints(answer);
        this.set({score: this.get('score') + answerPoints});
        this.set({color: this.randomColor()});
        this.set({numChanges: this.get('numChanges') + 1});
        return answerPoints;
    },

    /**
     * Get the points of the current answer based on how near is to the color
     *
     * @method getAnswerPoints
     */
    getAnswerPoints: function (answer) {
        answer  = answer.replace('#', '');
        var color   = this.get('color').replace('#', ''),
            rAnswer = parseInt(answer[0].toString() + answer[1].toString(), 16),
            gAnswer = parseInt(answer[2].toString() + answer[3].toString(), 16),
            bAnswer = parseInt(answer[4].toString() + answer[5].toString(), 16),
            rColor  = parseInt(color[0].toString() + color[1].toString(), 16),
            gColor  = parseInt(color[2].toString() + color[3].toString(), 16),
            bColor  = parseInt(color[4].toString() + color[5].toString(), 16),
            diff    = Math.abs(rAnswer - rColor) +
                      Math.abs(gAnswer - gColor) +
                      Math.abs(bAnswer - bColor);
        diff = 100 - ((diff / 765) * 100);
        return parseInt(diff, 10);
    },

    /**
     * Gets a random hexadecimal 6 digit color code
     *
     * @method randomColor
     */
    randomColor: function () {
        // TODO: Must fix this...
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (color.length === 6) {
            color = color + "0";
        }
        return color;
    }

});