package com.giaule.momentum.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.jwt")
@Data
public class JwtProps {
    private String secret;
    private long expiresInMs;
}
