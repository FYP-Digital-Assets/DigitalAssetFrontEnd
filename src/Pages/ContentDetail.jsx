import {Content} from "../Components/Content"
import {CommentBox} from "../Components/CommentBox"
import { ContentAuthor } from "../Components/ContentAuthor";
import "./ContentDetail.css"

export default function ContentDetail(props){
    return (
        <div className="container-fluid px-4 py-4 ">
            <div className="row">
                <div className="col-9 detailsRightSection">
                    <ContentAuthor img={props.img} name={props.name} address={props.address}/>
                    <Content data="https://placehold.co/600x400/png" type="image/png" title="hellosdf sjdlfkjs lkjsdf" description="hello dbdskdfk jaskljdf jlkajsd"/>
                    <CommentBox/>
                </div>
                <div className="col-3 border border-warning">
                </div>
            </div>
        </div>
    );
}