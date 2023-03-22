package com.DuTongChitongYutong.EverybodyChachapark.security.oauth2;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OauthController {

    @GetMapping("/member/oauth2")
    public String home() {
        return "oauth2";
    }
}
