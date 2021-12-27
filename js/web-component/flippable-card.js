const template = document.createElement("template");

template.innerHTML = `
  <style>
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        border-width: 0;
    } 
    
    ::-webkit-scrollbar-track{
        background-color: transparent;
    }
    
    ::-webkit-scrollbar{
        width: 5px;
        background-color: transparent;
    }
    
    ::-webkit-scrollbar-thumb{
        background-color: #555555;
        border-radius: 5px;
    }

    .card {
        perspective: 600px;
        color: rgb(255 254 255);
        font-weight: 200;
        font-family: Poppins, sans-serif;
        width: 400px;
    }
    .card .card--inner {
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;
    }
    :host([flipped]) .card .card--inner{
        transform: rotateY(180deg);
    }
    .card .card--inner .card-face {
        position: relative;
        padding: 1rem;
        border-radius: 0.375rem;
        background-image: linear-gradient(to bottom, #1E1D21, #24232A, rgb(30 29 33 / 0));
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .card .card--inner .card-face.card-face--back {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        transform: rotateY(180deg);
    }
  </style>

  <div class="card">
    <div class="card--inner">
        <div class="card-face card-face--front">
            <slot name="front"></slot>
        </div>
        <div class="card-face card-face--back">
            <slot name="back"></slot>
        </div>
    </div>
  </div>
`;

export class FlippableCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get flipped() {
    return this.hasAttribute("flipped");
  }

  set flipped(isFlipped) {
    if (isFlipped) {
      this.setAttribute("flipped", "");
    } else {
      this.removeAttribute("flipped");
    }
  }
}

window.customElements.define("flippable-card", FlippableCard);
