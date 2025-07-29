import CommentForm from "./CommentForm";

const AlignMeSix = ({keywords, viewsCount, likeCount, currentBlogId}) => {
    return (
        <div className="align-me-6">
            <div className="courses-list">
                {
                    keywords?.split(',')?.map((keyword, index) => (
                        <button key={index} className="courses-name">{keyword}</button>
                    ))
                }
            </div>
            <div className="leave-comment-in-cust-screen">
                <div>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    <span className="ms-2">{viewsCount} {viewsCount == 1 ? " View" : " Views"}</span>
                </div>
                <div>
                    <i className="fa fa-heart" aria-hidden="true"></i><span className="ms-2">{likeCount} {likeCount == 1 ? " Like" : " Likes"}</span>
                </div>
            </div>


            <CommentForm blogId={currentBlogId} viewsCount={viewsCount} likeCount={likeCount}></CommentForm>
        </div>
    )
}

export default AlignMeSix;