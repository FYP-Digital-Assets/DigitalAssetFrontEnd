export function ContentAuthor({img, name, address}){
    return(
        <div className="owner_content_profile">
            <img src={img}/>
            <div>
                <p>{name}</p>
                <p>{address}</p>
            </div>
        </div>
    );
}