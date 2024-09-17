export default function Die(props) {
    const { value, isHeld, id, holdDice } = props;

    const style = isHeld ? "held die" : "die";

    // Function to render dots based on the dice value
    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < 6; i++) {
            if (i < value) {
                dots.push(<div key={i} className="dot"></div>);
            }
        }
        return dots;
    };

    return (
        <div className={style} data-value={value} onClick={() => holdDice(id)}>
            {renderDots()}
        </div>
    );
}
