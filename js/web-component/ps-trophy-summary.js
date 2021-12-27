const template = document.createElement("template");

template.innerHTML = `
  <style>
    .summary {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .summary .stat {
      text-align: center;
    }
    .summary .stat .text-sm {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    .summary .stat .text-xl {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }    

    .trophies {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }
    .trophies .trophy {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 100px;
      width: 60px;
      background-repeat: no-repeat;
      background-size: auto 60px;
      background-position: center top;
    }
    .trophies .trophy.trophy--bronze {
      background-image: url(/assets/images/trophy-bronze.png);
    }
    
    .trophies .trophy.trophy--silver {
      background-image: url(/assets/images/trophy-silver.png);
    }
    
    .trophies .trophy.trophy--gold {
      background-image: url(/assets/images/trophy-gold.png);
    }
    
    .trophies .trophy.trophy--platinum {
      background-image: url(/assets/images/trophy-platinum.png);
    }
  </style>

  <div class="summary">
    <div class="stat stat--earned">
        <div class="text-xl"></div>
        <div class="text-sm">Earned</div>
    </div>
    <svg width="100px" height="100px" viewBox="-25 -25 400 400">
        <circle stroke="#424145" cx="175" cy="175" r="175" stroke-width="8" fill="none"></circle>
        <circle class="dashed" stroke="#FFFEFF" transform="rotate(-90 175 175)" cx="175" cy="175" r="175" stroke-dasharray="1100" stroke-width="8" stroke-dashoffset="1100" stroke-linecap="round" fill="none"></circle>
        <text fill="#FFFEFF" x="50%" y="50%" dx="-25" text-anchor="middle" style="font: normal 4rem Poppins, sans-serif;"><tspan class="value"></tspan><tspan dx="10">%</tspan></text>
    </svg>
    <div class="stat stat--available">
        <div class="text-xl"></div>
        <div class="text-sm">Available</div>
    </div>    
  </div>  
  <div class="trophies">
    <div class="trophy trophy--platinum">
        <span></span>
    </div>
    <div class="trophy trophy--gold">
        <span></span>
    </div>
    <div class="trophy trophy--silver">
        <span></span>
    </div>
    <div class="trophy trophy--bronze">
        <span></span>
    </div>
  </div>
`;

export class PsTrophySummary extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.earnedVal = this.shadowRoot.querySelector(
      "div.summary div.stat--earned div.text-xl"
    );
    this.availableVal = this.shadowRoot.querySelector(
      "div.summary div.stat--available div.text-xl"
    );
    this.percentageEarnedVal = this.shadowRoot.querySelector(
      "div.summary svg text tspan.value"
    );
    this.dashOffsetVal = this.shadowRoot.querySelector(
      "div.summary svg circle.dashed"
    );
    this.platinumVal = this.shadowRoot.querySelector(
      "div.trophy.trophy--platinum span"
    );
    this.goldVal = this.shadowRoot.querySelector(
      "div.trophy.trophy--gold span"
    );
    this.silverVal = this.shadowRoot.querySelector(
      "div.trophy.trophy--silver span"
    );
    this.bronzeVal = this.shadowRoot.querySelector(
      "div.trophy.trophy--bronze span"
    );
  }

  connectedCallback() {
    if (!this.hasAttribute("earned")) {
      this.setAttribute("earned", 0);
    }
    if (!this.hasAttribute("available")) {
      this.setAttribute("available", 0);
    }
    if (!this.hasAttribute("percentage-earned")) {
      this.setAttribute("percentage-earned", 0);
    }
    if (!this.hasAttribute("platinum")) {
      this.setAttribute("platinum", 0);
    }
    if (!this.hasAttribute("gold")) {
      this.setAttribute("gold", 0);
    }
    if (!this.hasAttribute("silver")) {
      this.setAttribute("silver", 0);
    }
    if (!this.hasAttribute("bronze")) {
      this.setAttribute("bronze", 0);
    }

    this.earnedVal.innerText = this.earned;
    this.availableVal.innerText = this.available;
    this.percentageEarnedVal.textContent = this.percentageEarned;
    this.dashOffsetVal.setAttribute(
      "style",
      "stroke-dashoffset: " + this.calculatePercentageStrokeDashOffset() + ";"
    );
    this.platinumVal.innerText = this.platinum;
    this.goldVal.innerText = this.gold;
    this.silverVal.innerText = this.silver;
    this.bronzeVal.innerText = this.bronze;
  }

  calculatePercentageStrokeDashOffset() {
    // source: https://github.com/zzarcon/react-circle/blob/master/src/circle.tsx
    const radius = 175;
    const diameter = Math.round(Math.PI * radius * 2);
    return Math.round(
      ((100 - Math.min(this.percentageEarned, 100)) / 100) * diameter
    );
  }

  get earned() {
    return this.getAttribute("earned");
  }

  get available() {
    return this.getAttribute("available");
  }

  get percentageEarned() {
    return this.getAttribute("percentage-earned");
  }

  get platinum() {
    return this.getAttribute("platinum");
  }

  get gold() {
    return this.getAttribute("gold");
  }

  get silver() {
    return this.getAttribute("silver");
  }

  get bronze() {
    return this.getAttribute("bronze");
  }
}

window.customElements.define("ps-trophy-summary", PsTrophySummary);
