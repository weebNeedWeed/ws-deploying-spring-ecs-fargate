package com.giaule.momentum.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.giaule.momentum.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    private JwtProps props;
    private final String issuer = "momentum";
    private final String audience = "momentumAdmin";

    @Autowired
    public JwtUtils(JwtProps props) {
        this.props = props;
    }

    public String generateToken(User user) {
        Algorithm algorithm = getAlgorithm();
        try {
            String token = JWT
                    .create()
                    .withIssuer(issuer)
                    .withAudience(audience)
                    .withExpiresAt(new Date(System.currentTimeMillis() + props.getExpiresInMs()))
                    .withClaim("username", user.getUsername())
                    .sign(algorithm);
            return token;
        } catch (IllegalArgumentException | JWTCreationException ex) {
            return null;
        }
    }

    public String getUsernameFromToken(String token) {
        Algorithm algorithm = getAlgorithm();
        JWTVerifier verifier = JWT.require(algorithm)
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("username").asString();
    }

    public boolean verifyToken(String token) {
        Algorithm algorithm = getAlgorithm();
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(issuer)
                .withAudience(audience)
                .acceptExpiresAt(System.currentTimeMillis() + props.getExpiresInMs())
                .build();

        try {
            verifier.verify(token);
            return true;
        } catch(Exception ex) {
            return false;
        }
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(props.getSecret());
    }
}
