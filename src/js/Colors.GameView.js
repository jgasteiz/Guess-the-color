/** 
 * Guess the Color GameView backbone view
 * 
 * @class GameView
 *
 * @author Javi Manzano Oller <javi.manzano.oller@gmail.com> || @jgasteiz
 */

COLORS.GameView = Backbone.View.extend({

    el: $("#app"),

    colorTemplate: _.template($('#color-template').html()),
    gameOverTemplate: _.template($('#game-over-template').html()),
    errorMessageTemplate: _.template($('#error-message-template').html()),

    events: {
        'click .next': 'getAnswer',
        'click .help': 'showHelp',
        'click .play-again': 'playAgain'
    },

    /**
     * Initializes the view
     *
     * @method initialize
     */
    initialize: function () {
        this.model.on('change', this.render, this);
        this.input = this.$('#color');
    },

    /**
     * Get's the user answer from the input
     *
     * @method getAnswer
     */
    getAnswer: function () {
        var answer = this.input.val();
        if (this.checkAnswer(answer) == true) {
            this.animateMessage(
                    '#animated-score',
                    '+' + this.model.getScore(answer),
                    200
                );
            this.input.val('');
        } else {
            this.animateMessage(
                    '#messages',
                    this.errorMessageTemplate(),
                    2000
                );
        }
        
    },

    /**
     * Checks if the user has entered a valid hex color code
     *
     * @method checkAnswer
     *
     * @param {string} The user answer
     */
    checkAnswer: function(answer) {
        if (answer.match(/^(#)?([0-9a-fA-F]{6})$/)) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Creates an animated message
     *
     * @method animateMessage
     *
     * @param {string} The div id where the message should go
     * @param {string} The message itself
     * @param {string} The time in miliseconds while the message should stay
     */
    animateMessage: function (where, what, delay) {
        $(where).html(what).show().delay(delay).fadeOut('slow', function () {
            $(this).html('');
        });
    },

    /**
     * Shows some sort of help to the user
     *
     * @method showHelp
     *
     * @param {object} An event object
     */
    showHelp: function (e) {
        e.preventDefault();
        this.$('.help').remove();
        this.$('#help').removeClass('hidden');
    },

    /**
     * Reloads the window and lets the user play again
     *
     * @method playAgain
     */
    playAgain: function () {
        window.location.reload();
    },

    /**
     * Places a random color on the main div or shows the final score to the
     * user and ask him to play again if the number of tries are over.
     *
     * @method render
     */
    render: function () {
        $('#score').html(this.model.get('score'));
        if (this.model.get('numChanges') < 3) {
            this.$('#colors').html(this.colorTemplate(this.model.toJSON()));
        } else {
            this.$el.html(this.gameOverTemplate(this.model.toJSON()));
        }
        return this;
    }
});

