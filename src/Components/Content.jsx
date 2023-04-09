export function Content({data, type, title, description}){
    const contentStyle = {width:"50rem", height:"50rem", objectFit:"cover"};
    const titleStyle = {fontSize:"2rem", fontWeight:"bold"};
    const descriptionStyle = {color:"gray", fontSize:"1.5rem"}
    return (
        <div>
        <object data={data} type={type} style={contentStyle}>
        <p>Preview not available</p>
        </object><br/>
      <p style={titleStyle}>{title}</p>
      <p style={descriptionStyle}>{description}</p>
        </div>
    );
}