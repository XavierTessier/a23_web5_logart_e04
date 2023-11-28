import "../css/vinyle-single.css";

const Vinyle = () => {
  return (
    <div className="vinyle-single relative">
      <svg
        className="vinyle"
        viewBox="0 0 500 500"
        preserveAspectRatio="none"
        transform="translate(-10 0)"
        height="100%"
        width="100%"
      >
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

        <circle cx="50%" cy="50%" r="10" />
      </svg>
      <div className="bras-reader">
        <svg viewBox="0 0 160.64 282.91">
          <g>
            <g>
              <circle
                className="cls-4"
                cx="115.64"
                cy="66.69"
                r="45"
                fill="#1d1d1b"
              />
              <path
                className="cls-1"
                fill="#4d4d4d"
                d="m119.89,42.18c2.68-6.17,3.91-11.72,1.67-17l11.07-24.02c.5-1.07,1.8-1.48,2.83-.9l18.01,9.8c1.12.63,1.56,2.02,1.01,3.18l-9.7,20.67c-5.8,1.54-8.22,5.27-12,12.52l-30.45,61.76c-3.13,6.56-4.59,13.8-4.25,21.06l3.85,61.34c.4,8.58-3.2,16.86-9.74,22.42l-37.18,32.36-6.45-11.18,34.03-28.12c5.65-4.96,8.64-12.29,8.07-19.79l-5.59-61.45c-.33-4.35.46-8.72,2.3-12.68l32.53-69.96Z"
              />
              <circle
                className="cls-3"
                cx="115.64"
                cy="66.69"
                r="14"
                fill="#b3b3b3"
              />
              <path
                className="cls-2"
                fill="#333"
                d="m60.44,217.22l-27.99,22.68c-1.48,1.2-3.4,1.72-5.28,1.42l-2.46-.38c-1.93-.3-3.89.23-5.41,1.45l-18.04,14.53c-6.15,3.2,11.89,29.63,19.87,25.58.59-.3,19.26-12.99,20.37-14.55.7-.99,1.97-5.01,2.8-7.82.55-1.85,1.71-3.46,3.29-4.58l27.41-21.94-14.56-16.39Z"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Vinyle;
