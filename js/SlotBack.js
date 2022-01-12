export default class SlotBack {
  constructor(slotElement, game, avatar) {
    this.slotElement = slotElement;
    this.game = game;
    this.avatar = avatar;
  }

  build() {
    this.slotElement.innerHTML =
      '\
                <div class="game--wrapper">\
                    <img class="icon" src="' +
      this.game.cover_uri +
      '" loading="lazy" />\
                    <div class="title-platform--wapper">\
                        <div class="title">' +
      this.game.title +
      '</div>\
                        <div class="platform">' +
      this.game.platform +
      '</div>\
                    </div>\
                </div>\
                <div class="profile--wrapper">\
                    <div class="profile--inner">\
                        <div class="profile--info">\
                            <img class="avatar" src="' +
      this.avatar +
      '" loading="lazy"/>\
                            <div class="name">Robin Ingelbrecht</div>\
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
      '"></ps-trophy-summary>\
                    </div>\
                </div>\
                <div class="all-trophies">All trophies</div>\
                ' +
      this.game.trophies
        .map(
          (trophy) =>
            "<ps-trophy " +
            (trophy.obtained === true
              ? 'earned earned-on="12/24/2021 1:17PM"'
              : "") +
            ' grade="' +
            trophy.grade +
            '" rarity="' +
            trophy.rarity_label.replace(" ", "-").toLowerCase() +
            '" title="' +
            trophy.title +
            '" description="' +
            trophy.description +
            '" icon-source="' +
            trophy.icon_uri +
            '"></ps-trophy>'
        )
        .join("");
  }

  getElement() {
    return this.slotElement;
  }
}
