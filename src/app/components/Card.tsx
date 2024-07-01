type CardProps = {
    title: string
    genre: string
    link: string
    image: string
}

export default function Card(props: CardProps) {
    function openBand() {
        window.open(props.link)
    }

    return(
        <div onClick={openBand}>
            <img src={props.image} alt="Profilbild der Band" />
            <div>
                
            </div>
        </div>
    )
}