import "../css/vinyle-single.css";
import Bras from "./BrasReader";

const Vinyle = ({ img }) => {
  return (
    <div className="vinyle-playlist relative">
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
        <clipPath id="circleClip">
          <circle cx="50%" cy="50%" r="75" />
        </clipPath>
        <image
          className=""
          clipPath="url(#circleClip)"
          href={img}
          width="50%"
          height="50%"
          x="25%"
          y="25%"
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
    </div>
  );
};

export default Vinyle;
