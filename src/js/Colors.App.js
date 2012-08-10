/** 
 * Guess the Color App backbone router
 * 
 * @class App
 *
 * @author Javi Manzano Oller <javi.manzano.oller@gmail.com> || @jgasteiz
 */

COLORS.App = new (Backbone.Router.extend({

    initialize: function(){
        this.game = new COLORS.Game();
        this.gameView = new COLORS.GameView({model: this.game});
        this.gameView.render();
    }

}));