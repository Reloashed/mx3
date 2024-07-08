import style from './Card.module.css'

type CardProps = {
    image: string
    title: string
    category: Array<any>
    link: string
}

export default function Card(props: CardProps) {
    return(
        <div className={style.outter}>
            <img className={style.image} src={props.image} alt="Band-Logo" />
            <div>
            <h3>{props.title}</h3>
            {props.category.map((category) => (
                    <p>{category.name}</p>
                  ))}
            <a className={style.link} href={props.link}>{props.link}</a>
            </div>
        </div>
    )
}