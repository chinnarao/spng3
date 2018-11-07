export interface ArticleCommitModel {
    articleCommitId:     number;
    commit:              string;
    committedDate:       string;
    userIdOrEmail:       string;
    userSocialAvatarUrl: string;
    isAdminCommited:     boolean;
    articleId:           number;
}
