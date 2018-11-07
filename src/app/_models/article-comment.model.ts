export interface ArticleCommentModel {
    articleCommentId:    number;
    articleId:           number;
    comment:             string;
    userIdOrEmail:       string;
    userSocialAvatarUrl: string;
    isAdminCommented:    boolean;
    commentedDate:       string;
}





