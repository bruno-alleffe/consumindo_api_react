function Input({ handleChange, type, value, name, id, className, placeholder}) {
    return (
        <input onChange={handleChange} value={value} type={type} name={name} id={id} className={className} placeholder={placeholder}/>
    )
}

export default Input