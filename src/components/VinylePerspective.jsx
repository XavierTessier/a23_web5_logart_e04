import "../css/vinyles.css";

const Vinyle = () => {
  return (
    <div className="vinyle_container">
      <svg
        className="vinyle perspective-droite"
        viewBox="0 0 500 500"
        preserveAspectRatio="none"
        transform="translate(-10 0)"
        height="100%"
        width="100%"
      >
        <g>
          <path
            id="dos_cover"
            data-name="dos_cover"
            d="M121.728,425.469,0,396.369V29.728L121.728.33V51.18c-105.573,19.433-105.573,305.1,0,324.366Z"
            transform="translate(60 80) scale(1.5 0.8)"
            fill="#1D1D1B"
          />
        </g>
        <circle
          cx="50%"
          cy="50%"
          r="150"
          fill="#575756"
          stroke="#3c3c3b"
          strokeWidth="10"
        />
        <image
          clipPath="inset(0% round 50%)"
          href="/img/png/michaeljackson_thriller.jpg"
          width="100px"
          height="100px"
          x="40%"
          y="40%"
        />
        <path
          d="M 120 250 A 125 125 , 0, 0, 0, 250 380"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 140 250 A 110 110 , 0, 0, 0, 250 360"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 160 250 A 95 95 , 0, 0, 0, 250 340"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 380 250 A 125 125 , 0, 0, 0, 250 120"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 360 250 A 110 110 , 0, 0, 0, 250 140"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 340 250 A 95 95 , 0, 0, 0, 250 160"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <g>
          <path
            id="Tracé_151"
            data-name="Tracé 151"
            d="M121.728,425.469,0,396.369V29.728L121.728.33V51.18c-105.573,19.433-105.573,305.1,0,324.366Z"
            transform="translate(40 80) scale(1.6 0.8)"
            fill="#454444"
          />
        </g>
        <circle cx="50%" cy="50%" r="10" />
      </svg>
    </div>
  );
};

export default Vinyle;
