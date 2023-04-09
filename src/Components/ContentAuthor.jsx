export function ContentAuthor({img, name, address}){
    const imgStyle = {width:"10rem",height:"10rem",objectfit:"cover", borderRadius:"50%"};
    const nameStyle = {fontSize:"2rem", fontWeight:"bold"};
    const addressStyle = {color:"gray", fontSize:"1.5rem"};
    const containerStyle = {display:"inline-block", height:"10rem"};
    return(
        <>
            <img src={img} style={imgStyle}/>
            <div style={containerStyle}>
                <p style={nameStyle}>{name}</p>
                <p style={addressStyle}>{address}</p>
            </div>
        </>
    );
}