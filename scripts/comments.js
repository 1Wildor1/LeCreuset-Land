let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(event){
    event.preventDefault(); // Отменить стандартное действие кнопки

    let commentBody = document.getElementById('comment-body');

    let comment = {
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        out += `<li>
    <div class="comments_item">
        <div class="comment_images">
            <img src="assets/photo_plug.png" alt="yüz">
        </div>
        <div class="comment_text_wrapp">
            <div class="person_name">
                <p>Anonimous</p>
            </div>
            <div class="comments_text">
                <p>${item.body}</p>
            </div>
        </div>
    </div>
    <div class="evaluation_unit">
        <p>1 min</p>
        <button class="like-button">Comment</button>
        <p>Like</p>
    </div>
</li>
`;
    });
    commentField.innerHTML = out;
}
