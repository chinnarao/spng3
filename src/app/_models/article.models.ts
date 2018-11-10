export interface ArticleCommentModel {
    articleCommentId:    number;
    articleId:           number;
    comment:             string;
    userIdOrEmail:       string;
    userSocialAvatarUrl: string;
    isAdminCommented:    boolean;
    commentedDate:       string;
}

export interface ArticleLicenseModel {
    articleLicenseId: number;
    license:          string;
    licensedDate:     string;
    articleId:        number;
}

export interface ArticleCommitModel {
    articleCommitId:     number;
    commit:              string;
    committedDate:       string;
    userIdOrEmail:       string;
    userSocialAvatarUrl: string;
    isAdminCommited:     boolean;
    articleId:           number;
}

export interface ArticleModel {
    articleId:                                   string;
    title:                                       string;
    content:                                     string;
    userIdOrEmail:                               string;
    userLoggedInSocialProviderName:              string;
    userPhoneNumber:                             string;
    userSocialAvatarUrl:                         string;
    biodataUrl:                                  string;
    hireMe:                                      boolean;
    openSourceUrls:                              string;
    isActive:                                    boolean;
    isArticleInDraftMode:                        boolean;
    isPublished:                                 boolean;
    attachedAssetsInCloudCount:                  number;
    attachedAssetsInCloudStorageId:              string;
    attachedAssetsStoredInCloudBaseFolderPath:   string;
    allRelatedSubjectsIncludesVersionsWithComma: string;
    attachmentURLsComma:                         string;
    publishedDate:                               string;
    socialURLsWithComma:                         string;
    totalVotes:                                  number;
    totalVotedPersonsCount:                      number;
    articleAverageVotes:                         number;
    createdDateTime:                             string;
    updatedDateTime:                             string;
    tag1:                                        string;
    tag2:                                        string;
    tag3:                                        string;
    tag4:                                        string;
    tag5:                                        string;
    tag6:                                        string;
    tag7:                                        string;
    tag8:                                        string;
    tag9:                                        string;
    tag10:                                       string;
    tag11:                                       string;
    tag12:                                       string;
    updatedDateTimeString:                       string;
}
