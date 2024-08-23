export default  function Triangle({bgColor, size}) {
    return (
        <div className="flex justify-center items-center">
            <div
                style={{"clipPath": "polygon(50% 0%, 100% 100%, 0% 100%)", width: size, height: size, backgroundColor: bgColor}} ></div>
        </div>
    )
}