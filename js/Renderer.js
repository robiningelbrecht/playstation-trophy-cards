import SlotFront from "./../js/SlotFront.js";
import SlotBack from "./../js/SlotBack.js";

export default class Renderer {
  constructor(parentElement, me) {
    this.parentElement = parentElement;
    this.me = me;
  }

  render() {
    // Games have loaded, remove loading text.
    this.parentElement.innerHTML = '';
    this.parentElement.classList.remove('loading');

    // Render all the game cards.
    this.me.games.forEach((game) => {
      const slotFront = new SlotFront(this._createCardSlotElement('front'), game);
      slotFront.build();

      const slotBack = new SlotBack(this._createCardSlotElement('back'), game, this.me.avatar);
      slotBack.build();
    

      this._createFlippalbleCardElementAndAppend(slotFront.getElement(), slotBack.getElement());
    });
  }

  _createCardSlotElement(side){
    const slot = document.createElement("div");
    slot.setAttribute("slot", side);

    return slot;
  }

  _createFlippalbleCardElementAndAppend(slotFront, slotBack){
    const flippableCard = document.createElement('flippable-card');

    flippableCard.appendChild(slotFront);
    flippableCard.appendChild(slotBack);

    this.parentElement.appendChild(flippableCard);
  }
}
