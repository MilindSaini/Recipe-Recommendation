package com.recommend.recipe.config.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserInfoResponse {
    private String id;
    private String username;
    private String email;

    public UserInfoResponse(String id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
