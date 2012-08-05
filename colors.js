
/** 
 * Colors Game
 * 
 * @namespace COLORS
 *
 * @author Javi Manzano Oller <javi.manzano.oller@gmail.com> || @jgasteiz
 */
var COLORS = (function() {

    var score,
        maxColors,
        colorCounter,
        colorInPosition;


    /**
     * Gets a random hexadecimal color
     *
     * @source http://paulirish.com/2009/random-hex-color-code-snippets/
     *
     * @method randomColor
     */
    var getRandomColor = function() {
        // Must fix this...
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        if (color.length === 6) {
            color = color + "0";
        }
        return color;
    };

    /**
     * Loads the random color on a div
     *
     * @method nextColor
     */
    var nextColor = function() {
        colorInPosition = getRandomColor();
        $('#colors').html(
            '<div style="background-color: ' + colorInPosition + '"></div>');
    };

    /**
     * Gets the user answer and score the points
     *
     * @method getAnswer
     */
    var getAnswer = function() {
        var answer = $('#color').val();
        var regColorcode = /^(#)?([0-9a-fA-F]{6})$/;
        if (answer.match(regColorcode)) {
            colorCounter += 1;
            $('#color').val('');
            scorePoints(answer);
            (colorCounter < maxColors) ? nextColor() : gameOver();
        }
        else {
            animateMessage(
                '#messages', 
                'You must enter a valid color code.<br>Ex: F5F5F5 or 36b036',
                2000);
        }
    };

    /**
     * Gets the user answer and score the points
     *
     * @method scorePoints
     *
     * @param {string} The user answer
     */
    var scorePoints = function(answer) {
        var answer  = answer.replace('#', ''),
            color   = colorInPosition.replace('#', ''),
            rAnswer = parseInt(answer[0] + '' + answer[1], 16),
            gAnswer = parseInt(answer[2] + '' + answer[3], 16),
            bAnswer = parseInt(answer[4] + '' + answer[5], 16),
            rColor  = parseInt(color[0] + '' + color[1], 16),
            gColor  = parseInt(color[2] + '' + color[3], 16),
            bColor  = parseInt(color[4] + '' + color[5], 16),
            diff    = Math.abs(rAnswer - rColor) +
                      Math.abs(gAnswer - gColor) +
                      Math.abs(bAnswer - bColor);
        diff = 100 - ((diff / 765) * 100);
        animateMessage('#animated-score', '+' + parseInt(diff, 10), 200);
        score += parseInt(diff, 10);
        $('#score').html(score);
    }

    /**
     * Shows the final score to the user and ask him to play again
     *
     * @method gameOver
     */
    var gameOver = function() {
        $('#content').html(
            '<h1>Congratulations, you scored ' + score + ' over 300!</h1>' +
            '<button onclick="location.reload()">Play Again</button>');
    };

    /**
     * Creates an animated message
     *
     * @method animateMessage
     *
     * @param {string} The div id where the message should go
     * @param {string} The message itself
     * @param {string} The time in miliseconds while the message should stay
     */
    var animateMessage = function(where, what, delay) {
        $(where).html(what).show().delay(delay).fadeOut('slow',
            function() { $(this).html(''); }
        );
    }

    /**
     * Initializes the game
     *
     * @method init
     */
    var init = function() {
        score = 0;
        maxColors = 3;
        colorCounter = 0;
        $('#score').html(score);
        
        nextColor();
        
        $('.help').click(function(e) {
            e.preventDefault();
            $(this).remove();
            $('#help').removeClass('hidden');
        });
    };

    return {
        init: init,
        getAnswer: getAnswer
    }
}());