export function ContentAuthor({img, name, address}){
    return(
        <div className="owner_content_profile">
            <img src={`http://localhost:4000/profileImgs/${img}`}/>
            <div>
                <p>{name}</p>
                <p>{address.substr(0,6)}...{address.substr(-4, 4)}</p>
            </div>
        </div>
    );
}