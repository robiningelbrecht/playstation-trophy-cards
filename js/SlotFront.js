export default class SlotFront {
  constructor(slotElement, game) {
    this.slotElement = slotElement;
    this.game = game;
  }

  build() {
    this.slotElement.innerHTML =
      '\
                <img src="' +
      this.game.background_uri +
      '" loading="lazy" />\
                <div class="title">' +
      this.game.title +
      '</div>\
                <div class="wrapper--arrow">\
                    <div>Trophies</div>\
                    <i class="arrow arrow--right"></i>\
                </div>\
                <ps-trophies-summary available="' +
      this.game.trophy_stats.total +
      '" earned="' +
      this.game.trophy_stats.obtained +
      '" percentage-earned="' +
      parseInt(this.game.trophy_stats.completion) +
      '" platinum="' +
      (this.game.has_earned_platinum ? 1 : 0) +
      '" gold="' +
      this.game.trophy_stats.gold +
      '" silver="' +
      this.game.trophy_stats.silver +
      '" bronze="' +
      this.game.trophy_stats.bronze +
      '"></ps-trophy-summary>';
  }

  getElement() {
    return this.slotElement;
  }
}
