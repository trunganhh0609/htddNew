package com.project.qlrl.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {
    public JwtResponse(String accessToken) {
		// TODO Auto-generated constructor stub
	}

	private String accessToken;
//	private String userUid;
//	private List<String> roles;
}

