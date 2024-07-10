import style from "./GigCard.module.css";

type CardProps = {
  image: string;
  title: string;
  date: string;
  stage: string;
  location: string;
  category: Array<any>;
};

export default function Card(props: CardProps) {
  let finalDate = new Date(props.date);

  return (
    <div className={style.outter}>
      <img className={style.image} src={props.image} alt="Band-Logo" />
      <div>
        <h3>{props.title}</h3>
        {props.category.map((category) => (
          <p>{category.name}</p>
        ))}
        <p>
          {finalDate.toLocaleDateString("de-ch")}{" "}
          {finalDate.toLocaleTimeString("de-ch", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p>
          {props.stage} - {props.location}
        </p>
      </div>
    </div>
  );
}
