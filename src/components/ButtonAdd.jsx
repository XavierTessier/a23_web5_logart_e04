import { IoAdd } from "react-icons/io5";

const ButtonAdd = () => (
  <div className="flex items-center justify-center h-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="64.045"
      height="69.302"
      viewBox="0 0 64.045 69.302"
    >
      <g
        id="Composant_29_4"
        data-name="Composant 29 – 4"
        transform="translate(1.225 1.123)"
      >
        <g
          id="Groupe_274"
          data-name="Groupe 274"
          transform="matrix(-0.105, 0.995, -0.995, -0.105, 62.775, 11.73)"
        >
          <path
            id="Tracé_115"
            data-name="Tracé 115"
            d="M29.76-.034c16.966,0,26.993,8.87,27,25.077S44.589,51.5,27.623,51.5-.035,46.806-.039,30.6,12.794-.037,29.76-.034Z"
            transform="translate(-0.003 -0.006)"
            fill="#ffcab8"
          />
        </g>
        <g
          id="Groupe_276"
          data-name="Groupe 276"
          transform="matrix(-0.105, 0.995, -0.995, -0.105, 60.782, 5.776)"
        >
          <path
            id="Tracé_114"
            data-name="Tracé 114"
            d="M22.514,1.916c13.971-5.464,28.4,1.246,33.949,11.925s-5.4,35.692-19.2,39.471S3.967,52.709.577,35.7,8.543,7.38,22.514,1.916Z"
            transform="translate(0.003 0.453)"
            fill="none"
            stroke="#ff7e50"
            strokeWidth="2"
          />
        </g>
        {/* Add rounded plus sign */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="48"
          fill="#000"
          fontWeight="bold"
        >
          +
        </text>
      </g>
    </svg>
  </div>
);

export default ButtonAdd;
