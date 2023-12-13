import "../css/vinyle-single.css";
import Bras from "./BrasReader";
import "../css/anim-vinyle.css";

const Vinyle = ({ img, isPlaying }) => {
  return (
    <div
      className={
        !isPlaying ? "vinyle-single relative playing" : "vinyle-single relative"
      }
    >
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
          className=""
          clipPath="inset(0% round 50%)"
          href={img}
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
    </div>
  );
};

export default Vinyle;
