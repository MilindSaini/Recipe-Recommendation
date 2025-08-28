package com.recommend.recipe.config.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponse {
    private String jwtToken;
    private String username;

    public LoginResponse(String username,String jwtToken) {
        this.username = username;
        this.jwtToken = jwtToken;
    }

}
