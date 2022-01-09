const template = document.createElement("template");

template.innerHTML = `
  <style>
    *,
    ::before,
    ::after {
        box-sizing: border-box;
        border-width: 0;
    } 
    img {
        max-width: 100%;
        height: auto;
    } 

    .trophy {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        border-radius: 0.375rem;
        background-image: linear-gradient(to bottom, #201F27, #2f2e35);
        margin-bottom: 2rem;
    }
    :host([earned]) .trophy {
        border-bottom: 2px solid #FFFEFF;
    }

    .trophy .icon {
        min-width: 56px;
        max-width: 56px;
        margin-right: 0.75rem;
    }
    :host(:not([earned])) .trophy .icon {
        opacity: 0.2;
    }
    .trophy .icon img {
        width: 100%;
        border-radius: 0.375rem;
    }

    .trophy .wrapper {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .trophy .wrapper .text-xs {
        font-size: 0.75rem;
        line-height: 1rem;
    }
    .trophy .wrapper .info {
        display: flex;
        justify-content: space-between;
        margin-top: 0.75rem;
    }
    .trophy .wrapper .info > div {
        display: flex;
        align-items: center;
    }
    :host(:not([earned])) .info .earned {
        display: none;
    }    
    .trophy .wrapper .info .earned .text-xs,
    .trophy .wrapper .info .grade {
        margin-right: 0.5rem;
    }
    
    .grade {
        width: 20px;
        height: 22px;
        background-repeat: no-repeat;
        background-size: auto 20px;
        background-position: left center;
    }
    .grade.grade--platinum {
        background-image: url(assets/images/trophy-platinum.png);
    }
    .grade.grade--gold {
        background-image: url(assets/images/trophy-gold.png);
    }
    .grade.grade--silver {
        background-image: url(assets/images/trophy-silver.png);
    }
    .grade.grade--bronze {
        background-image: url(assets/images/trophy-bronze.png);
    }
    
    .rarity {
        width: 25px;
        height: 25px;
        background-repeat: no-repeat;
        background-size: 50px;
        background-image: url(assets/images/rarity-sprite.png);
    }
    .rarity.rarity--common {
        background-position: 0 0;
    }
    .rarity.rarity--rare {
        background-position: -25px 0;
    }
    .rarity.rarity--very-rare {
        background-position: 0 -25px;
    }
    .rarity.rarity--ultra-rare {
        background-position: -25px -25px;
    }

    .trophy-white{
        width: 22px;
        height: 22px;
        background-repeat: no-repeat;
        background-size: auto 22px;
        background-position: center;
        background-image: url(assets/images/trophy-white.png);
    }

  </style>

    <div class="trophy">
        <div class="icon"><img loading="lazy" /></div>
        <div class="wrapper">
            <div class="title"></div>
            <div class="description text-xs"></div>
            <div class="info">
                <div>
                    <div class="grade"></div>
                    <div class="rarity"></div>
                </div>
                <div class="earned">
                    <div class="earned-on text-xs"></div>
                    <div class="trophy-white"></div>
                </div>
            </div>
        </div>
    </div>  
`;

export class PsTrophy extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.iconImgElement = this.shadowRoot.querySelector(
      "div.trophy div.icon img"
    );
    this.titleElement = this.shadowRoot.querySelector(
      "div.trophy div.wrapper div.title"
    );
    this.descriptionElement = this.shadowRoot.querySelector(
      "div.trophy div.wrapper div.description"
    );
    this.gradeElement = this.shadowRoot.querySelector(
      "div.trophy div.wrapper div.info div.grade"
    );
    this.rarityElement = this.shadowRoot.querySelector(
      "div.trophy div.wrapper div.info div.rarity"
    );
    this.earnedOnElement = this.shadowRoot.querySelector(
      "div.trophy div.wrapper div.info div.earned-on"
    );
  }

  connectedCallback() {
    this.iconImgElement.setAttribute("src", this.iconSource);
    this.titleElement.innerText = this.title;
    this.descriptionElement.innerText = this.description;
    this.gradeElement.classList.add("grade--" + this.grade);
    this.rarityElement.classList.add("rarity--" + this.rarity);
    this.earnedOnElement.innerText = this.earnedOn;
  }

  get title() {
    return this.getAttribute("title");
  }

  get description() {
    return this.getAttribute("description");
  }

  get iconSource() {
    return this.getAttribute("icon-source");
  }

  get grade() {
    return this.getAttribute("grade");
  }

  get rarity() {
    return this.getAttribute("rarity");
  }

  get earned() {
    return this.hasAttribute("earned");
  }

  get earnedOn() {
    return this.getAttribute("earned-on");
  }
}

window.customElements.define("ps-trophy", PsTrophy);
