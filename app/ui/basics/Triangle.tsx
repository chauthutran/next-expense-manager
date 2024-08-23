export default  function Triangle({bgColor}) {
    return (
        <div className="flex justify-center items-center">
            <div className="w-4 h-4 bg-red-600" style={{"clipPath": "polygon(50% 0%, 100% 100%, 0% 100%)"}}></div>
        </div>
    )
}