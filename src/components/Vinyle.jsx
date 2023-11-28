import "../css/vinyle.css";

const Vinyle = () => {
  return (
    <div className="vinyle_container">
      <svg
        className="vinyle perspective-droite z-30"
        height={70}
        width={150}
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        transform="translate(-10 0)"
      >
        <g className="">
          <path
            id="dos_cover"
            data-name="dos_cover"
            d="M121.728,425.469,0,396.369V29.728L121.728.33V51.18c-105.573,19.433-105.573,305.1,0,324.366Z"
            transform="translate(-10 -125) scale(1.6 0.8)"
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
          x="33%"
        />
        <path
          d="M 20 40 A 125 125 , 0, 0, 0, 150 180"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 40 40 A 110 110 , 0, 0, 0, 150 155"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 60 40 A 95 95 , 0, 0, 0, 150 130"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 280 40 A 125 125 , 0, 0, 0, 150 -80"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 260 40 A 110 110 , 0, 0, 0, 150 -60"
          stroke="#b3b3b3"
          fill="transparent"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M 240 40 A 95 95 , 0, 0, 0, 150 -40"
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
            transform="translate(-20 -120) scale(1.6 0.8)"
            fill="#454444"
          />
        </g>
        <circle cx="50%" cy="50%" r="10" />
      </svg>
    </div>
  );
};

export default Vinyle;
