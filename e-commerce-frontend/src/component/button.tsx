type Props = {
     text: String;
     type: "Solid" | "Outline";
     onClick: (id: String) => void;
};

function Button({text = "Hello", type, onClick }: Props) {
     return (
          <button className={type}
          onClick={() => onClick('08698758789')}
          >
          {text}
          </button>
     );
}

export default Button;